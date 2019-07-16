<template>
  <div id="app">
      <Demo1 v-if='1==showid'/>
      <Demo2 v-if='2==showid' />
      <Demo3 v-if='3==showid' />
      <Demo4 v-if='4==showid' />
      <Demo5 v-if='5==showid' />
      <Demo6 v-if='6==showid' />
      <Demo7 v-if='7==showid' />
      <Demo8 v-if='8==showid' />
      <Demo9 v-if='9==showid' />
      <Demo10 v-if='10==showid' />
      <Demo11 v-if='11==showid' />
      <Demo12 v-if='12==showid' />
      <Demo13 v-if='13==showid' />
      <Demo14 v-if='14==showid' />
  </div>
</template>
<script>
import Demo1 from './components/demo1'
import Demo2 from './components/demo2'
import Demo3 from './components/demo3'
import Demo4 from './components/demo4'
import Demo5 from './components/demo5'
import Demo6 from './components/demo6'
import Demo7 from './components/demo7'
import Demo8 from './components/demo8'
import Demo9 from './components/demo9'
import Demo10 from './components2/demo10'
import Demo11 from './components2/demo11'
import Demo12 from './components2/demo12'
import Demo13 from './components2/demo13'
import Demo14 from './components2/demo14'
export default {
  data() {
    return {
      showid:14
    }
  },
  components:{
    Demo1,
    Demo2,
    Demo3,
    Demo4,
    Demo5,
    Demo6,
    Demo7,
    Demo8,
    Demo9,
    Demo10,
    Demo11,
    Demo12,
    Demo13,
    Demo14,
  }
}
</script>
<style>
body{margin:0;padding:0;height:100vh;}
#app{height:100%;}
.demo{
  width:800px;
  height:800px;
  background:#eee;
}
.fulldemo{
   width:100%;
  height:100%;
  background:#eee;
}
</style>