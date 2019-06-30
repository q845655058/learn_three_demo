<template>
    <div id="demo5" class="demo"></div>
</template>
<script>
import * as THREE from "three"
import Stats from 'stats.js'
import * as dat from 'dat.gui'
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
            state:null,
            r:800,
            angle:0,
            controls:null
        }
    },
    methods:{
        initThree(){
            let ele=document.getElementById('demo5')
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
            this.camera.position.set(this.r,0,0)
            this.camera.up.set(0,1,0)
            this.camera.lookAt(0,0,0)
        },
        initScene(){
            this.scene=new THREE.Scene()
        },
        initLight(){
            this.light=new THREE.AmbientLight(0xff0000)
            this.light.position.set(0,0,0)
            this.scene.add(this.light)
            this.light=new THREE.PointLight(0x00ff00)
            this.light.position.set(-300,1000,600)
            this.scene.add(this.light)
        },
        initObject(){
            let geometry=new THREE.CylinderGeometry(100,150,400)
            let material=new THREE.MeshLambertMaterial({color:0x00ff00})
            let pos=[[0,0,0],[-800,0,-800],[-800,1,800],[-1600,0,0]]
            for(var i=0;i<4;i++){
            this.mesh=new THREE.Mesh(geometry,material)
            //mesh.position=new THREE.Vector3( 0, 1, 0 );
            this.mesh.position.x=pos[i][0]
            this.mesh.position.y=pos[i][1]
            this.mesh.position.z=pos[i][2]
            this.scene.add(this.mesh)
            }
            this.controls=new dat.GUI()
        },
        animations(){
            //this.renderer.clear()
            this.angle++
            
            this.camera.position.x=this.r*Math.cos(this.angle*Math.PI/180)
            this.camera.position.z=this.r*Math.sin(this.angle*Math.PI/180)
            //每帧都重新设置lookAt可以达到摄像机围绕物体旋转
            //this.camera.lookAt(0,0,0)
           
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
