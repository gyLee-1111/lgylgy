<!-- <template>
<!-- 모달 팝업 -->
<div class="modal modal_pop_product" id="modal_pop_product" style="display:none;">

    <!-- 팝업 헤더 -->
    <div class="pop_header">

        <!-- 상품목록 -->
        <div class="product_review">

            <div class="thum">
                <!-- 126*126 -->
                <img src="../images/sub/product_list_thum.png" alt="">
            </div>
            
            <div class="detail_info">
                <strong class="title">
                    오아 클린이워터B 휴대용 무선 치아 구강세정기 물치실 칫솔 치간 세척기 오아 클린이워터B 
                </strong>

                <div class="add_info">
                    <span class="review">
                        <i class="ri-edit-line"></i> 리뷰갯수 <strong>1220</strong>개
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

        <button class="btn_modal_close"><i class="ri-close-large-line"></i></button>
        
    </div>
    <!--// 팝업 헤더 -->

    <!-- 팝업 내용 -->
    <div class="pop_body">

        <div class="review_top">
            <div class="rate_sort">
                <ul>
                    <li>
                        <a href="#" class="title">
                            <span class="face"><i class="fa-regular fa-face-kiss-wink-heart"></i></span>
                            <span class="num">5</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="title active">
                            <span class="face"><i class="fa-regular fa-face-smile-beam"></i></span>
                            <span class="num">4</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="title">
                            <span class="face"><i class="fa-regular fa-face-meh"></i></span>
                            <span class="num">3</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="title">
                            <span class="face"><i class="fa-regular fa-face-frown"></i></span>
                            <span class="num">2</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="title">
                            <span class="face"><i class="fa-regular fa-face-angry"></i></span>
                            <span class="num">1</span>
                        </a>
                    </li>
                </ul>
            </div>
            <div class="func">
                <button class="btn btn_md bg_gray"><i class="fa-regular fa-file-excel"></i> <span>엑셀 다운로드</span></button>
            </div>
        </div>

        <!-- 리뷰 리스트 -->
        <div class="review_list">

            <div class="review_sum">
                총 <strong>1230</strong>개
            </div>

            <ul>
                <li>
                    <div class="cont_txt">
                        크로스액션 오랄비 칫솔은 칫솔 교체시기를 쉽게 알 수 있는데요. 평균 3개월 기준으로 교체해주는게 좋다고 해요. 
                        이 제품은 파란색 모의 색깔이 변했을 때 바꿔주면 된다고 합니다. 그리고 사실 이런건 둘째치고 세정력이 정말 좋아요. 
                        어금니 뒤쪽까지 파워팁 칫솔모가 닿기 때문에 깨끗하게 닦이는 느낌이 들어요. 빗살모양으로 되어있는 칫솔모는 
                        놓치기 쉬운 이물질이 잘 끼는 잇몸선 안쪽까지도 세정해주고요. 이는 잇몸 마사지 기능까지 더해줍니다. 

                        뒷면으로는 혀클리너를 대체할 수 있어요. 오랄비 칫솔 라인업이 꽤나 다양한데 그 중에서도 저는 크로스액션 탁월한 
                        세정력 제품을 선호하며 쭉 쓰고 있어요. 세정에 있어 보다 강력하게 특화된 제품이라 보시면 됩니다. 
                        모도 너무 강하지 않고 부드러운편으로 약한 잇몸인 분들도 크게 불편함없이 사용할 수 있을 것 같아요. 
                    </div>

                    <div class="rate_result">
                        <i class="ri-star-fill"></i>
                        <i class="ri-star-fill"></i>
                        <i class="ri-star-fill not"></i>
                        <i class="ri-star-fill not"></i>
                        <i class="ri-star-fill not"></i>
                        <span>2024.07.21</span>
                    </div>
                </li>

            </ul>
        </div>
        <!--// 리뷰 리스트 -->
    </div>
    <!--// 팝업 내용 -->

</div>
<!--// 모달 팝업 -->

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

</style> -->