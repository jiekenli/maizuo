<template>
<header class="app-header">

    <span class="iconfont icon-menu menu" @click="showNavAction()"></span>

    <h1 class="title">卖座电影</h1>

    <span class="city" @click="goCityPage()">
        <!-- {{$store.state.cityname}} -->
        {{city}}
        <i class="iconfont icon-arrow-down"></i>
    </span>

    <span class="iconfont icon-user user"></span>

</header>
</template>

<script>
import Vuex from 'vuex'
export default {
    computed: Vuex.mapState({
        city: 'cityname'
    }),
    methods: {
        //显示侧边栏
        showNavAction(){
            this.$pubsub.$emit('show-nav');
        },
        //去城市页面
        goCityPage(){
            this.$router.push({name: 'city'});
        }
    }
}
</script>



<style scoped>
.app-header{
    width: 100%;
    height: 50px;
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    background: #282828;
    color: #999;
}
.menu{
    width: 50px;
    text-align: center;
    line-height: 50px;
    border-right: 1px solid #222;
}
.title{
    flex: 1;
    padding-left: 10px;
    font-size: 14px;
    color: #efefef;
    line-height: 50px;
    font-weight: normal;
}
.city, .user{
    width: 50px;
    text-align: center;
    line-height: 50px;
}
.city{
    font-size: 12px;
}
.city .iconfont{
    font-size: 12px;
}

</style>
