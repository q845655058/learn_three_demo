<template>
    <div id='demo6' class='demo'></div>
</template>
<script>
/**
    该demo初识材质
 */
import * as THREE from 'three'
import * as dat from 'dat.gui'

const materialPath='http://pic1.sc.chinaz.com/files/pic/pic9/201906/zzpic18767.jpg'
export default {
    data() {
        return {
            renderer:null,
            scene:null,
            camera:null,
            light:null,
            width:null,
            height:null,
            gui:null
        }
    },
    methods: {
        initThree(){
            let ele=document.getElementById('demo6')
            this.width=ele.clientWidth
            this.height=ele.clientHeight
            this.renderer=new THREE.WebGLRenderer({antialias:true})
            this.renderer.setSize(this.width,this.height)
            ele.append(this.renderer.domElement)
            this.renderer.setClearColor(0xf8f8f8)
            this.gui=new dat.GUI();
        },
        initCamera(){
            this.camera=new THREE.PerspectiveCamera(45,this.width/this.height,1,10000)
            this.camera.position.set(0,0,800)
            this.camera.up.set(0,1,0)
            this.camera.lookAt(0,0,0)
        },
        initScene(){
            this.scene=new THREE.Scene()
        },
        initLight(){
            this.light=new THREE.AmbientLight(0xff0000)
            this.light.position.set(0,0,100)
            this.scene.add(this.light)
        },
        initObject(){
            let geometry=new THREE.PlaneGeometry(100,200,1,1)
            geometry.vertices[0].uv=new THREE.Vector2(0,0)
            geometry.vertices[1].uv=new THREE.Vector2(1,0)
            geometry.vertices[2].uv=new THREE.Vector2(1,1)
            geometry.vertices[3].uv=new THREE.Vector2(0,1)

            // let textrue=new THREE.ImageUtils.loadTexture(materialPath,null,function(d){
            // })
            let textrue=new THREE.TextureLoader().load(materialPath)
            let material=new THREE.MeshBasicMaterial({map:textrue})
            let mesh=new THREE.Mesh(geometry,material)
            this.scene.add(mesh)

        },
        animates(){
            requestAnimationFrame(this.animates)
            this.renderer.render(this.scene,this.camera)
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