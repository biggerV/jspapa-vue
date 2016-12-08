<template lang="pug">
transition(name="fade")
  .tip(v-if="show", :class="outerClass")
    .inner(:class="innerClass") {{text}}
</template>

<script>
export default {
  data () {
    return {
      dshow: this.show,
      dtext: this.text,
      dalign: this.align,
      dtype: this.type,
      dposi: this.posi
    }
  },
  props: {
    'show': {
      default: false
    },
    'text': {
      default: ''
    },
    'align': {
      default: 'center'
    },
    'type': {
      default: ''
    },
    'posi': {
      default: ''
    }
  },
  computed: {
    outerClass: function(){
      return this.dposi;
    },
    innerClass: function(){
      return this.dalign+' '+this.dtype;
    }
  },
  watch: {
    show: function(newVal, oldVal){
      this.flash();
    }
  },
  methods: {
    flash: function(){
      var that = this;
      var timer = setTimeout(function(){
        that.dshow = false;
        that.$emit("flash");
      }, 3000);
    }
  }
}

</script>

<style lang="sass" scoped>
.tip{
  width: 100%;
  font-size: 14px;
  color: #666;
  box-sizing: border-box;
  background-color: #f1f1f1;

  .inner{
    padding: 10px 0;
    line-height: 24px;
  }

  .center{
    text-align: center;
  }

  .left{
    text-align: left;
    padding-left: 10px;
    padding-right: 10px;
  }

  .right{
    text-align: right;
  }

  .alert{
    background: #D72529;
    color: #fff;
  }
}
.fixed{
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999999;
}
</style>
