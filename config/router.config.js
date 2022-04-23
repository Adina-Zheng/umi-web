export default [
    { path: '/', component: './Home', redirect: './home' },
    { exact: true, path: '/home', name: 'home', component: './Home', hideInMenu: false },
    { exact: true, path: '/users', name: 'users', component: './Users' },
    { exact: true, path: '/users/detail', name: 'detail', component: './UserDetail' },
]