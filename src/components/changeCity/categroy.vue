<template>
    <div class="categroy">
        <dl class="m-categroy">
            <dt>按拼音首字母选择：</dt>
            <dd v-for="(item,index) in list" :key="index">
                <a :href="'#city-' + item">{{item}}</a>
            </dd>
        </dl>

        <dl class="m-categroy-section" v-for="(item,index) in objList" :key="index" :id="'city-' + index">
            <dt>{{index}}</dt>
            <dd>
                <span v-for="city in item" :key="city.id">{{city.name}}</span>
            </dd>
        </dl>
    </div>
</template>
<script>
export default {
    data() {
        return {
            list:'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
            objList:{
                'A':[
                    {
                        'id':1,
                        'name':'安平'
                    },
                    {
                        'id':2,
                        'name':'安宁'
                    }
                ]
                ,
                'E':[
                    {
                        'id':1,
                        'name':'恩施'
                    }
                ],
                'F':[
                    {
                        'id':1,
                        'name':'福州'
                    },
                    {
                        'id':2,
                        'name':'佛山'
                    }
                ],
                'G':[
                    {
                        'id':1,
                        'name':'广州'
                    },
                    {
                        'id':2,
                        'name':'贵阳'
                    },
                    {
                        'id':3,
                        'name':'高安'
                    }
                ],
                'J':[
                    {
                        'id':1,
                        'name':'济南'
                    }
                ],
                'K':[
                    {
                        'id':1,
                        'name':'昆明'
                    }
                ],
                'N':[
                    {
                        'id':1,
                        'name':'南京'
                    }
                ],
                'Q':[
                    {
                        'id':1,
                        'name':'青岛'
                    }
                ],

            }
        }
    }
}
</script>
<style lang="scss">
    @import '@/assets/css/changecity/categroy.scss';
</style>