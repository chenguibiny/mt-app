<template>
  <div class="m-products-list">
    <ul>
      <li :class="{'s-nav-active':item.active}" v-for="item in nav" :key="item.key">{{item.name}}</li>
    </ul>
    <el-row>
      <item v-for="(item, index) in productList" :key="index" :meta="item" />
    </el-row>
  </div>
</template>
<script>
import api from '@/api/index.js';
import Item from "./item";
export default {
  data() {
    return {
      nav: [
        {
          key: "s-default",
          name: "智能排序",
          active: true
        },
        {
          key: "s-price",
          name: "价格排序",
          active: false
        },
        {
          key: "s-score",
          name: "人气最高",
          active: false
        },
        {
          key: "s-comment",
          name: "评价最高",
          active: false
        }
      ],
      productList: []
    };
  },
  created(){
    api.getProducts().then(res => {
      this.productList = res.data.data;
    })
  },
  components: {
    Item
  }
};
</script>
<style lang="scss">
@import "@/assets/css/products/list.scss";
</style>