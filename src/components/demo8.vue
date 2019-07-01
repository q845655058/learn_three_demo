<template>
    <div id='demo8' class='demo'></div>
</template>
<script>
/**
    该demo实现canvas做材质
 */
import * as THREE from 'three'
import * as dat from 'dat.gui'

const materialPath='sucai.jpg'
export default {
    data() {
        return {
            renderer:null,
            scene:null,
            camera:null,
            light:null,
            width:null,
            height:null,
            gui:null,
            canvas:null,
            ctx:null
        }
    },
    methods: {
        initCanvas(){
            this.ctx=document.createElement('canvas')
            this.canvas=this.ctx.getContext('2d')
            this.canvas.beginPath()
            this.canvas.lineWidth=10
            this.canvas.strokeStyle="#000"
            var grd = this.canvas.createLinearGradient(0,0,100,0);//从左到右
            grd.addColorStop(0,"#ff0"); //起始颜色
            grd.addColorStop(1,"#00ff00"); //终点颜色
            this.canvas.fillStyle=grd;
            this.canvas.arc(100,100,50,0.75*Math.PI,2.25*Math.PI,false);
            this.canvas.stroke()
        },
        initThree(){
            let ele=document.getElementById('demo8')
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
            let geometry=new THREE.PlaneGeometry(500,500)
            geometry.vertices[0].uv=new THREE.Vector2(0,0)
            geometry.vertices[1].uv=new THREE.Vector2(1,0)
            geometry.vertices[2].uv=new THREE.Vector2(1,1)
            geometry.vertices[3].uv=new THREE.Vector2(0,1)

            let textrue=new THREE.Texture(this.ctx)
            textrue.needsUpdate=true
            let material=new THREE.MeshBasicMaterial({map:textrue})
            let mesh=new THREE.Mesh(geometry,material)
            this.scene.add(mesh)

        },
        animates(){
            //requestAnimationFrame(this.animates)
            this.renderer.render(this.scene,this.camera)
        }   
    },
    mounted() {
        this.initCanvas()
        this.initThree()
        this.initCamera()
        this.initScene()
        this.initLight()
        this.initObject()
        this.animates()
      
    },
}
</script>