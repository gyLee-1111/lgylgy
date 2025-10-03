<template>
    <div class="modal modal_pop_product">
        <div class="pop_header">
            <button class="btn_modal_close" @click="closeDetailRoleGroupModal"><i class="ri-close-large-line"></i></button>
        </div>
    
		<!--// 좌측 메뉴 트리 부분 -->
        <div class="pop_body">
            <h2 class="title_pg">권한 그룹 등록</h2>
            <table class="basic_write mg_t50">
                <colgroup>
                    <col width="30%"/>
                    <col />
                </colgroup>
                <tbody>
                    <tr>
                        <th>권한 그룹 코드<span class="fc_requisite">*</span></th>
                        <td>
                            <div style="display: flex; gap: 8px;">
                                <input type="text" v-model="role.roleGroup"  disabled class="input_disabled" >
                            </div>
                        </td>
                       
                    </tr>
                    <tr>
                        <th>권한 그룹 이름<span class="fc_requisite">*</span></th>
                        <td>
                            <input type="text" v-model="role.description" placeholder="권한 그룹 이름을 입력해주세요.">
                        </td>
                    </tr>

                </tbody>
            </table>

            <div class="table_btn_func">
                  <div class="grid2">
                      <div class="left">
                          <button class="btn bg_white" @click="closeDetailRoleGroupModal"><i class="ri-file-list-3-line"></i> 등록취소</button>
                      </div>
                      <div class="right">
                          <button class="btn bg_blue" @click="updateRoleGroup"><i class="ri-check-line"></i> 수정하기</button>
                      </div>
                      <div class="right">
                          <button class="btn bg_white" @click="deleteRoleGroup" ><i class="ri-file-list-3-line"></i> 삭제하기</button>
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
    name: "AdminRoleGroupDetail",
    props: {
        detailModalOpen: Boolean,
        roleGroup: {
            type: String,
            required: true
        },
       
    },
    emits: ['close'],
    setup(props, { emit }) {
        const role = reactive({
            roleGroup: '',
            description: '',
        });
       
        const closeDetailRoleGroupModal = () => {
            emit('close') // 부모에게 닫으라고 신호 보냄
            
            document.body.style.overflow = 'auto'
        }

        

      


        


        const updateRoleGroup = async () => {
            
            if (!role.description.trim()) {
                alert('권한 그룹 이름을 입력해주세요.');
                return
            }

            const params = role

            try {
                const response = await api.post('/admin/updateRoleGroup', params);
                if(response.status == 200) {
                alert('권한 수정 완료.');
                console.log('권한 수정 성공:', response.data);
                closeDetailRoleGroupModal()
                }
            } catch (error) {
               console.error('권한 수정 실패:', error);
                alert('권한 수정 실패.');
            }
        }

        const getDetailRoleGroup = async (roleGroup) => {
            try {
                const response = await api.get('/admin/getDetailRoleGroup',{
                params: { roleGroup }
                })
                if(response.status==200) {
                    const data = response.data
                    role.roleGroup = data.roleGroup
                    role.description = data.description
                }
                else{
                    alert("잘못된 요청입니다.");
                }
                
            } catch(error) {
                console.error('메뉴 상세 조회 오류:', error)
            }
        }
        
        const deleteRoleGroup = async () => {
            if (!confirm('정말 삭제하시겠습니까?')) {
                return
            }
            try {
                const response = await api.post(`/admin/deleteRoleGroup?roleGroup=${props.roleGroup}`);
                if(response.status == 200){
                   console.log('권한 삭제 성공:', response.data)
                   alert('권한 삭제 완료.')
                }
                closeDetailRoleGroupModal(); // 모달 닫기
            } catch (error) {
                console.error('권한 삭제 실패:', error)
                alert('권한 삭제 실패.')
            }
        }
        
        onMounted(() => {
            getDetailRoleGroup(props.roleGroup)
            
        })
        return {
            role,
            getDetailRoleGroup,
            
            updateRoleGroup,
            deleteRoleGroup,

            closeDetailRoleGroupModal,
        }

    }

}
</script>

<style scoped>

</style>