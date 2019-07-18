<template>
    <div id='demo14' class='fulldemo'></div>
</template>

<script>
/**
 * 该demo学习group和box3helper
 */
import * as THREE from 'three'
import * as OrbitControls from 'three-orbitcontrols'
import  GLTFLoader  from 'three-gltf-loader'

export default {
    data() {
        return {
            renderer:null,
            camera:null,
            light:null,
            scene:null,
            width:0,
            height:0,
            miku:null,
            deg:0,
            group:null
        }
    },
    methods: {
        initThree(){
            let ele=document.getElementById('demo14')
            this.width=ele.clientWidth
            this.height=ele.clientHeight
            this.renderer=new THREE.WebGLRenderer({
                antialias:true
            })
            this.renderer.setSize(this.width,this.height)
            ele.appendChild(this.renderer.domElement)
            this.renderer.setClearColor(0xf7f7f7)
          
        },
        initCamera(){
            this.camera=new THREE.PerspectiveCamera(35,this.width/this.height,1,5000)
            this.camera.position.set(0,0,3750)
            this.camera.up.set(0,1,0)
            this.camera.lookAt(0,0,0)
        },
        initScene(){
            this.scene=new THREE.Scene()
            this.scene.background=new THREE.Color(0x050505)
            this.scene.fog=new THREE.Fog(0x050505,2000,3500)
        },
        initLight(){
            this.light=new THREE.DirectionalLight( 0xffffff, 1)
            this.light.position.set(1,1,1)
            this.scene.add(this.light)
            
        },
        initObject(){
            let particles=500000
            let geometry = new THREE.BufferGeometry()
            let arrayBuffer=new ArrayBuffer(particles*16)
            let interleavedFloat32Buffer=new Float32Array(arrayBuffer)
            let interleavedUint8Buffer=new Uint8Array(arrayBuffer)
            let color=new THREE.Color()
            let n=1000,n2=n/2
            for (var i=0;i<interleavedFloat32Buffer.length;i+=4){
                let x=Math.random()*n-n2
                let y=Math.random()*n-n2
                let z=Math.random()*n-n2

                interleavedFloat32Buffer[i+0]=x
                interleavedFloat32Buffer[i+1]=y
                interleavedFloat32Buffer[i+2]=z

                let vx=(x/n)+0.5
                let vy=(y/n)+0.5
                let vz=(z/n)+0.5

                color.setRGB(vx,vy,vz)

                let j= (i+3)*4

                interleavedUint8Buffer[j+0]=color.r*255
                interleavedUint8Buffer[j+1]=color.g*255
                interleavedUint8Buffer[j+2]=color.b*255
                interleavedUint8Buffer[j+3]=0

            }
            let buffer32=new THREE.InterleavedBuffer(interleavedFloat32Buffer,4)
            let buffer8=new THREE.InterleavedBuffer(interleavedUint8Buffer,16)

            geometry.addAttribute('position',new THREE.InterleavedBufferAttribute(buffer32,3,0,false))
            geometry.addAttribute('color',new THREE.InterleavedBufferAttribute(buffer8,3,12,true))

            let material =new THREE.PointsMaterial({size:15,vertexColors:THREE.VertexColors})
            let points=new THREE.Points(geometry,material)
            this.scene.add(points)
        },
        initControls(){
            this.controls=new OrbitControls(this.camera,this.renderer.domElement)
            this.controls.enableDamping=true
            this.controls.enableZoom=true
            this.controls.autoRotate=false
            this.controls.autoRotateSpeed=0.5
            this.controls.minDistance=1
            this.controls.maxDistance=2000
            this.controls.enablePan=true
        },
        animates(){
            this.renderer.render(this.scene,this.camera)
            requestAnimationFrame(this.animates)
        }
    },
    mounted() {
        this.initThree()
        this.initCamera()
        this.initScene()
        //this.initLight()
        this.initObject()
        this.initControls()
        this.animates()
    },
}
</script>