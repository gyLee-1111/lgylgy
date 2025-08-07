import { createRouter, createWebHistory } from 'vue-router'



import LogIn from '../views/ongoing/LogIn.vue'
import FrontLayout from '../views/layout/FrontLayout.vue'
import CategoryList from '../views/category/CategoryList.vue'
import KeywordDetail from '../views/category/KeywordDetail.vue'
import ProductListNaver from '../views/category/ProductListNaver.vue'
import ProductListCoupang from '../views/category/ProductListCoupang.vue'
import RelKeyword from '../views/category/RelKeyword.vue'
import AdminPage from '../views/adminPage/AdminPage.vue'
//import ReviewPop from '../views/reviewPop/RRRRRRRRPop.vue'
//import { ModalOverlay } from 'components/ModalOverlay.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'FrontLayout',
      component: FrontLayout,
      children:[
        {
          path: '/categoryList',
          name: 'CategoryList',
          component: CategoryList,
        },
        {
          path: '/keywordDetail/:keywordCode',
          name: 'KeywordDetail',
          component: KeywordDetail,
          props: true
        },
        {
          path: '/productListNaver/:keywordCode',
          name: 'ProductListNaver',
          component: ProductListNaver,
          props: true
        },
        {
          path: '/productListCoupang/:keywordCode',
          name: 'ProductListCoupang',
          component: ProductListCoupang,
          props: true
        },
        {
          path: '/relKeyword/:keywordCode',
          name: 'RelKeyword',
          component: RelKeyword,
          props: true
        },
        {
          path: '/adminPage',
          name: 'AdminPage',
          component: AdminPage,
          props: true
        },
      ]
    },
    {
      path: '/logIn',
      name: 'LogIn',
      component: LogIn,
    },
  ]
});
export default router
