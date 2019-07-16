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
            this.camera=new THREE.PerspectiveCamera(70,this.width/this.height,1,10000)
            this.camera.position.set(30,30,-50)
            this.camera.up.set(0,1,0)
            this.camera.lookAt(0,5,0)
        },
        initScene(){
            this.scene=new THREE.Scene()
        },
        initLight(){
            this.light=new THREE.DirectionalLight( 0xffffff, 1)
            this.light.position.set(1,1,1)
            this.scene.add(this.light)
            this.light=new THREE.DirectionalLight( 0xffffff, 1)
            this.light.position.set(1,1,-1)
            this.scene.add(this.light)
            this.light=new THREE.DirectionalLight( 0xffffff, 1)
            this.light.position.set(-1,1,1)
            this.scene.add(this.light)
        },
        initGrid(){
            let grid=new THREE.GridHelper(1000,50,0xff0000,0x0000ff)

            this.scene.add(grid)
        },
        initObject(){
            this.group=new THREE.Group()
            let loader=new GLTFLoader()
            loader.load('Miku2/scene.gltf',( gltf ) => {
                this.miku=gltf.scene
                this.miku.position.set(0,0,0)
                 this.miku.updateMatrix()
                this.group.add(this.miku)
                
            })
            let box=new THREE.Box3()
            box.setFromCenterAndSize(new THREE.Vector3(0,10,0),new THREE.Vector3(20,20,20))
            let helper=new THREE.Box3Helper(box,0x00ff00)
            this.group.add(helper)
            let axesHelper = new THREE.AxesHelper( 25);
            this.group.add(axesHelper)
            this.scene.add(this.group)
        },
        initControls(){
            this.controls=new OrbitControls(this.camera,this.renderer.domElement)
            //this.controls.target.set(0,5,0)
            //this.controls.addEventListener('change',this.render)
            this.controls.enableDamping=true
            //this.controls.dampingFactor=0.25
            this.controls.enableZoom=true
            this.controls.autoRotate=false
            this.controls.autoRotateSpeed=0.5
            this.controls.minDistance=1
            this.controls.maxDistance=2000
            this.controls.enablePan=true
        },
        animates(){
            if(this.miku){
                this.deg+=1
                // this.miku.rotation.y=this.deg

                this.group.position.x= 30*Math.cos(this.deg*Math.PI/180)
                this.group.position.z= 30*Math.sin(this.deg*Math.PI/180)
               this.miku.lookAt(0,0,0)
            }
            
            this.renderer.render(this.scene,this.camera)
            requestAnimationFrame(this.animates)
        }
    },
    mounted() {
        this.initThree()
        this.initCamera()
        this.initScene()
        this.initLight()
        this.initGrid()
        this.initObject()
        this.initControls()
        this.animates()
    },
}
</script>