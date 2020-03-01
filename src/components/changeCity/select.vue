<template>
    <!-- :class @click v-document-click -->
    <div :class="['choose-wrap',disabled? 'disabled': '']" @click="showWrapper" v-document-click="documentClick">
        <div class="choose">
            <span>{{value}}</span>
            <i class="el-icon-caret-bottom"></i>
            <div :class="{'mt-content':true,'active':showWrapperActive}">
                <h2>{{title}}</h2>
                <div class="wrapper">
                    <div class="col" v-for="(listData,index) in renderList" :key="index">
                        <span class="mt-item" v-for="(item,index) in listData" :key="index" @click="changeValue(item)">{{item.name}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:[
        'list',
        'value',
        'title',
        // showWrapperActive 一开始为fasle
        "showWrapperActive",
        // 一开始为true,省份没有这个值，城市有这个值
        "disabled"
    ],
    computed:{
        renderList () {
            let resultList = [];
            let col = Math.ceil(this.list.length / 12);
            for(var i= 0 ;i< col ; i++){
                resultList.push(this.list.slice(i * 12, i * 12 + 12));
            }
            return resultList;
        }
    },
    data(){
        return {
            // showWrapperActive:false,
        }
    },
    methods:{
        showWrapper(e){
            //取消时间冒泡
            e.stopPropagation();
            // this.showWrapperActive = true;
            if(!this.disabled){
            this.$emit('change_active',true);

            }
        },
        documentClick(){
            // this.showWrapperActive = false;
            this.$emit('change_active',false);
            // console.log('1');
        },
        changeValue(item){
            this.$emit('change',item);
        }
    }
}
</script>
<style lang="scss">
    @import '@/assets/css/changecity/select.scss';
</style>
