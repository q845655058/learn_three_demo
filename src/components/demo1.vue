<template>
    <div id='mycanvas' class='demo'></div>
</template>
<script>
import * as THREE from 'three'
export default {
  data(){
    return {
      renderer:null,
      camera:null,
      scene:null,
      light:null,
      cube:null,
      width:0,
      height:0
    }
  },
    methods:{
      initThree(){
        this.width = document.getElementById('mycanvas').clientWidth
        this.height = document.getElementById('mycanvas').clientHeight
        this.renderer=new THREE.WebGLRenderer({
          antialias:true
        })
        this.renderer.setSize(this.width,this.height)
        document.getElementById('mycanvas').appendChild(this.renderer.domElement)
        this.renderer.setClearColor(0xf8f8f8,1.0)
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
        this.light=new THREE.DirectionalLight(0xff0000,1.0,0)
        this.light.position.set(100,100,200)
        this.scene.add(this.light)
      },
      initObject(){
        let geometry=new THREE.Geometry()
        let material = new THREE.LineBasicMaterial({vertexColors:true})
        let color1=new THREE.Color(0x444444)
        let color2=new THREE.Color(0xff0000)

        let p1=new THREE.Vector3(100,0,-100)
        let p2=new THREE.Vector3(-100,0,100)

        geometry.vertices.push(p1)
        geometry.vertices.push(p2)
        geometry.colors.push(color1,color2)
        let line= new THREE.Line(geometry,material)
        this.scene.add(line)
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
