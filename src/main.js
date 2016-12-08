import config from '../config'
import _assign from 'lodash/assign'

import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import App from './App.vue'
import NotFound from './components/404.vue'
import Header from './components/header.vue'
import Footer from './components/footer.vue'
import Topics from './components/topics.vue'
import Topic from './components/topic.vue'
import User from './components/user.vue'
import TopicEdit from './components/topic-edit.vue'
import UserMsgs from './components/user-msg.vue'

Vue.use(VueRouter)
Vue.use(VueResource)

Vue.http.options.root = config.devhost //测试环境，打包需改为host

var defaultComponents ={
  header: Header,
  main: Topics,
  footer: Footer
}

var routes = [
  {
    path: '/home',
    components: defaultComponents
  },
  {
    path: '/cate/:id',
    components: defaultComponents
  },
  {
    path: '/topic/:id',
    components: _assign({}, defaultComponents, {main: Topic})
  },
  {
    path: '/user',
    components: _assign({}, defaultComponents, {header: null, main: User})
  },
  {
    path: '/userTopics/:id',
    components: _assign({}, defaultComponents, {header: null})
  },
  {
    path: '/userReplies/:id',
    components: _assign({}, defaultComponents, {header: null})
  },
  {
    path: '/userMsgs',
    components: _assign({}, defaultComponents, {header: null, main: UserMsgs})
  },
  {
    path: '/create',
    components: _assign({}, defaultComponents, {header: null, main: TopicEdit})
  },
  {
    path: '*',
    components: _assign({}, defaultComponents, {main: NotFound})
  }
]

var router = new VueRouter({
  routes
})

var app = new Vue({
  router,
  render: function(h){
    return h(App)
  }
}).$mount('#app')