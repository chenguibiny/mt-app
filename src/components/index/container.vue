<template>
  <div class="m-istyle">
    <!-- mouseover -->
    <dl @mouseover="over" :class="nav.class">
      <dt>{{nav.title}}</dt>
      <!-- :class  -->
      <dd v-for="(item,index) in nav.list" :key="index" :class="{active:kind==item.tab}" :data-type="item.tab">{{item.text}}</dd>

    </dl>

    <ul class="ibody">
      <li v-for="(item,index) in resultsData[kind]" :key="index">
        <el-card :body-style="{ padding: '0px' }" shadow="never">
          <img :src="item.image" class="image" />
          <div class="cbody">
            <div class="title" :title="item.title">{{item.title}}</div>
            <div class="sub-title" :title="item.subTitle">{{item.subTitle}}</div>
            <!-- 正常 -->
            <div class="price-info" >
              <span class="current-price-wrapper">
                <span class="price-symbol numfont">¥</span>
                <span class="current-price numfont">{{item.price}}</span>
              </span>
              <!-- <span class="old-price">门市价¥{{item.price.old_price}}</span> -->
              <span class="sold bottom-right-info">{{item.address}}</span>
            </div>
            <!-- 抢光了 -->
            <!-- <div class="price-info" v-else-if="!item.rentNum">
              <span class="current-price-wrapper">
                <span class="price-symbol numfont">¥</span>
                <span class="current-price numfont">抢光了</span>
              </span>
            </div> -->
            <!-- 人均 -->
            <!-- <div class="price-info" v-else>
              <span class="current-price-wrapper">
                <span class="price-symbol numfont">¥</span>
                <span class="current-price numfont">{{item.price.avg_price}}</span>
                <span class="units">/{{item.price.units}}</span>
              </span>
            </div> -->
          </div>
        </el-card>
      </li>

    </ul>
  </div>
</template>
<script>
import api from '@/api/index.js'
export default {
    props:['nav'],
    data() {
        return {
            kind:"all",
            resultsData:{},
        list: [
            {
            image:
                "//p0.meituan.net/msmerchant/0a56a205c9a62ac5df50900dc412b2b01651570.jpg@368w_208h_1e_1c",
            title: "幸福西饼蛋糕（程远店）",
            sub_title: "天使秘密1个，约2磅，圆形",
            price: {
                price: null,
                old_price: null,
                avg_price:18,
                units:"人均"
            },
            rentNum:0,
            address: "西三旗"
            },
            {
            image:
                "//p1.meituan.net/msmerchant/9377e8727ef3c98ff16807a0c1cc43af2500199.png@368w_208h_1e_1c",
            title: "米兰西饼生日蛋糕（朝阳店）",
            sub_title: "蛋糕8选1,约16英寸，圆形",
            price: {
                price: null,
                old_price: null,
                avg_price:18,
                units:"人均"
            },
            rentNum:10,
            address: "鸟巢/水立方"
            },
            {
            image:
                "//p1.meituan.net/msmerchant/9377e8727ef3c98ff16807a0c1cc43af2500199.png@368w_208h_1e_1c",
            title: "米兰西饼生日蛋糕（朝阳店）",
            sub_title: "蛋糕8选1,约16英寸，圆形",
            price: {
                price: 148,
                old_price: 298,
                avg_price:18,
                units:"人均"
            },
            rentNum:10,
            address: "鸟巢/水立方"
            }
        ]
    };
  },
  created(){
    api.resultsByKeywords().then(res => {
      this.resultsData = res.data.data;
      console.log(this.resultsData);
    })
  },
  methods:{
      over(e){
        //   console.log(e.target);
        let dom = e.target;
        let tagName = dom.tagName.toLowerCase();
        // console.log(tagName);
        if (tagName != "dd") {
            return false;
        }
        this.kind = dom.getAttribute("data-type");
        //动态获取数据 ajax请求
      }
  }
};
</script>
<style lang="scss">
@import "@/assets/css/index/artistic.scss";
</style>
