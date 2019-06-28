<template>
  <div id="app">
      <Demo1 v-if='1==showid'/>
      <Demo2 v-if='2==showid' />
  </div>
</template>
<script>
import Demo1 from './components/demo1'
import Demo2 from './components/demo2'
export default {
  data() {
    return {
      showid:2
    }
  },
  components:{
    Demo1,
    Demo2
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