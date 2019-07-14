<template>
    <div id='demo12' class='fulldemo'></div>
</template>

<script>
import * as THREE from 'three'
import * as OrbitControls from 'three-orbitcontrols'
let INTERSECTED
export default {
    data() {
        return {
            renderer:null,
            camera:null,
            light:null,
            scene:null,
            width:0,
            height:0,
            raycaster:null,
            mouse:null,
            radius:100,
            theta:0,
            
        }
    },
    methods: {
        initThree(){
            let ele=document.getElementById('demo12')
            this.width=ele.clientWidth
            this.height=ele.clientHeight
            this.renderer=new THREE.WebGLRenderer({
                antialias:true
            })
            this.renderer.setSize(this.width,this.height)
            ele.appendChild(this.renderer.domElement)
            this.renderer.setClearColor(0xf7f7f7)
            document.addEventListener('mousemove',this.onDocumentMouseMove,false)
        },
        initCamera(){
            this.camera=new THREE.PerspectiveCamera(70,this.width/this.height,1,10000)
            this.camera.position.set(0,0,-50)
            this.camera.up.set(0,1,0)
            this.camera.lookAt(0,5,0)
        },
        initScene(){
            this.scene=new THREE.Scene()
        },
        initRaycaster(){
            this.raycaster=new THREE.Raycaster()
            this.mouse=new THREE.Vector2()

        },
        onDocumentMouseMove(event){
            event.preventDefault()
            this.mouse.x=(event.clientX/window.innerWidth)*2-1
            this.mouse.y=-(event.clientY/window.innerHeight)*2+1
        },
        initLight(){
            this.light=new THREE.DirectionalLight( 0xffffff, 1)
            this.light.position.set(1,1,1)
            this.scene.add(this.light)
        },
        initObject(){
            let geometry=new THREE.BoxGeometry(20,20,20)
            for(let i=0;i<2000;i++){
                var obj=new THREE.Mesh(geometry,new THREE.MeshLambertMaterial({color:Math.random()*0xffffff}))
                obj.position.set(Math.random()*800-400,Math.random()*800-400,Math.random()*800-400)
                obj.scale.set(Math.random()+0.5,Math.random()+0.5,Math.random()+0.5)
                obj.rotation.set(Math.random()*2+Math.PI,Math.random()*2+Math.PI,Math.random()*2+Math.PI)
                this.scene.add(obj)
            }
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
            this.theta+=0.1
            this.camera.position.set(
                this.radius*Math.sin(THREE.Math.degToRad(this.theta)),
                this.radius*Math.sin(THREE.Math.degToRad(this.theta)),
                this.radius*Math.sin(THREE.Math.degToRad(this.theta))
            )
            this.camera.updateMatrixWorld()

            this.raycaster.setFromCamera(this.mouse,this.camera)
            var intersects=this.raycaster.intersectObjects(this.scene.children)
            if(intersects.length>0){
                if(INTERSECTED!=intersects[0].object){
                    if(INTERSECTED){
                        INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex)
                    }
                    INTERSECTED=intersects[0].object
                    INTERSECTED.currentHex=INTERSECTED.material.emissive.getHex()
                    INTERSECTED.material.emissive.setHex(0xff0000)
                }
            }else{
                if(INTERSECTED){
                    INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex)
                }
                INTERSECTED=null
                
            }
            this.renderer.render(this.scene,this.camera)
            requestAnimationFrame(this.animates)
        }
    },
    mounted() {
        this.initThree()
        this.initCamera()
        this.initScene()
        this.initRaycaster()
        this.initLight()
        this.initObject()
        //this.initControls()
        this.animates()
    },
}
</script>