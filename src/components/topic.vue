<template lang="pug">
  .topic
    .main
      h1.title {{topic.title}}
      .created {{author.name}} {{topic.created}}
      .content(v-html="topic.content")
</template>

<script>
import config from '../../config'
import func from '../../lib/func'

export default {
  data () {
    return {
      config,
      topicId: this.$route.params.id,
      topic: {},
      author: {}
    }
  },
  watch: {
    '$route' (to, from) {
      this.topicId = this.$route.params.id;
    }
  },
  methods: {
    getTopic: function(){
      var that = this;
      this.$http.get('api/v1/topic/'+that.topicId).then((res) => {

        that.topic = res.body.topic;
        that.author = res.body.author;

        that.topic.created = func.formatTime(new Date(that.topic.created));
      }, (err) => {
        console.log(err);
      });
    }
  },
  created () {
    this.getTopic();
  }
}
</script>


<style lang="sass" scoped>
.topic{
  padding: 40px 10px 10px;
  overflow-x: hidden;

  .title{
      font-size: 22px;
      font-weight: 500;
      margin-bottom: 10px;
      color: #333;
  }
  .created{
      font-size: 12px;
      margin-bottom: 20px;
      color: #999;
  }
  .content{
      font-size: 14px;
      color: #444;
      line-height: 26px;
  }
}
</style>
<style lang="sass">
.topic{
  .content{
    pre {
      width: 100%;
      background-color: #eee;
      box-sizing: border-box;
      padding: 10px;
      border-radius: 4px;
      overflow-x: auto;
    }
  }
}
</style>