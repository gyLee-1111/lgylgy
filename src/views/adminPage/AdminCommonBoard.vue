<template>
    <div class="content_page">

        <div class="base_width">

            <div class="content_box_white">
                <div class="content_inline">
                    <h1>{{}} 게시판</h1>
                    <h2 class="title_pg">게시판용 formcontents</h2>
                    <span class="ment">각종 게시판용 input, textarea, select 등 모음</span>                    
                </div>
            </div>

            <div class="table_btn_func mg_b50">
                <div class="grid1 ta_r">
                    <button class="btn bg_blue"><i class="ri-check-line"></i>게시판 등록하기</button>
                </div>
            </div>

      
            <div class="content_box_white">
                <div class="content_body">
                    <div class="form_contents_box">
                        <!-- 공지사항 기본 리스트 -->
                        <!-- 게시물 정보 1 : 검색만 있을 경우-->
                        <div class="board_top_info">
                        <!-- <div class="info">
                        전체: <strong>23</strong>개 게시물
                        </div> -->

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
              <!-- 게시물 정보 1 -->

              <!-- 게시물 정보 2 : 총게시물수, 검색 -->
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
              <!-- 게시물 정보 2 -->

                    <div class="board_list_rwd">
                            <ul>
                                <li>
                                    <a href="#">
                                        <strong class="title">
                                            게시판 제목 게시판 제목 게시판 제목 게시판 제목 게시판 제목
                                        </strong>
                                        <span class="lead_txt">
                                            게시판  내용게시판  내용게시판  내용게시판  내용게시판  내용게시판  내용게시판  내용게시판  내용게시판  내용게시판  내용게시판  내용
                                        </span>
                                        <span class="date"><i class="fa-regular fa-clock"></i> 2024-08-25</span>
                                    </a>
                                </li>

                                <li>
                                    <a href="#">
                                        <strong class="title">
                                            게시판 제목 게시판 제목 게시판 제목
                                        </strong>
                                        <span class="lead_txt">
                                            게시판  내용게시판  내용게시판  내용게시판  내용게시판  내용게시판 게시판  내용게시판  내용게시판  내용게시판  내용게시판  내용게시판
                                        </span>
                                        <span class="date"><i class="fa-regular fa-clock"></i> 2024-08-25</span>
                                    </a>
                                </li>

                                <li>
                                    <a href="#">
                                        <strong class="title">
                                            게시판 제목 게시판 제목 게시판 제목 게시판 제목 게시판 제목
                                        </strong>
                                        <span class="lead_txt">
                                            게시판  내용게시판  내용게시판  내용게시판  내용게시판  내용게시판  내용게시판  내용게시판  내용게시판  내용게시판  내용게시판  내용
                                        </span>
                                        <span class="date"><i class="fa-regular fa-clock"></i> 2024-08-25</span>
                                    </a>
                                </li>

                                <li>
                                    <a href="#">
                                        <strong class="title">
                                            게시판 제목 게시판 제목 게시판 제목 게시판 제목 게시판 제목
                                        </strong>
                                        <span class="lead_txt">
                                            게시판  내용게시판  내용게시판  내용게시판  내용게시판  내용게시판  내용게시판  내용게시판  내용게시판  내용게시판  내용게시판  내용
                                            게시판  내용게시판  내용게시판  내용게시판  내용게시판  내용게시판  내용게시판  내용게시판  내용게시판  내용게시판  내용게시판  내용
                                        </span>
                                        <span class="date"><i class="fa-regular fa-clock"></i> 2024-08-25</span>
                                    </a>
                                </li>

                                <li>
                                    <a href="#">
                                        <strong class="title">
                                            게시판 제목 게시판 제목 게시판 제목 게시판 제목 게시판 제목
                                        </strong>
                                        <span class="lead_txt">
                                            게시판  내용게시판  내용게시판  내용게시판  내용게시판  내용게시판  내용게시판  내용게시판  내용게시판  내용게시판  내용게시판  내용
                                        </span>
                                        <span class="date"><i class="fa-regular fa-clock"></i> 2024-08-25</span>
                                    </a>
                                </li>

                                <li>
                                    <a href="#">
                                        <strong class="title">
                                            게시판 제목 게시판 제목 게시판 제목 게시판 제목 게시판 제목
                                        </strong>
                                        <span class="lead_txt">
                                            게시판  내용게시판  내용게시판  내용게시판  내용게시판  내용게시판  내용게시판  내용게시판  내용게시판  내용게시판  내용게시판  내용
                                        </span>
                                        <span class="date"><i class="fa-regular fa-clock"></i> 2024-08-25</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <!--// 공지사항 기본 리스트 -->

                        <!-- 더 보기 -->
                        <div class="board_list_rwd_paging">
                            <button class="btn_board_more">더 보기 <i class="fa-solid fa-plus"></i></button>
                        </div>
                        <!-- 더 보기 -->

                        <div class="table_btn_func mg_b50">
                            <div class="grid1 ta_r">
                                <button class="btn bg_blue"><i class="ri-check-line"></i> 새글 등록하기</button>
                            </div>
                        </div>

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
                                <button class="btn bg_blue" @click="openInsertBoardModal"><i class="ri-check-line"></i> 게시판 등록하기</button>
                            </div>
                        </div>

                        <!-- 게시판 글 작성 폼 -->
              <table class="basic_write mg_t50">
                  <colgroup>
                      <col width="30%"/>
                      <col />
                  </colgroup>
                  <tbody>
                      <tr>
                          <th>
                              제목<span class="fc_requisite">*</span>
                          </th>
                          <td>
                              <input type="text" placeholder="제목을 입력해주세요.">
                          </td>
                      </tr>
                      <tr>
                          <th>
                              생년월일<span class="fc_requisite">*</span>
                          </th>
                          <td>
                              <select name="" id="">
                                  <option value="">년도</option>
                                  <option value="">2024</option>
                                  <option value="">2023</option>
                                  <option value="">2024</option>
                                  <option value="">2021</option>
                              </select>
                              <select name="" id="">
                                  <option value="">월</option>
                                  <option value="">1</option>
                                  <option value="">2</option>
                                  <option value="">3</option>
                                  <option value="">4</option>
                                  <option value="">5</option>
                                  <option value="">6</option>
                                  <option value="">7</option>
                                  <option value="">8</option>
                                  <option value="">9</option>
                                  <option value="">10</option>
                                  <option value="">11</option>
                                  <option value="">12</option>
                              </select>
                              <select name="" id="">
                                  <option value="">일</option>
                                  <option value="">1</option>
                                  <option value="">2</option>
                                  <option value="">3</option>
                                  <option value="">4</option>
                                  <option value="">5</option>
                                  <option value="">6</option>
                                  <option value="">7</option>
                                  <option value="">8</option>
                                  <option value="">9</option>
                                  <option value="">10</option>
                              </select>
                          </td>
                      </tr>
                      <tr>
                          <th>
                              생년월일<span class="fc_requisite">*</span>
                          </th>
                          <td>
                              <div class="birthday">
                                  <input type="text" maxlength="4" class="year"> <span>년</span>
                                  <input type="text" class="month"> <span>월</span>
                                  <input type="text" class="day"> <span>일</span>
                              </div>
                          </td>
                      </tr>
                      <tr>
                          <th>성별</th>
                          <td>
                              <label for="male">
                                  <input type="radio" name="sex" id="male" />
                                  <span>남</span>
                              </label>

                              <label for="female">
                                  <input type="radio" name="sex" id="female" />
                                  <span>여</span>
                              </label>
                          </td>
                      </tr>
                      <tr>
                          <th>휴대폰번호</th>
                          <td>
                              <input type="text" placeholder="'-' 없이 번호만 입력해주세요.">
                          </td>
                      </tr>
                      <tr>
                          <th>이메일</th>
                          <td>
                              <input type="email" placeholder="이메일 주소 입력">
                          </td>
                      </tr>
                      <tr>
                          <th>내용</th>
                          <td><textarea name="" id=""></textarea></td>
                      </tr>
                      <tr>
                          <th>관심분야</th>
                          <td>
                              <label for="check1">
                                  <input type="checkbox" id="check1">
                                  <span>여행/레져</span>
                              </label>

                              <label for="check2">
                                  <input type="checkbox" id="check2">
                                  <span>건강식품</span>
                              </label>

                              <label for="check3">
                                  <input type="checkbox" id="check3">
                                  <span>스포츠</span>
                              </label>
                          </td>
                      </tr>
                      <tr>
                          <th>
                              파일첨부
                          </th>
                          <td>
                              <div id="dropzone">
                                  <form action="https://httpbin.org/post" class="dropzone needsclick" id="demo-upload">
                                    <div class="dz-message needsclick">
                                      <span class="text">
                                          <i class="fa-solid fa-cloud-arrow-up"></i>
                                          Drop files here or click to upload.
                                      </span>
                                      <span class="plus">+</span>
                                    </div>
                                  </form>
                              </div>

                              <div class="mg_t5">
                                  ※ 첨부파일 형식: 문서 및 이미지 파일<br/>
                                  ※ 파일확장자: hwp, doc, pdf, jpg, gif, png
                              </div>
                          </td>
                      </tr>
                  </tbody>
              </table>

              <div class="table_btn_func">
                  <div class="grid2">
                      <div class="left">
                          <button class="btn bg_white"><i class="ri-file-list-3-line"></i> 목록보기</button>
                      </div>
                      <div class="right">
                          <button class="btn bg_blue"><i class="ri-check-line"></i> 등록하기</button>
                      </div>
                  </div>
              </div>
              <!--// 게시판 글 작성 폼 -->

              <!-- 게시판 글 상세보기 -->
              <table class="basic_view mg_t50">
                  <colgroup>
                      <col width="30%"/>
                      <col />
                  </colgroup>
                  <tbody>
                      <tr>
                          <th>
                              제목
                          </th>
                          <td>
                              상품 검색 옵션에 대해 문의드립니다.
                          </td>
                      </tr>
                      <tr>
                          <th>
                              작성자
                          </th>
                          <td>
                              홍길동
                          </td>
                      </tr>
                      <tr>
                          <th>등록일</th>
                          <td>
                              2024년 8월 25일 21:00:54
                          </td>
                      </tr>
                      <tr>
                          <th>내용</th>
                          <td>
                              문의 내용 보여주기 문의 내용 보여주기 문의 내용 보여주기 문의 내용 보여주기 문의 내용 보여주기 문의 내용 보여주기 문의 내용 보여주기
                              문의 내용 보여주기 문의 내용 보여주기 문의 내용 보여주기 문의 내용<br/><br/>
                              보여주기 문의 내용 보여주기 문의 내용 보여주기 문의 내용 보여주기
                          </td>
                      </tr>
                      <tr>
                        <th>관심분야</th>
                      <td>스포츠, 건강식품</td>
                    </tr>
                  <tr>
                    <th>첨부파일</th>
                    <td>
                      <div class="file_list">
                        <a href="#"><i class="ri-download-cloud-line"></i> favicon.png</a>
                        <a href="#"><i class="ri-download-cloud-line"></i> favicon.png</a>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            <div class="table_btn_func">
              <div class="grid1 ta_c">
                <button class="btn bg_white"><i class="ri-file-list-3-line"></i> 목록보기</button>
              </div>
            </div>
              <!--// 게시판 글 상세보기 -->
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
        AdminBoardDetail
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