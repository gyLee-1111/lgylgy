<template>

      <!-- 본문 영역 -->
    <div class="content_page">

        <div class="base_width">

            <div class="content_box_white">

                <div class="content_inline">

                    <h2 class="title_pg">키워드</h2>
                    <span class="ment">상품 카테고리를 선택하여 원하는 상품을 찾을 수 있습니다.</span>
                    
                    <!-- 목록 페이지로 돌아가기 버튼 -->
                    <button class="btn bg_white btn_list_back" @click="goBackKeywordDetail">
                        <i class="ri-arrow-go-back-line"></i>
                        <span>이전 페이지로 돌아가기</span>
                    </button>
                    <!--// 목록 페이지로 돌아가기 버튼 -->

                    <!-- 키워드 검색 -->
                    <div class="keyword_search_cont">

                        <div class="keyword_search_box" v-if="keywordNm">
                            <input type="text" v-model="keywordNm" placeholder="">
                            <button class="btn bg_primary"><i class="fa-solid fa-magnifying-glass"></i> <span>검색</span></button>
                        </div>

                    </div>
                    <!--// 키워드 검색 -->


                </div>
            </div>

            <div class="content_box_white">

                <div class="content_header_tab">                  

                    <!-- tabmenu -->
                    <div class="keyword_tabmenu">
                        <ul>
                            <li>
                                <a href="#" @click.prevent="keywordDetail">
                                    <span class="icon">
                                        <i class="ri-line-chart-line"></i>
                                    </span>
                                    <span class="title">키워드 분석</span>
                                </a>
                            </li>
                            <li class="active">
                                <a href="#" @click.prevent="productListNaver">
                                    <span class="icon">
                                        <i class="ri-list-indefinite"></i>
                                    </span>
                                    <span class="title">상품 목록</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" @click.prevent="relKeyword">
                                    <span class="icon">
                                        <i class="ri-article-line"></i>
                                    </span>
                                    <span class="title">연관 키워드</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <!--// tabmenu -->
                    
                </div>

                <div class="content_body">

                    <!-- 쇼핑몰 선택 -->
                    <div class="mall_tabmenu">
                        <ul>
                            <li>
                                <a href="#" @click.prevent="productListNaver(keywordCode)">
                                    <img src="/images/sub/mall_naver.png" alt="네이버쇼핑">
                                </a>
                            </li>
                            
                            <li class="active">
                                <a href="#" @click.prevent="productListCoupang(keywordCode)">
                                    <img src="/images/sub/mall_coupang_active.png" alt="쿠팡">
                                </a>
                            </li>
                        </ul>
                    </div>                    
                    <!--// 쇼핑몰 선택 -->

                    <!-- 상품목록 -->
                    <div class="product_list coupang">

                        <ul v-for="(product, index) in productList" :key="product.productCode">
                            <li>
                                <div class="outline">

                                    <!-- 상품정보 -->
                                    <div class="info">

                                        <div class="info_row">

                                            <div class="thum">
                                                <span class="num">{{index + 1 }}</span>
                                                <!-- 126*126 -->
                                                <img v-if="product && product.productImg" :src="'http://localhost:8084/images/product/' + product.productImg" alt="">
                                                <p v-else>이미지가 없습니다</p>
                                            </div>
                                            
                                            <div class="detail_info">
                                                <strong class="title">
                                                    <td>{{ product.productNm }}</td> 
                                                </strong>

                                                <div class="middle_info">
                                                    <strong class="price">{{ product.amount.toLocaleString() }}원</strong>
                                                    <span class="rocket_info" v-if="product.rocketdeli === 'rocketdeli_01'">
                                                        <img src="/images/sub/icon_rocket.png" alt="">
                                                    </span>
                                                    <span>({{ product.finalDeliveryDay}}) {{ product.finalDeliveryDate }} 도착 보장</span>
                                                </div>                                           

                                                <div class="add_info">
                                                    <span class="review">
                                                        <i class="ri-edit-line"></i> 리뷰 <strong>{{ product.reviewCnt }}</strong>개
                                                    </span>
                                                    <span class="rate">
                                                        <i class="ri-star-line"></i> 평점 <strong>{{ product.avgScore }}</strong>
                                                    </span>                                                    
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                    <!--// 상품정보 -->
                                    
                                    <div class="func">

                                        <div class="func_row">
                                            <!-- 링크 모음 -->
                                            <div class="link">

                                                <button class="btn btn_link">
                                                    <span>링크 바로가기</span>
                                                    <i class="ri-external-link-line"></i>
                                                </button>

                                                <button class="btn btn_review" @click="openReviewModal(product.productCode);">
                                                    <span>하위권 리뷰 분석</span>
                                                    <i class="ri-file-chart-line"></i>
                                                </button>

                                            </div>
                                            <!--// 링크 모음 -->
                                        </div>

                                    </div>

                                </div>
                            </li>
                        </ul>

                    </div>
                    <!--// 상품목록 -->

                    <!-- 모달영역 -->
                    <ReviewPop
                        v-if="isModalOpen"
                        :product="selectedProduct"
                        :isModalOpen="isModalOpen"
                        :selectedProductCode="selectedProductCode"
                        :showMarketInfo="false"
                        @close="closeModal">
                    </ReviewPop>

                    <!--// 모달영역 -->


                </div>

            </div>

        </div>

    </div>
    <!--// 본문 영역 -->
