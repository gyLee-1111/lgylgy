<template>
    <div class="modal modal_pop_product">
        <div class="pop_header">
            <button class="btn_modal_close" @click="closeDetailRoleModal"><i class="ri-close-large-line"></i></button>
        </div>
    
		<!--// 좌측 메뉴 트리 부분 -->
        <div class="pop_body">
            <h2 class="title_pg">권한 등록</h2>
            <table class="basic_write mg_t50">
                <colgroup>
                    <col width="30%"/>
                    <col />
                </colgroup>
                <tbody>
                    <tr>
                        <th>권한 코드<span class="fc_requisite">*</span></th>
                        <td>
                            <div style="display: flex; gap: 8px;">
                                <input type="text" v-model="role.roleCode"  disabled class="input_disabled" >
                            </div>
                        </td>
                       
                    </tr>
                    <tr>
                        <th>권한 이름<span class="fc_requisite">*</span></th>
                        <td>
                            <input type="text" v-model="role.roleNm" placeholder="권한 이름을 입력해주세요.">
                        </td>
                    </tr>

                    <!--셀렉트 박스로 변경 셀렉트 박스 getList로 받아야함-->
                    <tr>
                        <th>권한 그룹</th>
                        <td>
                            <select v-model="role.roleGroup">
                                <option value="">권한 타입 선택</option>
                                <option v-for="commonGroup in roleGroupList" :key="commonGroup.roleGroup" :value="commonGroup.roleGroup">{{ commonGroup.description }}</option>
                            </select>
                        </td>
                    </tr>

                </tbody>
            </table>

            <div class="table_btn_func">
                  <div class="grid2">
                      <div class="left">
                          <button class="btn bg_white" @click="closeDetailRoleModal"><i class="ri-file-list-3-line"></i> 등록취소</button>
                      </div>
                      <div class="right">
                          <button class="btn bg_blue" @click="updateRole"><i class="ri-check-line"></i> 수정하기</button>
                      </div>
                      <div class="right">
                          <button class="btn bg_white" @click="deleteRole" ><i class="ri-file-list-3-line"></i> 삭제하기</button>
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
    name: "AdminRoleDetail",
    props: {
        detailModalOpen: Boolean,
        roleCode: {
            type: String,
            required: true
        },
       
    },
    emits: ['close'],
    setup(props, { emit }) {
        const role = reactive({
            roleCode: '',
            roleNm: '',
            roleGroup: '',
        });
        const roleGroupList = ref([])

        const closeDetailRoleModal = () => {
            emit('close') // 부모에게 닫으라고 신호 보냄
            
            document.body.style.overflow = 'auto'
        }

        

      


        


        const updateRole = async () => {
            
            if (!role.roleNm.trim()) {
                alert('권한 이름을 입력해주세요.');
                return
            }

            const params = role

            try {
                const response = await api.post('/admin/updateRole', params);
                if(response.status == 200) {
                alert('권한 수정 완료.');
                console.log('권한 수정 성공:', response.data);
                closeDetailRoleModal()
                }
            } catch (error) {
               console.error('권한 수정 실패:', error);
                alert('권한 수정 실패.');
            }
        }

        const getDetailRole = async (roleCode) => {
            try {
                const response = await api.get('/admin/getDetailRole',{
                params: { roleCode }
                })
                if(response.status==200) {
                    const data = response.data
                    role.roleCode = data.roleCode
                    role.roleNm = data.roleNm
                    role.roleGroup = data.roleGroup
                }
                else{
                    alert("잘못된 요청입니다.");
                }
                
            } catch(error) {
                console.error('메뉴 상세 조회 오류:', error)
            }
        }
        const getListRoleGroup = async() =>{
            
            try{
                const response = await api.get('/admin/getListRoleGroup')

                if(response.status==200) {
                    roleGroupList.value = response.data
                }
                else{
                    alert("잘못된 요청입니다.");
                }
            } catch (error){
                console.error(error)
            }
        }
        const deleteRole = async () => {
            if (!confirm('정말 삭제하시겠습니까?')) {
                return
            }
            try {
                const response = await api.post(`/admin/deleteRole?roleCode=${props.roleCode}`);
                if(response.status == 200){
                   console.log('권한 삭제 성공:', response.data)
                   alert('권한 삭제 완료.')
                }
                closeDetailRoleModal(); // 모달 닫기
            } catch (error) {
                console.error('권한 삭제 실패:', error)
                alert('권한 삭제 실패.')
            }
        }

   
        

        
        
        onMounted(() => {
            console.log('InsertAdminMenu mounted')
            getDetailRole(props.roleCode)
            getListRoleGroup()
            
        })
        return {
            role,
            getDetailRole,
            getListRoleGroup,
            roleGroupList,
            updateRole,
            deleteRole,

            closeDetailRoleModal,
        }

    }

}
</script>

<style scoped>

</style>