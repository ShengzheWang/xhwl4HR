<template>
  <div id="app" style="min-width:1200px">
    <keep-alive>
    <XhwlHeader v-show="$route.path!='/ResumeDetails'" @isSuperAdmin="changeSuperAdmin" ></XhwlHeader>
    </keep-alive>
    <div v-if="$route.path!='/ResumeDetails'" style="width: 80%;margin: 0 auto;height: 100%;vertical-align: top">
      <div v-bind:style="'display: inline-block;width: 15%;position:relative;height:'+(height+20)+'px'">
        <XhwlMenu :isSuperAdmin="isSuperAdmin"></XhwlMenu>
      </div>
      <div style="display: inline-block;width: 84%;height: 100%;margin: 0">
        <router-view class="inner" v-bind:style="'box-shadow: 5px 5px 5px #888888;background: #ffffff;margin-top:20px;overflow-y:auto;height:'+height+'px'"></router-view>
      </div>
    </div>
    <div v-else>
      <keep-alive>
      <router-view ></router-view>
        </keep-alive>
    </div>
  </div>
</template>

<script>
  import XhwlHeader from './components/XhwlHeader.vue'
  import XhwlFooter from './components/XhwlFooter.vue'
  import XhwlMenu from './components/XhwlMenu.vue'
  import Home from './components/headerRouters/Home.vue'
  import ElFooter from '../node_modules/element-ui/packages/footer/src/main.vue'
  export default {
    name: 'App',
    data () {
      return {
        input3: '',
        value3: '',
        postChosen: '',
        isSuperAdmin:0,
        height: '',
        items: [
          {text: '展示示例一'},
          {text: '展示示例二'},
          {text: '展示示例三'},
          {text: '展示示例四'}
        ],
        places: [
          {text: '深圳'},
          {text: '全部'}
        ],
        classes: [
          {text: '研发'},
          {text: '设计'},
          {text: '产品'},
          {text: '全部'}
        ],
        posts: [
          {text: '校园招聘'},
          {text: '社会招聘'},
          {text: '实习生招聘'}
        ]
      }
    },
    mounted(){
      let _this = this
      _this.$data.height = window.innerHeight-110;
      window.onresize = function temp() {
        _this.$data.height = window.innerHeight-110;
        console.log(_this.$data.height)
      };

    },
    methods: {
      changeSuperAdmin (data) {
        this.$data.isSuperAdmin = data
      }
    },
    components: {
      ElFooter,
      XhwlMenu,
      XhwlHeader,
      XhwlFooter,
      Home}
  }
</script>

<style lang="less">
  #app {
    div{
    }
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: left;
    color: #2c3e50;

  }
</style>
