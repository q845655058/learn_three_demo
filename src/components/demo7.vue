<template>
    <div id="demo7" class="demo"></div>
</template>
<script>
import * as THREE from 'three'
import * as Stats from 'stats.js'
import * as OrbitControls from 'three-orbitcontrols'
import dat from 'dat.gui'
export default {
    data(){
        return {
            renderer:null,
            camera:null,
            light:null,
            scene:null,
            width:0,
            height:0,
            gui:null,
            controls:null,
            stats:null,
            cubeCamera:null,
            material:null,
            texture:null
        }
    },
    methods:{
        initThree(){
            let ele=document.getElementById('demo7')
            this.width=ele.clientWidth
            this.height=ele.clientHeight
            this.renderer=new THREE.WebGLRenderer({antialias:true})
            this.renderer.setSize(this.width,this.height)
            this.renderer.setClearColor(0xf5f5f5)
            this.renderer.shadowMap.enabled=true
            ele.appendChild(this.renderer.domElement)
            this.stats=new Stats()
            ele.appendChild(this.stats.dom)
        },
        initCamera(){
            this.camera=new THREE.PerspectiveCamera(45,this.width/this.height,0.1,1000)
            this.camera.position.set(0,0,15)
            this.cubeCamera=new THREE.CubeCamera(0.1,1000,256)
            this.scene.add(this.cubeCamera)
        },
        initScene(){
            let cubeTextureLoader=new THREE.CubeTextureLoader()
            cubeTextureLoader.setPath('demo7/')
            console.log(1)
            cubeTextureLoader.load([
                'left.jpg','right.jpg',
                'top.jpg','bottom.jpg',
                'front.jpg','back.jpg'
            ],(d)=>{
               this.scene.background=d
            })
            console.log(cubeTextureLoader)
            this.scene=new THREE.Scene()
            this.scene.background=cubeTextureLoader
        },
        initLight(){
            this.scene.add(new THREE.AmbientLight(0x444444))
            this.light=new THREE.DirectionalLight(0xffffff)
            this.light.position.set(0,20,20)
            this.light.castShadow=true
            this.light.shadow.camera.top=10
            this.light.shadow.camera.left=-10
            this.light.shadow.camera.right=10
            this.light.shadow.camera.bottom=-10
            this.light.castShadow = true;

            this.scene.add(this.light)
        },
        initGUI(){
            this.gui={
                offsetX:0,
                offsetY:0,
                repeatX:1,
                repeatY:1,
                rotation:0,
                centerX:0.5,
                centerY:0.5,
                repeatWarpping:true
            }
            let datGUI=new dat.GUI()
            datGUI.add(this.gui,'offsetX',0.0,1.0).onChange(this.updateUV)
            datGUI.add(this.gui,'offsetY',0.0,1.0).onChange(this.updateUV)
            datGUI.add(this.gui,'repeatX',0.25,2).onChange(this.updateUV)
            datGUI.add(this.gui,'repeatY',0.25,2).onChange(this.updateUV)
            datGUI.add(this.gui,'rotation',-2.0,2.0).onChange(this.updateUV)
            datGUI.add(this.gui,'centerX',0.0,1.0).onChange(this.updateUV)
            datGUI.add(this.gui,'centerY',0.0,1.0).onChange(this.updateUV)
            datGUI.add(this.gui,'repeatWarpping').onChange(function(e){
                if(e){
                    this.material.map.wrapS=this.material.map.wrapT=THREE.RepeatWrapping
                }else{
                    this.material.map.wrapS=this.material.map.wrapT=THREE.ClampToEdgeWrapping
                }
                this.material.map.needsUpdate=true
            })
        },
        initModel(){
            let helper=new THREE.AxesHelper(50)
            this.scene.add(helper)
            let geometry=new THREE.BoxGeometry(5,5,5)
            let loader=new THREE.TextureLoader()
            this.texture=loader.load('demo7/UV_Grid_Sm.jpg',this.render)
            this.texture.wrapS=this.texture.wrapT=THREE.RepeatWrapping
            this.texture.matrixAutoUpdate=false
            this.material=new THREE.MeshBasicMaterial({map:this.texture})
            this.scene.add(new THREE.Mesh(geometry,this.material))
        },
        updateUV(){
            this.material.map.matrix
            .identity()
            .translate(-this.gui.centerX,-this.gui.centerY)
            .rotate(this.gui.rotation)
            .scale(this.gui.repeatX,this.gui.repeatY)
            .translate(this.gui.centerX,this.gui.centerY)
            .translate(this.gui.offsetX,this.gui.offsetY)
        },
        render(){},
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
            this.stats.update()
            this.controls.update()
            this.renderer.render(this.scene,this.camera)
            requestAnimationFrame(this.animates)
        
        },
        draw(){
            this.initThree()
            this.initScene()
            this.initCamera()
            this.initLight()
            this.initModel()
            this.initGUI()
            this.initControls()
            this.animates()
        }
    },
    mounted(){
        this.draw()
    }
}
</script>

