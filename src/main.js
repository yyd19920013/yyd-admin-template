import Vue from 'vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import 'src/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import * as filter from './filter'

import 'src/icons' // icon
import 'src/permission' // permission control

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)
Vue.config.productionTip = false

//挂载过滤器
for (let attr in filter) {
    Vue.filter(attr, filter[attr]);
}

const vm = new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})

//用来发送事件的vue实例
const vmEvent = new Vue({
    router,
});

console.log(vm);
export default vmEvent;
