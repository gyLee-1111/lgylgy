<template>
    <!-- 본문 영역 -->
    <div class="content_page">

        <div class="base_width">

            <div class="content_box_white">

                <div class="content_inline">

                    <h2 class="title_pg">키워드</h2>
                    <span class="ment">상품 카테고리를 선택하여 원하는 상품을 찾을 수 있습니다.</span>
                    
                    <!-- 목록 페이지로 돌아가기 버튼 -->
                    <button class="btn bg_white btn_list_back">
                        <i class="ri-arrow-go-back-line"></i>
                        <span>이전 페이지로 돌아가기</span>
                    </button>
                    <!--// 목록 페이지로 돌아가기 버튼 -->

                    <!-- 키워드 검색 -->
                    <div class="keyword_search_cont">

                        <div class="keyword_search_box">
                            <input type="text" placeholder="" value="노트북">
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
                            <li class="active">
                                <a href="#" @click.prevent="productListNaver(keywordCode)">
                                    <img src="/images/sub/mall_naver_active.png" alt="네이버쇼핑">
                                </a>
                            </li>
                            
                            <li>
                                <a href="#" @click.prevent="productListCoupang(keywordCode)">
                                    <img src="/images/sub/mall_coupang.png" alt="쿠팡">
                                </a>
                            </li>
                        </ul>
                    </div>                    
                    <!--// 쇼핑몰 선택 -->

                    <!-- 상품목록 -->

                    <div class="product_list">

                        <ul v-for="(product, index) in productList" :key="product.productCode">
                            <li>
                                <div class="outline">

                                    <!-- 상품정보 -->
                                    <div class="info" >

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

                                                <strong class="price"><td>{{ product.amount.toLocaleString() }}원</td></strong>

                                                <div class="add_info">
                                                    <span class="review">
                                                        <i class="ri-edit-line"></i> 리뷰 <strong><td>{{ product.reviewCnt }}</td></strong>개
                                                    </span>
                                                    <span class="rate">
                                                        <i class="ri-star-line"></i> 평점 <strong>{{ product.avgScore }}</strong>
                                                    </span>
                                                    <span class="date">
                                                        <i class="ri-calendar-check-line"></i> 등록일 <strong><td>{{ product.registrationDt ? new Date(product.registrationDt).toLocaleDateString() : '날짜 없음' }}</td></strong>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <!--// 상품정보 -->
                                    
                                    <div class="func">

                                        <div class="func_row">
                                            
                                            <!-- 매출, 판매량 -->
                                            <div class="sales">
                                                

                                                <div class="sales_table">
                                                    

                                                    <div class="sales_count">

                                                        <div class="ti">
                                                            6개월<br/>매출액
                                                            
                                                        </div>
                                                        
                                                        <div class="chart">
                                                            <div class="pie" :style="{ background: `conic-gradient(#99a1f3 ${getPercent(product)}%, #f0f0f0 0)` }"></div>
                                                        </div>
                                                        <div class="amount">
                                                            <strong>{{ formatKoreanCurrency(totalPrice) }}</strong>
                                                        <!--    <strong>{{formatKoreanCurrency(product.amount*product.sales)}}</strong> -->
                                                            <span>{{ ((product.amount*product.sales) / totalPrice*100).toFixed(0) }} %</span>
                                                        </div>

                                                    </div>

                                                    <div class="sales_volume">
                                                        <div class="ti">
                                                            6개월<br/>판매량
                                                        </div>
                                                        <div class="amount">
                                                            <strong>{{product.sales.toLocaleString()}}개</strong>
                                                        </div>
                                                    </div>

                                                </div>

                                            </div>
                                            <!--// 매출, 판매량 -->

                                            <!-- 링크 모음 -->
                                            <div class="link">

                                                <button class="btn btn_link">
                                                    <span>링크 바로가기</span>
                                                    <i class="ri-external-link-line"></i>
                                                </button>

                                                <button class="btn btn_review"@click="openReviewModal(product.productCode)">
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
<div class="modal_overlay" v-if="isModalOpen"></div>

