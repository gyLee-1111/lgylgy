<template>
<div class="modal modal_pop_product">
        <div class="pop_header">
            <button class="btn_modal_close" @click="closeDetailMenuModal"><i class="ri-close-large-line"></i></button>
        </div>
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
                            <input type="text" v-model="menu.menuNm" >
                        </td>
                    </tr>
                    <tr>
                        <th>메뉴코드</th>
                        <td>
                            <input type="text" v-model="menu.menuCode" disabled class="input_disabled" />
                        </td>
                    </tr>
                    <tr>
                        <!-- 이부분 셀렉트 박스로 변경  -->
                        <th>상위코드</th>
                        <td>
                            <!-- <input type="text" v-model="menu.parentCode" /> -->
                            <select v-model="menu.parentCode">
                                <option value="0">최상위 메뉴</option>
                                <option v-for="parentGroup in parentList" :key="parentGroup.parentCode" :value="parentGroup.parentCode">{{ parentGroup.parentNm }}</option>
                            </select>
                        </td>
                    </tr>

                    <tr>
                        <th>활성화 여부</th>
                        <td>
                            <label>
                                <input type="radio" value="Y" v-model="menu.useYn" />
                                <span>활성화</span>
                            </label>
                            <label>
                                <input type="radio" value="N" v-model="menu.useYn" />
                                <span>비활성화</span>
                            </label>
                        </td>
                    </tr>
                    <tr>
                        <th>메뉴 타입 여부</th>
                        <td><!--셀렉트 박스로 변경 -->
                            <select v-model="menu.menuType">
                                <option v-for="commonGroup in menuTypeList" :key="commonGroup.commonCode" :value="commonGroup.commonCode">{{ commonGroup.commonCodeNm }}</option>
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
                          <button class="btn bg_white" @click="closeDetailMenuModal"><i class="ri-file-list-3-line"></i> 닫기</button>
                      </div>
                      <div class="center">
                          <button class="btn bg_white" @click="deleteMenu" ><i class="ri-file-list-3-line"></i> 삭제하기</button>
                      </div>
                      <div class="right">
                          <button class="btn bg_blue" @click="updateMenu"><i class="ri-check-line"></i> 수정하기</button>
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
    name: "AdminMenuDetail",
    props: {
        detailModalOpen: Boolean,
        menuCode: {
            type: String,
            required: true
        },
        // showMarketInfo: {
        //     type: Boolean,
        //     default: true
        // }
    },
    emits: ['close'],
    setup(props, { emit }) {
        const parentList = ref([])
        const menuTypeList = ref([])
        const roleList = ref([]);
        const menu = reactive({
            menuCode:'',
            menuNm: '',
            parentCode: '',
            depth: '',
            path: '',
            useAdmin: ''
        })
        const menurole = reactive({});
        

        
        const closeDetailMenuModal = () => {
            emit('close') // 부모에게 닫으라고 신호 보냄
            
            document.body.style.overflow = 'auto'
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
            } catch (error) {
                console.error(error)
            }
        }

        const getListParent = async() =>{
            
            try{
                const response = await api.get('/admin/getListParent')

                if(response.status==200) {
                    parentList.value = response.data
                }
                else{
                    alert("잘못된 요청입니다.");
                }
            } catch (error){
                console.error(error)
            }
        }


        


