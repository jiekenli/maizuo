import axios from 'axios'
import API from '../api'

//请求城市列表数据
export function getCityListData(){
    return new Promise((resolve, reject)=>{
        axios.get(API.CITY_LIST_URL, {
            params: {
                __t: new Date().getTime()
            }
        })
        .then(response=>{
            // console.log(response);
            // console.log(response.data.data.cities);
            //取得所有的城市数据
            let cities = response.data.data.cities;

            //准备装分好类的城市数据的对象
            let citiesInfo = {};

            //分类
            cities.map(item=>{
                let letter = item.pinyin[0];
                if(!citiesInfo[letter]){
                    citiesInfo[letter] = [];
                }
                citiesInfo[letter].push(item);
            })
            // console.log(citiesInfo);

            //将分类好的对象转数组
            var citiesArr = Object.keys(citiesInfo).map(key=>{
                return {
                    letter: key,
                    data: citiesInfo[key]
                }
            })
            // console.log(citiesArr);

            // 按字母序排序
            // var arr = [5, 1,2,4];

            //选择排序
            for(let i = 0; i < citiesArr.length; i++){
                //假的第一个最小
                let min = i;
                for(let j = i; j < citiesArr.length; j++){
                    //查找最小值
                    if( citiesArr[j].letter < citiesArr[min].letter ){
                        min = j;
                    }
                }
                //进行替换
                let tmp = citiesArr[i];
                citiesArr[i] = citiesArr[min];
                citiesArr[min] = tmp;
            }
            // console.log(citiesArr);

            resolve(citiesArr);
        })
        .catch(error=>{
            console.log('请求失败');
        })
    })
}

//请求首页轮播图的数据
export function getHomeBannerData(){
    //创建promise请求数据，数据处理成功之后，传递给resolve方法。
    // resolve的处理在外部的调用中。
    return new Promise((resolve, reject)=>{

        axios.get(API.HOME_BANNER_URL, {
            params: {
                __t: new Date().getTime()
            }
        })
        .then(response=>{
            // console.log('成功');
            // console.log(response);
            let data = response.data.data.billboards.map(item=>{
                return {
                    id: item.id,
                    imageUrl: item.imageUrl
                }
            })
            resolve(data);
        })
        .catch(error=>{
            console.log('失败');
            console.log(error);
        })
    })
}

//请求正在热映的电影数据
export function getNowPlayingData(page, count){
    // console.log(page, count);
    return new Promise((resolve, reject)=>{
        axios.get(API.NOW_PLAYING_URL, {
            params: {
                __t: new Date().getTime(),
                page,
                count
            }
        })
        .then(response=>{
            // console.log(response.data.data.films);
            let data = response.data.data.films.map(item=>{
                return {
                    name: item.name,
                    poster: item.cover.origin,
                    cinemaCount: item.cinemaCount,
                    watchCount: item.watchCount,
                    grade: item.grade,
                    id: item.id,
                    cover: item.poster.origin,
                    intro: item.intro
                }
            })
            resolve({
                //请求的数据
                result: data,
                //总共有几页数据
                total: response.data.data.page.total
            });
        })
        .catch(error=>{
            console.log(error);
        })
    })
}

//请求即将上映的电影数据
export function getComingSoonData(page, count){
    return new Promise((resolve, reject)=>{
        axios.get(API.COMING_SOON_URL, {
            params: {
                __t: new Date().getTime(),
                page,
                count
            }
        })
        .then(response=>{
            // console.log(response.data.data.films);
            let data = response.data.data.films.map(item=>{
                return {
                    name: item.name,
                    poster: item.cover.origin,
                    premiereAt: item.premiereAt,
                    id: item.id,
                    cover: item.poster.origin,
                    intro: item.intro
                }
            })
            resolve({
                result: data,
                total: response.data.data.page.total
            });
        })
        .catch(error=>{
            console.log(error);
        })
    })
}

//请求电影详情
export function getFilmDetailData(id){
    return new Promise((resolve, reject)=>{
        axios.get(`${API.FILM_DETAIL_URL}/${id}`, {
            params: {
                __t: new Date().getTime()
            }
        })
        .then(response=>{
            // console.log('请求电影详情成功');
            // console.log(response.data.data.film);
            let info = response.data.data.film;
            let filmInfo = {
                poster: info.cover.origin,
                director: info.director,
                actors: info.actors,
                nation: info.nation,
                language: info.language,
                category: info.category,
                premiereAt: info.premiereAt,
                synopsis: info.synopsis   
            };
            resolve(filmInfo);
        })
        .catch(error=>{
            console.log('请求电影详情失败');
            console.log(error);
        })
    })
}