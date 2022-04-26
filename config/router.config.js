export default [
    // component相对路径会从src/pages下找， 如果指向src目录，有两种方式 1.@/alyouts/basic  2.../layouts/basic
    {
        path: '/', component: './index', routes: [
            { path: '/', redirect: './home' },
            { exact: true, path: '/home', component: './Home' },
            {
                exact: true, path: '/users', component: './Users', routes: [
                    { exact: true, path: '/users/detail', component: './UserDetail' }
                ]
            }
        ],
    },
]