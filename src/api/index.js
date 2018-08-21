/*
城市列表接口
参数：
    __t:时间戳
*/
const CITY_LIST_URL = '/v4/api/city';

/*
首页的轮播请求接口
参数：
    __t:时间戳
*/
const HOME_BANNER_URL = '/v4/api/billboard/home';

/*
正在上映的请求接口
参数：
    __t：时间戳
    page: 页数
    count：数量
*/
const NOW_PLAYING_URL = '/v4/api/film/now-playing';

/*
即将上映的请求接口
参数：
    __t：时间戳
    page: 页数
    count：数量
*/
const COMING_SOON_URL = '/v4/api/film/coming-soon';


/*
电影详情的请求接口
参数
    /:id： 电影id
    __t：时间戳


*/
const FILM_DETAIL_URL = '/v4/api/film';

/*
影院列表接口
参数：
    __t：时间戳
*/
const CINEMA_LIST_URL = '/v4/api/cinema';

export default {
    CITY_LIST_URL,
    HOME_BANNER_URL,
    NOW_PLAYING_URL,
    COMING_SOON_URL,
    FILM_DETAIL_URL,
    CINEMA_LIST_URL
}