import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

import axios from 'axios'

const state = {
    cityname: null
}

const mutations = {
    modifyCity(state, value){
        state.cityname = value;
    }
}

const actions = {
    getLocation(context){
        //1.获得app使用的地址
        navigator.geolocation.getCurrentPosition(//定位
            (position)=>{//成功的回调
                console.log('成功');
                let longtitude = position.coords.longitude;
                let latitude = position.coords.latitude;

                //2.请求后台，将经纬度转城市
                axios.get('/api/getcityname', {
                    params: {
                        longtitude,
                        latitude
                    }
                }).then(response=>{
                    //3.得到城市位置，赋值给全局状态
                    let city = response.data.cityname;
                    context.commit('modifyCity', city);
                })
            },
            (error)=>{//失败的回调
                console.log('失败');
            }
        )



        //1.定位成功
        let longtitude = '114';
        let latitude = '22';
        //2.请求成功
        let city = '深圳';
        //3.赋值
        context.commit('modifyCity', city);
    },
    changeLocation(context, params){
        context.commit('modifyCity', params);
    }
}


// 创建管理全局数据的仓库
const store = new Vuex.Store({
    state,
    mutations,
    actions
});

//向外输出
export default store;