<template lang="pug">
  #app
    router-view(name="header")
    router-view(name="main")
    router-view(name="footer")
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
    }
  }
}
</script>

<style lang="sass">
*{
  padding: 0;
  margin: 0;
}
body{
  padding: 0 0 60px;
}
.form{
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
}
.form-input,
.form-textarea{
  width: 100%;
  font-size: 14px;
  border: 0;
  border-bottom: 1px solid #eee;
  margin-bottom: 12px;
  padding: 5px 0;
  display: block;
  outline: none;
}
.form-textarea{
  border: 1px solid #eee;
  border-radius: 4px;
  min-height: 120px;
}
.form-btn{
  width: 100%;
  display: block;
  text-align: center;
  font-size: 16px;
  border: 1px solid #eee;
  padding: 12px 0;
  background: none;
  border-radius: 4px;
  margin-bottom: 12px;
  outline: none;
}
.form-btn-primary{
  background: #1AAD19;
  color: #fff;
}
.form-btn-default{
  background: #F8F8F8;
  color: #000;
}
.form-select{
  width: 100%;
  font-size: 14px;
  position: relative;
  margin-bottom: 12px;
  border: 0;
  border-bottom: 1px solid #eee;
  padding: 5px 0;
  outline: none;
}
.form-select-arrow{
  position: absolute;
  right: 0;
  top: 50%;
  margin-top: -13px;
  width: 16px;
  height: 16px;
  display: inline-block;
  text-align: right;
  transform: rotate(90deg);
  color: #666;
}

.fade-enter-active,
.fade-leave-active {
  width: 100%;
  position: fixed;
  transition: opacity .5s;
}
.fade-enter,
.fade-leave-active {
  width: 100%;
  position: fixed;
  opacity: 0;
}
</style>
