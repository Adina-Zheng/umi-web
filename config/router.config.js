export default [
    {
        path: '/',
        component: './index',
        routes: [
            { path: '/', redirect: '/home' },
            { path: '/home', component: './Home', exact: true },
            { path: '/users', component: './Users', exact: true },
            { path: '/users/detail', component: './UserDetail', exact: true }
        ]
    },
    { component: '404' },


    // component相对路径会从src/pages下找， 如果指向src目录，有两种方式 1.@/alyouts/basic  2.../layouts/basic
]