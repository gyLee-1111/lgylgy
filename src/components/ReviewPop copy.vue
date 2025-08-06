<template>
    
    <div class="modal modal_pop_product" id="modal_pop_product" v-if="isModalOpen && product">
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

                    <div class="add_info" v-if="showMarketInfo">
                        <span class="review">
                            <i class="ri-edit-line"></i> 리뷰갯수 <strong>{{ product.reviewCnt }}</strong>개
                        </span>
                        <span class="top_market">
                            Top10 시장규모 <strong>{{ formatKoreanCurrency(totalPrice) }}</strong>
                        </span>
                        <span class="product_market">
                            해당제품 시장규모(<strong>{{ ((product.amount*product.sales) / totalPrice*100).toFixed(0) }} %</strong>)
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
                                    <i :class="[
                                        'fa-regular',
                                        i === 5 ? 'fa-face-kiss-wink-heart' :
                                        i === 4 ? 'fa-face-smile-beam' :
                                        i === 3 ? 'fa-face-meh' :
                                        i === 2 ? 'fa-face-frown' :
                                                    'fa-face-angry'
                                        ]">
                                    </i>
                                </span>
                                <span class="num">{{ i }}</span>
                            </a>
                        </li>
                        
                    </ul>
                </div>
                <div class="func">
                    <button @click="downloadExcelReview" class="btn btn_md bg_gray">
                        <i class="fa-regular fa-file-excel"></i> <span>엑셀 다운로드</span>
                    </button>
                </div>
            </div>

            <!-- 리뷰 리스트 -->
            <div class="review_list">

                <div class="review_sum">
                    총 <strong>{{ reviewList.length }}</strong>개
                </div>

                <ul>
                    <li v-for="review in reviewList" :key="review.reviewCode">
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

    <!-- <div class="modal_screen" v-if="isOpen"></div> -->
</template>

<script>
import { ref,watch,onMounted } from 'vue'
import axios from 'axios'
// import { useRoute, useRouter } from 'vue-router'
import api from '../plugins/api'

export default {
    name: "ReviewPop",
    props: {
        product: Object,
        isModalOpen: Boolean,
        selectedProductCode: String,
        showMarketInfo: {
            type: Boolean,
            default: true
        }
    },
    emits: ['close'],
    setup(props, { emit }) {
        const productCode = ref(props.selectedProductCode || '')
        const totalPrice = ref(0)
        const reviewList = ref([])

        const getListReview = async () => {
            try {
                const response = await api.get('http://localhost:8084/reviewPop/getListReview', {
                params: { productCode: productCode.value },
        //        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                })
                if(response.status === 200) {
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
            emit('close')  // 부모에 close 이벤트 전달
            document.body.style.overflow = 'auto'
        }

        const downloadExcelReview = async () => {
        try {
            const res = await api.get('http://localhost:8084/reviewPop/downloadExcelReview', {
                params: {productCode: productCode.value},
                responseType: 'blob'
            });

            const blob = new Blob([res.data], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            });

            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'review_list.xlsx';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('엑셀 다운로드 중 오류:', error);
            alert('엑셀 다운로드 실패');
            }
        }
        const getTotalPriceNaver = async() =>{
        try{
            const resp = await api.get('http://localhost:8084/reviewPop/getTotalPriceReview',
            {
                params: {productCode: productCode.value}
            });

            if(resp.status==200) {
                totalPrice.value = resp.data
                 console.log("총 매출:", totalPrice.value)
            } else{
                alert('오류')
            }
        } catch (error) {
            console.error(error)
            }
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

        watch(()=> props.selectedProductCode, (newCode) => { 
            productCode.value = newCode
            if (newCode) getListReview()
        }, { immediate: true })
    /*  
        const getProductReview = async () => {
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

            if (props.selectedProductCode) {
                getListReview()
            }
            getTotalPriceNaver()
            
        })
        return {
            getTotalPriceNaver,
            productCode,
            reviewList,
            close: closeModal,
            product: props.product,
            downloadExcelReview,
            formatKoreanCurrency,
            totalPrice,
        }

    }

}
</script>

<style scoped>

</style>