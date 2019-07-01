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
export default {
  data() {
    return {
      showid:8
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
  }
}
</script>
<style>
.demo{
  width:800px;
  height:800px;
  background:#eee;
}
</style>