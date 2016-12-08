<template lang="pug">
  topicsList(:topicsApi='listApi', :class="paddingTop")
</template>



<script>
import TopicsList from './topics-list.vue'

export default {
  data () {
    return {
      listApi: '',
      cate: this.$route.params.id,
      paddingTop: ''
    }
  },
  watch: {
    '$route': function(to, from){
      this.cate = this.$route.params.id;
      this.getApi();
    }
  },
  methods: {
    getApi: function(){
      var that = this;
      var path = that.$route.path;
      if(path == '/home' || path.indexOf("/cate/") > -1){
        that.paddingTop = "pdt30";
        var cate = that.cate || "all";
        that.listApi = 'api/v2/topics/'+cate;
      }else if(path.indexOf("/userTopics/") > -1){
        that.paddingTop = "";
        that.listApi = 'api/v2/getUserTopics/'+that.cate;
      }else if(path.indexOf("/userReplies/") > -1){
        that.paddingTop = "";
        that.listApi = 'api/v2/getUserReplies/'+that.cate;
      }
    }
  },
  created () {
    this.getApi();
  },
  mounted () {
    var that = this;
  },
  components: { TopicsList }
}
</script>




<style lang="sass" scoped>
.pdt30{
  padding-top: 30px;
}
</style>
