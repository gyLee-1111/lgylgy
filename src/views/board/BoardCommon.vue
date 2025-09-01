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
                        <!-- 공지사항 상세보기 -->
                        <!-- <div class="board_view_rwd">
                            <div class="board_top">
                                <strong class="title">게시판 제목 게시판 제목 게시판 제목</strong>
                            </div>
                            <div class="board_info">
                                <div class="date">
                                    <i class="fa-regular fa-clock"></i> 2024-08-24 21:00:54 / 조회수: 257
                                </div>
                                <div class="writer"><i class="fa-solid fa-user-pen"></i> 운영자</div>
                            </div>

                            <div class="board_content">
                                게시판  내용게시판  내용게시판  내용게시판  내용게시판  내용게시판  내용게시판  내용게시판  내용게시판  내용게시판  내용게시판  내용
                                게시판  내용게시판  내용게시판  내용게시판  내용게시판  내용게시판  내용게시판  내용게시판  내용게시판  내용게시판  내용게시판  내용
                                게시판  내용게시판  내용게시판  내용게시판  내용게시판  내용게시판  내용게시판  내용게시판  내용게시판  내용게시판  내용게시판  내용
                                게시판  내용게시판  내용게시판  내용게시판  내용게시판  내용게시판  내용게시판  내용게시판  내용게시판  내용게시판  내용게시판  내용
                            </div>

                            <div class="file_inner">
                                <div class="file_list">
                                    <a href="#"><i class="ri-download-cloud-line"></i> favicon.png</a>
                                    <a href="#"><i class="ri-download-cloud-line"></i> favicon.png</a>
                                </div>
                            </div>                            
                        </div>

                        <div class="table_btn_func mg_b50">
                            <div class="grid2">
                                <div class="left">
                                    <button class="btn bg_white"><i class="ri-file-list-3-line"></i> 목록보기</button>
                                </div>
                                <div class="right">
                                    <button class="btn bg_blue"><i class="ri-edit-line"></i> 수정하기</button>
                                </div>
                            </div>
                        </div> -->
                        <!--// 공지사항 상세보기 -->

                        <!-- table형 게시판 리스트 -->
                        <!-- 게시물 정보 -->
                        <div class="board_top_info">
                            <div class="info">
                                전체: <strong>23</strong>개 게시물
                            </div>

                            <div class="board_search_box">
                                <select name="" id="">
                                    <option value="">전체</option>
                                    <option value="">제목</option>
                                    <option value="">작성자</option>
                                </select>

                                <div class="board_search">
                                    <input type="text" placeholder="검색어를 입력하세요.">
                                    <a href="#"><i class="fa-solid fa-magnifying-glass"></i></a>
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
                                        <tr v-for="(item, index) in postList" :key="item.boardCode">
                                            <td @click="detailPost(item.postCode)">{{ index + 1 }}</td>
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
                                <a href="#" class="active">1</a>
                                <a href="#">2</a>
                                <a href="#">3</a>
                                <a href="#">4</a>
                                <a href="#">5</a>
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
import { ref, onMounted } from 'vue'
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

    const postList = ref([])
    const router = useRouter();

    
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

    const getListPost = async() =>{
        try{
            const res = await api.get('/user/board/getListPost',{
                params:{ boardCode: props.boardCode }
            })
            if(res.status==200) {
                postList.value = res.data
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

    
    onMounted(() => {
        getDetailBoard()
        getListPost()
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

    }
  }
}


</script>

<style scoped>

</style>