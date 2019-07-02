<template>
    <div id='demo8' class='demo'>
       
    </div>
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
            ctx:null,
            texture:null,
            mesh:null
        }
    },
    methods: {
        initCanvas(){
            this.ctx=document.createElement('canvas')
            this.ctx.width=100
            this.ctx.height=100
            this.canvas=this.ctx.getContext('2d')
            this.canvas.beginPath()
   
            var grd = this.canvas.createLinearGradient(0, 0, 0, this.ctx.height);
            grd.addColorStop(0,"#1e4877"); //起始颜色
            grd.addColorStop(1,"#4584b4"); //终点颜色
            this.canvas.fillStyle=grd;
            this.canvas.fillRect(0, 0, this.ctx.width, this.ctx.height);
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
            this.light=new THREE.AmbientLight(0xffffff)
            this.light.position.set(0,0,100)
            this.scene.add(this.light)
        },
        initObject(){
            let geometry=new THREE.CubeGeometry(150,150,150)


            this.texture=new THREE.Texture(this.ctx)
            
            let material=new THREE.MeshBasicMaterial({map:this.texture})
            this.mesh=new THREE.Mesh(geometry,material)
            this.texture.needsUpdate=true
            this.scene.add(this.mesh)

        },
        animates(){
             this.texture.needsUpdate = true;
        this.mesh.rotation.y -= 0.01;
        this.mesh.rotation.x -= 0.01;
            requestAnimationFrame(this.animates)
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