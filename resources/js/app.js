require('./bootstrap');

import Vue from 'vue';
import PostsIndex from './components/posts/Index'

//Vue.component('posts-index', require('./components/posts/Index.vue').default);

const app = new Vue({
    el: '#app',
    components: {
        PostsIndex
    }
});