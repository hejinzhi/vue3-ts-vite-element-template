import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

/* Layout */
import Layout from "@/layout/index.vue";

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
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    noShowingChildren: false,
    hidden: false,
  },

  {
    path: "/404",
    component: () => import("@/views/404.vue"),
    noShowingChildren: false,
    hidden: false,
  },
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    noShowingChildren: false,
    hidden: false,
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("@/views/dashboard/index.vue"),
        meta: { title: "Dashboard", icon: "dashboard" },
        noShowingChildren: false,
        hidden: false,
      },
    ],
  },
  // 404 page must be placed at the end !!!
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
    noShowingChildren: false,
    hidden: false,
  },
];

const _createRouter = () =>
  createRouter({
    history: createWebHashHistory(),
    // mode: 'history', // require service support
    scrollBehavior: () => ({ top: 0 }),
    routes: constantRoutes,
  });

let router = _createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  router = _createRouter();
}

export default router;
