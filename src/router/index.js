import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from 'src/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [{
        path: '/login/:role',
        component: () => import('src/views/login/index'),
        meta: { title: '登录' },
        hidden: true
    },

    {
        path: '/404',
        component: () => import('src/views/404'),
        meta: { title: '404' },
        hidden: true
    },

    {
        path: '/',
        component: Layout,
        redirect: '/home',
        children: [{
            path: 'home',
            name: 'Home',
            component: () => import('src/views/home/home'),
            meta: { title: '后台管理模板', icon: 'dashboard' }
        }],
    },

    {
        path: '/test',
        component: Layout,
        redirect: '/test/testTableWrap',
        name: 'TestTableWrap',
        meta: { title: '测试', icon: 'form' },
        children: [{
                path: 'testTableWrap',
                name: 'TestTableWrap',
                component: () => import('src/views/test/testTableWrap'),
                meta: { title: '测试表格' }
            },
            {
                path: 'moduleManagement',
                name: 'ModuleManagement',
                component: () => import('src/views/test/testFormWrap'),
                meta: { title: '测试表单' }
            },
        ],
    },

    {
        path: '/documents',
        component: Layout,
        redirect: '/documents/tableWrapDoc',
        name: 'TestTableWrap',
        meta: { title: '文档', icon: 'form' },
        children: [{
                path: 'tableWrapDoc',
                name: 'TableWrapDoc',
                component: () => import('src/views/documents/tableWrapDoc'),
                meta: { title: '表格' }
            },
            {
                path: 'searchWrapDoc',
                name: 'SearchWrapDoc',
                component: () => import('src/views/documents/searchWrapDoc'),
                meta: { title: '表格搜索' }
            },
        ],
    },

    // 404 page must be placed at the end !!!
    { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router
