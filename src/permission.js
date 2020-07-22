import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from 'src/utils/auth' // get token from cookie
import getPageTitle from 'src/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
    // start progress bar
    document.title = getPageTitle(to.meta && to.meta.title);
    NProgress.start()
    next()
})

router.afterEach(() => {
    // finish progress bar
    NProgress.done()
})
