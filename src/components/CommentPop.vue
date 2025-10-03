<template>
<div class="modal modal_pop_product">
        <div class="pop_header">
            <button class="btn_modal_close" @click="closeCommentUpdateModal"><i class="ri-close-large-line"></i></button>
        </div>
        <div class="pop_body">
            <h2 class="title_pg">댓글 수정</h2>
            <table class="basic_write mg_t50">
                <colgroup>
                    <col width="30%"/>
                    <col />
                </colgroup>
                <tbody>
                    <tr>
                        <th>내용<span class="fc_requisite">*</span></th>
                        <td>
                            <input type="text" v-model="commentContent">
                        </td>
                    </tr>
                </tbody>
            </table>

            

            <div class="table_btn_func">
                <div class="grid2">
                      <div class="left">
                          <button class="btn bg_white" @click="closeCommentUpdateModal"><i class="ri-file-list-3-line"></i> 닫기</button>
                      </div>
                      
                      <div class="right">
                          <button class="btn bg_blue" @click="updateComment"><i class="ri-check-line"></i> 수정하기</button>
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
    name: "CommentUpdate",
    props: {
        commentUpdateModalOpen: Boolean,
        commentCode: {
            type: Number,
            required: true
        },
       
    },
    emits: ['close'],
    setup(props, { emit }) {

        const commentContent = ref('')

        const closeCommentUpdateModal = () => {
            emit('close') // 부모에게 닫으라고 신호 보냄
            
            document.body.style.overflow = 'auto'
        }



        const getDetailComment = async (commentCode) => {
            try {
                const response = await api.get('/user/board/getDetailComment',{
                params: { commentCode }
                })
                commentContent.value = response.data.commentContent
                
                
            } catch(error) {
                console.error('메뉴 상세 조회 오류:', error)
            }
        }

        const updateComment = async () => {
            if (!commentContent.value.trim()) {
                alert('댓글 내용을 입력해주세요.');
                return
            }
            try {
                const response = await api.post('/user/board/updateComment',{
                    commentCode: props.commentCode,
                    commentContent: commentContent.value
                })
                if(response.status == 200) {
                alert('내용 수정 완료.');
                console.log('댓글 수정 성공:', response.data);
                }
                closeCommentUpdateModal(); // 등록 후 모달 닫기
            } catch (error) {
                console.error(error)
            }
        }

        onMounted(() => {
            getDetailComment(props.commentCode)
            
        })
        return {
            closeCommentUpdateModal,
            getDetailComment,
            commentContent,
            updateComment,
        }

    }

}
</script>

<style scoped>

</style>