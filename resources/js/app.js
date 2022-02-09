require('./bootstrap');

import Vue from 'vue'

import VueRouter from 'vue-router'
Vue.use(VueRouter);

import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css';
Vue.use(VueSweetalert2);

import routes from './routes'
import App from './components/App'

//Vue.component('posts-index', require('./components/posts/Index.vue').default);

const app = new Vue({
    el: '#app',
    components: {
        App
    },
    router: new VueRouter(routes)
});