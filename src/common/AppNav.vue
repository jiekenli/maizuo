<template>
<div class="app-nav">
    
    <transition name="fade">
    <div class="cover" v-show="showNav"></div>
    </transition>
    
    
    <div class="cover-page"  v-show="showNav" @click="tapAction()"></div>
    

    <transition name="slide">
    <nav class="nav"  v-show="showNav">
        <li class="nav-item" v-for="(navItem, index) in navList" :key="index"
            @click="changePageAction(navItem.path)">
            {{navItem.title}}
            <i class="iconfont icon-arrow-right"></i>
        </li>
    </nav>
    </transition>


</div>
</template>

<script>
export default {
    data(){
        return {
            showNav: false,
            navList: [
                {title: '首页', path:'/home'},
                {title: '影片', path:'/films'},
                {title: '影院', path:'/cinemas'},
                {title: '商城', path:'/shops'},
                {title: '我的', path:'/mine'},
                {title: '卖座卡', path:'/cards'}
            ]
        }
    },
    methods: {
        //遮罩的点击事件，收起侧边栏
        tapAction(){
            this.showNav = false;
        },
        //nav的点击事件，切换页面，并收起侧边栏
        changePageAction(path){
            console.log('点击了');
            this.showNav = false;
            this.$router.push(path);
        }
    },
    mounted(){
        //监听头部menu的点击事件，展示侧边栏
        this.$pubsub.$on('show-nav', ()=>{
            this.showNav = true;
        });
    }
}
</script>


<style scoped>
.app-nav{
    width: 100%;
    height: 100%;
}
.cover{
    width: 100%;
    position: absolute;
    top: 50px;
    left: 0;
    bottom: 0;
    background: rgba(0,0,0,0.5);
}
.cover-page{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: transparent;
}
.nav{
    width: 70%;
    position: absolute;
    top: 50px;
    left: 0;
    bottom: 0;
    border-top: 1px solid #222;
    box-sizing: border-box;
    background: #282828;
}
.nav-item{
    line-height: 50px;
    border-bottom: 1px dotted #333;
    color: #999; 
    padding: 0 16px;
    font-size: 14px;
}
.nav-item .iconfont{
    font-size: 12px;
    float: right;
}

@keyframes fadeIn {
    0%{opacity: 0;}
    100%{opacity: 1;}
}
@keyframes fadeOut {
    0%{opacity: 1;}
    100%{opacity: 0;}
}
.fade-enter-active{
    animation: fadeIn 400ms;
}
.fade-leave-active{
    animation: fadeOut 400ms;
}
@keyframes slideIn {
    0%{transform: translateX(-100%);}
    100%{transform: translateX(0%);}
}
@keyframes slideOut {
    0%{transform: translateX(0%);}
    100%{transform: translateX(-100%);}
}
.slide-enter-active{
    animation: slideIn 300ms;
}
.slide-leave-active{
    animation: slideOut 300ms;
}

</style>



