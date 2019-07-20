<template>
  <div id="app">
      <router-view/>
  </div>
</template>
<script>

export default {
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