<template lang="pug">
  .footer
    ul.inner
      li.item
        router-link(to="/home")
          span.icon.icon-home
          span.text 首页
      li.item
        router-link(to="/create")
          span.icon.icon-edit
          span.text 话题
      li.item
        router-link(to="/user")
          span.icon.icon-user
          span.text 我的
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {

  },
  watch: {
    '$route' (to, from) {
    }
  },
  mounted () {
  }
}
</script>

<style lang="sass" scoped>
.footer{
  font-size: 12px;
  color: #666;
  background: #fff;
  text-align: center;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 99999;

  .inner{
    padding: 0;
    margin: 0;
    line-height: 16px;
    display: flex;
    list-style: none;

    .item{
      padding: 5px 0;
      flex: 1;

      a{
        display: block;

        .icon{
          width: 24px;
          height: 24px;
          background-size: contain;
          display: inline-block;
        }
        .icon-home{
          background-image: url("../assets/icon_tabBar_home.png")
        }
        .icon-edit{
          background-image: url("../assets/icon_tabBar_write.png")
        }
        .icon-user{
          background-image: url("../assets/icon_tabBar_user.png")
        }
        .text{
          display: block
        }

      }
      a.router-link-active{
        .icon-home{
          background-image: url("../assets/icon_tabBar_home_selected.png")
        }
        .icon-edit{
          background-image: url("../assets/icon_tabBar_write_selected.png")
        }
        .icon-user{
          background-image: url("../assets/icon_tabBar_user_selected.png")
        }
      }
    }
  }
  a{
    text-decoration: none;
    color: inherit;
  }
}

</style>
