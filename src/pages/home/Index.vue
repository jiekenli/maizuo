<template>
<div>
<app-content>
    <swiper ref="banner">
        <swiper-item v-for="item in bannerList" :key="item.id">
            <img class="banner-img" :src="item.imageUrl"/>
        </swiper-item>
    </swiper>
    <ul class="now-playing">
        <li class="item" v-for="item in nowPlaying" :key="item.id"
            @click="goPlayingDetail(item)">
            <img :src="item.poster">
            <div class="item-content">
                <h4>{{item.name}}</h4>
                <p>{{item.cinemaCount}}家影院上映 {{item.watchCount}}人购票</p>
                <span>{{item.grade}}</span>
            </div>
        </li>
        <div class="tip-wrap">
            <p class="tip" @click="goFilmsPage('playing')">更多热映电影</p>
        </div>
    </ul>
    <ul class="coming-soon">
        <p class="title">即将上映</p>
        <li class="item" v-for="item in comingsoon" :key="item.id"
            @click="goComingDetail(item)">
            <img :src="item.poster">
            <div class="item-content">
                <h4>{{item.name}}</h4>
                <span>{{item.premiereAt | formatDate}}上映</span>
            </div>
        </li>
        <div class="tip-wrap">
            <p class="tip" @click="goFilmsPage('coming')">更多即将上映</p>
        </div>
    </ul>
</app-content>
<!-- 装子页面 -->
<router-view></router-view>
</div>
</template>

<script>
import { getHomeBannerData, getNowPlayingData, getComingSoonData } from '../../services/homeService.js'
import dataStore from '../../utils/dataStore.js'
import Swiper from '../../common/Swiper.vue'
import SwiperItem from '../../common/SwiperItem.vue'

export default {
    components: {
        Swiper,
        SwiperItem
    },
    data(){
        return {
            bannerList: [],
            nowPlaying: [],
            comingsoon: []
        }
    },
    methods: {
        //去更多电影列表页面
        goFilmsPage(flag){
            // this.$router.push({
            //     name: 'films',
            //     query: {
            //         flag
            //     }
            // });
            this.$router.push({
                name: 'films',
                params: {
                    flag
                }
            });
        },
        //去正在热映的电影详情页
        goPlayingDetail(item){
            //将下一个页面的值存放起来
            dataStore.setFilmInfo(item);
            //进入页面
            this.$router.push({
                name: 'home-detail',
                params: {
                    id: item.id,
                    buy: true
                }
            });
        },
        //去即将上映的电影详情页
        goComingDetail(item){
             //将下一个页面的值存放起来
            dataStore.setFilmInfo(item);
            //进入页面
            this.$router.push({
                name: 'home-detail',
                params: {
                    id: item.id,
                    buy: false
                }
            });
        }

    },
    mounted(){

        // 请求首页轮播图的数据
        getHomeBannerData().then((result)=>{
            // console.log('得到数据');
            this.bannerList = result;//只有多个需要轮播的数据
            this.$nextTick(()=>{
                // console.log('渲染完成');//才会有多个轮播页面的dom中
                //调用轮播视图执行更新
                this.$refs.banner.updateDOM();
            });
        });

        // console.log('开始请求');
        //请求正在热映的电影数据
        getNowPlayingData(1, 5).then(({result})=>{
            this.nowPlaying = result;
            // console.log('请求完成');
        })

        //请求即将上映的电影数据
        getComingSoonData(1, 3).then(({result})=>{
            this.comingsoon = result;
        })



    }
}


</script>

<style scoped>
.banner-img{
    width: 100%;
}
.now-playing, .coming-soon{
    padding: 20px 20px 0;
}
.coming-soon{
    padding-top: 40px;
}
.now-playing .item, .coming-soon .item{
    margin-bottom: 20px;
    background: #fff;
}
.now-playing img, .coming-soon img{
    width: 100%;
}
.now-playing .item-content, .coming-soon .item-content{
    position: relative;
    padding: 10px;
}
.now-playing .item-content h4, .coming-soon .item-content h4{
    font-size: 12px;
    font-weight: normal;
    color: #333;
}
.now-playing .item-content p{
    font-size: 12px;
    color: #9a9a9a;
}
.now-playing .item-content span, .coming-soon .item-content span{
    position: absolute;
    top: 0;
    right: 10px;
    line-height: 55px;
    color: #f78360;
    font-size: 18px;
    font-weight: bold;
}
.coming-soon .item-content span{
    line-height: 36px;
    font-size: 12px;
    font-weight: normal;
}
.coming-soon .tip, .now-playing .tip{
    width: 60%;
    height: 28px;
    border-radius: 14px;
    margin: 0 auto;
    border: 1px solid #aaa;
    color: #616161;
    text-align: center;
    line-height: 28px;
    font-size: 12px;
}
.now-playing .tip-wrap, .coming-soon .tip-wrap{
    padding-bottom: 40px;
}
.coming-soon{
    position: relative;
}
.coming-soon .title{
    position: absolute;
    top: 0;
    left: 0;
    font-size: 12px;
    color: #eee;
    background: #a7a7a7;
    padding: 4px;
    height: 12px;
    line-height: 12px;
    border-radius: 10px;
    margin-left: 50%;
    transform: translateX(-50%);
}
.coming-soon::before{
    content: '';
    display: block;
    width: 100%;
    height: 1px;
    background: #a7a7a7;
    position: absolute;
    left: 0;
    top: 10px;
}
</style>

