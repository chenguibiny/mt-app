<template>
    <div class="m-menu">
        <!-- mouseleave -->
        <dl class="nav" @mouseleave="meneLeave">
            <dt>全部分类</dt>
            <!-- mouseenter -->
            <dd v-for="(item,index) in menuList" :key="index" @mouseenter="menuEnter(item)" >
                <i :class="item.type"></i>
                {{item.name}}
                <span class="arrow"></span>
            </dd>
            <!-- <dd>
                <i class="furniture"></i>
                家装 / 建材 / 家居
                <span class="arrow"></span>
            </dd>
            <dd>
                <i class="study"></i>
                学习培训 / 音乐培训
                <span class="arrow"></span>
            </dd>
            <dd>
                <i class="health"></i>
                医疗健康 / 宠物 / 爱车
                <span class="arrow"></span>
            </dd>
            <dd>
                <i class="bar"></i>
                酒吧 / 密室逃脱
                <span class="arrow"></span>
            </dd> -->
        </dl>
        <!-- 鼠标移动上去出现的详情结构 -->
        <!-- v-if mouseenter mouseleave -->
        <div v-if="curDetail" class="detail" @mouseenter="detailEnter" @mouseleave="detailLeave">
            <template v-for="(item,index) in curDetail.items">
                <h4 :key="index">{{item.title}}</h4>
                <span v-for="(v,i) in item.items" :key="v + '_' +i">{{v}}</span>
            </template>

        </div>
    </div>
</template>
<script>
import api from '@/api/index.js'
export default {
    data(){
        return {
            curDetail:null,
            menuList:[]
        }
    },
    created(){
        api.getMenuList().then(res => {
            this.menuList = res.data.data;
            // console.log(this.menuList);
        })
    },
    methods:{
        // 注意每个事件绑定的对象，容易搞错
        menuEnter(item){
            // console.log(item);
            this.curDetail = item;
        },
        meneLeave(){
            var self = this;
            this.timer = setTimeout(function(){
                self.curDetail = null;
            },200);
        },
        detailEnter(){
            clearTimeout(this.timer);
        },
        detailLeave(){
            this.curDetail = null;
        }
    }
}
</script>
