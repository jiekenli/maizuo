<template>
<app-content ref="content">
<h1>城市</h1>

<p>按字母排序</p>
<ul class="letter-list">
    <li v-for="(cityObj, index) in cityList" :key="index" 
        @click="skip(index)">
        {{cityObj.letter}}
    </li>
</ul>

<div v-for="cityObj in cityList" :key="cityObj.letter" ref="cityDOM">
    <h3>{{cityObj.letter}}</h3>
    <ul>
        <li v-for="city in cityObj.data" :key="city.id" @click="selectCity(city)">
            {{city.name}}
        </li>
    </ul>
</div>

<button></button>

    
</app-content>  
</template>

<script>
import {getCityListData} from '../../services/homeService.js'
export default {
    data(){
        return {
            cityList: []
        }
    },
    methods: {
        //滚动到对应字母的位置
        skip(index){
            console.log(this.$refs);
            console.log(index);
            let top = this.$refs.cityDOM[index].offsetTop;
            console.log(top);
            this.$refs.content.scrollTo(top*(-1));
        },
        selectCity(city){
            //修改全局状态
            this.$store.dispatch('changeLocation', city.name);
            //返回首页
            this.$router.push('/');
        }
    },
    mounted(){
        getCityListData().then(result=>{
            this.cityList = result;
        })
    }
}
</script>


<style scoped>
.letter-list{
    overflow: hidden;
}
.letter-list li{
    width: 25%;
    float: left;
}
</style>
