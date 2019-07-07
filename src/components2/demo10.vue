<template>
    <div id='demo10' class='demo'></div>
</template>

<script>
import * as THREE from 'three'
import OBJLoader from 'three-obj-loader'
OBJLoader(THREE)
export default {
    data() {
        return {
            renderer:null,
            camera:null,
            light:null,
            scene:null,
            width:0,
            height:0
        }
    },
    methods: {
        initThree(){
            let ele=document.getElementById('demo10')
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
            this.camera=new THREE.PerspectiveCamera(45,this.width/this.height,1,10000)
            this.camera.position.set(0,0,50)
            this.camera.up.set(0,1,0)
            this.camera.lookAt(0,5,0)
        },
        initScene(){
            this.scene=new THREE.Scene()
        },
        initLight(){
            this.light=new THREE.AmbientLight(0xff00ff)
            this.light.position.set(0,0,50)
            this.scene.add(this.light)
        },
        initObject(){
            let loader=new THREE.OBJLoader()
            let material=new THREE.MeshLambertMaterial({color:0xaaaaaa})
            loader.load('Miku/mikumode.obj',event => {
                console.log(event)
                this.scene.add(event)
                
            },null,null,null,false)
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
        this.initLight()
        this.initObject()
        this.animates()
    },
}
</script>