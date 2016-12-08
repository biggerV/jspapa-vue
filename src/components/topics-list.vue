<template lang="pug">
  .topics
    router-link.item(v-for="item in topics", :to="'/topic/'+item._id")
      img.avatar(:src="config.host+'/avatar/avatar-'+item.user.name", :onerror="'this.src=\"'+config.host+'/avatar/'+item.user.name.slice(0,1).toUpperCase()+'.gif\"'")
      .title {{item.title}}
      .reply {{item.comments}}/{{item.views}}
    tip(:show="tip.show", :text="tip.text")
</template>



<script>
import config from '../../config'
import Tip from './tip.vue'

export default {
  data () {
    return {
      config,
      topics: [],
      page: {
        cur: 0
      },
      tip: {
        show: false,
        text: ""
      },
      loaded: false
      
    }
  },
  props: {
    topicsApi: {
      type: String,
      required: true
    }
  },
  watch: {
    '$route' (to, from) {
      this.page.cur = 0;
      this.topics = [];
      this.loaded = false;
      this.getTopics();
    }
  },
  methods: {
    loadmore: function(){
      var that = this;
      window.onscroll = function(){
        var docH = document.body.scrollHeight;
        var winH = document.documentElement.clientHeight;
        var srcollH = document.body.scrollTop;
        if(docH == winH + srcollH){
          if(that.loaded && that.page.cur < that.page.total){
            that.loaded = false;
            that.getTopics();
          }else{
            that.tip = {
              show: true,
              text: "全部已加载完"
            }
          }
        }

      }
    },
    getTopics: function(){
      var that = this;
      var page = that.page.cur+1;
      this.$http.get(that.topicsApi+"?page="+page).then((res) => {
        that.topics = that.topics.concat(res.body.topics);
        that.page = res.body.page;

        if(res.body.page.count){
          that.tip.show = false;
        }else{
          that.tip.show = true;
        }
        that.tip.text = "此板块暂无话题";

        that.loaded = true;

      }, (err) => {
        console.log(err);
      });
    }
  },
  created () {
    this.getTopics();
  },
  mounted () {
    var that = this;
    that.loadmore();
  },
  components: { Tip }
}
</script>




<style lang="sass" scoped>
.topics{
  box-sizing: border-box;

  .item{
    font-size: 12px;
    display: flex;
    padding: 15px 10px;
    border-bottom: 1px solid #eee;
    color: #333;
    text-decoration: none;

    :active{
      background-color: #eee;
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
    }
    .reply{
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

  }
  .tip{
    padding: 10px 0;
    text-align: center;
    font-size: 14px;
    color: #666;
  }

}
</style>
