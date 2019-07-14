<template>
    <div id='demo10' class='demo'></div>
</template>

<script>
import * as THREE from 'three'
import {MTLLoader, OBJLoader} from 'three-obj-mtl-loader'
import * as OrbitControls from 'three-orbitcontrols'
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
            this.camera.position.set(0,0,-50)
            this.camera.up.set(0,1,0)
            this.camera.lookAt(0,5,0)
        },
        initScene(){
            this.scene=new THREE.Scene()
        },
        initLight(){
            this.light=new THREE.PointLight()
            this.light.position.set(0,10,-20)
            this.scene.add(this.light)
            this.light=new THREE.PointLight()
            this.light.position.set(0,10,20)
            this.scene.add(this.light)
        },
        initObject(){
            let loader=new OBJLoader()
            let mtlloader=new MTLLoader()
            
            mtlloader.setBaseUrl( "Miku/" );
            mtlloader.setPath( "Miku/" );
            mtlloader.load('mikuMTL.mtl',mtl =>{
                mtl.preload()
                loader.setMaterials(mtl)
                loader.load('Miku/mikumode.obj',event => {
                    event.position.set(0,-5,0)
                    this.scene.add(event)
                })
            })
            
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
        this.initControls()
        this.animates()
    },
}
</script>