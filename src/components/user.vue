<template lang="pug">
.user
  .info(v-if="showInfo")
    .header
      img.avatar(:src="config.host+'/avatar/avatar-'+userInfo.name", :onerror="'this.src=\"'+config.host+'/avatar/'+userInfo.name.slice(0,1).toUpperCase()+'.gif\"'")
      .name {{userInfo.name}}
    .body
      router-link.box(:to="'/userTopics/'+userInfo._id")
        span.icon.icon-topic
        span.name 发布的话题
      router-link.box(:to="'/userReplies/'+userInfo._id")
        span.icon.icon-join
        span.name 参与的话题
      router-link.box(to="/userMsgs")
        span.icon.icon-msg
        span.name 站内信箱
        span.num {{userInfo.message}}
      a.box(href="javascript:;", @click="bindLogout")
        span.icon.icon-clear
        span.name 退出登陆

  .login(v-if="showLogin")
    tip(show="true", text="立即登陆", align="left")
    .form
      input.form-input(v-model="form.name", type="text", placeholder="请输入用户名")
      input.form-input(v-model="form.pwd", type="password", placeholder="请输入密码")
      button.form-btn.form-btn-primary(@click="bindTapLogin") 立即登陆
      button.form-btn.form-btn-default(@click="bindTapToReg") 注册新账号

  .reg(v-if="showReg")
    tip(show="true", text="注册新账号", align="left")
    .form
      input.form-input(type="text", v-model="form.name", placeholder="请输入用户名")
      input.form-input(type="password", v-model="form.pwd", placeholder="请输入密码")
      input.form-input(type="text", v-model="form.email", placeholder="请输入邮箱（用于找回密码）")
      button.form-btn.form-btn-primary(@click="bindTapReg") 注册账号
      button.form-btn.form-btn-default(@click="bindTapToLogin") 已经有账号？

  tip(:show="tip.show", :text="tip.text", :align="tip.align", :type="tip.type", :posi="tip.posi", v-on:flash="tipShowFalse")

</template>

<script>
import config from '../../config'
import Tip from './tip.vue'
export default {
  data () {
    return {
      config,
      showInfo: false,
      showLogin: false,
      showReg: false,
      userInfo: {},
      form: {
        name: '',
        pwd: '',
        email: '',
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
        if(res.body.success){
          that.showInfo = true;
          that.showLogin = false;
          that.userInfo = JSON.parse(localStorage.getItem("userInfo"));
        }else{
          that.showInfo = false;
          that.showLogin = true;
          localStorage.removeItem("userInfo")
        }
      }, (err) => {
        console.log(err);
      });
    },
    bindTapLogin (){
      var that = this;
      if(!that.form.name || !that.form.pwd){
        that.tip.show = true;
        that.tip.text = "用户名或密码不能为空！";
        return;
      }
      this.$http.post('api/v2/login', {name: that.form.name, pwd: that.form.pwd}).then((res) => {
        if(res.body.success){
          that.showInfo = true;
          that.showLogin = false;
          that.userInfo = res.body.userInfo;
          localStorage.setItem("userInfo", JSON.stringify(res.body.userInfo));
        }else{
          that.tip.show = true;
          that.tip.text = res.body.msg;
        }
      }, (err) => {
        console.log(err);
      });
    },
    bindTapToReg (){
      var that = this;
      that.showLogin = false;
      that.showReg = true;
    },
    bindTapReg (){
      var that = this;
      if(!that.form.name || !that.form.pwd || !that.form.email){
        that.tip.show = true;
        that.tip.text = "用户名、密码、邮箱不能为空！";
        return;
      }
      this.$http.post('api/v2/reg/', {name: that.form.name, pwd: that.form.pwd, email: that.form.email}).then((res) => {
        if(res.body.success){
          that.showReg = false;
          that.showLogin = true;
        }else{
          that.tip.show = true;
          that.tip.text = res.body.msg;
        }
      }, (err) => {
        console.log(err);
      });
    },
    bindTapToLogin (){
      var that = this;
      that.showLogin = true;
      that.showReg = false;
    },
    bindLogout (){
      var that = this;
      that.$http.get('api/v2/logout/').then((res) => {
        if(res.body.success){
          that.showInfo = false;
          that.showLogin = true;

          that.tip.show = true;
          that.tip.text = res.body.msg;
          localStorage.clear();
        }
      }, (err) => {
        console.log(err);
      });
      return;
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
.user{

  .info{
      background-color: #fff;
      padding: 0 10px;

    .header{
        background-color: #fff;
        height: 230px;
        text-align: center;
    }
    .avatar{
        width: 80px;
        height: 80px;
        border: 3px solid #fff;
        border-radius: 50%;
        margin-top: 50px;
    }
    .name{
        font-size: 18px;
        color: #333;
    }

    .body{
        font-size: 0;
    }
    .box{
        border-top: 1px solid #eee;
        box-sizing: border-box;
        height: 46px;
        line-height: 46px;
        overflow: hidden;
        position: relative;
        display: block;

      .icon{
          width: 20px;
          height: 20px;
          display: inline-block;
          vertical-align: middle;
          padding-left: 10px;
          background-size: contain;
      }
      .icon-topic{
        background-image: url('../assets/icon_my_topics.png');
      }
      .icon-join{
        background-image: url('../assets/icon_join_topic.png');
      }
      .icon-msg{
        background-image: url('../assets/icon_message.png');
      }
      .icon-clear{
        background-image: url('../assets/icon_transfer.png');
      }
      .name{
          font-size: 14px;
          color: #666;
          display: inline-block;
          vertical-align: middle;
          padding-left: 10px;
      }
      .num{
        position: absolute;
        right: 10px;
        top: 50%;
        height: 16px;
        color: #fff;
        background: #FF3C52;
        border-radius: 10px;
        line-height: 16px;
        text-align: center;
        font-size: 12px;
        margin-left: 5px;
        margin-top: -8px;
        display: inline-block;
        padding: 0 5px;
      }
    }
    .box:active{
        background-color: #eee;
    }

  }

}
</style>
