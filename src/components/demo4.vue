<template>
    <div id="demo4" class="demo"></div>
</template>
<script>
import * as THREE from "three"
import { Stats } from 'stats';
export default {
    data(){
        return {
            renderer:null,
            camera:null,
            scene:null,
            light:null,
            cube:null,
            mesh:null,
            width:0,
            height:0,
            state:null
        }
    },
    methods:{
        initThree(){
            let ele=document.getElementById('demo4')
            this.width=ele.clientWidth
            this.height=ele.clientHeight
            this.renderer=new THREE.WebGLRenderer({
                antialias:true
            })
            this.renderer.setSize(this.width,this.height)
            ele.appendChild(this.renderer.domElement)
            this.renderer.setClearColor(0xf5f5f5,1.0)
            this.state=new Stats()
            this.state.domElement.style.position='absolute'
            this.state.domElement.style.top='0px'
            this.state.domElement.style.left='0px'
            ele.appendChild(this.state.domElement)
        },
        initCamera(){
            this.camera=new THREE.PerspectiveCamera(45,this.width/this.height,1,10000)
            this.camera.position.set(0,0,500)
            this.camera.up.set(0,1,0)
            this.camera.lookAt(0,0,0)
        },
        initScene(){
            this.scene=new THREE.Scene()
        },
        initLight(){
            this.light=new THREE.AmbientLight(0xff0000)
            this.light.position.set(100,100,200)
            this.scene.add(this.light)
            this.light=new THREE.PointLight(0x00ff00)
            this.light.position.set(0,0,300)
            this.scene.add(this.light)
        },
        initObject(){
            let geometry=new THREE.CylinderGeometry(100,150,400)
            let material=new THREE.MeshLambertMaterial({color:0xfff000})
            this.mesh=new THREE.Mesh(geometry,material)
            this.mesh.position.set(0,0,0)
            this.scene.add(this.mesh)
        },
        animations(){
            this.mesh.position.x+=1
            this.renderer.render(this.scene,this.camera)
            this.state.update()
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
    mounted(){
        this.threeStart()
    }
}
</script>
