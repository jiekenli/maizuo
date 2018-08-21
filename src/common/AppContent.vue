<template>
<div class="content" ref="content">
    <div>
        <slot></slot>
    </div>
</div>
</template>


<script>
export default {
    props: {
        reciveScroll: Boolean
    },
    methods: {
        refreshDOM(){
            this.scroll.refresh();
        },
        scrollTo(y){
            //判断是否在可滚动区域
            if(y > 0){
                return;
            }
            if(y < this.scroll.maxScrollY){
                this.scroll.scrollTo(0, this.scroll.maxScrollY, 200);
                return;
            }
            
            this.scroll.scrollTo(0, y, 200);
        }
    },
    mounted(){
        let scroll = new IScroll(this.$refs.content, {
            probeType: 3
        });
        this.scroll = scroll;
        // console.log('创建滚动视图');

        //滚动开始前,都识别最新高度
        scroll.on('beforeScrollStart', ()=>{
            scroll.refresh();
        });

        if(this.reciveScroll){
            //外部调用时，需要接收滚动事件，就添加正在滚动的监听。
            scroll.on('scroll', ()=>{
                let disY = scroll.y - scroll.maxScrollY;
                this.$emit('onScroll', disY);
            })
        }
    }
}
</script>


<style scoped>
.content{
    background: #ebebeb;
    width: 100%;
    position: absolute;
    top: 50px;
    left: 0;
    bottom: 0;
    overflow: hidden;
}
</style>

