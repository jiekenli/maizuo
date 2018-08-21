import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);

import City from '../pages/common/City.vue'
import Home from '../pages/home/Index.vue'
import Films from '../pages/films/Index.vue'
import Cinemas from '../pages/cinemas/Index.vue'
import Shops from '../pages/shops/Index.vue'
import Mine from '../pages/mine/Index.vue'
import Cards from '../pages/cards/Index.vue'
import FilmDetail from '../pages/common/FilmDetail.vue'

const routes = [
    {
        name: 'home',
        path: '/home',
        alias: '/',
        component: Home,
        children: [
            {
                name: 'home-detail',
                path: 'detail/:id/:buy',
                component: FilmDetail,
                props: true
            }
        ]
    },
    {
        name: 'films',
        path: '/films',
        alias: '/films/:flag',
        props: true,//将路径中的params的参数，作为组件Films的props属性
        component: Films,
        children: [
            {
                name: 'film-detail',
                path: 'detail/:id/:buy',
                component: FilmDetail,
                props: true
            }
        ]
    },
    {
        name: 'cinemas',
        path: '/cinemas',
        component: Cinemas
    },
    {
        name: 'shops',
        path: '/shops',
        component: Shops
    },
    {
        name: 'mine',
        path: '/mine',
        component: Mine
    },
    {
        name: 'cards',
        path: '/cards',
        component: Cards
    },
    {
        name: 'city',
        path: '/city',
        component: City
    },
    {
        path: '**',
        redirect: '/home'
    }

];

export default new Router({
    routes
})
