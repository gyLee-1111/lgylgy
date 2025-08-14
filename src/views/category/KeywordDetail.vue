<template>
   
   <!-- 본문 영역 -->

    <div class="content_page">

        <div class="base_width">

            <div class="content_box_white">

                <div class="content_inline">

                    <h2 class="title_pg">키워드</h2>
                    <span class="ment">상품 카테고리를 선택하여 원하는 상품을 찾을 수 있습니다.</span>
                    
                    <!-- 목록 페이지로 돌아가기 버튼 -->
                    <button class="btn bg_white btn_list_back" @click="goBackCategoryList">
                        <i class="ri-arrow-go-back-line"></i>
                        <span>이전 페이지로 돌아가기</span>
                    </button>
                    <!--// 목록 페이지로 돌아가기 버튼 -->

                    <!-- 키워드 검색 -->
                    <div class="keyword_search_cont">

                        <div class="keyword_search_box" v-if="keyword">
                            <input type="text" v-model="keyword.keywordNm" placeholder="">
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
                            <li class="active">
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

                    <!-- 키워드 상세정보 -->
                    <div class="content_detailbox">

                        <div class="main_articla">

                            <!-- 상품 top정보 -->
                            <div class="product_info_box">
                                
                                <!-- 상품이미지 및 점수 -->
                                <div class="product_top_info">

                                    <div class="product_thum">
                                        <img v-if="keyword && keyword.keywordImg" :src="'http://localhost:8084/images/' + keyword.keywordImg"alt="키워드 대표 이미지"/>
                                        <p v-else>이미지가 없습니다</p>                        
                                    </div>

                                    <div class="rate_box">

                                        <div class="rate_count" v-if="keyword && keyword.keywordScore != null">
                                            <span class="rate_top">100</span>
                                            <span class="rate_bottom">0</span>

                                            <div class="rate_track">
                                                <span class="rate_current" :style="{ height: keyword.keywordScore + '%' }"></span>
                                            </div>
                                        </div>

                                        <div class="txt_info" v-if="keyword && keyword.searchPc != null">
                                            <strong class="txt_string">{{ rankNm }}</strong>
                                            <span class="txt_num">
                                                <strong>{{ keyword.keywordScore }}</strong>점
                                            </span> 
                                        </div>

                                        <div class="product_sum" v-if="keyword && keyword.searchPc != null">
                                            <i class="ri-product-hunt-line"></i> <span>상품수</span> <strong>{{ keyword.productCnt.toLocaleString() }}개</strong>
                                        </div>
                                        <div class="product_sum" v-if="keywordChart">

                                            <i class="ri-search-line"></i> <span>검색량</span> <strong>{{ ((keywordChart.devicePc || 0) + (keywordChart.deviceMobile || 0)).toLocaleString() }}개</strong>

                                        </div>

                                    </div>
                                </div>
                                <!--// 상품이미지 및 점수 -->
                                
                                <!--  상품명 및 카테고리 정보 -->
                                <div class="KeywordDetail" v-if="keyword">
                                    <div class="product_cata_info">

                                        <h3 class="title_keyword">
                                            <strong>{{ keyword.keywordNm }}</strong>
                                            <span v-if="keyword.keywordType === 'KeyWordType01'" class="cata">쇼핑 키워드</span>
                                            <span v-else="keyword.keywordType === 'KeyWordType02'" class="cata cata-info">정보 키워드</span>
                                        </h3>
                                        <ul v-if=" keywordCategory && keywordCategory.length > 0">
                                            <li v-for="(item, index) in keywordCategory" :key="index">
                                                <span>{{ item.keycategoryNm }}</span> 
                                                <span>{{ item.keycategoryMain}}({{ item.keycategoryRatio }}%)</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <!--//  상품명 및 카테고리 정보 -->

                            </div>
                            <!--// 상품 top정보 -->

                            <!-- 추천의견 -->
                            <div class="recommend_box" v-if="keyword && keyword.keywordInfo">{{ keyword.keywordInfo }}</div>
                            <!--// 추천의견 -->


                            <h3 class="sub_title">네이버 쇼핑 분석</h3>

                            <!-- 분석 세부 내용 -->
                            <div class="analysis_field">
                                <ul>
                                    <li>
                                        <div class="outline">

                                            <div class="analysis_date">
                                                <strong>{{ pageAvgReview.toLocaleString() }}개</strong>
                                                <span>1페이지 평균 리뷰수</span>
                                            </div>
                                            <div class="analysis_icon">
                                                <i class="ri-pencil-line"></i>
                                            </div>

                                        </div>
                                    </li>

                                    <li>
                                        <div class="outline">

                                            <div class="analysis_date">
                                                <strong>{{ top3AvgReview.toLocaleString() }}개</strong>
                                                <span>상위 3개제품 평균리뷰수</span>
                                            </div>

                                            <div class="analysis_icon">
                                                <i class="ri-pencil-line"></i>
                                            </div>

                                        </div>
                                    </li>

                                    <li>
                                        <div class="outline">

                                            <div class="analysis_date">
                                                <strong>{{ middlePageReview.toLocaleString() }}개</strong>
                                                <span>1페이지 중간제품 리뷰수</span>
                                            </div>

                                            <div class="analysis_icon">
                                                <i class="ri-pencil-line"></i>
                                            </div>

                                        </div>
                                    </li>

                                    <li>
                                        <div class="outline">

                                            <div class="analysis_date">
                                                <strong>{{ top10AvgScore }}</strong>
                                                <span>Top 10 평균 점수</span>
                                            </div>

                                            <div class="analysis_icon">
                                                <i class="ri-star-line"></i>
                                            </div>

                                        </div>
                                    </li>

                                    <li>
                                        <div class="outline">

                                            <div class="analysis_date">
                                                <strong>{{ top10Sales.toLocaleString() }}</strong>
                                                <span>Top 10 매출액</span>
                                            </div>

                                            <div class="analysis_icon">
                                                <i class="ri-money-dollar-circle-line"></i>
                                            </div>

                                        </div>
                                    </li>

                                    <li>
                                        <div class="outline">

                                            <div class="analysis_date">
                                                <strong>{{ top20Sales.toLocaleString() }}</strong>
                                                <span>Top 20 매출액</span>
                                            </div>

                                            <div class="analysis_icon">
                                                <i class="ri-money-dollar-circle-line"></i>
                                            </div>

                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <!--// 분석 세부 내용 -->

                            <h3 class="sub_title">검색량 트랜드</h3>

                            <!-- 챠트박스 -->
                            <div class="chart_box">     

                                <div class="chart_head ta_r">

                                    <div class="chart_option">
                                        <!-- 기간선택 -->
                                        <div class="chart_term_select" v-if="false">
                                            <button class="">
                                                <span>일간</span>
                                                <i class="fa-solid fa-chevron-down"></i>
                                            </button>
                                            <div class="term_list" style="display:none;">
                                                <a href="#">일간</a>
                                                <a href="#">주간</a>
                                                <a href="#">월간</a>
                                            </div>
                                        </div>
                                        <!--// 기간선택 -->

                                        <!-- 기간탭 -->
                                        <div class="term_tabmenu" v-if="false">
                                            <a href="#" class="active">1개월</a>
                                            <a href="#" class="">1년</a>
                                            <a href="#" class="">3년</a>
                                        </div>
                                        <!--// 기간탭 -->
                                    </div>

                                </div>
                                <div id="history-container">
                                    <div class="chart_body">
                                        챠크 삽입 영역
                                    </div>
                                </div>
                            </div>
                            <!--// 챠트박스 -->

                            <!-- 챠트박스 - 3grid -->
                            <div class="chart_box_3grid mg_t20">

                                <div class="chart_box">                                
                                    <div class="chart_head">
                                        <h3>기기별 트랜드</h3>
                                    </div>
                                    <div id="searchItem-container"></div>
                                    <p class="highcharts-description">
                                    </p>
                                </div>

                                <div class="chart_box">                                
                                    <div class="chart_head">
                                        <h3>성별 트랜드</h3>
                                    </div>
                                    <div id="searchGender-container">
                                        <p class="chart_body">
                                          
                                        </p>
                                    </div>
                                </div>

                                <div class="chart_box">
                                    <div class="chart_head">
                                        <h3>연령별 트랜드</h3>
                                    </div>
                                    <div id="age-container"> 
                                        <div class="chart_body">
                                           
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <!--// 챠트박스 - 3grid -->

                        </div>

                        <div class="sub_article">

                            <!-- 연관 키워드 -->
                            <div class="relate_keyword">

                                <div class="relate_keyword_head">
                                    <h3>연관 키워드</h3>
                                </div>

                                <div class="relate_keyword_list">
                                    <table>
                                        <colgroup>
                                            <col width="60%"/>
                                            <col width="40%"/>
                                        </colgroup>

                                        <thead>
                                            <tr>
                                                <th>
                                                    <span>키워드</span>
                                                </th>
                                                <th>
                                                    <span>월 검색량</span>
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            <tr v-for="(item, index) in relKeywordList" :key="item.relKeywordCode">
                                            <th>{{ item.relKeywordNm }}</th>
                                            <td>{{ (item.searchPc + item.searchMon).toLocaleString() }}</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <!--// 연관 키워드 -->

                        </div>

                    </div>
                    <!--// 키워드 상세정보 -->


                </div>

            </div>

        </div>

    </div>
    <!--// 본문 영역 -->



