<template lang="pug">
.msgs
  ul(v-if="msgs.length>0")
    li.item(v-for="item in msgs")
      a.inner(href="javascript:;", @click="bindRead(item._id,item.read)")
        img.avatar(:src="config.host+'/avatar/avatar-'+item.sender.name", :onerror="'this.src=\"'+config.host+'/avatar/'+item.sender.name.slice(0,1).toUpperCase()+'.gif\"'")
        span.title(v-if="item.type == 'comment'") 【{{item.sender.name}}】评论了您的话题
        span.title(v-if="item.type == 'reply'") 【{{item.sender.name}}】在评论话题时@了你
        span.title(v-if="item.type == 'sys'") 系统消息
        span.title(v-if="item.type == 'private'") 【{{item.sender.name}}】给您发了【私信】
        span.title(v-if="item.type == 'point'") {{item.content.reason}} 积分{{item.content.point}}
        span.readflag(v-if="item.read")  已读
        span.readflag.readflag-red(v-if="!item.read")  未读

      template(v-if="item.open")
        .content(v-if="item.type == 'comment'") 【{{item.sender.name}}】评论了您的话题【{{item.content.title}}】：{{item.content.comment}}
        .content(v-if="item.type == 'reply'") 【{{item.sender.name}}】在评论话题【{{item.content.title}}】时@了你：{{item.content.comment}}
        .content(v-if="item.type == 'sys'") {{item.content}}
        .content(v-if="item.type == 'private'") {{item.content}}
        .content(v-if="item.type == 'point'") {{item.content.reason}}：{{item.content.title}}

  tip(:show="mtip.show", :text="mtip.text")
  tip(:show="tip.show", :text="tip.text", :align="tip.align", :type="tip.type", :posi="tip.posi", v-on:flash="tipShowFalse")

</template>

<script>
import config from '../../config'
import Tip from './tip.vue'
export default {
  data () {
    return {
      config,
      msgs: [],
      page: {
        cur: 0
      },
      loaded: false,
      mtip: {
        show: false,
        text: ""
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
  watch: {
    '$route' (to, from) {
    }
  },
  methods: {
    checkLogin (){
      var that = this;
      that.$http.get('api/v2/checkLogin').then((res) => {
        if(res.body.success){
        }else{
          that.tip.show = true;
          that.tip.text = res.body.msg;
          that.$router.push('/user');
        }
      }, (err) => {
        console.log(err);
      });
    },
    loadmore: function(){
      var that = this;
      window.onscroll = function(){
        var docH = document.body.scrollHeight;
        var winH = document.documentElement.clientHeight;
        var srcollH = document.body.scrollTop;
        if(docH == winH + srcollH){
          if(that.loaded && that.page.cur < that.page.total){
            that.loaded = false;
            that.getMsgs();
          }else{
            that.mtip = {
              show: true,
              text: "全部已加载完"
            }
          }
        }

      }
    },
    getMsgs () {
      var that = this;
      var page = that.page.cur+1;
      this.$http.get("api/v2/getUserMsgs/?page="+page).then((res) => {
        if(res.body.success){
          that.msgs = that.msgs.concat(res.body.msgs);
          that.page = res.body.page;

          if(res.body.page.count){
            that.mtip.show = false;
          }else{
            that.mtip.show = true;
          }
          that.mtip.text = "您暂无消息";

          that.loaded = true;
        }else{
          that.tip.show = true;
          that.tip.text = res.body.msg;
        }

      }, (err) => {
        console.log(err);
      });
    },
    bindRead (mid,isRead){
      var that = this;

      that.msgs = that.msgs.map(function(item){
        if(item._id === mid){
          item.open = true;
          if(!isRead){
            that.$http.get('api/v2/setMsgRead/'+mid).then((res) => {
              if(res.body.success){
                item.read = true;
              }else{
                that.tip.show = true;
                that.tip.text = res.body.msg;
              }
            }, (err) => {
              console.log(err);
            });
          }
        }else{
          item.open = false;
        }
        return item;
      })
    },
    tipShowFalse (){
      this.tip.show = false;
    }
  },
  created () {
    this.getMsgs();
  },
  mounted () {
    this.checkLogin();
    this.loadmore();
  },
  components: { Tip }
}
</script>

<style lang="sass" scoped>
.msgs{
  padding: 0 10px 10px 10px;
  box-sizing: border-box;
  line-height: 0;

  a{
    text-decoration: none;
    color: #333;
  }

  .item{
    font-size: 12px;
    padding: 15px 0;
    border-bottom: 1px solid #eee;

    .inner{
      display: flex;
    }
  }
  .avatar{
    width: 30px;
    height: 30px;
    border-radius: 15px;
    margin-right: 5px;
  }
  .title{
    height: inherit;
    line-height: 30px;
    flex: 1;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    display: block;
  }
  .readflag{
    width: 38px;
    height: 16px;
    color: #999;
    background: #f5f5f5;
    border-radius: 10px;
    line-height: 16px;
    text-align: center;
    margin-left: 5px;
    margin-top: 7px;
  }
  .readflag-red{
    background-color: crimson;
    color: #fff;
  }
  .content{
    padding: 10px;
    background: #eee;
    border-radius: 4px;
    margin: 5px 0 0;
    line-height: 24px;
  }
}
</style>
