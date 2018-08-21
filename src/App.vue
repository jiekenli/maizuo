<template>
<div id="app">

    <!-- 头部 -->
    <app-header></app-header>

    <keep-alive>
        <router-view/>
    </keep-alive>

    <!-- 侧边栏 -->
    <app-nav></app-nav>

    
    


</div>
</template>

<script>
import AppHeader from './common/AppHeader.vue'
import AppNav from './common/AppNav.vue'
export default {
    components: {
        AppHeader,
        AppNav
    },
    created(){
        //获得城市
        this.$store.dispatch('getLocation');
    }
}
</script>

