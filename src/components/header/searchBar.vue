<template>
    <div class="search-panel">
        <el-row class="m-header-searchbar">

            <el-col :span="3" class="left">
                <img src="//s0.meituan.net/bs/fe-web-meituan/fa5f0f0/img/logo.png" alt="美团">
            </el-col>

            <el-col :span="15" class="center">
                <div class="wrapper">
                    <!-- v-model @focus @blur @input -->
                    <el-input v-model="searchWord" placeholder="请输入内容" @focus="focus" @blur="blur" @input="input"></el-input>
                    <el-button type="primary" icon="el-icon-search"></el-button>
                    <!-- 鼠标聚焦时的展示 -->
                    <!-- v-if -->
                    <dl class="hotPlace" v-if="isHotPlace">
                        <dt>热门搜索</dt>
                        <dd v-for="(item, index) in hotPlaceList" :key="item + '_'+ index">
                            <router-link  :to="{name: 'goods', params: {name: item}}">{{item}}</router-link>
                        </dd>
                    </dl>
                    <!-- 输入关键词的展示 -->
                    <!-- v-if -->
                    <dl class="searchList" v-if="isSearchList">
                        <dd v-for="(item,index) in searchList" :key="index">
                            <!-- params -->
                            <router-link :to="{name:'goods',params:{name:item}}" >{{item}}</router-link>
                        </dd>
                    </dl>

                </div>

                <p class="suggest">
                    <a v-for="(item,index) in suggestList" :key="index" href="#" >{{item}}</a>
                </p>
            </el-col>

        </el-row>
    </div>
</template>
<script>
import api from '@/api/index'
import axios from 'axios'
export default {
    data(){
        return {
            searchWord:'',
            // isHotPlace:false,
            // isSearchList:false,
            isFocus:false,
            hotPlaceList:[],
            searchList:[],
            suggestList:[]
        }
    },
    created(){
      axios.get('/api/meituan/header/searchHotWords.json',{
        params:{
          appkey:'chenguibin_1569810720666'
        }
      }).then( res => {
        console.log("success",res);
      }).catch( res => {
        console.log(res);
      })
        api.getSearchHotList().then(res => {
            this.hotPlaceList = res.data.data;
            this.suggestList = res.data.data;
        })
    },
    computed:{
      // 是否展示“热门搜索”
        isHotPlace(){
            return this.isFocus && !this.searchWord;
        },
        // 是否展示“搜索列表”
        isSearchList(){
            return this.isFocus && this.searchWord;
        }
    },
    methods:{
        focus(){
            this.isFocus = true;
        },
        blur(){
            let self = this;
            //延迟触发blur，这样在点击关键字的时候才会跳转，不然先blur了，点击就无效
            setTimeout(function() {
                self.isFocus = false;
            }, 200);
            // this.isFocus = false;
        },
        input(){
            api.getSearchList().then(res => {
                this.searchList = res.data.data.list.filter((item) => {
                    return item.indexOf(this.searchWord) > -1;
                } )
            })
        }
    },
    watch: {
        "$route.params.name": function () {
            this.searchWord = this.$route.params.name;
        }
    },
}
</script>
<style lang="scss">
//sass的语法
    @import '@/assets/css/public/header/search.scss';
</style>
