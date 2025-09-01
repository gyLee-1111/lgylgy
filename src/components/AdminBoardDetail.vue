<template>
<div class="modal modal_pop_product">
        <div class="pop_header">
            <button class="btn_modal_close" @click="closeDetailModal"><i class="ri-close-large-line"></i></button>
        </div>
        <div class="pop_body">
            <h2 class="title_pg">게시판 등록</h2>
            <table class="basic_write mg_t50">
                <colgroup>
                    <col width="30%"/>
                    <col />
                </colgroup>
                <tbody>
                    <tr>
                        <th>타이틀<span class="fc_requisite">*</span></th>
                        <td>
                            <input type="text" v-model="board.boardNm" >
                        </td>
                    </tr>
                    <tr>
                        <th>답변 사용 가능 여부</th>
                        <td>
                            <label>
                                <input type="radio" value="Y" v-model="board.useAnswer" />
                                <span>가능</span>
                            </label>
                            <label>
                                <input type="radio" value="N" v-model="board.useAnswer" />
                                <span>불가능</span>
                            </label>
                        </td>
                    </tr>
                    <tr>
                        <th>댓글 사용 가능 여부</th>
                        <td>
                            <label>
                                <input type="radio" value="Y" v-model="board.useComment" />
                                <span>가능</span>
                            </label>
                            <label>
                                <input type="radio" value="N" v-model="board.useComment" />
                                <span>불가능</span>
                            </label>
                        </td>
                    </tr>
                    <tr>
                        <th>최상단 공개 가능 여부</th>
                        <td>
                            <label>
                                <input type="radio" value="Y" v-model="board.useNotice"/>
                                <span>가능</span>
                            </label>
                            <label>
                                <input type="radio" value="N" v-model="board.useNotice"/>
                                <span>불가능</span>
                            </label>
                        </td>
                    </tr>
                    <tr>
                        <th>비밀글 사용 가능 여부</th>
                        <td>
                            <label>
                                <input type="radio" value="Y" v-model="board.useSecret" />
                                <span>가능</span>
                            </label>
                            <label>
                                <input type="radio" value="N" v-model="board.useSecret" />
                                <span>불가능</span>
                            </label>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div class="table_container_outer mg_t50">
                <div class="table_container">
                    <table class="basic_list" id="basic_list">
                        <colgroup>
                            <col width="10%" />
                            <col width="10%" />
                            <col width="10%" />
                            <col width="10%" />
                        </colgroup>
                        <thead>
                            <tr>
                                <th>권한</th>
                                <th>권한없음</th>
                                <th>읽기권한</th>
                                <th>쓰기권한</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="userRole in roleList" :key="userRole.roleCode">
                                <td>{{ userRole.roleNm }}</td>
                                <td><input type="radio" value="N" v-model="boardrole[userRole.roleCode]" /> 권한 없음</td>
                                <td><input type="radio" value="R" v-model="boardrole[userRole.roleCode]" /> 읽기 권한</td>
                                <td><input type="radio" value="W" v-model="boardrole[userRole.roleCode]" /> 쓰기 권한</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="table_btn_func">
                  <div class="grid2">
                      <div class="left">
                          <button class="btn bg_white" @click="closeDetailModal"><i class="ri-file-list-3-line"></i> 닫기</button>
                      </div>
                      <div class="center">
                          <button class="btn bg_white" @click="deleteBoard" ><i class="ri-file-list-3-line"></i> 삭제하기</button>
                      </div>
                      <div class="right">
                          <button class="btn bg_blue" @click="updateBoard"><i class="ri-check-line"></i> 수정하기</button>
                      </div>
                  </div>
              </div>
        </div>
    </div>
</template>

<script>
import { ref, reactive, watch, onMounted } from 'vue'
import api from '../plugins/api'

export default {
    name: "AdminBoardDetail",
    props: {
        detailModalOpen: Boolean,
        boardCode: {
            type: String,
            required: true
        },
        showMarketInfo: {
            type: Boolean,
            default: true
        }
    },
    emits: ['close'],
    setup(props, { emit }) {
        const roleList = ref([]);
        const board = reactive({
            boardCode:'',
            boardNm: '',
            useAnswer: 'N',
            useComment: 'N',
            useNotice: 'N',
            useSecret: 'N'
        })
        const boardrole = reactive({});
        

        const closeDetailModal = () => {
            emit('close') // 부모에게 닫으라고 신호 보냄
            
            document.body.style.overflow = 'auto'
        }

        const getDetailBoard = async (boardCode) => {
            try {
                const response = await api.get('/admin/getDetailBoard',{
                params: { boardCode }
                })
                const data = response.data
                const boardData = data.adminBoardDto;
                const roleData = data.adminBoardRoleDto;
                console.log('받은 boardData:', boardData); // 확인

                board.boardCode = boardData.boardCode
                board.boardNm = boardData.boardNm
                board.useAnswer = boardData.useAnswer
                board.useComment = boardData.useComment
                board.useNotice = boardData.useNotice
                board.useSecret = boardData.useSecret
                console.log(board)
                roleList.value = roleData;

                roleData.forEach((role) => {
                    boardrole[role.roleCode] = role.boardroleCode;
                    
                });
            } catch(error) {
                console.error('게시판 상세 조회 오류:', error)
            }
        }


        const updateBoard = async () => {
            if (!board.boardNm.trim()) {
                alert('게시판 타이틀을 입력해주세요.');
                return;
            }

            const entries = Object.entries(boardrole);
            const boardRoles = [];
            for (let i = 0; i < entries.length; i++) {
                const [roleCode, boardroleCode] = entries[i];
                boardRoles.push({boardCode: board.boardCode, roleCode: roleCode, boardroleCode: boardroleCode });
            }
            const params = {
                adminBoardDto: board,
                adminBoardRoleDto: boardRoles
            }


            try {
                const response = await api.post('/admin/updateBoard', params);
                alert('게시판 수정 완료.');
                console.log('게시판 수정 성공:', response.data);
                reactive();
                closeDetailModal(); // 등록 후 모달 닫기
            } catch (error) {
                console.error('게시판 수정 실패:', error);
                alert('게시판 수정 실패.');
            }
        };

        const deleteBoard = async () => {
            if (!confirm('정말 삭제하시겠습니까?')) return;

            try {
                const response = await api.post(`/admin/deleteBoard?boardCode=${props.boardCode}`);
                alert('게시판 삭제 완료.');
                console.log('게시판 삭제 성공:', response.data);
                closeDetailModal(); // 모달 닫기
            } catch (error) {
                console.error('게시판 삭제 실패:', error);
                alert('게시판 삭제 실패.');
            }
        };
     

        onMounted(() => {
            console.log('InsertAdminBoard mounted')
            getDetailBoard(props.boardCode)
            
        })
        return {
            closeDetailModal,
            board,
            getDetailBoard,
            updateBoard,
            deleteBoard,
            roleList,
            boardrole,
        }

    }

}
</script>

<style scoped>

</style>