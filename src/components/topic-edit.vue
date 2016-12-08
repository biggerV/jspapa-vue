<template lang="pug">
.topic
  .inner
    tip(show="true", text="编辑话题", align="left")
    .form
      select.form-select(v-model="form.cate")
        option(value="") 请选择板块
        option(v-for="item in config.cates", :value="item.id") {{item.name}}
      input.form-input(v-model="form.title", type="text", placeholder="请输入标题")
      textarea.form-textarea(v-model="form.content", placeholder="请输入话题内容")
      button.form-btn.form-btn-primary(@click="bindTapPush") 确 定

  tip(:show="tip.show", :text="tip.text", :align="tip.align", :type="tip.type", :posi="tip.posi", v-on:flash="tipShowFalse")

</template>

<script>
import Config from '../../config'
import Tip from './tip.vue'

export default {
  data () {
    return {
      config: Config,
      form: {
        cate: '',
        title: '',
        content: '',
      },
      tip: {
        show: false,
        text: "",
        align: "center",
        type: "alert",
        posi: "fixed"
      }
    }
  },
  methods: {
    checkLogin (){
      var that = this;
      this.$http.get('api/v2/checkLogin').then((res) => {
        if(!res.body.success){
          that.tip.show = true;
          that.tip.text = res.body.msg;
        }
      }, (err) => {
        console.log(err);
      });
    },
    bindTapPush (){
      var that = this;
      if(!that.form.cate || !that.form.title || !that.form.content){
        that.tip.show = true;
        that.tip.text = "板块、标题、内容不能为空！";
        return;
      }
      this.$http.post('api/v2/createTopic', that.form).then((res) => {
        if(res.body.success){
          that.$router.push('/topic/'+res.body.id);
        }else{
          that.tip.show = true;
          that.tip.text = that.body.msg;
        }
      }, (err) => {
        console.log(err);
      });
    },
    tipShowFalse (){
      this.tip.show = false;
    }
  },
  watch: {
    '$route' (to, from) {
    }
  },
  mounted () {
    this.checkLogin();
  },
  components: { Tip }
}
</script>

<style lang="sass" scoped>
.topic{

  .inner{
      background-color: #fff;
  }

}
</style>
