<template>
   
    <!-- 본문 영역 -->
    <div class="content_page">

        <div class="base_width">

            <div class="content_box_white">

                <div class="content_inline">

                    <h2 class="title_pg">카테고리</h2>
                    <span class="ment">상품 카테고리를 선택하여 원하는 상품을 찾을 수 있습니다.</span>

                    <!-- 카테고리 검색 -->
                    <div class="catagory_search_cont">
                    
                        <!-- 분류 선택 -->
                        <div class="cata_select_box" ref="dropDownRef">

                            <!-- 1차 분류 -->
                            <div class="ui_select">
                                <button class="title_select" :class="{active: openIndex === 1}" @click="dropDownOpen(1)">
                                    <span>{{ selectedCategoryNm || '1차 분류' }}</span>
                                    <i class="fa-solid fa-chevron-down"></i>
                                </button>
                                    <div class="sub_select" v-show="openIndex === 1" name="slide-down">
                                        <ul>
                                            <li v-for="item in categoryList1" :key="item.categoryCode" >
                                                <a href="#" @click.prevent="selectedCategory(item)">{{item.categoryNm}}</a>
                                            </li>
                                        </ul>
                                    </div>
                           
                            </div>
                            <!--// 1차 분류 -->

                            <!-- 2차 분류 -->
                            <div class="ui_select">
                                <button class="title_select" :class="{active: openIndex === 2}" @click="dropDownOpen(2)">
                                    <span>{{ selectedCategoryNm2 || '2차 분류' }}</span>
                                    <i class="fa-solid fa-chevron-down"></i>
                                </button>
                                    <div class="sub_select" v-show="openIndex === 2">
                                        <ul>
                                            <li v-for="item in categoryList2" :key="item.categoryCode">
                                                <a href="#" @click.prevent="selectedCategory2(item)">{{item.categoryNm}}</a>
                                            </li>
                                        </ul>
                                    </div>
                            </div>
                            <!--// 2차 분류 -->

                            <!-- 3차 분류 -->
                            <div class="ui_select" :class="{disabled: isDisabled3}">
                                <button class="title_select" :class="{active: openIndex === 3}" @click="dropDownOpen(3)" :disabled="isDisabled3">
                                    <span>{{ selectedCategoryNm3 || '3차 분류' }}</span>
                                    <i class="fa-solid fa-chevron-down"></i>
                                </button>

                                    <div class="sub_select" v-show="openIndex === 3">
                                        <ul>
                                            <li v-for="item in categoryList3" :key="item.categoryCode">
                                                <a href="#" @click.prevent="selectedCategory3(item)">{{item.categoryNm}}</a>
                                            </li>
                                        </ul>
                                    </div>
                            </div>
                            <!--// 3차 분류 -->

                            <!-- 4차 분류 -->
                            <div class="ui_select" :class="{disabled: isDisabled4}">
                                <button class="title_select" :class="{active: openIndex === 4}" @click="dropDownOpen(4)" :disabled="isDisabled4" >
                                    <span>{{ selectedCategoryNm4 || '4차 분류' }}</span>
                                    <i class="fa-solid fa-chevron-down"></i>
                                </button>
                                    <div class="sub_select" v-show="openIndex === 4">
                                        <ul>
                                            <li v-for="item in categoryList4" :key="item.categoryCode">
                                                <a href="#" @click.prevent="selectedCategory4(item)">{{item.categoryNm}}</a>
                                            </li>
                                        </ul>
                                    </div>
                            </div>
                            <!--// 4차 분류 -->

                            <!-- 체크박스 -->
                            <div class="direct_search_check">
                                <input type="checkbox" id="direct_search" v-model="isDirectSearch">
                                <label for="direct_search">직접 검색하기</label>
                            </div>
                            <!--// 체크박스 -->

                        </div>
                        <!--// 분류 선택 -->

                        <!-- 검색 옵션 선택 -->
                        <div class="search_option_box">
                            <table class="table_search_option">
                                <colgroup>
                                    <col width="15%"/>
                                    <col width="35%"/>
                                    <col width="15%"/>
                                    <col width="35%"/>
                                </colgroup>

                                <tr>
                                    <th>키워드 유형</th>
                                    <td colspan="3">
                                        <div class="keyword_type_select">
                                            <input type="radio" name="keyword_type" id="keyword_type_total" value="" v-model="keywordType">
                                            <label for="keyword_type_total">전체</label>

                                            <input type="radio" name="keyword_type" id="keyword_type_shopping" value="KEYWORD_TYPE_01" v-model="keywordType">
                                            <label for="keyword_type_shopping">쇼핑성</label>

                                            <input type="radio" name="keyword_type" id="keyword_type_infomation" value="KEYWORD_TYPE_02" v-model="keywordType">
                                            <label for="keyword_type_infomation">정보성</label>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>검색량</th>
                                    <td colspan="3">
                                        <div class="vlaue_term_box">
                                            <input type="text" placeholder="최소값 입력" v-model.number="searchMin"> ~
                                            <input type="text" placeholder="최대값 입력" v-model.number="searchMax">
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>PC 검색량</th>
                                    <td>
                                        <div class="vlaue_term_box">
                                            <input type="text" placeholder="최소값 입력" v-model.number="searchPcMin"> ~
                                            <input type="text" placeholder="최대값 입력" v-model.number="searchPcMax">
                                        </div>
                                    </td>
                                    <th>모바일 검색량</th>
                                    <td>
                                        <div class="vlaue_term_box">
                                            <input type="text" placeholder="최소값 입력" v-model.number="searchMobileMin"> ~
                                            <input type="text" placeholder="최대값 입력" v-model.number="searchMobileMax">
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>평균노출 광고 수</th>
                                    <td colspan="3">
                                        <div class="vlaue_term_box">
                                            <input type="text" placeholder="최소값 입력" v-model.number="advMin"> ~
                                            <input type="text" placeholder="최대값 입력" v-model.number="advMax">
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th>키워드명</th>
                                    <td colspan="3">
                                        <div class="vlaue_term_box_full">
                                            <input type="text" v-model="keywordNm" class="" placeholder="검색 할 키워드 입력">
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <!--// 검색 옵션 선택 -->

                        <!-- 검색 버튼 -->
                        <div class="botton_box">
                            <button class="btn btn_mx bg_primary"><i class="fa-solid fa-magnifying-glass" @click="getListKeyword"></i> <span>검색</span></button>
                        </div>
                        <!--// 검색 버튼 -->

                    </div>
                    <!--// 카테고리 검색 -->

                    <!-- 직접 검색 -->
                    <div class="direct_search_cont" v-show="isDirectSearch">

                        <div class="direct_search_box">
                            <input type="text" v-model="keywordNm" class="" placeholder="찾고 싶은 키워드를 입력하세요.">
                            <button class="btn btn_mx bg_primary"><i class="fa-solid fa-magnifying-glass" ></i> <span>검색asd</span></button>
                        </div>

                        <a href="#" class="btn_catagory_search_view" @click.prevent="isDirectSearch = false"><i class="fa-solid fa-arrow-left"></i> 카테고리 검색하기로 돌아가기</a>

                    </div>
                    <!--// 직접 검색 -->


                </div>
            </div>
            <div class="content_box_white">

                <div class="content_header">

                    <div class="left">
                        <h2 class="title_header">
                            키워드 검색 <span>{{ res.length }}</span>개
                        </h2>

                        <div class="search_term">
                            <i class="fa-regular fa-calendar-check"></i> {{ startDate }} ~ {{ endDate }}
                        </div>

                        <div class="view_check" v-if="userId">
                            <input type="checkbox" id="checkOnly" :checked="checkSelectOnly" @change="handleCheckOnly" />
                            <label for="checkOnly">찜한 키워드만 보기</label>
                        </div>
                    </div>

                    <div class="right">
                        <button @click="downloadExcel" class="btn btn_md bg_white">
                            <i class="fa-regular fa-file-excel">
                            </i>
                            <span>엑셀 다운로드</span>
                        </button>
                    </div>                    
                    
                </div>

                <div v-if="res.length > 0">
                    <div class="content_body">
                        <div class="table_container_outer">
                            <div class="table_container">

                                <table id="table_keyword_searchresult" class="table_keyword_searchresult">
                                    <colgroup>
                                        <col width="6%" />
                                        <col width="8%" />
                                        <col width="" />
                                        <col width="10%" />
                                        <col width="15%" />
                                        <col width="15%" />
                                        <col width="15%" />
                                        <col width="15%" />
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th v-if="userId"></th>
                                            <th>번호</th>
                                            <th>키워드</th>
                                            <th>키워드 분류 <a href="#" class="btn_sort_toggle" @click.prevent="toggleSort('keywordType')"><i :class="sortKey === 'keywordType' ? (sortOrder === 'asc' ? 'ri-arrow-up-line' : 'ri-arrow-down-line') : 'ri-expand-up-down-fill'"></i></a></th>
                                            <th>검색량 <a href="#" class="btn_sort_toggle" @click.prevent="toggleSort('totalSearch')"><i :class="sortKey === 'totalSearch' ? (sortOrder === 'asc' ? 'ri-arrow-up-line' : 'ri-arrow-down-line') : 'ri-expand-up-down-fill'"></i></a></th>
                                            <th>PC검색량 <a href="#" class="btn_sort_toggle" @click.prevent="toggleSort('searchPc')"><i :class="sortKey === 'searchPc' ? (sortOrder === 'asc' ? 'ri-arrow-up-line' : 'ri-arrow-down-line') : 'ri-expand-up-down-fill'"></i></a></th>
                                            <th>모바일 검색량 <a href="#" class="btn_sort_toggle" @click.prevent="toggleSort('searchMobile')"><i :class="sortKey === 'searchMobile' ? (sortOrder === 'asc' ? 'ri-arrow-up-line' : 'ri-arrow-down-line') : 'ri-expand-up-down-fill'"></i></a></th>
                                            <th>월평균 노출광고수 <a href="#" class="btn_sort_toggle" @click.prevent="toggleSort('averageAdv')"><i :class="sortKey === 'averageAdv' ? (sortOrder === 'asc' ? 'ri-arrow-up-line' : 'ri-arrow-down-line') : 'ri-expand-up-down-fill'"></i></a></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="keyword  in filteredRes" :key="keyword.keywordCode">
                                            <td class="label_keep" v-if="keyword.userId"><i :class="['fa-heart', 'keep', keyword.checkSelect === 'Y' ? 'fa-solid keep_on' : 'fa-regular']" @click.stop="checkFavorite(keyword)"></i></td>
                                            <!-- <td class="label_keep"><i class="fa-solid fa-heart keep keep_on"></i></td>
                                            <td class="label_keep"><i class="fa-regular fa-heart keep"></i></td> -->
                                            <td @click="detailKeyword(keyword.keywordCode)">{{ keyword.rseq }}</td>
                                            <td @click="detailKeyword(keyword.keywordCode)">{{ keyword.keywordNm }}</td>
                                            <td @click="detailKeyword(keyword.keywordCode)">{{ keyword.keywordTypeNm }}</td>
                                            <td @click="detailKeyword(keyword.keywordCode)">{{ keyword.totalSearch }}</td>
                                            <td @click="detailKeyword(keyword.keywordCode)">{{ keyword.searchPc }}</td>
                                            <td @click="detailKeyword(keyword.keywordCode)">{{ keyword.searchMobile }}</td>
                                            <td @click="detailKeyword(keyword.keywordCode)">{{ keyword.averageAdv }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="content_box_white" v-else>
                    <div class="blank_content">
                        <i class="fa-solid fa-magnifying-glass-plus"></i>
                        <span>검색된 내용이 없습니다.<br/><strong>카테고리</strong>를 선택하신 후 <strong>검색</strong>을 해주세요.</span>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
    
    <!--// 본문 영역 -->

    <!-- 모달 팝업 : modal_small -->
<div class="modal_overlay" v-if="isModalOpen"></div>

<div class="modal modal_common_pop modal_small" id="modal_small" v-if="isModalOpen" @click.stop>

    <!-- 팝업 헤더 -->
    <div class="pop_header">
        <h3>로그인이 필요해요.</h3>
        <button class="btn_modal_close" @click="closeModalPopUp"><i class="ri-close-large-line"></i></button>        
    </div>
    <!--// 팝업 헤더 -->

    <!-- 팝업 내용 -->
    <div class="pop_body">
        이 기능은 로그인이 필요합니다.
        <br>로그인 페이지로 이동하시겠습니까?
    </div>
    <!--// 팝업 내용 -->

    <!-- 팝업 하단 버튼 영역 -->
    <div class="pop_footer">
        <button class="btn bg_gray" @click="closeModalPopUp">취소</button>
        <button class="btn bg_blue" @click="goLogIn">확인</button>
    </div>
    <!--// 팝업 하단 버튼 영역 -->

</div>
<!--// 모달 팝업 : modal_small -->
<!-- <div class="modal_screen"></div> -->

</template>

<script>
import { useAuthPinia } from '../../store/authPinia'

import { onMounted, onBeforeUnmount,ref } from 'vue'

import axios from 'axios'

import { useRouter } from 'vue-router'

import { computed } from 'vue'

import api from '../../plugins/api'

import { openModalBackGround } from '../../utils/globalFunctions'
import { closeModalBackGround } from '../../utils/globalFunctions'
import { useModalStore } from '../../store/modal';

export default {
    name: 'CategoryList',
    setup() {
        const modalStore = useModalStore();
        const isModalOpen = ref(false)

        const sortKey = ref('')
        const sortOrder = ref('asc')
        const checkSelectOnly = ref(false)
        const checkSelect = ref(null)

        const authStore = useAuthPinia()
        const userId = computed(() => authStore.userId)

    const startDate = ref('')
    const endDate = ref('') 
    const dropDownRef = ref(null)
    // const Open1 = ref(false)
    // const Open2 = ref(false)
    // const Open3 = ref(false)
    // const Open4 = ref(false)
    const openIndex = ref(null)
    const dropDownOpen = (index) => {
        openIndex.value = openIndex.value === index? null : index
    //     if (index === 4 && selectedCategoryCode4.value) {
    //     getListKeyword();
    // }
    }

    const selectedCategoryNm = ref('')
    const selectedCategoryNm2 = ref('')
    const selectedCategoryNm3 = ref('')
    const selectedCategoryNm4 = ref('')


    const selectedCategoryCode = ref('')
    const selectedCategoryCode2 = ref('')
    const selectedCategoryCode3 = ref('')
    const selectedCategoryCode4 = ref('')


    const categoryList1 = ref([])
    const categoryList2 = ref([])
    const categoryList3 = ref([])
    const categoryList4 = ref([])


    const isDisabled3 = ref(true)
    const isDisabled4 = ref(true)

    const res = ref([]);

    const searchMin = ref(null)
    const searchMax = ref(null)
    const searchPcMin = ref(null)
    const searchPcMax = ref(null)
    const searchMobileMin = ref(null)
    const searchMobileMax = ref(null)
    const advMin = ref(null)
    const advMax = ref(null)
    const keywordNm = ref('')
    const keywordType = ref('')
    const isDirectSearch = ref(false)
    const directSearchInput = ref('')
    const router = useRouter()
    const goLogIn = () => {
        closeModalBackGround()
        router.push('/LogIn/')
    }
    

    const filteredRes = computed(() => {
        /*
        let data = [...res.value]

        if (onlyChecked.value) {
            data = data.filter(item => item.checkSelect === 'Y')
        }

        if (sortKey.value) {
            data.sort((a, b) => {
                const valA = a[sortKey.value]
                const valB = b[sortKey.value]

                if (typeof valA === 'string') {
                    return sortOrder.value === 'asc'
                        ? valA.localeCompare(valB)
                        : valB.localeCompare(valA)
                }

                return sortOrder.value === 'asc' ? valA - valB : valB - valA
            })
        }

        return data
                */
      
        return res.value
    })
    const checkFavorite = async (keyword) => {
        try {
            const resp = await api.post('/user/keyword/checkFavorite', {
                keywordCode: keyword.keywordCode
            });

            keyword.checkSelect = resp.data
            getListKeyword();
        } catch (error) {
            console.error('찜 상태 변경 실패:', error)
            alert('찜 처리 중 오류가 발생했습니다.')
        }
    }


    const formatDate = (date) => {
      const yyyy = date.getFullYear()
      const mm = String(date.getMonth() + 1).padStart(2, '0')  // 월은 0부터 시작하니까 +1
      const dd = String(date.getDate()).padStart(2, '0')
      return `${yyyy}.${mm}.${dd}`
    }

    const selectedCategory = (item) => {
        if(selectedCategoryCode.value === item.categoryCode) {
            openIndex.value = null
            return
        }

        selectedCategoryNm.value = item.categoryNm
        selectedCategoryCode.value = item.categoryCode
        openIndex.value = null
        getListKeyword();  

        selectedCategoryNm2.value = ''
        selectedCategoryCode2.value = ''
        categoryList2.value = []

        selectedCategoryNm3.value = ''
        selectedCategoryCode3.value = ''
        categoryList3.value = []
        isDisabled3.value = true

        selectedCategoryNm4.value = ''
        selectedCategoryCode4.value = ''
        categoryList4.value = []
        isDisabled4.value = true

        getSubCategory()
    }
    const selectedCategory2 = (item) => {
        if(selectedCategoryCode2.value === item.categoryCode) {
            openIndex.value = null
            return
        }

        selectedCategoryNm2.value = item.categoryNm
        selectedCategoryCode2.value = item.categoryCode
        openIndex.value = null

        getListKeyword();

        selectedCategoryNm3.value = ''
        selectedCategoryCode3.value = ''
        categoryList3.value = []
        isDisabled3.value = true

        selectedCategoryNm4.value = ''
        selectedCategoryCode4.value = ''
        categoryList4.value = []
        isDisabled4.value = true

        getSubCategory2()
    }
    const selectedCategory3 = (item) => {
        if(selectedCategoryCode3.value === item.categoryCode) {
            openIndex.value = null
            return
        }

        selectedCategoryNm3.value = item.categoryNm
        selectedCategoryCode3.value = item.categoryCode
        openIndex.value = null
        getSubCategory3()
        getListKeyword();

        selectedCategoryNm4.value = ''
        selectedCategoryCode4.value = ''
        categoryList4.value = []
        isDisabled4.value = true
    }
    const selectedCategory4 = (item) => {
        selectedCategoryNm4.value = item.categoryNm
        selectedCategoryCode4.value = item.categoryCode
        openIndex.value = null
          
        getListKeyword();
    
    }
    

    const category = ref([])
    const toggleSort = (column) => {
        if (sortKey.value === column) {
            sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
        } else {
            sortKey.value = column
            sortOrder.value = 'desc'
        }
        getListKeyword();
    }

    const toggleCheckSelect = () => {
        checkSelect.value = checkSelectOnly.value ? 'Y' : null
        getListKeyword()
    }

    const outsideClick = (event) => {
        if (dropDownRef.value && !dropDownRef.value.contains(event.target)) {
            
            openIndex.value = null
            // Open1.value = false
            // Open2.value = false
            // Open3.value = false
            // Open4.value = false
            
        }
    }

    
   
    const getTopCategory = async() =>{
        
        try{
            
            const response = await axios.get('http://localhost:8084/public/category/getTopCategory'
        //      ,
        //  {
        //    headers: {
                   
        //  },
        //   withCredentials: true
        // }
            )

            console.log(response);
                if(response.status==200) {
        
                    categoryList1.value = response.data
                }
                else{
                    alert("잘못된 요청입니다.");
                }
        } catch (error){
            console.error(error)

        }
    }

    const getSubCategory = async() =>{
        try{
            const response = await axios.get('http://localhost:8084/public/category/getSubCategory',{
                params:{
                  parentCode:  selectedCategoryCode.value
                }
                }
        
            )
            if(response.status==200) {
           
                categoryList2.value = response.data
                
            }
            else{
              alert("잘못된 요청입니다.");
        }

        } catch (error){
            console.error(error)
            
        }

    }
    const getSubCategory2 = async() =>{
        try{
            const response = await axios.get('http://localhost:8084/public/category/getSubCategory',{
                params:{
                  parentCode:  selectedCategoryCode2.value
                }
            })
            if(response.status==200) {
          
                categoryList3.value = response.data
                isDisabled3.value = response.data.length === 0
            }
            else{
              alert("잘못된 요청입니다.");
        }

        } catch (error){
            console.error(error)
            isDisabled3.value = true
        }

    }
    const getSubCategory3 = async() =>{
        try{
            const response = await axios.get('http://localhost:8084/public/category/getSubCategory',{
                params:{
                  parentCode:  selectedCategoryCode3.value
                }
            })
            if(response.status==200) {
   
                categoryList4.value = response.data
                isDisabled4.value = response.data.length === 0
              
            }
            else{
              alert("잘못된 요청입니다.");
        }

        } catch (error){
            console.error(error)
           isDisabled4.value = true
        }

    }
    const getListKeyword = async() =>{

         let parentCode = '';

            if (selectedCategoryCode4.value) {
                parentCode = selectedCategoryCode4.value;
            } else if (selectedCategoryCode3.value) {
                parentCode = selectedCategoryCode3.value;
            } else if (selectedCategoryCode2.value) {
                parentCode = selectedCategoryCode2.value;
            } else  {
                parentCode = selectedCategoryCode.value;
            }
            alert(parentCode + 'asdasd')

            if (!parentCode && !isDirectSearch.value) {
                alert("카테고리를 선택해주세요.");
                return;
            } 

            const params = isDirectSearch.value
            ? { keywordNm: directSearchInput.value }
            : {
                categoryCode: parentCode || null,
                keywordType: keywordType.value,
                totalSearchMin: searchMin.value,
                totalSearchMax: searchMax.value,
                pcSearchMin: searchPcMin.value,
                pcSearchMax: searchPcMax.value,
                mobileSearchMin: searchMobileMin.value,
                mobileSearchMax: searchMobileMax.value,
                averageAdvMin: advMin.value,
                averageAdvMax: advMax.value,
                keywordNm: keywordNm.value,
                sortKey: sortKey.value,
                sortOrder: sortOrder.value,
                checkSelect: checkSelect.value,
            };
            
        try{
            const response = await api.post('http://localhost:8084/user/keyword/getListKeyword', params)
         //   alert(parentCode +'여기는')
    
            if(response.status==200) {
   
                res.value = response.data
        //          alert(parentCode)
              
            } else {
        //    alert(parentCode + '어디서 오류')
            }

        } catch (error){
        //    alert(parentCode + '여기서 오류')
            
           
        }


    }
    /*
    const getListKeywordDirect = async() =>{

            const params = isDirectSearch.value
            ? { keywordNm: keywordNm.value }
            : {
                keywordNm: keywordNm.value};
            
        try{
            const response = await axios.post('http://localhost:8084/public/getListKeyword', params)
       
            if(response.status==200) {
   
                keywordDirect.value = response.data
                  alert(parentCode)
              
            } else {
            alert(parentCode + '어디서 오류')
            }

        } catch (error){
            alert(parentCode + '여기서 오류')
            
           
        }


    }
*/
    const handleCheckOnly = (event) => {
        if (!userId.value) {
            alert('로그인 후 이용 가능합니다.')
            event.target.checked = false // 강제로 체크 해제
            return
        }

        checkSelectOnly.value = event.target.checked
        toggleCheckSelect() // 기존 동작 수행
    }

    const downloadExcel = async () => {
        try {
            const parentCode =
                selectedCategoryCode4.value ||
                selectedCategoryCode3.value ||
                selectedCategoryCode2.value ||
                selectedCategoryCode.value;

            if (!parentCode) {
                alert('카테고리를 먼저 선택해주세요.');
                return;
            }
            const params = {
                categoryCode: parentCode,
                keywordType: keywordType.value,
                totalSearchMin: searchMin.value,
                totalSearchMax: searchMax.value,
                pcSearchMin: searchPcMin.value,
                pcSearchMax: searchPcMax.value,
                mobileSearchMin: searchMobileMin.value,
                mobileSearchMax: searchMobileMax.value,
                averageAdvMin: advMin.value,
                averageAdvMax: advMax.value,
                keywordNm: keywordNm.value,
                sortKey: sortKey.value,
                sortOrder: sortOrder.value,
                checkSelect: checkSelect.value,
            };

            const response = await api.get('http://localhost:8084/public/keyword/downloadKeywordExcel', {
                params: params,
                responseType: 'blob'
            });

            const blob = new Blob([response.data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
            const url = window.URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;
            link.download = 'keyword_list.xlsx';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('엑셀 다운로드 중 오류:', error);
            alert('엑셀 다운로드 실패');
        }

    }
    

    const detailKeyword = async(keywordCode) =>{
        if(!userId.value) {
            openModalPopUp()
            
            return
        }
        router.push('/KeywordDetail/' + keywordCode)
  //  alert(keywordCode);
    }

    const openModalPopUp = () => {
        openModalBackGround()
        isModalOpen.value = true;  
    }
    const closeModalPopUp = () => {
        closeModalBackGround()
        isModalOpen.value = false
    }


    
    onMounted(() => {
        getTopCategory()
        document.addEventListener('click', outsideClick);

        const today = new Date()
        const before30 = new Date()
        before30.setDate(today.getDate() - 30)

        startDate.value = formatDate(before30)
        endDate.value = formatDate(today)
       
    })

    onBeforeUnmount(() => {
        document.removeEventListener('click', outsideClick);
    })

    return {
        isModalOpen,
        closeModalPopUp,

        category,
        selectedCategoryNm,
        selectedCategoryNm2,
        selectedCategoryNm3,
        selectedCategoryNm4,

        selectedCategory,
        selectedCategory2,
        selectedCategory3,
        selectedCategory4,

        categoryList1,
        categoryList2,
        categoryList3,
        categoryList4,

        // Open1,
        // Open2,
        // Open3,
        // Open4,
        openIndex,
        dropDownRef,
        dropDownOpen,

        isDisabled3,
        isDisabled4,

        res,

        isDirectSearch,
        directSearchInput,
        keywordType,

        searchMax,
        searchMin,
        searchPcMax,
        searchPcMin,
        searchMobileMax,
        searchMobileMin,
        advMax,
        advMin,
        
        getListKeyword,
        detailKeyword,

        keywordNm,
        downloadExcel,

        startDate,
        endDate,

        
        filteredRes,
        checkFavorite,

        toggleSort,
        sortKey,
        sortOrder,

        checkSelectOnly,
        checkSelect,
        toggleCheckSelect,
        handleCheckOnly,
        goLogIn,
        userId,
    }
    


    },



}

</script>



<style scoped>
/* 
.slide-down-enter-active, .slide-down-leave-active {
  transition: all 0.9s ease;
  overflow: hidden;
}
.slide-down-enter-from {
  max-height: 0;
  opacity: 0;
  transform: translateY(-20px);
}
.slide-down-enter-to {
  max-height: 500px; 
  opacity: 1;
  transform: translateY(0);
}
.slide-down-leave-from {
  max-height: 500px;
  opacity: 1;
  transform: translateY(0);
}
.slide-down-leave-to {
  max-height: 0;
  opacity: 0;
  transform: translateY(-20px);
} */


</style>