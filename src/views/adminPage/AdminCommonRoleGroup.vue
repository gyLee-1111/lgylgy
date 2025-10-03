<template>
    <div class="content_page">

        <div class="base_width">

            <div class="content_box_white">
                <div class="content_inline">
                    <h1>권한 그룹 관리</h1>
                </div>
            </div>

            <div class="content_box_white">
                <div class="content_body">
                    <div class="form_contents_box">

                        <!-- 공지사항 상세보기 -->
                
                        <div class="board_top_info">
                            <div class="board_search_box">
                                

                            </div>
                        </div>
                        <!-- 게시물 정보 -->

                        <div class="table_container_outer">
                            <div class="table_container">
                                <table class="basic_list" id="basic_list">
                                    <colgroup>
                                        <col width="%"/>
                                        <col width="%"/>
                                        <col width="%"/>
                                        <col width="%"/>
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th>번호</th>
                                            <th>권한 그룹 코드</th>
                                            <th>권한 그룹 이름</th>
                                            <th>사용 여부</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item, index) in roleGroupList" :key="item.roleGroup">
                                            <td>{{ index + 1 }}</td>
                                            <td @click="openDetailRoleGroupModal(item.roleGroup)">{{ item.roleGroup }}</td>
                                            <td @click="openDetailRoleGroupModal(item.roleGroup)">{{ item.description }}</td>
                                            <td @click="changeUseYnGroup(item.roleGroup,item.useYn)">{{ item.useYn === 'Y' ? '사용' : '사용안함' }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div class="table_btn_func mg_b50">
                            <div class="grid1 ta_r">
                                <button class="btn bg_blue" @click="openInsertRoleGroupModal"><i class="ri-check-line"></i>권한 그룹 등록하기</button>
                            </div>
                        </div>
                        

                
                    </div>
                </div>

                <InsertAdminRoleGroup
                    v-if="InsertRoleGroupModalOpen"
                    @close="closeInsertRoleGroupModal"
                    @refresh="getListRoleGroup"
                    >
                </InsertAdminRoleGroup> 

                <DetailAdminRoleGroup
                    v-if="DetailRoleGroupModalOpen"
                   
                    :roleGroup="selectedRoleGroupCode"
                    @close="closeDetailRoleGroupModal"
                    @refresh="getListRoleGroup"
                    >
                </DetailAdminRoleGroup>



            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import api from '../../plugins/api'
import InsertAdminRoleGroup from '../../components/InsertAdminRoleGroup.vue'
import DetailAdminRoleGroup from '../../components/DetailAdminRoleGroup.vue'
import { closeModalBackGround, openModalBackGround } from '../../utils/globalFunctions'


export default {
    name: "AdminUser",
    components: {
       InsertAdminRoleGroup,
       DetailAdminRoleGroup,
    },
    setup() {

        const roleGroupList = ref([])


        const selectedRoleGroupCode = ref(null);

        const InsertRoleGroupModalOpen = ref(false)
        const DetailRoleGroupModalOpen = ref(false)
        
        const getListRoleGroup = async() =>{
            
            try{
                const response = await api.get('/admin/getListRoleGroup')
                console.log(response);
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
        
       
        const openInsertRoleGroupModal = () => {
            console.log("모달 열기 시도");
            InsertRoleGroupModalOpen.value = true;   // 여기가 꼭 실행되어야 모달 열림
            document.body.style.overflow = 'hidden';
            openModalBackGround()
        }

        const closeInsertRoleGroupModal = () => {
            InsertRoleGroupModalOpen.value = false           //  v-if로 모달 제거 유도
            document.body.style.overflow = 'auto'  //  스크롤 되돌리기만 유지
            getListRoleGroup();
            closeModalBackGround()
        }
        const openDetailRoleGroupModal = (roleGroup) => {
            selectedRoleGroupCode.value = roleGroup;
            DetailRoleGroupModalOpen.value = true;   // 여기가 꼭 실행되어야 모달 열림
            document.body.style.overflow = 'hidden';
            openModalBackGround()
        }
        const closeDetailRoleGroupModal = () => {
            DetailRoleGroupModalOpen.value = false;
            document.body.style.overflow = 'auto'  //  스크롤 되돌리기만 유지
            getListRoleGroup();
            closeModalBackGround()
        }






        const changeUseYnGroup = async(roleGroup, currentValue) =>{
            const newValue = currentValue === 'Y' ? 'N' : 'Y'
            try{
                const response = await api.post('/admin/changeUseYnGroup', {
                    roleGroup,
                    useYn: newValue
                })
                if(response.status === 200){
                    getListRoleGroup()
                }else {
                    alert('변경 실패.')
                }
            }catch (error) {
                console.error(error)
                alert('오류가 발생했습니다.')
            }
        }
     

        onMounted(() => {
          getListRoleGroup()
        })
        return {
            roleGroupList,
            getListRoleGroup,

            changeUseYnGroup,

            openInsertRoleGroupModal,
            InsertRoleGroupModalOpen,
            closeInsertRoleGroupModal,

            openDetailRoleGroupModal,
            DetailRoleGroupModalOpen,
            closeDetailRoleGroupModal,

            selectedRoleGroupCode,

        }
    }
}


</script>

<style scoped>

</style>