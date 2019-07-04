<template>
    <div id='demo9' class='demo'>
       
    </div>
</template>
<script>
/**
    该demo实现canvas做材质
 */
import * as THREE from 'three'


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
        initThree(){
            let ele=document.getElementById('demo9')
            this.width=ele.clientWidth
            this.height=ele.clientHeight
            this.renderer=new THREE.WebGLRenderer({antialias:true})
            this.renderer.setSize(this.width,this.height)
            ele.append(this.renderer.domElement)
            this.renderer.setClearColor(0xf8f8f8)
            //this.gui=new dat.GUI();
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
            let geometry=new THREE.Geometry()
            geometry.vertices.push(
                new THREE.Vector3(-100,0,0),
                new THREE.Vector3(100,0,0),
                new THREE.Vector3(0,100,0)
            )
            console.log(geometry)
            let face=new THREE.Face3(0,1,2)
            face.vertexColors.push(new THREE.Color( 0xff0000 ),new THREE.Color( 0x00ff00 ),
            new THREE.Color( 0x0000aa ))
            geometry.faces.push(face)
            let material=new THREE.MeshBasicMaterial({vertexColors:THREE.FaceColors})
            this.mesh=new THREE.Mesh(geometry,material)
            this.scene.add(this.mesh)

        },
        animates(){
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