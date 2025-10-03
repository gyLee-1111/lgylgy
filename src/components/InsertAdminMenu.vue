<template>
    <div class="modal modal_pop_product">
        <div class="pop_header">
            <button class="btn_modal_close" @click="closeMenuModal"><i class="ri-close-large-line"></i></button>
        </div>
    
		<!--// 좌측 메뉴 트리 부분 -->
        <div class="pop_body">
            <h2 class="title_pg">메뉴 등록</h2>
            <table class="basic_write mg_t50">
                <colgroup>
                    <col width="30%"/>
                    <col />
                </colgroup>
                <tbody>
                    <tr>
                        <th>메뉴이름<span class="fc_requisite">*</span></th>
                        <td>
                            <input type="text" v-model="menu.menuNm" placeholder="메뉴 이름을 입력해주세요.">
                        </td>
                    </tr>

                    <!--셀렉트 박스로 변경 셀렉트 박스 getList로 받아야함-->
                    <tr>
                        <th>메뉴 타입 여부</th>
                        <td>
                            <select v-model="menu.menuType" @change="menuTypeChange">
                                <option value="">메뉴 타입 선택</option>
                                <option v-for="commonGroup in menuTypeList" :key="commonGroup.commonCode" :value="commonGroup.commonCode">{{ commonGroup.commonCodeNm }}</option>
                            </select>
                        </td>
                    </tr>

                    <tr>
                        <th>상위메뉴</th>
                        <td>
                            <select v-model="menu.parentCode" @change="pathNull">
                            <option value="">상위메뉴 없음</option>
                            <option v-for="parent in parentMenuList" :key="parent.menuCode" :value="parent.menuCode">
                                {{ parent.menuNm }}
                            </option>
                            </select>
                        </td>
                    </tr>
                    <tr v-if="menu.parentCode !=0">
                        <th>메뉴 경로</th>
                        <td>
                            <label>
                                <input type="text" id="menu_url" name="menu_url"  v-model="menu.path" />
                            </label>
                        </td>
                    </tr>
                    
                    

                </tbody>
            </table>

            <div class="table_container_outer mg_t50">
                <div class="table_container">
                    <table class="basic_list" id="basic_list">
                        <colgroup>
                            <col width="10%" />
                            <col width="10%" />
                            <col width="10%" />
                        </colgroup>
                        <thead>
                            <tr>
                                <th>메뉴 권한</th>
                                <th>권한 없음</th>
                                <th>열람 가능</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="userRole in roleList" :key="userRole.roleCode">
                                <td>{{ userRole.roleNm }}</td>
                                <td><input type="radio" value="N" v-model="menurole[userRole.roleCode]" /> 권한 없음</td>
                                <td><input type="radio" value="Y" v-model="menurole[userRole.roleCode]" /> 열람 가능</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="table_btn_func">
                  <div class="grid2">
                      <div class="left">
                          <button class="btn bg_white" @click="closeMenuModal"><i class="ri-file-list-3-line"></i> 등록취소</button>
                      </div>
                      <div class="right">
                          <button class="btn bg_blue" @click="insertMenu"><i class="ri-check-line"></i> 등록하기</button>
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
    name: "InsertAdminMenu",
    props: {
        isModalMenuOpen: Boolean,
        showMarketInfo: {
            type: Boolean,
            default: true
        }
    },
    emits: ['close'],
    setup(props, { emit }) {
        const menuTypeList = ref([])
        const menuList = ref([])
     //   const menuType = ref('MENU_H')
        const parentMenuList = ref([])

        const roleList = ref([])
        const menu = reactive({
            menuCode:'',
            menuNm: '',
            menuType: '',
            parentCode: '',
            depth: '',
            path: '',
            useAdmin: ''
        })
        const pathNull = () => {
            if(menu.parentCode ==0) {
                menu.path = null
            }
        }

        const menurole = reactive({});

        const closeMenuModal = () => {
            emit('close') // 부모에게 닫으라고 신호 보냄
            
            document.body.style.overflow = 'auto'
        }

        const menuTypeChange = () => {
            
            if(menu.menuType) {
                getListMenuUpper();
            } else {
                parentMenuList.value = [];
            }
        }

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


        const getListMenuUpper = async() =>{
            
            try{
                const response = await api.get('/admin/getListMenuUpper',{
                    params:{
                        menuType: menu.menuType
                   }
                })
                console.log(response);
                if(response.status==200) {
                    menuList.value = response.data
                    parentMenuList.value = response.data
                }
                else{
                    alert("잘못된 요청입니다.");
                }
            } catch (error){
                console.error(error)
            }
        }

        const insertMenu = async () => {
            if (!menu.menuNm.trim()) {
                alert('메뉴 이름을 입력해주세요.');
                return
            }
            if (menu.parentCode !=0 && menu.parentCode !== '') {
                if(menu.path == null || menu.path.trim() === ''){
                    alert('URL을 입력 해주세요')
                    return
                }
            }

            const entries = Object.entries(menurole);
            const menuRoles = [];

            for (let i = 0; i < entries.length; i++) {
                const [roleCode, useRole] = entries[i]
                if(useRole === 'Y') {
                    menuRoles.push({ roleCode })
                }
            }
            const params = {
                adminMenuDto: menu,
                adminMenuRoleDto: menuRoles
            }

            try {
                const response = await api.post('/admin/insertMenu', params);
                if(response.status == 200){
                    console.log('메뉴 등록 성공:', response.data);
                    alert('메뉴 등록 완료.');
                }          
                
                closeMenuModal(); // 등록 후 모달 닫기
            } catch (error) {
                
                // console.error('메뉴 등록 실패:', error);
                // alert('메뉴 등록 실패.');
                const message = error.response?.data?.message || '이미 등록된 URL 입니다.'
                alert(message)
                
            }
        }


        onMounted(() => {
            
            getListRole()
            getListMenuUpper()
            getListMenuType()
            
        })
        return {
            closeMenuModal,
            menu,
            insertMenu,
            getListRole,
            roleList,
            menurole,
            getListMenuUpper,
            parentMenuList,

            getListMenuType,
            menuTypeList,
            menuTypeChange,
            
        }

    }

}
</script>

<style scoped>

</style>