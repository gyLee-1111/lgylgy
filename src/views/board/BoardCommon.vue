<template>
  <div class="content_page">

    <div class="base_width">

        <div class="content_box_white">
            <div class="content_inline">
            <h1>{{boardNm}}</h1>
            <h2 class="title_pg">게시판용 formcontents</h2>
            <span class="ment">각종 게시판용 input, textarea, select 등 모음</span>                    
            </div>
        </div>

        <div class="content_box_white">
            <div class="content_body">
                <div class="form_contents_box">
                    <!-- 공지사항 기본 리스트 -->
                        <!-- table형 게시판 리스트 -->
                        <!-- 게시물 정보 -->
                    <div class="board_top_info">
                        <div class="info">
                            전체: <strong>{{ totalCount }}</strong>개 게시물

                            <div class="board_search_box">
                                <select v-model="pageSize">
                                    <option value="5">5</option>
                                    <option value="10">10</option>
                                    <option value="20">20</option>
                                </select>개 보기
                            </div>

                        </div>
                        
                        <div class="board_search_box">
                            <select v-model="searchType">
                                <option value="">전체</option>
                                <option value="title">제목</option>
                                <option value="user">작성자</option>
                            </select>

                            <div class="board_search">
                                <input type="text" v-model="searchValue" placeholder="검색어를 입력하세요.">
                                <a href="#"><i class="fa-solid fa-magnifying-glass" @click="getListPost"></i></a>
                            </div>
                        </div>
                    </div>
                        <!-- 게시물 정보 -->

                    <div class="table_container_outer">
                        <div class="table_container">
                            <table class="basic_list" id="basic_list">
                                <colgroup>
                                    <col width="10%"/>
                                    <col />
                                    <col width="15%"/>
                                    <col width="15%"/>
                                    <col width="15%"/>
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th>번호</th>
                                        <th>제목</th>
                                        <th>작성자</th>
                                        <th>등록일</th>
                                        <th>조회수</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr v-for="(notice, index) in postNoticeList" :key="notice.boardCode" class="noticeRow">
                                        
                                        <td v-if="notice.noticeCheck === 'Y'">공지</td>
                                        <td v-else></td>
                                        
                                        <td @click="detailPost(notice.postCode)">{{ notice.postNm }}({{ notice.commentCnt }})</td>
                                        <td @click="detailPost(notice.postCode)">{{ notice.insertUserId }}</td>
                                        <td @click="detailPost(notice.postCode)">{{ notice.insertDt }}</td>
                                        <td @click="detailPost(notice.postCode)">{{ notice.viewCount }}</td>
                                    </tr>
                                    
                                    <tr v-for="(item, index) in postList" :key="item.boardCode">
                                        <td v-if="item.upperCode === 0">{{ item.rseq }}</td>
                                        <td v-else></td>
                                        
                                        <td @click="detailPost(item.postCode)">{{ item.postNm }}({{ item.commentCnt }})</td>
                                        <td @click="detailPost(item.postCode)">{{ item.insertUserId }}</td>
                                        <td @click="detailPost(item.postCode)">{{ item.insertDt }}</td>
                                        <td @click="detailPost(item.postCode)">{{ item.viewCount }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                        <!--// table형 게시판 리스트 -->

                        <!-- 게시판 페이징-->
                        <div class="table_paging">
                            <a href="#" class="btn_pgmove"><i class="fa-solid fa-angles-left"></i></a>
                            <a href="#" class="btn_pgmove"><i class="fa-solid fa-chevron-left"></i></a>

                            <span class="pagenum">
                                <a v-for="page in setPage" :key="page" href="#":class="{ actiive:page ===currentPage }" @click.prevent="goingPage(page)">{{ page }}</a>
                            </span>

                            <a href="#" class="btn_pgmove"><i class="fa-solid fa-chevron-right"></i></a>
                            <a href="#" class="btn_pgmove"><i class="fa-solid fa-angles-right"></i></a>
                        </div>
                        <!--// 게시판 페이징-->

                        <div class="table_btn_func mg_b50">
                            <div class="grid1 ta_r">
                                <button class="btn bg_blue" @click="goInsertPost(boardCode)"><i class="ri-check-line"></i> 새글 등록하기</button>
                            </div>
                        </div>



                      

                    </div>

                </div>

            </div>

        </div>

  </div>

</template>

<script>
import { watch, ref, onMounted, computed } from 'vue'
import api from '../../plugins/api'
import { useRouter } from 'vue-router'


export default {
  name: "BoardCommon",
  props: {
    boardCode: {
        type: String,
        required: true
    }
  },
  components: {
  },
  setup(props) {

    const board = ref(null)
    const boardCode = ref('')
    const boardNm = ref('')
    const useAnswer = ref('')
    const useComment = ref('')
    const useNotice = ref('')
    const useSecret = ref('')

    
    const searchType = ref('')
    const searchValue = ref('')
    const postList = ref([])
    const router = useRouter();

    const postNoticeList = ref([])

    const totalCount = ref(0);
    const currentPage = ref(1)
    const pageSize = ref(10)
    const pageCount = computed(() => Math.ceil(totalCount.value/pageSize.value))
    
    const setPage = computed(() => {
        const pages = []
        const total = pageCount.value
        const current = currentPage.value
        const maxSet = 5

        let start = Math.max(1, current - Math.floor(maxSet/2))
        let end = start + maxSet - 1

        if(end > total) {
            end = total
            start = Math.max(1,end - maxSet + 1)
        }

        for (let i = start; i <= end; i++) {
            pages.push(i)
        }
        return pages
    })
    const getDetailBoard = async() =>{
        try{
            const response = await api.get('/user/board/getDetailBoard',{
            params: { boardCode: props.boardCode }
            })
       
            board.value = response.data
            boardCode.value = response.data.boardCode
            boardNm.value = response.data.boardNm
            useAnswer.value = response.data.useAnswer
            useComment.value = response.data.useComment
            useNotice.value = response.data.useNotice
            useSecret.value = response.data.useSecret
            
      
        } catch (error){
            console.error(error)
        }
        
    }
    const goingPage = (page) => {
        if (page < 1 || page > pageCount.value || page === currentPage.value) return
        currentPage.value = page
        getListPost()
    }
/*
    const getListPost = async() =>{

        const params = {
            boardCode: props.boardCode,
        
        }
        if (searchValue.value) {
            params.searchValue = searchValue.value;
        }

        try{
            const res = await api.post('/user/board/getListPost',{ params })
            if(res.status==200) {
                postList.value = res.data
                totalCount.value = res.data.totalCount;
            }
            else{
                alert("잘못된 요청입니다.");
            }
        } catch (error) {
            console.error(error)
        }


    }
*/
    const getListPost = async() =>{

        const data = {
            boardCode: props.boardCode,
            searchType: searchType.value,
            searchValue: searchValue.value,
            page: currentPage.value,
            listView: pageSize.value
        }
        
        try{
            const res = await api.post('/user/board/getListPost',data)
            if(res.status==200) {
                postList.value = res.data.commonPostDto;
                totalCount.value = res.data.totalCount;
            }
            else{
                alert("잘못된 요청입니다.");
            }
        } catch (error) {
            console.error(error)
        }
    }
    const getListNoticePost = async() =>{
        try{
            const res = await api.get('/user/board/getListNoticePost',{
                params: { boardCode: props.boardCode }
            })
            if(res.status==200) {
                postNoticeList.value = res.data
            }
            else{
                alert("잘못된 요청입니다.");
            }
        } catch (error) {
            console.error(error)
        }
    }

    const goInsertPost = async(boardCode) =>{
        
        router.push('/insertPost/' + boardCode)

    }

    const detailPost = async(postCode) =>{
        router.push('/DetailPost/' + postCode)
    }

    watch(pageSize, (newValue, oldValue) =>{
        pageSize.value = newValue
        currentPage.value = 1
        getListPost()
    })


    
    onMounted(() => {
        getDetailBoard()
        getListPost()
        getListNoticePost()
    })
    
    return {
        getDetailBoard,
        getListPost,
        board,
        boardCode,
        boardNm,
        useAnswer,
        useComment,
        useNotice,
        useSecret,
        postList,
        goInsertPost,
        detailPost,
        searchType,
        searchValue,
        totalCount,

        currentPage,
        pageSize,
        pageCount,
        setPage,
        goingPage,
        getListNoticePost,
        postNoticeList,

        }
    }
}


</script>

<style scoped>
.noticeRow::v-deep(td){
    font-weight: bold;
    color:black;
    background-color: #eeedd9;

}
</style>