<template lang="pug">
  .tip
    .tip-inner {{msg}}
</template>

<script>
export default {
  data () {
    return {
      msg: '404!没炸到！'
    }
  }
}
</script>

<style scoped>
.tip{
  padding: 10px;
  font-size: 24px;
  color: blue;
  padding-top: 30px;
}
.tip-inner{
  background: #ccc;
}
</style>
