<template>
  <div id="app" style="min-width:1200px">
    <XhwlHeader></XhwlHeader>
    <div style="width: 80%;margin: 0 auto;height: auto;display: table">
      <div style="display: table-cell;width: 15%;height: 100%;position: relative">
        <XhwlMenu></XhwlMenu>
      </div>
      <div style="display: table-cell;width: 84%;">
        <router-view style="background: #ffffff;margin-top:20px;margin-left: -2%"></router-view>
      </div>
    </div>

    <xhwl-footer></xhwl-footer>
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
    methods: {},
    components: {
      ElFooter,
      XhwlMenu,
      XhwlHeader,
      XhwlFooter,
      Home}
  }
</script>

<style scoped>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: left;
    color: #2c3e50;

  }
</style>