<!-- <div class="modal_screen" v-if="isModalOpen"></div> -->

</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import ReviewPop from '../../components/ReviewPop.vue'
import api from '../../plugins/api'
import { closeModalBackGround, openModalBackGround } from '../../utils/globalFunctions'

export default {
  name: "ProductListCoupang",
  components: {
        ReviewPop
    },
  setup() {
    const productList = ref([])
    const route = useRoute()
    const router = useRouter()
    const keywordCode = route.params.keywordCode || ''
    const keyword = ref(null)
    const after1Date = ref('')
    const after1Day = ref('')
    const finalDeliveryDate = ref('')
    const finalDeliveryDay = ref('')

    const isModalOpen = ref(false)
    const selectedProductCode = ref(null)
    const selectedProduct = ref(null)
    const keywordNm = ref({})

    const getDayOfWeek = (date) => {
        const days = ['일', '월', '화', '수', '목', '금', '토']
        return days[date.getDay()]
    }

    const formatDate = (date) => {
      const yyyy = date.getFullYear()
      const mm = String(date.getMonth() + 1).padStart(2, '0')  // 월은 0부터 시작하니까 +1
      const dd = String(date.getDate()).padStart(2, '0')
      return `${yyyy}.${mm}.${dd}`
    }

    const keywordDetail = () =>{
        router.push('/KeywordDetail/' + keywordCode)
        //  alert(keywordCode);
    }

    const productListNaver = () =>{
        router.push('/ProductListNaver/' + keywordCode)
        //  alert(keywordCode);
    }
    const relKeyword = () =>{
        router.push('/RelKeyword/' + keywordCode)
        //  alert(keywordCode);
    }
    const productListCoupang = async(keywordCode) =>{
      router.push('/ProductListCoupang/' + keywordCode)
      alert(keywordCode);
    }
    const goBackKeywordDetail = () => {
        router.push('/KeywordDetail/' + keywordCode )
    }

    const getListProduct = async() =>{
        try{
            const response = await api.get('/user/product/getListProductCoupang',{
                params: {
                    keywordCode: keywordCode
                }
                })
        //    alert(keywordCode)
            if(response.status==200) {
                const today = new Date()
                productList.value = response.data.map(product => {

           
                const deliDate = new Date(today)                     // 오늘 날짜 복사
                deliDate.setDate(today.getDate() + product.deliveryDate)  // 배송일 계산

                product.finalDeliveryDate = formatDate(deliDate)    // 예: 2025.07.25
                product.finalDeliveryDay = getDayOfWeek(deliDate)   // 예: 금

                return product
                })

            } else {
                alert('어디서 오류')
            }

        } catch (error) {
            console.error(error)
        }

    }
    const openReviewModal = async (productCode) => {
        console.log('openReviewModal called for productCode:', productCode);
        selectedProductCode.value = productCode;
        isModalOpen.value = true;   // 여기가 꼭 실행되어야 모달 열림
        document.body.style.overflow = 'hidden';
        selectedProduct.value = productList.value.find(p => p.productCode === productCode) || null;
        console.log('selectedProduct:', selectedProduct.value);
        openModalBackGround();
    //    await getListReview();

    }

    const closeModal = () => {
        
        selectedProduct.value = null        //  제품도 초기화
        isModalOpen.value = false           //  v-if로 모달 제거 유도
        document.body.style.overflow = 'auto'  //  스크롤 되돌리기만 유지
        closeModalBackGround();
    }
    const getKeywordNm = async() =>{

            try{
                const response = await api.get('/user/keyword/getKeywordNm',{
                params: {
                    keywordCode: keywordCode
                }
                })
                keywordNm.value = response.data
            } catch (error){
                console.error(error)

            }
        }
    
    onMounted(() => {
        getListProduct()

        const today = new Date()
        const after1 = new Date()
        const deliDate = new Date()
        after1.setDate(today.getDate() + 1)

        after1Date.value = formatDate(after1)

        after1Day.value = getDayOfWeek(after1)

        getKeywordNm()


    })


    return {
        keyword,
        keywordCode,

        after1Date,
        after1Day,
        finalDeliveryDate,
        finalDeliveryDay,


        getListProduct,
        keywordDetail,
        productListNaver,
        relKeyword,
        productListCoupang,

        productList,
        isModalOpen,
        openReviewModal,
        closeModal,

        selectedProduct,
        selectedProductCode,

        goBackKeywordDetail,
        keywordNm,

        }
    }
}
</script>

<style scoped>

</style>