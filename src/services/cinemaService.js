import axios from 'axios'
import API from '../api'

//请求影院列表
export function getCinemaListData(){
    return new Promise((resolve, reject)=>{
        //请求数据
        axios.get(API.CINEMA_LIST_URL)
        .then(response=>{
            console.log(response);

            //得到所有的影院信息
            let {cinemas} = response.data.data;

            //所有的影院按区域划分，装载这个对象上
            let cinemaCategory = {};

            //遍历所有的影院
            cinemas.map((item)=>{
                let name = item.district.name;//影院所在区域
                
                //分类
                if(!cinemaCategory[name]){
                    cinemaCategory[name] = {
                        data: [],
                        name: name,
                        show: false
                    };
                }

                cinemaCategory[name].data.push({
                    id: item.id,
                    name: item.name,
                    address: item.address,
                    itemTypes: item.itemTypes,
                    showLabels: item.labels.length>0,
                    geocode: item.geocode
                });

            })
            console.log(cinemaCategory);
            resolve(cinemaCategory);
        })
        .catch(error=>{
            console.log('失败');
        })
    })
}

/*
{
    '宝安区': [{}, {}, {}, {}, ....]
    '南山区': [{}, {}, {}, {}, ....]
    '龙华新区': [{}, {}, {}, {}, ....]
}
*/