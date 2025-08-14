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
                            <li>
                                <a href="#" @click.prevent="productListNaver">
                                    <span class="icon">
                                        <i class="ri-list-indefinite"></i>
                                    </span>
                                    <span class="title">상품 목록</span>
                                </a>
                            </li>
                            <li class="active">
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

                <div class="content_header mg_t20">

                    <div class="left">
                        <h2 class="title_header">
                            연관키워드 상위 <span>50</span>개
                        </h2>

                        <div class="search_term">
                            <i class="fa-regular fa-calendar-check"></i> {{ startDate }} ~ {{ endDate }}
                        </div>
                    </div>

                    <div class="right">
                        <button @click="downloadExcelRelKeyword" class="btn btn_md bg_white">
                            <i class="fa-regular fa-file-excel"></i>
                            <span>엑셀 다운로드</span>
                        </button>
                    </div>  
                    
                </div>

                <div class="content_body">

                    <div class="table_container_outer">
                        <div class="table_container">

                            <table id="table_relate_keyword" class="table_keyword_searchresult">
                                <colgroup>
                                    <col width="6%" />
                                    <col width="8%" />
                                    <col width="" />
                                    <col width="" />
                                    <col width="" />
                                    <col width="" />
                                    <col width="" />
                                    <col width="" />
                                    <col width="" />
                                    <col width="" />
                                    <col width="" />
                                </colgroup>

                                <thead>
                                    <tr>
                                        <th>순위</th>
                                        <th>키워드</th>
                                        <th>월검색량</th>
                                        <th>PC<br/>검색량</th>
                                        <th>모바일<br/>검색량</th>
                                        <th>PC<br/>평균클릭수</th>
                                        <th>모바일<br/>평균클릭수</th>
                                        <th>PC<br/>평균클릭률</th>
                                        <th>모바일<br/>평균클릭률</th>
                                        <th>평균노출<br/>광고수</th>
                                        <th>경쟁정도</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr v-for="(item, index) in relKeywordList" :key="item.relKeywordCode">
                                        <td class="label_num">{{ index + 1 }}</td>
                                        <td class="lable_keywork">{{ item.relKeywordNm }}</td>
                                        <td class="lable_monthsearch">{{ item.searchMon.toLocaleString() }}</td>
                                        <td class="lable_searchcount_pc">{{ item.searchPc.toLocaleString() }}</td>
                                        <td class="lable_searchcount_moble fc_gray">{{ item.searchMobile.toLocaleString() }}</td>
                                        <td class="lable_clickcount_pc fc_gray">{{ item.clickPc.toLocaleString() }}</td>
                                        <td class="lable_clickcount_moble fc_gray">{{ item.clickMobile.toLocaleString() }}</td>
                                        <td class="lable_ctr_pc fc_gray">{{ item.clickPersentPc }}%</td>
                                        <td class="lable_ctr_moble fc_gray">{{ item.clickPersentMobile }}%</td>
                                        <td class="lable_ad fc_gray">{{ item.averageAdv }}</td>
                                        <td class="lable_competition">{{ item.competitionNm }}</td>
                                    </tr>

                                </tbody>
                            </table>

                        </div>
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
import KeywordDetail from './KeywordDetail.vue'
import api from '../../plugins/api'

export default {
    name: 'KeywordDetail',
    setup() {
        const startDate = ref('')
        const endDate = ref('')
        const relKeywordList = ref([])
        const route = useRoute()
        const router = useRouter()
        const keywordNm = ref({})

        
        const keywordCode = route.params.keywordCode || ''

        const goBackKeywordDetail = () => {
            router.push('/KeywordDetail/' + keywordCode )
        }
        const keywordDetail = () =>{
            router.push('/KeywordDetail/' + keywordCode)
            //  alert(keywordCode);
        }

        const productListNaver = () => {
            router.push('/ProductListNaver/' + keywordCode)
            //  alert(keywordCode);
        }
        const relKeyword = () => {
            router.push('/RelKeyword/' + keywordCode)
            //  alert(keywordCode);
        }

        const getRelKeyword = async() =>{

            try{
                const response = await api.get('/user/relkeyword/getRelKeyword',{
                params: {
                    keywordCode: keywordCode,
                    limitCount: 20
                }
                })
                relKeywordList.value = response.data
            } catch (error){
                console.error(error)

            }
        }
        const formatDate = (date) => {
        const yyyy = date.getFullYear()
        const mm = String(date.getMonth() + 1).padStart(2, '0')  // 월은 0부터 시작하니까 +1
        const dd = String(date.getDate()).padStart(2, '0')
        return `${yyyy}.${mm}.${dd}`
        }
                
        const downloadExcelRelKeyword = async () => {

            try {
                const res = await api.get('/user/relkeyword/downloadRelKeywordExcel', {
                    params: {
                        keywordCode: keywordCode
                    },
                    responseType: 'blob'
                });

                const blob = new Blob([res.data], {
                    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                });

                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = 'relkeyword_list.xlsx';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } catch (error) {
                console.error('엑셀 다운로드 중 오류:', error);
                alert('엑셀 다운로드 실패');
            }

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


        onMounted(async () => {
            getRelKeyword();
            
            const today = new Date()
            const before30 = new Date()
            before30.setDate(today.getDate() - 30)
            startDate.value = formatDate(before30)
            endDate.value = formatDate(today)

            getKeywordNm()

        })
 
        return {
            relKeywordList,
            getRelKeyword,
            downloadExcelRelKeyword,
            startDate,
            endDate,
            goBackKeywordDetail,
            keywordDetail,
            productListNaver,
            relKeyword,
            getKeywordNm,
            keywordNm,
        }
    }
}

</script>

<style scoped>

</style>