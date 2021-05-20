import Vue from 'vue';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/en'; // lang i18n
import 'src/styles/index.scss'; // global css
import 'src/icons'; // icon
import 'src/permission'; // permission control

import App from './App';
import store from './store';
import router from './router';
import * as filters from './filters';
import services from 'services';
import commonMixinPlugin from './plugins/commonMixinPlugin';

Vue.use(commonMixinPlugin);
// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI);
Vue.config.productionTip = false;

//挂载过滤器
for (let attr in filters) {
    Vue.filter(attr, filters[attr]);
}

//挂载网络请求
Vue.prototype.$services = services;

//路由改变之前显示loading
router.beforeEach((to, from, next) => {
    store.commit({
        type: 'UPDATE_LOADINGSTATUS',
        isLoading: true,
    });

    //根据meta值改变title
    if (to.meta && to.meta.title) document.title = to.meta.title;

    next();
});

//路由改变之后隐藏loading
router.afterEach(() => {
    store.commit({
        type: 'UPDATE_LOADINGSTATUS',
        isLoading: false,
    });
});

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
