<template>
    <div class="content_page">

        <div class="base_width">

            <div class="content_box_white">
                <div class="content_inline">
                    <h1>{{}} 게시판 관리</h1>
                </div>
            </div>

            <div class="content_box_white">
                <div class="content_body">
                    <div class="form_contents_box">
                       
                        <!-- table형 게시판 리스트 -->
                        <!-- 게시물 정보 -->
                        <div class="board_top_info">
                            
                            <!-- <div class="board_search_box">
                                <select name="" id="">
                                    <option value="">전체</option>
                                    <option value="">제목</option>
                                    <option value="">작성자</option>
                                </select>

                                <div class="board_search">
                                    <input type="text" placeholder="검색어를 입력하세요.">
                                    <a href="#"><i class="fa-solid fa-magnifying-glass"></i></a>
                                </div>
                            </div> -->
                         </div>
                        <!-- 게시물 정보 -->

                        <div class="table_container_outer">
                            <div class="table_container">
                                <table class="basic_list" id="basic_list">
                                    <colgroup>
                                        <col width="10%"/>
                                        <col width="15%"/>
                                        <col width="15%"/>
                                        <col width="15%"/>
                                        <col width="15%"/>
                                        <col width="15%"/>
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th>번호</th>
                                            <th>게시판 제목</th>
                                            <th>답변 여부</th>
                                            <th>댓글 여부</th>
                                            <th>최상단공개 여부</th>
                                            <th>비밀글 여부</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item, index) in boardList" :key="item.boardCode">
                                            <td @click="openDetailBoardModal(item.boardCode)">{{ index + 1 }}</td>
                                            <td @click="openDetailBoardModal(item.boardCode)">{{ item.boardNm }}</td>
                                            <td @click="openDetailBoardModal(item.boardCode)">{{ item.useAnswer === 'Y' ? '예' : '아니오' }}</td>
                                            <td @click="openDetailBoardModal(item.boardCode)">{{ item.useComment === 'Y' ? '예' : '아니오' }}</td>
                                            <td @click="openDetailBoardModal(item.boardCode)">{{ item.useNotice === 'Y' ? '예' : '아니오' }}</td>
                                            <td @click="openDetailBoardModal(item.boardCode)">{{ item.useSecret === 'Y' ? '예' : '아니오' }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <!--// table형 게시판 리스트 -->

                        <div class="table_btn_func mg_b50">
                            <div class="grid1 ta_r">
                                <button class="btn bg_blue" @click="openInsertBoardModal"><i class="ri-check-line"></i> 게시판 등록하기</button>
                            </div>
                        </div>

                    </div>
                </div>
                      <!-- 모달영역 -->
                <InsertAdminBoard
                    v-if="isModalOpen"
                   
                    :isModalOpen="isModalOpen"
                   
                    @close="closeModal"
                    @refresh="getListBoard"
                    >
                </InsertAdminBoard>
                    <!--// 모달영역 -->
            
                           <!-- 모달영역 -->
                <AdminBoardDetail
                    v-if="detailModalOpen"
                   
                    :item="selectedBoard"
                    :selectedBoardCode="selectedBoardCode"
                    :boardCode="selectedBoardCode"
                    @close="closeDetailModal"
                    @refresh="getListBoard"
                    >
                </AdminBoardDetail>
                    <!--// 모달영역 -->
             
                    
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import api from '../../plugins/api'
import InsertAdminBoard from '../../components/InsertAdminBoard.vue'
import { closeModalBackGround, openModalBackGround } from '../../utils/globalFunctions'
import AdminBoardDetail from '../../components/AdminBoardDetail.vue'


export default {
    name: "AdminMain",
    components: {
        InsertAdminBoard,
        AdminBoardDetail,
    },
    setup() {

        const boardList = ref([])
        const isModalOpen = ref(false)

        const detailModalOpen = ref(false)

        const selectedBoardCode = ref(null)
        const selectedBoard = ref(null)

        const getListBoard = async() =>{
            try{
                const response = await api.get('/admin/getListBoard')
                console.log(response);
                      if(response.status==200) {
                          boardList.value = response.data
                      }
                      else{
                          alert("잘못된 요청입니다.");
                      }
              } catch (error){
                console.error(error)
            }
        }



        const openInsertBoardModal = () => {

            isModalOpen.value = true;   // 여기가 꼭 실행되어야 모달 열림
            document.body.style.overflow = 'hidden';
      
            openModalBackGround();
        }

        const closeModal = () => {
            isModalOpen.value = false           //  v-if로 모달 제거 유도
            document.body.style.overflow = 'auto'  //  스크롤 되돌리기만 유지
            getListBoard();
            closeModalBackGround();
        }
       
        const openDetailBoardModal = (boardCode) => {
            selectedBoardCode.value = boardCode
            selectedBoard.value = boardList.value.find(board => board.boardCode === boardCode) || null;
            detailModalOpen.value = true;   // 여기가 꼭 실행되어야 모달 열림
            document.body.style.overflow = 'hidden';
            
            openModalBackGround();
        }
        const closeDetailModal = () => {
            detailModalOpen.value = false           //  v-if로 모달 제거 유도
            document.body.style.overflow = 'auto'  //  스크롤 되돌리기만 유지
            getListBoard();
            closeModalBackGround();
        }
       
        onMounted(() => {
          getListBoard()
        })
        return {
            boardList,
            getListBoard,

            openInsertBoardModal,

            isModalOpen,

            closeModal,

            openDetailBoardModal,
            detailModalOpen,

            closeDetailModal,

            selectedBoardCode,
            selectedBoard,
  
        }
    }
}


</script>

<style scoped>

</style>