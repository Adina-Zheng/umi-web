export default [
    // component相对路径会从src/pages下找， 如果指向src目录，有两种方式 1.@/alyouts/basic  2.../layouts/basic
    { path: '/', redirect: '/home' },
    { path: '/home', component: './Home' },
    { path: '/users', component: './Users' },
    { path: '/users/detail', component: './Users/UserDetail' },
    {
        component: '404',
    },
]