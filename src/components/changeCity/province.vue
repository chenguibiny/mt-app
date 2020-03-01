<template>
  <div>
    <span class="name">按省份选择:</span>
    <!-- value 会变   showwrapperactive会变  -->
    <m-select
      :list="provinceList"
      title="省份"
      :value="province"
      :showWrapperActive="provinceActive"
      @change_active="changeProvinceActive"
      @change="changeProvince"
    />
    <!-- value 会变   showWrapperActive会变 disabled会变  -->
    <m-select
      :list="cityList"
      title="城市"
      :value="city"
      :showWrapperActive="cityActive"
      @change_active="changeCityActive"
      @change="changeCity"
      :disabled = "cityDisabled"
    />
    <span>直接搜索：</span>
    <el-select
      v-model="searchWord"
      filterable
      remote
      reserve-keyword
      placeholder="请输入城市中文"

      :remote-method="remoteMethod"
      :loading="loading"
    >
      <el-option v-for="item in searchList" :key="item" :label="item" :value="item"></el-option>
    </el-select>
  </div>
</template>
<script>
import api from '@/api/index.js'
import MSelect from "@/components/changeCity/select.vue";
export default {
  components: {
    MSelect
  },
  data() {
    return {
      provinceList: [],
      province: "省份",
      city: "城市",
      cityList: [],
      provinceActive: false,
      cityActive: false,
      searchWord:'',
      searchList:["哈尔滨", "汕头", "揭阳", "潮州", "广州"],
      loading:false,
      cityDisabled:true
    };
  },
  created(){
    api.getProvinceList().then(res => {
      this.provinceList = res.data.data.map(item => {
        item.name = item.provinceName;
        return item;
      });
    }),
    api.getCityList().then(res => {
      this.cityList = res.data.data;
    })
  },
  methods: {
    changeProvinceActive(flag) {
      this.provinceActive = flag;
      if (flag) {
        this.cityActive = false;
      }
    },
    changeCityActive(flag) {
      this.cityActive = flag;
      if (flag) {
        this.provinceActive = false;
      }
    },
    //输入关键字的时候触发
    remoteMethod(){
        // 请求后端接口
    },
    changeProvince(item){
      this.province = item.name;
      this.cityDisabled = false;
    },
    changeCity(item) {
      this.city = item.name;
    }
  }
};
</script>
<style lang="scss">
    @import "@/assets/css/changecity/iselect.scss";
</style>