</template>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'
import api from '../../plugins/api'
import { Chart, PieController, ArcElement, Tooltip, Legend } from 'chart.js';
import dayjs from 'dayjs'


export default {
  name: 'KeywordDetail',
  setup() {
    
       
        const age10 = ref(0);
        const age20 = ref(0);
        const age30 = ref(0);
        const age40 = ref(0);
        const age50 = ref(0);
        const age60 = ref(0);

        const route = useRoute()
        const router = useRouter()
        const keywordCode = route.params.keywordCode || ''

        const keyword = ref(null)
        const keywordChart = ref({
            devicePc: 0,
            deviceMobile: 0,
            genderMan: 0,
            genderWoman: 0,
            age10: 0,
            age20: 0,
            age30: 0,
            age40: 0,
            age50: 0,
            age60: 0,
            historyChart: []
        })
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
        
        const getcount = ref(0);
        const pageAvgReview = ref(0)
        const top3AvgReview = ref(0)
        const middlePageReview = ref(0)
        const top10AvgScore = ref(0)
        const top10Sales = ref(0)
        const top20Sales = ref(0)

        const rankNm = ref('')
        const keywordScore = ref(0)
        
        const genderMan= ref(0)
        const genderWoman= ref(0)
        const devicePc= ref(0)
        const deviceMobile= ref(0)

        const historyChart= ref([])
        const keywordCategory= ref([])

        const relKeywordList = ref([])

        const goBackCategoryList = () => {
            router.push('/CategoryList/')
        }

        const getRelKeyword = async() =>{

            try{
                const response = await api.get('/user/relkeyword/getRelKeyword',{
                params: {
                    keywordCode: keywordCode,
                    limitCount: 7
                }
                })
                relKeywordList.value = response.data
            } catch (error){
                console.error(error)

            }
        }
        

        onMounted(async () => {

            

            try {
                const response = await api.get('/user/keyword/getDetailKeyword',{
                params: {
                    keywordCode: keywordCode
                }
                })
               // alert(keywordCode);
                keyword.value = response.data
                keywordCategory.value = response.data.categories
                keywordScore.value = response.data.keywordScore
                rankNm.value = response.data.rankName
               // alert(keywordScore.value);
  

                const res = await api.get('/user/keyword/getCountReview',{
                    params: {
                        keywordCode: keywordCode
                    }
                })
                getcount.value = res.data
                pageAvgReview.value = res.data.pageAvgReview
                top3AvgReview.value = res.data.top3AvgReview
                middlePageReview.value = res.data.middlePageReview

                top10AvgScore.value = res.data.top10AvgScore
                top10Sales.value = res.data.top10Sales
                top20Sales.value = res.data.top20Sales


                const resp = await api.get('/user/keyword/getKeywordChart',{
                params: {
                    keywordCode: keywordCode
                }
                })
              //  alert(keywordCode);
                keywordChart.value = resp.data


                genderMan.value = resp.data.genderMan
                genderWoman.value = resp.data.genderWoman
                devicePc.value = resp.data.devicePc
                deviceMobile.value = resp.data.deviceMobile

                age10.value = resp.data.age10
                age20.value = resp.data.age20
                age30.value = resp.data.age30
                age40.value = resp.data.age40
                age50.value = resp.data.age50
                age60.value = resp.data.age60

                historyChart.value = resp.data.historyChart

                const dates = historyChart.value.map(item => item.date);
                const counts = historyChart.value.map(item => item.totalCnt);
                dates.reverse()
                

            //    alert('쇼핑 데이터:', keywordShopping.value);
                
                Highcharts.chart('searchItem-container', {
                    chart: {
                        type: 'pie'
                    },
                    title: {
                        text: null  // null로 설정하면 타이틀이 표시되지 않음
                    },
                    legend: {
                        enabled: false  // false로 설정하면 범례가 사라짐
                    },
                    tooltip: {
                        valueSuffix: ''
                    },
                    exporting: {
                        enabled: false
                    },
                    credits: {
                        enabled: false // 👈 하단 컨테이너 제거
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: [{
                                enabled: false,
                                distance: 20
                            }, {
                                enabled: true,
                                distance: -40,
                                format: '{point.percentage:.1f}%' +'{name}',
                                style: {
                                    fontSize: '1.2em',
                                    textOutline: 'none',
                                    opacity: 0.7
                                },
                                filter: {
                                    operator: '>',
                                    property: 'percentage',
                                    value: 10
                                }
                            }]
                        }
                    },
                    series: [
                        {
                            name: '',
                            colorByPoint: true,
                            data: [
                                {
                                    name: 'PC검색량',
                                    y: devicePc.value
                                },
                                {
                                    name: '모바일 검색량',
                                    y: deviceMobile.value
                                },
                            ]
                        }
                    ]
                });
                Highcharts.chart('searchGender-container', {
                    chart: {
                        type: 'pie',
                        zooming: {
                            type: 'xy'
                        },
                        panning: {
                            enabled: true,
                            type: 'xy'
                        },
                        panKey: 'shift'
                    },
                   
                    tooltip: {
                        valueSuffix: ''
                    },
                    title: {
                        text: null  // null로 설정하면 타이틀이 표시되지 않음
                    },
                    legend: {
                        enabled: false  // false로 설정하면 범례가 사라짐
                    },
                    exporting: {
                        enabled: false
                    },
                    credits: {
                        enabled: false // 👈 하단 컨테이너 제거
                    },

                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: [{
                                enabled: false,
                                distance: 20
                            }, {
                                enabled: true,
                                distance: -40,
                                format: '{point.percentage:.1f}%' +'{name}' ,
                                style: {
                                    fontSize: '1.2em',
                                    textOutline: 'none',
                                    opacity: 0.7
                                },
                                filter: {
                                    operator: '>',
                                    property: 'percentage',
                                    value: 10
                                }
                            }]
                        }
                    },
                    series: [
                        {
                            name: '',
                            colorByPoint: true,
                            data: [
                                {
                                    name: '남',
                                    y: genderMan.value
                                },
                                {
                                    name: '여',
                                    y: genderWoman.value
                                },
                                
                            ]
                        }
                    ]
                });
                Highcharts.chart('age-container', {
                    chart: {
                        type: 'column'
                    },
                   
                    xAxis: {
                        categories: ['10대', '20대', '30대', '40대', '50대', '60대'],
                        crosshair: true,
                        accessibility: {
                            description: 'Countries'
                        }
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: null
                        }
                    },
                    title: {
                        text: null  // null로 설정하면 타이틀이 표시되지 않음
                    },
                    legend: {
                        enabled: false  // false로 설정하면 범례가 사라짐
                    },
                    tooltip: {
                       

                    },
                    exporting: {
                        enabled: false
                    },
                    plotOptions: {
                        column: {
                            pointPadding: 0.2,
                            borderWidth: 0
                        }
                    },
                    credits: {
                        enabled: false // 👈 하단 컨테이너 제거
                    },
                    series: [
                        {
                            name: '',
                            data: [age10.value, age20.value, age30.value, age40.value, age50.value, age60.value]
                        },
                    ]
                });
                Highcharts.chart('history-container', {
                    rangeSelector: {
                        enabled: false
                    },
                    navigator: {
                        enabled: false
                    },

                    yAxis: {
                        title: {
                            text: null
                        }
                    },

                    xAxis: {
                        categories: dates.map(date => dayjs(date).format('YYYY-MM-DD')),
                        accessibility: {
                            rangeDescription: null
                        }
                    },
                    tooltip: {
                  
                    },
                    
                    title: {
                        text: null  // null로 설정하면 타이틀이 표시되지 않음
                    },
                    legend:  {
                        enabled: false  // false로 설정하면 범례가 사라짐
                    },
                    exporting: {
                        enabled: false
                    },
                    credits: {
                        enabled: false // 👈 하단 컨테이너 제거
                    },


                    plotOptions: {
                        series: {
                            label: {
                                connectorAllowed: false
                            },
                            
                        }
                    },
                    chart: {
                        type: 'line'
                    },

                    series: [{
                        name: '검색량',
                        data: counts
                    }],


                });
                getRelKeyword();
            } catch(error) {
                console.error('키워드 상세 조회 오류:', error)
        }
        
    })

                
        return {
            goBackCategoryList,

            keywordCategory,
            historyChart,

            keyword,
            keywordCode,
            keywordChart,
            getcount,
            pageAvgReview,
            top3AvgReview,
            middlePageReview,
            top10AvgScore,
            top10Sales,
            top20Sales,
            rankNm,
            keywordScore,

            keywordDetail,
            productListNaver,
            relKeyword,
            getRelKeyword,
            relKeywordList
        }
    },
   
}

</script>

<style scoped>


</style>