/*
        const getDetailMenu = async (menuCode) => {
            try {
                const response = await api.get('/admin/getDetailMenu',{
                params: { menuCode }
                })
                const data = response.data
                const menuData = data.adminMenuDto;
                const roleData = data.adminMenuRoleDto;
                console.log('받은 menuData:', menuData); // 확인

                menu.menuCode = menuData.menuCode
                menu.menuNm = menuData.menuNm
                menu.parentCode = menuData.parentCode
                menu.depth = menuData.depth
                menu.path = menuData.path
                menu.useYn = menuData.useYn
                menu.menuType = menuData.menuType
                console.log(menu)
                roleList.value = roleData;

                roleData.forEach((role) => {
                    menurole[role.roleCode] = role.menuroleCode;
                    
                });
            } catch(error) {
                console.error('게시판 상세 조회 오류:', error)
            }
        }
*/
        const getDetailMenu = async (menuCode) => {
            try {
                const response = await api.get('/admin/getDetailMenu',{
                params: { menuCode }
                })
                const data = response.data
                const menuData = data.adminMenuDto;
                const roleData = data.adminMenuRoleDto;
                const allRoles = data.allMenuRoleDto;

                console.log('받은 menuData:', menuData); // 확인

                menu.menuCode = menuData.menuCode
                menu.menuNm = menuData.menuNm
                menu.parentCode = menuData.parentCode
                menu.depth = menuData.depth
                menu.path = menuData.path
                menu.useYn = menuData.useYn
                menu.menuType = menuData.menuType
                menu.sortOrder = menuData.sortOrder
                menu.parentNm = menuData.parentNm
                console.log(menu)
                roleList.value = allRoles;

                allRoles.forEach(role => {
                    // 할당된 권한 리스트에 roleCode가 있으면 'Y' 아니면 'N'
                    const roleState = roleData.find(roleSelect => roleSelect.roleCode === role.roleCode)
                    menurole[role.roleCode] = roleState ? 'Y' : 'N'
                })

                
            } catch(error) {
                console.error('메뉴 상세 조회 오류:', error)
            }
        }

        const updateMenu = async () => {
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
                const [roleCode, useRole] = entries[i];
                if(useRole === 'Y') {
                menuRoles.push({ roleCode })
                }
            }
            const params = {
                adminMenuDto: menu,
                adminMenuRoleDto: menuRoles
            }


            try {
                const response = await api.post('/admin/updateMenu', params);
                if(response.status == 200) {
                alert('메뉴 수정 완료.');
                console.log('게시판 수정 성공:', response.data);
                reactive();
                }
                closeDetailMenuModal(); // 등록 후 모달 닫기
            } catch (error) {
                const message = error.response?.data?.message || '이미 등록된 URL 입니다.'
                alert(message)
            }
        }

        const deleteMenu = async () => {
            if (!confirm('정말 삭제하시겠습니까?')) {
                return
            }
            try {
                const response = await api.post(`/admin/deleteMenu?menuCode=${props.menuCode}`);
                if(response.status == 200){
                   console.log('메뉴 삭제 성공:', response.data)
                   alert('메뉴 삭제 완료.')
                }
                closeDetailMenuModal(); // 모달 닫기
            } catch (error) {
                console.error('메뉴 삭제 실패:', error)
                alert('메뉴 삭제 실패.')
            }
        }

    /*   const deleteMenu = async () => {
            if (!confirm('정말 삭제하시겠습니까?')) {
                return;
            }
            try {
                const response = await api.post('/admin/deleteMenu', null, {
                    params: {
                        menuCode: menu.menuCode,
                        menuType: menu.menuType,
                        parentCode: menu.parentCode,      // 추가 예시
                        sortOrder: menu.sortOrder       // 추가 예시
                    }
                });
                alert('메뉴 삭제 완료.');
                console.log('메뉴 삭제 성공:', response.data);
                closeDetailMenuModal(); // 모달 닫기
            } catch (error) {
                console.error('메뉴 삭제 실패:', error);
                alert('메뉴 삭제 실패.');
            }
        };

       */
        

        
        
        onMounted(() => {
            console.log('InsertAdminMenu mounted')
            getDetailMenu(props.menuCode)
            getListMenuType()
            getListParent()
            
        })
        return {
            closeDetailMenuModal,
            menu,
            getDetailMenu,
            roleList,
            menurole,
            deleteMenu,
            menuTypeList,
            getListMenuType,
            parentList,
            getListParent,
            updateMenu,

        }
    }
}
</script>

<style scoped>

</style>