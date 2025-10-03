<template>
    <div class="content_page">

        <div class="base_width">

            <div class="content_box_white">
                <div class="content_inline">
                    <h1>{{}} 메뉴 관리</h1>
                </div>
            </div>

            <div class="content_box_white">
                <div class="content_body">
                    <div class="form_contents_box">

                        <!-- 공지사항 상세보기 -->
                
                        <div class="board_top_info">
                            <div class="board_search_box">
                                <select v-model="menuType" @change="getListMenu">
                                    <option value="MENU_H">홈페이지 용</option>
                                    <option value="MENU_A">관리자 전용</option>
                                </select>

                                <!-- <div class="board_search">
                                    <input type="text" placeholder="검색어를 입력하세요.">
                                    <a href="#"><i class="fa-solid fa-magnifying-glass"></i></a>
                                </div> -->
                            </div>
                            <button @click="openOrderEditModal">메뉴 순서 수정
                            </button>
                        </div>
                        <!-- 게시물 정보 -->

                        <div class="table_container_outer">
                            <div class="table_container">
                                <table class="basic_list" id="basic_list">
                                    <colgroup>
                                        <col width="10%"/>
                                        <col />
                                        <col width="15%"/>
                                        <col width="15%"/>
                                        <col width="15%"/>
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th>상위코드</th>
                                            <th>메뉴 이름</th>
                                            <th>메뉴 코드</th>
                                            <th>부모코드</th>
                                            <th>활성화 여부</th>
                                            <th>메뉴 타입</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item, index) in menuList" :key="item.menuCode">
                                            <td>
                                                <span v-if="item.sortOrder " class="reply-arrow">
                                                    <span v-for="n in item.depth - 1" :key="n">
                                                        <td>-></td>
                                                    </span>{{ item.sortOrder }}
                                                </span>
                                               
                                            </td>
                                            <td @click="openDetailMenuModal(item.menuCode)">{{ item.menuNm }}</td>
                                            <td @click="openDetailMenuModal(item.menuCode)">{{ item.menuCode }}</td>
                                            <td @click="openDetailMenuModal(item.menuCode)">{{ item.parentCode }}</td>
                                            <td @click="openDetailMenuModal(item.menuCode)">{{ item.useYn === 'Y' ? '활성화' : '비활성화' }}</td>
                                            <td @click="openDetailMenuModal(item.menuCode)">{{ item.menuTypeNm }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                 

                        <div class="table_btn_func mg_b50">
                            <div class="grid1 ta_r">
                                <button class="btn bg_blue" @click="openInsertMenuModal"><i class="ri-check-line"></i> 메뉴 등록하기</button>
                            </div>
                        </div>
                <!-- 게시판 글 상세보기 -->
                <!--// 게시판 글 상세보기 -->
                    </div>
                </div>
                 
                    <!-- 모달영역 -->
                <InsertAdminMenu
                    v-if="isMenuModalOpen"
                   
                    :isMenuModalOpen="isMenuModalOpen"
                   
                    @close="closeMenuModal"
                    @refresh="getListMenu"
                    >
                </InsertAdminMenu>
                    <!--// 모달영역 -->

                
                <AdminMenuDetail
                    v-if="detailMenuModalOpen"
                   
                    :item="selectedMenu"
                    :selectedMenuCode="selectedMenuCode"
                    :menuCode="selectedMenuCode"
                    @close="closeDetailMenuModal"
                    @refresh="getListMenu"
                    >
                </AdminMenuDetail>

                <MenuOrderEditModal
                    v-if="orderEditModalOpen"
                    
                    :menuList="menuList"
                    @close="closeOrderEditModal"
                    @refresh="getListMenu"
                    >
                </MenuOrderEditModal>
                    
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import api from '../../plugins/api'
import InsertAdminMenu from '../../components/InsertAdminMenu.vue'
import { closeModalBackGround, openModalBackGround } from '../../utils/globalFunctions'
import AdminMenuDetail from '../../components/AdminMenuDetail.vue'
import MenuOrderEditModal from '../../components/MenuOrderEditModal.vue'


export default {
    name: "AdminMain",
    components: {
        InsertAdminMenu,
        AdminMenuDetail,
        MenuOrderEditModal,
    },
    setup() {

        const menuList = ref([])
        const isMenuModalOpen = ref(false)

        const detailMenuModalOpen = ref(false)
        const orderEditModalOpen = ref(false)

        const selectedMenuCode = ref(null)
        const selectedMenu = ref(null)
        
        const menuType = ref('MENU_H')
        
        const getListMenu = async() =>{

            
            try{
                const response = await api.get('/admin/getListMenu',{
                    params:{
                        menuType: menuType.value
                   }
                })
                console.log(response);
                console.log(menuType);
                if(response.status==200) {
                    menuList.value = response.data
                }
                else{
                    alert("잘못된 요청입니다.");
                }
            } catch (error){
                console.error(error)
            }
        }
        const openOrderEditModal = () => {
            orderEditModalOpen.value = true
            document.body.style.overflow = 'hidden'
            openModalBackGround()
        }

        const closeOrderEditModal = () => {
            orderEditModalOpen.value = false
            document.body.style.overflow = 'auto'
            
            closeModalBackGround()
            window.location.reload()
        }



        const openInsertMenuModal = () => {

            isMenuModalOpen.value = true;   // 여기가 꼭 실행되어야 모달 열림
            document.body.style.overflow = 'hidden';
      
            openModalBackGround();
        }


        const closeMenuModal = () => {
            isMenuModalOpen.value = false           //  v-if로 모달 제거 유도
            document.body.style.overflow = 'auto'  //  스크롤 되돌리기만 유지
           
            closeModalBackGround();
            window.location.reload()
        }


        const openDetailMenuModal = (menuCode) => {
            selectedMenuCode.value = menuCode
            selectedMenu.value = menuList.value.find(menu => menu.menuCode === menuCode) || null;
            detailMenuModalOpen.value = true;   // 여기가 꼭 실행되어야 모달 열림
            document.body.style.overflow = 'hidden';
            
            openModalBackGround();
        }
        const closeDetailMenuModal = () => {
            detailMenuModalOpen.value = false           //  v-if로 모달 제거 유도
            document.body.style.overflow = 'auto'  //  스크롤 되돌리기만 유지
            
            closeModalBackGround();
            window.location.reload()
        }
        const getListMenuType = async() =>{
            
            try{
                const response = await api.get('/admin/getListMenuType')

                if(response.status==200) {
                    menuTypeList.value = response.data
                }
                else{
                    alert("잘못된 요청입니다.");
                }
            } catch (error){
                console.error(error)
            }
        }


        onMounted(() => {
            getListMenu()

            getListMenuType()
        })
        return {
            menuList,
            getListMenu,

            openInsertMenuModal,
            isMenuModalOpen,

            closeMenuModal,

            openDetailMenuModal,
            detailMenuModalOpen,
            closeDetailMenuModal,

            selectedMenuCode,
            selectedMenu,

            menuType,

            openOrderEditModal,
            orderEditModalOpen,
            closeOrderEditModal,
            getListMenuType,
        }
    }
}


</script>

<style scoped>

</style>