<template lang="pug">
  .header
    .header-inner
      router-link(v-for="item in cates", :to="'/cate/'+item.id") {{item.name}}
</template>

<script>
import Config from "../../config" 

export default {
  data () {
    return {
      cates: Config.cates
    }
  }
}
</script>

<style scoped>
.header{
  width: 100%;
  height: 30px;
  white-space: nowrap;
  line-height: 30px;
  color: #fff;
  background: #333;
  border-bottom: 1px solid #e7e7e7;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9999;
  overflow-x: auto;
}
.header a{
  color: #fff;
  display: inline-block;
  font-size: 14px;
  font-weight: bold;
  padding: 0 10px;
  text-decoration: none;
}
.header .router-link-active{
  color: #fff;
  background-color: #666;
}

</style>
