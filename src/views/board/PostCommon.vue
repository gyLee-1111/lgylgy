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
                        <div class="board_view_rwd">
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
         

    }
  }
}


</script>

<style scoped>

</style>