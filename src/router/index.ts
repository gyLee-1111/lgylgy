import { createRouter, createWebHistory } from 'vue-router'



import LogIn from '../views/ongoing/LogIn.vue'
import FrontLayout from '../views/layout/FrontLayout.vue'
import AdminLayout from '../views/layout/AdminLayout.vue'
import CategoryList from '../views/category/CategoryList.vue'
import KeywordDetail from '../views/category/KeywordDetail.vue'
import ProductListNaver from '../views/category/ProductListNaver.vue'
import ProductListCoupang from '../views/category/ProductListCoupang.vue'
import RelKeyword from '../views/category/RelKeyword.vue'
import { useAuthPinia } from '../store/authPinia'
import KakaoCallback from '../views/ongoing/KakaoCallback.vue'
import JoinPage from '../views/ongoing/JoinPage.vue'
import BoardCommon from '../views/board/BoardCommon.vue'
import InsertPost from '../views/board/InsertPost.vue'
import DetailPost from '../views/board/DetailPost.vue'

import AdminMain from '../views/adminPage/AdminMain.vue'
import CommonBoard from '../views/adminPage/AdminCommonBoard.vue'
//import ReviewPop from '../views/reviewPop/RRRRRRRRPop.vue'
//import { ModalOverlay } from 'components/ModalOverlay.vue'


declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
    roles?: string[]
    activeMenuCode?: number
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'FrontLayout',
      component: FrontLayout,
      children:[
        {
          path: 'categoryList',
          name: 'CategoryList',
          component: CategoryList,
          meta:{
            
            activeMenuCode: 4
            
          }
        },
        {
          path: 'keywordDetail/:keywordCode',
          name: 'KeywordDetail',
          component: KeywordDetail,
          props: true,
          meta:{
            requiresAuth: true,
            roles: ['USER_NORMAL','SYSTEM_ADMIN']
          }
        },
        {
          path: 'productListNaver/:keywordCode',
          name: 'ProductListNaver',
          component: ProductListNaver,
          props: true,
          meta:{
            requiresAuth: true,
            roles: ['USER_NORMAL','SYSTEM_ADMIN']
          }
        },
        {
          path: 'productListCoupang/:keywordCode',
          name: 'ProductListCoupang',
          component: ProductListCoupang,
          props: true,
          meta:{
            requiresAuth: true,
            roles: ['USER_NORMAL','SYSTEM_ADMIN']
          }
        },
        {
          path: 'relKeyword/:keywordCode',
          name: 'RelKeyword',
          component: RelKeyword,
          props: true,
          meta:{
            requiresAuth: true,
            roles: ['USER_NORMAL','SYSTEM_ADMIN']
          }
        },
        {
          path: 'boardCommon/:boardCode',
          name: 'BoardCommon',
          component: BoardCommon,
          props: true,
          meta:{
            requiresAuth: true,
            roles: ['USER_NORMAL','SYSTEM_ADMIN']
          }
        },
        {
          path: 'insertPost/:boardCode',
          name: 'InsertPost',
          component: InsertPost,
          props: true,
          meta:{
            requiresAuth: true,
            roles: ['USER_NORMAL','SYSTEM_ADMIN']
          }
        },
        {
          path: 'detailPost/:postCode',
          name: 'DetailPost',
          component: DetailPost,
          props: true,
          meta:{
            requiresAuth: true,
            roles: ['USER_NORMAL','SYSTEM_ADMIN']
          }
        },
      ]
    },

    {
      path: '/admin',
      name: 'AdminLayout',
      component: AdminLayout,
      children:[
           {
             path: 'main',
             name: 'Main',
             component: AdminMain,
             meta:{
              requiresAuth: true,
              roles: ['SYSTEM_ADMIN']
             }
           },
           {
             path: 'commonBoard',
             name: 'CommonBoard',
             component: CommonBoard,
             meta:{
              requiresAuth: true,
              roles: ['SYSTEM_ADMIN']
             }
           },
      ]
    },
    {
      path: '/oauth/callback/kakao',
      name: 'KakaoCallback',
      component: KakaoCallback
    },
    {
      path: '/logIn',
      name: 'LogIn',
      component: LogIn
      
    },
     {
      path: '/joinPage',
      name: 'JoinPage',
      component: JoinPage
      
    },
    
  ]


});

router.beforeEach((to,_from, next) => {
  const authPinia = useAuthPinia()

  const isLoggedIn = !!authPinia.token;

  if (to.meta.requiresAuth && !isLoggedIn) {
    return next('/logIn');  // 로그인 안 했으면 로그인 페이지로 보내기
  }
  if (to.meta.roles && to.meta.roles.length > 0) {
    if (!authPinia.currentRole || !to.meta.roles.includes(authPinia.currentRole.roleCode)) {
      return next('/categoryList')  
    }
  }
  if (to.meta.activeMenuCode !== undefined) {
    authPinia.setActiveMenuCode(to.meta.activeMenuCode as number)
  }
  next();
})

export default router
