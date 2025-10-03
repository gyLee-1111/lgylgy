<template>
    <div class="modal modal_pop_product">
        <div class="pop_header">
            <button class="btn_modal_close" @click="closeInsertRoleModal"><i class="ri-close-large-line"></i></button>
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
                                <input type="text" v-model="role.roleCode" placeholder="권한 코드를 입력해주세요.">
                                <button @click="checkRoleCode"  >코드 중복확인</button>
                            </div>
                        </td>
                        
                    </tr>
                        <th></th>
                        <div class="confirm_msg" v-if="checkedCode">* 코드 중복 확인이 되었습니다.</div>
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
                          <button class="btn bg_white" @click="closeInsertRoleModal"><i class="ri-file-list-3-line"></i> 등록취소</button>
                      </div>
                      <div class="right">
                          <button class="btn bg_blue" @click="insertRole"><i class="ri-check-line"></i> 등록하기</button>
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
    name: "InsertAdminRole",
    props: {
        InsertAdminRole: Boolean
        
    },
    emits: ['close'],
    setup(props, { emit }) {

        const router = useRouter();

        const roleGroupList = ref([])
        

        const role = reactive({
            roleCode: '',
            roleNm: '',
            roleGroup: ''
        })

        const checkedCode = ref(false);

        const checkRoleCode = async () => {
            console.log('확인할 코드:', role.roleCode)
            if(!role.roleCode || role.roleCode.trim() === ''){
                alert('ID를 입력하세요')
                return
            }
            try{
                const response = await api.get('/admin/checkRoleCode',{
                params: { roleCode: role.roleCode }
                })
                if(response.status == 200) {
                    alert('인증되었습니다')
                    checkedCode.value = true
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


        const closeInsertRoleModal = () => {
            emit('close') // 부모에게 닫으라고 신호 보냄
            
            document.body.style.overflow = 'auto'
        }


        const insertRole = async () => {
            if (checkedCode.value == false) {
                alert('ID 중복 확인을 하시오.');
                return;
            }
            if (!role.roleNm.trim()) {
                alert('권한 이름을 입력해주세요.');
                return
            }
            if (!role.roleGroup.trim()) {
                alert('권한 그룹을 선택해주세요.');
                return
            }

            const params = role
        

            try {
                const response = await api.post('/admin/insertRole', params);
                if(response.status == 200){
                    console.log('권한 등록 성공:', response.data);
                    alert('권한 등록 완료.');
                }          
                router.push('/admin/commonRole/')
                closeInsertRoleModal(); // 등록 후 모달 닫기
            } catch (error) {
                
                console.error('메뉴 등록 실패:', error);
                alert('메뉴 등록 실패.');
        
                
            }
        }


        onMounted(() => {
            getListRoleGroup()
         
            
        })
        return {
            closeInsertRoleModal,
            getListRoleGroup,
            roleGroupList,
            insertRole,
            role,
            checkRoleCode,
            checkedCode,
        }

    }

}
</script>

<style scoped>

</style>