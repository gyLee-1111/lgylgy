<template>
    <div class="modal modal_pop_product">
        <div class="pop_header">
            <button class="btn_modal_close" @click="closeModal"><i class="ri-close-large-line"></i></button>
        </div>
        <div class="pop_body">
            <h2 class="title_pg">공통코드 등록</h2>

            <table class="basic_write mg_t50">
                <colgroup>
                    <col width="30%"/>
                    <col />
                </colgroup>
                <tbody>
                    <tr v-if="modalMode === 'insertUpperCode'">
                        <th>그룹코드<span class="fc_requisite"></span></th>
                        <td>
                            <select v-model="commonCodes.commonGroupCode">
                                <option value="">코드 그룹 선택</option>
                                <option v-for="commonGroup in commonGroupList" :key="commonGroup.commonGroupCode" :value="commonGroup.commonGroupCode">{{ commonGroup.commonGroupNm }}</option>
                            </select>
                        </td>
                    </tr>
                    <tr v-if="modalMode === 'updateUpperCode'">
                        <th>그룹코드<span class="fc_requisite"></span></th>
                        <td>
                            <select v-model="commonCodes.commonGroupCode">
                                <option v-for="commonGroup in commonGroupList" :key="commonGroup.commonGroupCode" :value="commonGroup.commonGroupCode">{{ commonGroup.commonGroupNm }}</option>
                            </select>
                        </td>
                    </tr>
                    <tr v-if="modalMode === 'insertSubCode'">
                        <th>그룹코드<span class="fc_requisite"></span></th>
                        <td>
                            <p>{{ initialData?.commonGroupCode }}</p>
                            <input type="hidden" v-model="commonCodes.commonGroupCode">
                        </td>
                    </tr>
                    <tr v-if="modalMode === 'insertSubCode'">
                        <th>상위 코드<span class="fc_requisite"></span></th>
                        <td>
                            <p>{{ initialData?.commonCode }}</p>
                            <input type="hidden" v-model="commonCodes.upperCode">
                        </td>
                    </tr>
                    <tr v-if="modalMode === 'updateSubCode'">
                        <th>상위 코드<span class="fc_requisite"></span></th>
                        <td>
                            <p>{{ initialData?.upperCode }}</p>
                            <input type="hidden" v-model="commonCodes.upperCode" placeholder="최상위 코드">
                        </td>
                    </tr>
                    <tr v-if="modalMode === 'insertUpperCode'">
                        <th>코드<span class="fc_requisite">*</span></th>
                        <td>
                            <input type="text" v-model="commonCodes.commonCode" placeholder="코드를 입력해 주세요.">
                        </td>
                    </tr>
                    <tr v-if="modalMode === 'updateUpperCode'">
                        <th>코드<span class="fc_requisite">*</span></th>
                        <td>
                            <p>{{ initialData?.commonCode }}</p>
                            <input type="hidden" v-model="commonCodes.commonCode" placeholder="코드를 입력해 주세요.">
                        </td>
                    </tr>
                    <tr v-if="modalMode === 'insertSubCode'">
                        <th>코드<span class="fc_requisite">*</span></th>
                        <td>
                            <input type="text" v-model="commonCodes.commonCode" placeholder="코드를 입력해 주세요.">
                        </td>
                    </tr>
                    <tr v-if="modalMode === 'updateSubCode'">
                        <th>코드<span class="fc_requisite">*</span></th>
                        <td>
                            <p>{{ initialData?.commonCode }}</p>
                            <input type="hidden" v-model="commonCodes.commonCode" placeholder="코드를 입력해 주세요.">
                        </td>
                    </tr>
                    <tr>
                        <th>코드 명<span class="fc_requisite"></span></th>
                        <td>
                            <input type="text" v-model="commonCodes.commonCodeNm" placeholder="코드명을 입력해주세요.">
                        </td>
                    </tr>
                   <tr>
                        <th>설명<span class="fc_requisite"></span></th>
                        <td>
                            <input type="text" v-model="commonCodes.description" placeholder="코드에 대한 설명을 적어주세요.">
                        </td>
                    </tr>

                </tbody>
            </table>

          
            <div class="table_btn_func">
                  <div class="grid2">
                      <div class="left">
                          <button class="btn bg_white" @click="closeModal"><i class="ri-file-list-3-line"></i> 닫기</button>
                      </div>
                      <div v-if="modalMode === 'insertUpperCode' || modalMode === 'insertSubCode'" class="right">
                          <button class="btn bg_blue" @click="insertCommonCode"><i class="ri-check-line"></i> 등록하기</button>
                      </div>
                      <div v-if="modalMode === 'updateUpperCode' || modalMode === 'updateSubCode'" class="right">
                          <button class="btn bg_blue" @click="updateCommonCode"><i class="ri-check-line"></i> 수정하기</button>
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
        commonCodeModalOpen: Boolean,
        modalMode: String,
        initialData: Object,
    },
    emits: ['close'],
    setup(props, { emit }) {
        const commonGroupList = ref([])

        const getListCommonGroup = async() =>{
            
            try{
                const response = await api.get('/admin/getListCommonGroup')

                if(response.status==200) {
                    commonGroupList.value = response.data
                }
                else{
                    alert("잘못된 요청입니다.");
                }
            } catch (error){
                console.error(error)
            }
        }

        const commonCodes = reactive({
            commonCode:'',
            commonCodeNm: '',
            description: '',
            upperCode: '',
            commonGroupCode:'',
        })
        


        const closeModal = () => {
            emit('close') // 부모에게 닫으라고 신호 보냄
            
            document.body.style.overflow = 'auto'
        }
        
        const insertCommonCode = async() =>{
            if(props.modalMode === 'updateUpperCode' || props.modalMode === 'updateSubCode'){
                return
            }
            else if(props.modalMode === 'insertUpperCode'){
                if(!commonCodes.commonCode.trim()){
                    alert('공통코드를 입력해주세요.');
                    return
                }
                if(!commonCodes.commonCodeNm.trim()){
                    alert('공통코드명을 입력해주세요.');
                    return
                }
                if(!commonCodes.commonGroupCode.trim()){
                    alert('코드 그룹을 선택해주세요.');
                    return
                }
                if(!commonCodes.description.trim()){
                    alert('코드 설명을 입력해주세요.');
                    return
                }
                const params = {
                    commonGroupCode: commonCodes.commonGroupCode,
                    commonCode: commonCodes.commonCode,
                    commonCodeNm: commonCodes.commonCodeNm,
                    description: commonCodes.description
                }
                try{
                    const response = await api.post('/admin/insertUpperCommonCode', params)
                    if(response.status == 200){
                        console.log('코드 등록 성공:', response.data)
                        alert('코드 등록 완료.')
                    }       
                    closeModal()
                }
                catch(error){
                const message = error.response?.data?.message || '이미 등록된 코드 입니다.'
                    alert(message)
                }
            }else{
                if(!commonCodes.commonCode.trim()){
                    alert('공통코드를 입력해주세요.');
                    return
                }
                if(!commonCodes.commonCodeNm.trim()){
                    alert('공통코드명을 입력해주세요.');
                    return
                }
                if(!commonCodes.description.trim()){
                    alert('코드 설명을 입력해주세요.');
                    return
                }
                const params = {
                    commonGroupCode: commonCodes.commonGroupCode,
                    commonCode: commonCodes.commonCode,
                    commonCodeNm: commonCodes.commonCodeNm,
                    description: commonCodes.description,
                    upperCode: commonCodes.upperCode,
                }
                try{
                    const response = await api.post('/admin/insertSubCommonCode', params)
                    if(response.status == 200){
                        console.log('코드 등록 성공:', response.data)
                        alert('코드 등록 완료.')
                    }       
                    closeModal()
                }
                catch(error){
                const message = error.response?.data?.message || '이미 등록된 코드 입니다.'
                    alert(message)
                }
            }

        }

        const getDetailCode = async() => {
            if(props.modalMode === 'insertUpperCode' || props.modalMode === 'insertSubCode' ){
                return
            }
            else if(props.modalMode === 'updateUpperCode'){
                const commonCode = props.initialData?.commonCode
                console.log("모달모드:", props.modalMode);
                console.log("initialData:", props.initialData);
                console.log("commonCode:", props.initialData?.commonCode);
                try{
                    const response = await api.get('/admin/getDetailUpperCode',{
                        params:{commonCode}
                    })
                    if(response.status==200){
                        const data = response.data
                        commonCodes.commonCode = data.commonCode
                        commonCodes.commonCodeNm = data.commonCodeNm
                        commonCodes.description = data.description
                        commonCodes.commonGroupCode = data.commonGroupCode
                    }
                    else{
                        alert("잘못된 요청입니다.")
                    }

                }catch(error){
                    console.error('코드 상세 조회 오류:', error)
                }
            }else{
                const commonCode = props.initialData?.commonCode
                console.log('하위 코드 수정 - commonCode:', commonCode);
                try{
                    const response = await api.get('/admin/getDetailSubCode',{
                        params:{commonCode}
                    })
                    if(response.status==200){
                        const data = response.data
                        commonCodes.upperCode = data.upperCode
                        commonCodes.commonCode = data.commonCode
                        commonCodes.commonCodeNm = data.commonCodeNm
                        commonCodes.description = data.description
                    }
                    else{
                        alert("잘못된 요청입니다.")
                    }

                }catch(error){
                    console.error('코드 상세 조회 오류:', error)
                }

            }
            
        }
        const updateCommonCode = async() => {
            if(props.modalMode === 'insertUpperCode' || props.modalMode === 'insertSubCode' ){
                return
            }
            else if(props.modalMode === 'updateUpperCode'){
                
                if(!commonCodes.commonCodeNm.trim()){
                    alert('공통코드명을 입력해주세요.');
                    return
                }
                if(!commonCodes.description.trim()){
                    alert('코드 설명을 입력해주세요.');
                    return
                }
                const params = {
                    commonCode: commonCodes.commonCode,
                    commonCodeNm: commonCodes.commonCodeNm,
                    description: commonCodes.description,
                    commonGroupCode: commonCodes.commonGroupCode
                }
                try{
                    const response = await api.post('/admin/updateUpperCommonCode', params)
                    if(response.status == 200){
                        console.log('코드 수정 성공:', response.data)
                        alert('코드 수정 완료.')
                    }       
                    closeModal()
                }
                catch(error){
                 console.error('코드 수정 오류:', error)
                }
            }
            else{
               
                if(!commonCodes.commonCodeNm.trim()){
                    alert('공통코드명을 입력해주세요.');
                    return
                }
                if(!commonCodes.description.trim()){
                    alert('코드 설명을 입력해주세요.');
                    return
                }
                const params = {
                    commonCode: commonCodes.commonCode,
                    commonCodeNm: commonCodes.commonCodeNm,
                    description: commonCodes.description
                }
                try{
                    const response = await api.post('/admin/updateSubCommonCode', params)
                    if(response.status == 200){
                        console.log('코드 수정 성공:', response.data)
                        alert('코드 수정 완료.')
                    }       
                    closeModal()
                }
                catch(error){
                    console.error('코드 수정 오류:', error)
                }
            }
        }



        onMounted(() => {
            if (props.modalMode === 'insertSubCode') {
                commonCodes.upperCode = props.initialData?.commonCode || ''
                commonCodes.commonGroupCode = props.initialData?.commonGroupCode || ''
            }
            if(props.modalMode === 'updateUpperCode' || props.modalMode === 'updateSubCode'){
                getDetailCode()
            }

            getListCommonGroup()
            
        })
        return {
            closeModal,
            insertCommonCode,
            commonCodes,


            getDetailCode,
            updateCommonCode,

            commonGroupList,
            getListCommonGroup,
        }

    }

}
</script>

<style scoped>

</style>