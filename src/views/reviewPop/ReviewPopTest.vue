 <!-- 모달 팝업 -->
                    <div class="modal modal_pop_product" id="modal_pop_product" v-if="isModalOpen && selectedProduct">

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
                                                <i :class="[ 'fa-regular',
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
                                    <button @click="downloadExcelReview" class="btn btn_md bg_gray"><i class="fa-regular fa-file-excel"></i> <span>엑셀 다운로드</span></button>
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
                    <!--// 모달 팝업 -->