<div class="modal modal_pop_product" v-if="isModalOpen && selectedProduct">

    <!-- 팝업 헤더 -->
    <div class="pop_header">

        <!-- 상품목록 -->
        <div class="product_review">

            <div class="thum">
                <!-- 126*126 -->
                <img v-if="selectedProduct && selectedProduct.productImg" :src="'http://localhost:8084/images/product/' + selectedProduct.productImg" alt="">
            </div>
            
            <div class="detail_info">
                <strong class="title">
                    {{ selectedProduct ? selectedProduct.productNm : '' }}
                </strong>

                <div class="add_info">
                    <span class="review">
                        <i class="ri-edit-line"></i> 리뷰갯수 <strong>{{ selectedProduct.reviewCnt }}</strong>개
                    </span>
                    <span class="top_market">
                        Top40 시장규모 <strong>30억</strong>
                    </span>
                    <span class="product_market">
                        해당제품 시장규모(<strong>15%</strong>)
                    </span>
                </div>
            </div>

        </div>

        <button class="btn_modal_close" @click="closeModal">
            <i class="ri-close-large-line"></i>
        </button>
        
    </div>
    <!--// 팝업 헤더 -->

    <!-- 팝업 내용 -->
    <div class="pop_body">

        <div class="review_top">
            <div class="rate_sort">
                <!-- 상품 전체 점수 -->
                <ul class="face_rating">
                    <li v-for="i in Array.from({ length: 5 }, (_, index) => 5 - index)" :key="i">
                        <a href="#" class="title" :class="{ active: i === Math.round(selectedProduct.avgScore) }">
                        <span class="face">
                            <i
                            :class="[
                                'fa-regular',
                                i === 5 ? 'fa-face-kiss-wink-heart' :
                                i === 4 ? 'fa-face-smile-beam' :
                                i === 3 ? 'fa-face-meh' :
                                i === 2 ? 'fa-face-frown' :
                                        'fa-face-angry']">
                            </i>
                        </span>
                        <span class="num">{{ i }}</span>
                        </a>
                    </li>
                </ul>
                <!-- //상품 전체 점수 -->
            </div>
            <div class="func">
                <button class="btn btn_md bg_gray"><i class="fa-regular fa-file-excel"></i> <span>엑셀 다운로드</span></button>
            </div>
        </div>

        <!-- 리뷰 리스트 -->
        <div class="review_list">

            <div class="review_sum">
                총 <strong>{{ reviewList?.length || 0 }}</strong>개
            </div>

            <ul>
                <li v-for="(review, index) in reviewList" :key="review.reviewCode">
                    <div class="cont_txt">
                        <div>{{ review.reviewInfo }}</div>
                    </div>

                    <div class="rate_result">
                        <i v-for="i in 5" :key="i" class="ri-star-fill" :class="{ not: i > review.reviewScore }"></i>
                        <span>{{ new Date(review.insertDt).toLocaleDateString() }}</span>
                    </div>
                </li>

                
            </ul>
        </div>
        <!--// 리뷰 리스트 -->
    </div>
    <!--// 팝업 내용 -->
</div>
                </div>

            </div>

        </div>

    </div>
    <!--// 본문 영역 -->



</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import api from '../../plugins/api'


export default {
  name: "ProductListNaver",
  setup() {
    const productList = ref([])
    const route = useRoute()
    const router = useRouter()
    const keywordCode = route.params.keywordCode || ''
    const keyword = ref(null)
    const totalPrice = ref(0)
    const isModalOpen = ref(false)
    const reviewList = ref([])
    const selectedProductCode = ref(null)
    const selectedProduct = ref(null)

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
      //alert(keywordCode);
    }

    const getListProduct = async() =>{
        try{
            const response = await axios.get('http://localhost:8084/public/getListProductNaver',{
                params: {
                    keywordCode: keywordCode
                }
                })
//            alert(keywordCode)
            if(response.status==200) {
                productList.value = response.data

            } else {
                alert('어디서 오류')
            }

        } catch (error) {
            console.error(error)
        }

    }

    const getTotalPriceNaver = async() =>{
        try{
            const res = await axios.get('http://localhost:8084/public/getTotalPriceNaver',
            {
                params: {keywordCode: keywordCode}
            });

            if(res.status==200) {
                totalPrice.value = res.data
                 console.log("총 매출:", totalPrice.value)
            } else{
                alert('오류')
            }
        } catch (error) {
            console.error(error)
        }
    }
    const getPercent = (product) => {
        if (!product || !product.amount || !product.sales || totalPrice.value === 0) return 0
        return ((product.amount * product.sales) / totalPrice.value * 100).toFixed(1)
    }

    const formatKoreanCurrency = (value) => {
        console.log("formatKoreanCurrency 호출, value:", value)
        if (!value || isNaN(value)) return '0 원'

        const num = Number(value)
        const 억 = Math.floor(num / 100000000)
        const 만 = Math.floor((num % 100000000) / 10000)

        let result = ''
        if (억 > 0) result += `${억}억 `
        if (만 > 0) result += `${만.toLocaleString()}만 `
        if (억 === 0 && 만 === 0) result = `${num.toLocaleString()} `
        return result.trim() + '원'
    }

    const openReviewModal = async (productCode) => {
        console.log('openReviewModal called for productCode:', productCode);
        selectedProductCode.value = productCode;
        isModalOpen.value = true;   // 여기가 꼭 실행되어야 모달 열림
        document.body.style.overflow = 'hidden';
        selectedProduct.value = productList.value.find(p => p.productCode === productCode) || null;
        console.log('selectedProduct:', selectedProduct.value);
        await getListReview();

    }
    const getListReview = async () => {
            try {
                const resp = await axios.get('http://localhost:8084/reviewPop/getListReview', {
                params: { productCode: selectedProductCode.value },
            //    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                })

                if(resp.status==200) {
                reviewList.value = resp.data
        //        productReview.value = res.data
                } else {
                alert('어디서 오류')
            }
            } catch (err) {
                console.error('리뷰 불러오기 실패:', err)
            }
        }
        const closeModal = () => {
            reviewList.value = []               //  값만 초기화
            selectedProduct.value = null        //  제품도 초기화
            isModalOpen.value = false           //  v-if로 모달 제거 유도
            document.body.style.overflow = 'auto'  //  스크롤 되돌리기만 유지
        }

    onMounted(() => {
        getListProduct()
        getTotalPriceNaver()
       
    })

    return {
        isModalOpen,
        
        keyword,
        keywordCode,
        totalPrice,
        selectedProductCode,
        selectedProduct,

        getTotalPriceNaver,
        
        getListProduct,
        keywordDetail,
        productListNaver,
        relKeyword,
        productListCoupang,

        reviewList,
        productList,
        getPercent,
        formatKoreanCurrency,
        openReviewModal,
        closeModal,

    }

  }

}
</script>

<style scoped>


</style>