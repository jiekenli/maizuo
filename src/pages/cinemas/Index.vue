<template>
<app-content>
    <ul class="cinema-list">
        <li class="cinema-area" v-for="areaCinema in cinemaInfo" :key="areaCinema.name">
            <h4 class="title" @click="showAction(areaCinema.name)">{{areaCinema.name}}</h4>
            <ul class="area-list" v-if="areaCinema.show">
                <li class="area-item" v-for="cinema in areaCinema.data" :key="cinema.id">
                    <h3>
                        {{cinema.name}}
                    </h3>
                    <p>{{cinema.address}}</p>
                    <p v-if="cinema.showLabels">可乐爆米花</p>
                </li>
            </ul>
        </li>

    </ul>
    
</app-content>
</template>


<script>
import {getCinemaListData} from '../../services/cinemaService.js'

export default {
    data(){
        return {
            cinemaInfo: {}
        }
    },
    methods: {
        //展开收起电影院分类列表的点击事件
        showAction(area){
            this.cinemaInfo[area].show = !this.cinemaInfo[area].show;
        }
    },
    mounted(){
        //请求电影院数据
        getCinemaListData().then(result=>{
            console.log(result);
            this.cinemaInfo = result;
        })
    }
}
</script>

<style scoped>
.title{
    width: 100%;
    padding-left: 10px;
    box-sizing: border-box;
    line-height: 40px;
    background: #e1e1e1;
    border-bottom: 1px solid #fff;
    color: #636363;
    font-size: 14px;
    font-weight: normal;
}
.area-item{
    background: #fff;
    border-bottom: 1px solid #e1e1e1;
}
.area-item h3{

}
</style>

