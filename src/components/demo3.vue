<template>
    <div id='demo3' class='demo'></div>
</template>
<script>
/**
该demo改变相机方向来达到让物体动起来的效果
注意：只改变摄像机并不会更改镜头方向
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
            heigh:0,
            r:800,
            angle:0
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
            this.camera.position.x=this.r
            this.camera.position.y=0
            this.camera.position.z=0
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
            let material=new THREE.MeshLambertMaterial({color:0x00f600})
            let pos=[[0,0,0],[-800,0,-800],[-800,1,800],[-1600,0,0]]
            for(var i=0;i<4;i++){
            let mesh=new THREE.Mesh(geometry,material)
            //mesh.position=new THREE.Vector3( 0, 1, 0 );
            mesh.position.x=pos[i][0]
            mesh.position.y=pos[i][1]
            mesh.position.z=pos[i][2]
            this.scene.add(mesh)
            }
            
        },
        animations(){
            //this.renderer.clear()
            this.angle++
            
            this.camera.position.x=this.r*Math.cos(this.angle*Math.PI/180)
            this.camera.position.z=this.r*Math.sin(this.angle*Math.PI/180)
            //每帧都重新设置lookAt可以达到摄像机围绕物体旋转
            //this.camera.lookAt(0,0,0)
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