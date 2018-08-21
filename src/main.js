import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'



Vue.prototype.$pubsub = new Vue();

import AppContent from './common/AppContent.vue'
Vue.component('app-content', AppContent);

//日期过滤器
import {formatDate} from './filter/dateFilter'
Vue.filter('formatDate', formatDate);

//router,store是vue的属性,App是你自己定义的组件
new Vue({
    el: '#app',
    router,
    store,
    components: {
        App
    },
    render: h=>h(App)
})