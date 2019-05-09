export default {
    singular: true,
    routes: [{
        path: '/',
        component: '../layout',
        routes: [
            { path: 'puzzlecards', component: './puzzlecards' },
            {
                path: '/helloworld',
                component: './HelloWorld'
            },
            {
                path: '/dashboard',
                routes: [
                    {
                        path: '/dashboard/analysis',
                        component: 'Dashboard/Analysis'
                    },
                    {
                        path: '/dashboard/minitor',
                        component: 'Dashboard/Monitor'
                    },
                    {
                        path: '/dashboard/workplace',
                        component: 'Dashboard/Workplace'
                    }
                ]
            },
            {
                path: '/list',
                component: './list'
            }

        ]
    },

    ],
    plugins: [
        ['umi-plugin-react', {
            antd: true,
            dva: true
        }],
    ],
    proxy: {
        '/dev': {
            target: 'https://08ad1pao69.execute-api.us-east-1.amazonaws.com',
            changeOrigin: true,
        }
    }
}