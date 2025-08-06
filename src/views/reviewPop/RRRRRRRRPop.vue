<template>
    <div class="popup-wrap">
        <h2>하위권 리뷰 분석</h2>
        <p>상품 코드: {{ productCode }}</p>
        <!-- 리뷰 분석 내용 출력 -->
    </div>
    <div class="modal modal_pop_product" id="modal_pop_product" v-if="isModalOpen && selectedProduct">

        <!-- 팝업 헤더 -->
        <div class="pop_header">

            <!-- 상품목록 -->
            <div class="product_review">

                <div class="thum">
                    <!-- 126*126 -->
                    <img v-if="product?.productImg" :src="`http://localhost:8084/images/product/${product.productImg}`" alt="">
                </div>
                
                <div class="detail_info">
                    <strong class="title">{{ product?.productNm }}</strong>

                    <div class="add_info">
                        <span class="review">
                            <i class="ri-edit-line"></i> 리뷰갯수 <strong>{{ product.reviewCnt }}</strong>개
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

            <button class="btn_modal_close" @click="close"><i class="ri-close-large-line"></i></button>
            
        </div>
        <!--// 팝업 헤더 -->

        <!-- 팝업 내용 -->
        <div class="pop_body">

            <div class="review_top">
                <div class="rate_sort">
                    <ul class="face_rating">
                        <li v-for="i in [5,4,3,2,1]" :key="i">
                            <a href="#" class="title" :class="{ active: i === Math.round(product.avgScore) }">
                                <span class="face">
                                    <i class="fa-regular fa-face-kiss-wink-heart"></i></span>
                                <span class="num">{{ i }}</span>
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="func">
                    <button @click="downloadExcel" class="btn btn_md bg_gray">
                        <i class="fa-regular fa-file-excel"></i> <span>엑셀 다운로드</span>
                    </button>
                </div>
            </div>

            <!-- 리뷰 리스트 -->
            <div class="review_list">

                <div class="review_sum">
                    총 <strong>{{ reviews?.length || 0 }}</strong>개
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

    <div class="modal_screen" v-if="isOpen"></div>
</template>

<script>
import { useAuthPinia } from '../../store/authPinia'
import { ref,onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'



export default {
    name: "ReviewList",
    setup() {
        const route = useRoute()
        const router = useRouter()
        const productCode = ref(route.query.productCode || '')
        const reviewList = ref([])

        const auth = useAuthPinia()
        
        const getListReview = async () => {
            try {
                const response = await axios.get('http://localhost:8084/reviewPop/getListReview', {
                params: { productCode: productCode.value },
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                })
                if(response.status==200) {
                reviewList.value = response.data
        //        productReview.value = res.data
                } else {
                alert('어디서 오류')
            }
            } catch (err) {
                console.error('리뷰 불러오기 실패:', err)
            }
        }
        const closeModal = () => {
            const modal = document.querySelector('.modal')
            modal.style.display = 'none'
            const screen = document.querySelector('.modal_screen')
            if (screen) screen.remove()
            document.body.style.overflow = 'auto'
        }
    /*    const getProductReview = async () => {
            try{
                const res = await axios.post('http://localhost:8084/reviewPop/getProductReview',{
                    params: { productCode: productCode.value }
                })
                if(res.status==200) {
                    product
                }else {
                alert('어디서 오류')
            }
            }   catch(err) {
                console.error('리뷰 불러오기 실패:', err)
            }
        }
        */

        onMounted(() => {
            getListReview()
            
        })
        return {
            getListReview,
            productCode,
            reviewList,
            closeModal
        }

    }

/*
    // 모달 팝업 띄우기 ///////////////////////////////////////
    function modalpop(popname){
        $(popname).show();
        $('body').append('<div class="modal_screen"></div>');
        document.body.style.overflow = 'hidden';
        return false;
    }
    
    // 모달 팝업 닫기
    $('.btn_modal_close').click(function(){
        $('.modal').hide();
        $('div').remove('.modal_screen');
        document.body.style.overflow = 'auto';
        return false;
    }); 
  */

  


}
</script>

<style scoped>

</style>