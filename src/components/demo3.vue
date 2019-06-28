<template>
    <div id='demo3' class='demo'></div>
</template>
<script>
/**
该demo改变相机方向来达到让物体动起来的效果
 */
import * as THREE from 'three'
export default {
    data() {
        return {
            renderer:null,
            camera:null,
            scene:null,
            light:null,
            cube:null,
            width:0,
            heigh:0
        }
    },
    methods: {
        initThree(){
            this.width=document.getElementById('demo3').clientWidth
            this.height=document.getElementById('demo3').clientHeight
            this.renderer=new THREE.WebGLRenderer({
                antialias:true
            })
            this.renderer.setSize(this.width,this.height)
            document.getElementById('demo3').appendChild(this.renderer.domElement)
            this.renderer.setClearColor(0xf5f5f5,1.0)
        },
        initCamera(){
            this.camera=new THREE.PerspectiveCamera(45,this.width/this.height,1,10000)
            this.camera.position.x=0
            this.camera.position.y=0
            this.camera.position.z=400
            this.camera.up.x=0
            this.camera.up.y=1
            this.camera.up.z=0
            this.camera.lookAt(0,0,0)
        },
        initScene(){
            this.scene=new THREE.Scene()
        },
        initLight(){
            this.light=new THREE.AmbientLight(0xffffff)
            this.light.position.set(100,100,200)
            this.scene.add(this.light)
            this.light=new THREE.PointLight(0x00ff00)
            this.light.position.set(0,0,300)
            this.scene.add(this.light)
        },
        initObject(){
            let geometry=new THREE.CylinderGeometry(100,150,400)
            let material=new THREE.MeshLambertMaterial({color:0xffff00})
            let mesh=new THREE.Mesh(geometry,material)
            //mesh.position=new THREE.Vector3( 0, 1, 0 );
            this.scene.add(mesh)
        },
        animations(){
            //this.renderer.clear()
            this.camera.position.x=this.camera.position.x+1
            this.renderer.render(this.scene,this.camera)
            requestAnimationFrame(this.animations)
        },
        threeStart(){
            this.initThree()
            this.initCamera()
            this.initScene()
            this.initLight()
            this.initObject()
            this.animations()
        }
    },
    mounted() {
        this.threeStart()
    },
}
</script>