<template>
    <div class="modal modal_pop_product">
        <div class="pop_header">
            <button class="btn_modal_close" @click="closeModal"><i class="ri-close-large-line"></i></button>
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
                            <input type="text" v-model="board.boardNm" placeholder="게시판 타이틀을 입력해주세요.">
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

            <div class="table_container_outer">
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
                            <tr v-for="userRole  in roleList" :key="userRole.roleCode">
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
                          <button class="btn bg_white" @click="closeModal"><i class="ri-file-list-3-line"></i> 등록취소</button>
                      </div>
                      <div class="right">
                          <button class="btn bg_blue" @click="insertBoard"><i class="ri-check-line"></i> 등록하기</button>
                      </div>
                  </div>
              </div>
        </div>
    </div>
</template>

<script>
import { ref, reactive, watch, onMounted } from 'vue'
import axios from 'axios'
// import { useRoute, useRouter } from 'vue-router'
import api from '../plugins/api'

export default {
    name: "InsertAdminBoard",
    props: {
        isModalOpen: Boolean,
        showMarketInfo: {
            type: Boolean,
            default: true
        }
    },
    emits: ['close'],
    setup(props, { emit }) {
        const roleList = ref([])
        const board = reactive({
            boardNm: '',
            useAnswer: 'N',
            useComment: 'N',
            useNotice: 'N',
            useSecret: 'N'
        });
       const boardrole = reactive({});

        const closeModal = () => {
            emit('close') // 부모에게 닫으라고 신호 보냄
            
            document.body.style.overflow = 'auto'
        }

        const insertBoard = async () => {
            if (!board.boardNm.trim()) {
                alert('게시판 타이틀을 입력해주세요.');
                return;
            }

            const entries = Object.entries(boardrole);
            const boardRoles = [];
            for (let i = 0; i < entries.length; i++) {
                const [roleCode, boardroleCode] = entries[i];
                if(useRole !== 'N') {
                boardRoles.push({boardCode: board.boardCode, roleCode: roleCode, boardroleCode: boardroleCode })
                }
            }
            const params = {
                adminBoardDto: board,
                adminBoardRoleDto: boardRoles
            }

            try {
                const response = await api.post('/admin/insertBoard', params);                
                alert('게시판 등록 완료.');
                console.log('게시판 등록 성공:', response.data);
                
                closeModal(); // 등록 후 모달 닫기
            } catch (error) {
                console.error('게시판 등록 실패:', error);
                alert('게시판 등록 실패.');
            }
        };

        const getListRole = async() => {
            try{
                const res = await api.get('/admin/getListRole')
                console.log(res);
                    if(res.status==200) {
                          roleList.value = res.data
                    } else{
                          alert("잘못된 요청입니다.");
                    }
            } catch (error){
                console.error(error)
            }
        }


        onMounted(() => {
            console.log('InsertAdminBoard mounted')
            getListRole()
            
        })
        return {
            closeModal,
            board,
            insertBoard,
            getListRole,
            roleList,
            boardrole,
        }

    }

}
</script>

<style scoped>

</style>