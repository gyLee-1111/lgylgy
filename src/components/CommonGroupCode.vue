<template>
    <div class="modal modal_pop_product">
        <div class="pop_header">
            <button class="btn_modal_close" @click="closeCommonGroupModal"><i class="ri-close-large-line"></i></button>
        </div>
        <div class="pop_body">
            <h2 class="title_pg">공통코드 등록</h2>

            <div class="table_container_outer mg_t50">
                <div class="table_container">
                    <table class="basic_list" id="basic_list">
                        <colgroup>
                            <col width="20%" />
                            <col width="20%" />
                            <col width="20%" />
                            <col width="10%" />
                            <col width="10%" />
                        </colgroup>
                        <thead>
                            <tr>
                                <th>코드</th>
                                <th>코드 명</th>
                                <th>설명</th>
                                <th>사용 여부</th>
                                <th>버튼</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="codeGroup in codeGroupList" :key="codeGroup.commonGroupCode">
                                <td>{{ codeGroup.commonGroupCode }}</td>
                                <td><input type="text" v-model="codeGroup.commonGroupNm" /></td>
                                <td><input type="text"  v-model="codeGroup.description" /></td>
                                <td>
                                    <select v-model="codeGroup.useYn">
                                        <option value="Y">사용</option>
                                        <option value="N">미사용</option>
                                    </select>
                                </td>
                            
                                <td>
                                    <button class="btn btn-primary" @click="updateCommonGroup(codeGroup)">수정</button><br>
                                    <button class="btn btn-primary" @click="deleteCommonGroup(codeGroup)">삭제</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>


            <div class="row">
                <div class="col-lg-12 col-xl-12">
                    <input type="hidden" id="add_available" val="N">
                    <form id="frm_group_code" style="height: 99%;">
                        <table class="table table-bordered" width="100%" cellspacing="0">
                            <thead>
                                <tr>
                                    <th><span>그룹코드 추가</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <input type="text" v-model="commonGroup.commonGroupCode" placeholder="그룹코드">
                                    </td>
                                    <td><input type="text" v-model="commonGroup.commonGroupNm" placeholder="그룹코드 명"></td>
                                    <td><input type="text" v-model="commonGroup.description" placeholder="설명"></td>
                                    <td>
                                        <button type="button" class="btn btn-primary"  @click="insertCommonGroup">추가</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                </div>
            </div>



          
            <div class="table_btn_func">
                  <div class="grid2">
                      <div class="left">
                          <button class="btn bg_white" @click="closeCommonGroupModal"><i class="ri-file-list-3-line"></i> 닫기</button>
                      </div>
          
                  </div>
              </div>
        </div>
    </div>
</template>

<script>
import { ref, reactive, watch, onMounted, computed } from 'vue'
import axios from 'axios'
// import { useRoute, useRouter } from 'vue-router'
import api from '../plugins/api'

export default {
    name: "CommonCode",
    props: {
        commonGroupCodeModalOpen: Boolean,
    },
    emits: ['close'],
    setup(props, { emit }) {

        
        const codeGroupList = ref([])

        const commonGroup = reactive({
            commonGroupCode: '',
            commonGroupNm: '',
            description: '',
        });
        const codeGroup = reactive({
            commonGroupCode: '',
            commonGroupNm: '',
            description: '',
        });


        const closeCommonGroupModal = () => {
            emit('close') // 부모에게 닫으라고 신호 보냄
            
            document.body.style.overflow = 'auto'
        }
        const getListCommonGroup = async() => {
             try{
                const response = await api.get('/admin/getListCommonGroup')
                console.log(response);
                if(response.status==200) {
                    codeGroupList.value = response.data
                }
                else{
                    alert("잘못된 요청입니다.");
                }
            } catch (error){
                console.error(error)
            }
        }

        const insertCommonGroup = async() =>{
           
            if(!commonGroup.commonGroupCode.trim()){
                alert('공통코드를 입력해주세요.');
                return
            }
            if(!commonGroup.commonGroupNm.trim()){
                alert('공통코드명을 입력해주세요.');
                return
            }
           
            if(!commonGroup.description.trim()){
                alert('코드 설명을 입력해주세요.');
                return
            }
            const params = {
                commonGroupCode: commonGroup.commonGroupCode,
                commonGroupNm: commonGroup.commonGroupNm,
                description: commonGroup.description
            }
            try{
                const response = await api.post('/admin/insertCommonGroup', params)
                if(response.status == 200){
                    console.log('코드 등록 성공:', response.data)
                    alert('코드 등록 완료.')
                }
                getListCommonGroup()
                commonGroup.commonGroupCode = ''
                commonGroup.commonGroupNm = ''
                commonGroup.description = ''
            }
            catch(error){
            const message = error.response?.data?.message || '이미 등록된 코드 입니다.'
                alert(message)
            }

        }
        
        const updateCommonGroup = async(codeGroup) =>{
           
            if(!codeGroup.commonGroupNm.trim()){
                alert('공통코드명을 입력해주세요.');
                return
            }
           
            if(!codeGroup.description.trim()){
                alert('코드 설명을 입력해주세요.');
                return
            }
            const params = {
                commonGroupCode: codeGroup.commonGroupCode,
                commonGroupNm: codeGroup.commonGroupNm,
                description: codeGroup.description,
                useYn: codeGroup.useYn
             
            }
            try{
                const response = await api.post('/admin/updateCommonGroup', params)
                if(response.status == 200){
                    console.log('코드 수정 성공:', response.data)
                    alert('코드 수정 완료.')
                }
                getListCommonGroup()
            }
            catch(error){
                console.error('코드 수정 실패:', error);
                alert('코드 수정 실패.');
            }

        }
  
        const deleteCommonGroup = async(codeGroup) => {
            if (!confirm('정말 삭제하시겠습니까?')) {
                return
            }
            const params = {
                commonGroupCode: codeGroup.commonGroupCode,
            }
            try {
                const response = await api.post('/admin/deleteCommonGroup',params);
                if(response.status == 200){
                   console.log('코드 그룹 삭제 성공:', response.data)
                   alert('코드 그룹 삭제 완료.')
                }
                getListCommonGroup()
            } catch (error) {
                const message = error.response?.data?.message || '그룹에 포함된 코드를 먼저 삭제하십시오.'
                alert(message)
            }

        }



        onMounted(() => {
            getListCommonGroup()
            
        })
        return {
            closeCommonGroupModal,
            getListCommonGroup,
            codeGroupList,
            commonGroup,

            insertCommonGroup,
            updateCommonGroup,
            codeGroup,
            deleteCommonGroup,

        }

    }

}
</script>

<style scoped>

</style>