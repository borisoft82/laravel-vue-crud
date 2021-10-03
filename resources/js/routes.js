import PostsIndex from './components/posts/Index'
import PostsCreate from './components/posts/Create'

export default {
    mode: 'history',
    routes: [
        {
            path: '/',
            component: PostsIndex,
            name: 'posts.index'
        },
        {
            path: '/create',
            component: PostsCreate,
            name: 'posts.create'
        }
    
    ]
}