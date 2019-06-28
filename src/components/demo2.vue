<template>
    <div id='demo2' class='demo'></div>
</template>
<script>
/**
该demo绘制多条线组成棋盘
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
            width:null,
            height:null
        }
    },
    methods: {
        initThree(){
            this.width=document.getElementById('demo2').clientWidth
            this.height=document.getElementById('demo2').clientHeight
            this.renderer=new THREE.WebGLRenderer({
                antialias:true
            })
            this.renderer.setSize(this.width,this.height)
            document.getElementById('demo2').appendChild(this.renderer.domElement)
            this.renderer.setClearColor(0xf5f5f5,1.0)
        },
        initCamera(){
            this.camera=new THREE.PerspectiveCamera(45,this.width/this.height,1,10000)
            this.camera.position.x=0
            this.camera.position.y=1000
            this.camera.position.z=0
            this.camera.up.x=0
            this.camera.up.y=0
            this.camera.up.z=1
            this.camera.lookAt(0,0,0)
        },
        initScene(){
            this.scene=new THREE.Scene()
        },
        initLight(){
            //this.light=new THREE.DirectionalLight(0xff0000,1.0,0)
            //this.light.position.set(0,0,0)
            //this.scene.add(this.light)
        },
        initObject(){
            let width=300
            let geometry=new THREE.Geometry()
            geometry.vertices.push(new THREE.Vector3(-width,0,0))
            geometry.vertices.push(new THREE.Vector3(width,0,0))
            for(let i=0;i<=20;i++){
                let line=new THREE.Line(geometry,new THREE.LineBasicMaterial({color:0xff0000,opacity:0.2}))
                line.position.z=(i*width/10)-width
                this.scene.add(line)

                let line2=new THREE.Line(geometry,new THREE.LineBasicMaterial({color:0x00ff00,opacity:0.2}))
                line2.position.x=(i*width/10)-width
                line2.rotation.y=90*Math.PI/180
                this.scene.add(line2)
            }
        }

    },
    mounted() {
        this.initThree()
        this.initCamera()
        this.initScene()
        this.initLight()
        this.initObject()
        this.renderer.clear()
        this.renderer.render(this.scene,this.camera)

    },
}
</script>