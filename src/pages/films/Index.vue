<template>
<app-content id="films" :reciveScroll="true" @onScroll="contentScroll" ref="content">
    <nav class="nav">
        <li class="nav-item" :class="{active: showFlag=='playing'}" @click="navAction('playing')">
            <span>正在热映</span>
        </li>
        <li class="nav-item" :class="{active: showFlag=='coming'}"  @click="navAction('coming')">
            <span>即将上映</span>
        </li>
    </nav>

    <ul v-show="showFlag == 'playing'" class="playing-content">
        <li v-for="item in playingData" :key="item.id" class="playing-item">
            <img :src="item.cover" class="img"/>
            <div class="wrap">
                <h4>{{item.name}}</h4>
                <p>{{item.intro}}</p>
                <p>
                    <span>{{item.cinemaCount}}家影院上映</span>
                    <em>{{item.watchCount}}人购票</em>
                </p>
                <p>{{item.grade}}<i class="iconfont icon-arrow-right"></i></p>
            </div>
        </li>

        <p v-if="!canRequestPlaying">没有更多正在热映的电影了</p>
    </ul>

    <ul v-show="showFlag == 'coming'" class="coming-content">
        <li v-for="item in comingData" :key="item.id" class="coming-item">
            <img :src="item.cover" class="img"/>
            <div class="wrap">
                <h4>{{item.name}}</h4>
                <p>{{item.intro}}</p>
                <p>
                    <span>{{item.premiereAt | formatDate('date')}}上映</span>
                    <em>{{item.premiereAt | formatDate('week')}}</em>
                </p>
                <p><i class="iconfont icon-arrow-right"></i></p>
            </div>
        </li>
        <p v-if="!canRequestComing">没有更多即将上映的电影了</p>
    </ul>


</app-content>
</template>


<script>
//引入请求正在热映和即将上映的电影数据
import {getNowPlayingData, getComingSoonData} from '../../services/homeService.js'
export default {
    props: {
        //路由中的参数
        flag: String
    },
    data(){
        return {
            showFlag: this.flag || 'playing', //playing:正在热映,coming:即将上映
            playingData: [],
            comingData: [],
            count: 7,
            playingPage: 1,
            canRequestPlaying: true,
            comingPage: 1,
            canRequestComing: true,
            isRequest: false
        }
    },
    watch: {
        //对路由中的参数变化进行监听，达到切换的效果
        flag(newVal){
            this.showFlag = newVal || 'playing';
            //判断这个页面是否拥有了可展示的数据，如果没有，需要请求
            this.getInitData();
        }
    },
    methods: {
        //头部点击切换事件
        navAction(flag){
            //切换正在热映和即将上映的界面
            this.showFlag = flag;
            //判断这个页面是否拥有了可展示的数据，如果没有，需要请求
            this.getInitData();
        },
        getplaying(){
            //请求正在热映的数据数据
            getNowPlayingData(this.playingPage, this.count).then(({result, total})=>{
                // console.log('nowplaying');
                // console.log(result);
                this.playingData = this.playingData.concat(result);
                this.$nextTick(()=>{
                    // 更新滚动视图
                    this.$refs.content.refreshDOM();
                    //请求完一次数据，打开下一次的请求
                    this.isRequest = false;
                    //判断当前的正在热映的电影数据有没有请求完成
                    if(this.playingPage >= total){
                        //所有的正在热映的数据都请求完了
                        this.canRequestPlaying = false;
                    }
                });
            })
        },
        getComing(){
            //请求即将上映的数据
            getComingSoonData(this.comingPage, this.count).then(({result, total})=>{
                // console.log('comingsoon');
                this.comingData = this.comingData.concat(result);
                this.$nextTick(()=>{
                    // 更新滚动视图
                    this.$refs.content.refreshDOM();
                    //请求完一次数据，打开下一次的请求
                    this.isRequest = false;
                    //判断当前的即将上映的电影数据有没有请求完成
                    if(this.comingPage >= total){
                        //所有的即将上映的数据都请求完了
                        this.canRequestComing = false;
                    }
                })
            })
        },
        //获得页面初始化数据
        getInitData(){
            //判断要展示的界面有没有初始数据，没有就请求
            if(this.showFlag == 'coming' && this.comingData.length == 0){
                this.getComing();
            }
            //判断要展示的界面有没有初始数据，没有就请求
            if(this.showFlag == 'playing' && this.playingData.length == 0){
                this.getplaying();
            }
        },
        contentScroll(y){
            // console.log('监听到了滚动的位置：', y);
            //判断y值小于100，加载下一页数据
            if(y < 100 && (!this.isRequest)){
                if(this.showFlag == 'playing' && this.canRequestPlaying){
                    //请求正在热映的下一页数据
                    this.playingPage += 1;
                    this.isRequest = true;
                    this.getplaying();
                }
                
                if(this.showFlag == 'coming' && this.canRequestComing){
                    //请求下一页的即将上映的数据
                    this.comingPage += 1;
                    this.isRequest = true;
                    this.getComing();
                }


            }
        }
    },
    mounted(){
        
        //获得页面初始数据
        this.getInitData();
        
    }
}
</script>

<style scoped>
#films{
    padding: 0 10px;
    width: 100%;
    box-sizing: border-box;
}
.nav{
    display: flex;
}
.nav .nav-item{
    flex: 1;
    line-height: 45px;
    border-bottom: 1px solid #fe6e00;
    text-align: center;
    color: #6a6a6a;
}
.nav .nav-item.active{
    color: #fe6e00;
    border-bottom: 3px solid #fe6e00;
}
</style>

