<template>
  <div id="app">
      <Demo1 v-if='1==showid'/>
      <Demo2 v-if='2==showid' />
      <Demo3 v-if='3==showid' />
  </div>
</template>
<script>
import Demo1 from './components/demo1'
import Demo2 from './components/demo2'
import Demo3 from './components/demo3'
export default {
  data() {
    return {
      showid:3
    }
  },
  components:{
    Demo1,
    Demo2,
    Demo3
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