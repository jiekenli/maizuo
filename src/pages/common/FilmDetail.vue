<template>
<app-content>
    <div class="poster">
        <img :src="filmInfo.poster"/>
    </div>

    <h3 class="tip"><span>影片简介</span></h3>

    <p class="info">导演：{{filmInfo.director}}</p>
    <p class="info">主演：{{filmInfo.actors}}</p>
    <p class="info">地区语言：{{filmInfo.nation}}({{filmInfo.language}})</p>
    <p class="info">类型：{{filmInfo.category}}</p>
    <p class="info">上映日期：{{filmInfo.premiereAt | formatDate('date')}}</p>
    <p class="info">上映日期：{{filmInfo.synopsis}}</p>


    <div v-if="this.FilmBuy">立即购票</div>
    
</app-content>  
</template>

<script>
import {getFilmDetailData} from '../../services/homeService.js'
import dataStore from '../../utils/dataStore.js'
export default {
    //接收地址栏中的值
    props: ['id', 'buy'],
    data(){
        //将地址栏中的值转为正确格式
        let id = this.id, buy = this.buy;
        if(typeof this.id != 'number'){
            id = Number(this.id);
        }
        if(typeof this.buy != 'boolean'){
            buy = this.buy=='true'?true:false;
        }
        return{
            //地址栏中的值转为正确格式后，提供给dom使用
            filmID: id,
            FilmBuy: buy,
            filmInfo: dataStore.getFilmInfo()
        }
    },
    mounted(){
        //取值

        //根据id，请求电影详情数据
        getFilmDetailData(this.filmID).then(result=>{
            console.log(result);
            this.filmInfo = result;
        })
    }
}
</script>


<style scoped>
.poster img{
    width: 100%;
}
.tip{
    padding: 15px 0;
    box-sizing: border-box;
    font-weight: normal;
    height: 48px;
    display: flex;
}
.tip::before{
    content: '';
    display: inline-block;
    height: 18px;
    width: 20px;
    background: rgb(228, 200, 156);
}
.tip span{
    flex: 1;
    line-height: 18px;
    font-size: 16px;
    padding-left: 8px;
    color: #333;
}

.info{
    font-size: 12px;
    color: #333;
    line-height: 14px;
    margin: 14px 0;
    padding: 0 28px;
    box-sizing: border-box; 
}
</style>


