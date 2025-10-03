<template>
    <div class="modal modal_pop_product">
        <div class="pop_header">
            <button class="btn_modal_close" @click="closeInsertRoleGroupModal"><i class="ri-close-large-line"></i></button>
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
                                <input type="text" v-model="roleGroup.roleGroup" placeholder="권한 그룹 코드를 입력해주세요.">
                                <button @click="checkRoleGroupCode"  >코드 중복확인</button>
                            </div>
                        </td>
                        
                    </tr>
                        <th></th>
                        <div class="confirm_msg" v-if="checkedGroupCode">* 코드 중복 확인이 되었습니다.</div>
                    <tr>
                        <th>권한 이름<span class="fc_requisite">*</span></th>
                        <td>
                            <input type="text" v-model="roleGroup.description" placeholder="권한 그룹 이름을 입력해주세요.">
                        </td>
                    </tr>

                    

                </tbody>
            </table>

            <div class="table_btn_func">
                  <div class="grid2">
                      <div class="left">
                          <button class="btn bg_white" @click="closeInsertRoleGroupModal"><i class="ri-file-list-3-line"></i> 등록취소</button>
                      </div>
                      <div class="right">
                          <button class="btn bg_blue" @click="insertRoleGroup"><i class="ri-check-line"></i> 등록하기</button>
                      </div>
                  </div>
              </div>
        </div>
    </div>
</template>

<script>
import { ref, reactive, watch, onMounted } from 'vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'
import api from '../plugins/api'

export default {
    name: "InsertAdminRoleGroup",
    props: {
        InsertAdminRoleGorup: Boolean
        
    },
    emits: ['close'],
    setup(props, { emit }) {

        const router = useRouter();

        const roleGroupList = ref([])
        

        const roleGroup = reactive({
            roleGroup: '',
            description: ''
        })

        const checkedGroupCode = ref(false);

        const checkRoleGroupCode = async () => {
            console.log('확인할 코드:', roleGroup.roleGroup)
            if(!roleGroup.roleGroup || roleGroup.roleGroup.trim() === ''){
                alert('코드를 입력하세요')
                return
            }
            try{
                const response = await api.get('/admin/checkRoleGroupCode',{
                params: { roleGroup: roleGroup.roleGroup }
                })
                if(response.status == 200) {
                    alert('인증되었습니다')
                    checkedGroupCode.value = true
                }
            } catch (error) {
                console.error('중복된 코드 입니다.:', error)
                alert('중복된 코드 입니다')
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


        const closeInsertRoleGroupModal = () => {
            emit('close') // 부모에게 닫으라고 신호 보냄
            
            document.body.style.overflow = 'auto'
        }


        const insertRoleGroup = async () => {
            if (checkedGroupCode.value == false) {
                alert('코드 중복 확인을 하시오.');
                return;
            }
            if (!roleGroup.description.trim()) {
                alert('권한 그룹 이름을 입력해주세요.');
                return
            }
           
            const params = roleGroup
        

            try {
                const response = await api.post('/admin/insertRoleGroup', params);
                if(response.status == 200){
                    console.log('권한 그룹 등록 성공:', response.data);
                    alert('권한 그룹 등록 완료.');
                }          
                router.push('/admin/commonRoleGroup/')
                closeInsertRoleGroupModal(); // 등록 후 모달 닫기
            } catch (error) {
                
                console.error('권한 그룹 등록 실패:', error);
                alert('권한 그룹 등록 실패.');
        
                
            }
        }


        onMounted(() => {
            getListRoleGroup()
         
            
        })
        return {
            closeInsertRoleGroupModal,
            getListRoleGroup,
            roleGroupList,
            insertRoleGroup,
            roleGroup,
            checkRoleGroupCode,
            checkedGroupCode,
        }

    }

}
</script>

<style scoped>

</style>