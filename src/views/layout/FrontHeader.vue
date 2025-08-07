<template>

  
 <!--  헤더  -->
    <header class="header_pos">

        <div id="header" class="header">
            <!-- 사이트 로고 -->
            <h1 class="logo">
                <router-link to="/CategoryList">
                    <img src="/images/common/logo.png" />
                </router-link>
            </h1>

            <!--// 사이트 로고 -->

            <!-- GNB -->
            <nav class="gnbarea">
                <ul class="gnb">
                    <!-- <ul>
                        <li v-for="menu in authPinia.menuList" :key="menu.menuCode">
                            {{ menu.menuNm }}
                        </li>
                    </ul> -->
                    
                    <li v-for="menu in authPinia.menuList" :key="menu.menuCode">
                        <a href="#" class="title">{{ menu.menuNm }}</a>
                        <div class="submenu" style="opacity: 1;">
                            <ul class="">
                                <li>
                                    <a href="#" class="">키워드 찾기</a>
                                </li>
                            </ul>
                        </div>
                    </li>
                    
                    <!-- <li>
                        <a href="#" class="title">키워드</a>
                        <div class="submenu" style="opacity: 1;">
                            <ul class="">
                                <li><a href="#" class="">키워드 찾기</a></li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <a href="#" class="title">커뮤니티</a>
                        <div class="submenu" style="opacity: 1;">
                            <ul class="">
                                <li><a href="#" class="">공지사항</a></li>
                                <li><a href="#" class="">게시판</a></li>
                                <li><a href="#" class="">셀러들 마당</a></li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <a href="#" class="title">마이페이지</a>
                        <div class="submenu" style="opacity: 1;">
                            <ul class="">
                                <li>
                                    <a href="#" class="">정보수정</a>
                                </li>
                            </ul>
                        </div>
                    </li> -->
                    
                    <li class="func_box">
                        <div v-if="authPinia.userId">

                                <!-- 로그인 후 -->
                            <a href="#" class="btn_login_after" @click.prevent="showdownInfo"><i class="fa-regular fa-circle-user" ></i> <span>{{ authPinia.userId }}님</span></a>
                          
                            <div v-if="showUserInfo" class="user_info_pop" >
                                <ol>
                                    <router-link to="/AdminPage">
                                        <li v-if="authPinia.currentRole.roleGroup === 'ADMIN'"><a href="#"><i class="fa-solid fa-user-tie"></i> 관리자 페이지</a></li>
                                    </router-link>
                                    <li><a href="#"><i class="fa-solid fa-gear"></i> 정보수정</a></li>                                        
                                    <li><a href="#" @click.prevent="logOut"><i class="fa-solid fa-power-off"></i> 로그아웃</a></li>
                                </ol>
                                <!-- 권한선택 -->
                                <div class="authority_select">
                                    <select v-model="selectRole" @change="changeRole">
                                        <option v-for="role in authPinia.userRoles" :key="role.roleCode" :value="role.roleCode">{{ role.roleNm }}</option>
                                        
                                    </select>
                                </div>
                                <!--// 권한선택 -->
                            </div>
                            
                            <!--// 로그인 후 -->
                        </div> 
                        <div v-else>
                            <!-- 로그인 전 -->
                            <a href="#" class="btn_login" ><router-link to="/LogIn">로그인</router-link></a>                        
                            <!--// 로그인 전 -->
                        </div>   
                    </li>
                </ul>
            </nav>
            <!--// GNB -->
            
            <!-- 모바일용 햄버거 메뉴 -->
            <a href="#" class="btn_sidemenu">
                <i class="fa-solid fa-bars"></i>
            </a>
            <!--// 모바일용 햄버거 메뉴 -->

        </div>

    </header>
    <!--//  헤더  -->

    <!-- GNB:mobile -->
    <nav class="gnbarea_mobile" style="display:none;">
        <div class="outline">
            <div class="self_info_area" >

                <!-- 상단 타이틀 -->
                <div class="logo_mobile">
                    <h1 class="">
                        <img src="../images/common/logo_sidemenu.png" />
                    </h1>
                </div>
                <!--// 상단 타이틀 -->

                <!-- 로그인 박스 -->
                <div class="loginbox_mobile">
                
                    <!-- 로그인 전 -->
                    <div class="before" style="">

                        <div class="info_insert">
                            <input type="text" class="input_id" placeholder="이메일 주소 입력" />
                            <input type="password" class="input_pw" placeholder="비밀번호 입력" />
                        </div>

                        <div class="func">
                            <input type="checkbox" id="id_save"/>
                            <label for="id_save"><span>아이디 저장</span></label>
                        </div>

                        <div class="bottom">
                            <button class="btn_main_login">로그인</button>
                        </div>

                    </div>
                    <!--// 로그인 전 -->

                    <!-- 로그인 후 -->
                    <div class="after" style="display:none;">
                        <div class="userinfo">
                            <div class="user_txbox">
                                <i class="fa-regular fa-circle-user"></i>
                                <span>
                                    <strong>관리자</strong>님 안녕하세요.
                                </span>
                            </div>
                        </div>

                        <div class="selectbox">
                            <select>
                                <option>admin</option>
                                <option>운영자</option>
                                <option>편집자</option>
                            </select>
                        </div>

                        <div class="bottom">
                            <button class="btn_myclass"><i class="fa-solid fa-user-tie"></i> 관리자 페이지로 이동</button>
                        </div>
                    </div>
                    <!--// 로그인 후 -->

                </div>
                <!--// 로그인 박스 -->
            
                <a href="#" class="btn_sidemenu_close"><i class="fa-solid fa-xmark"></i></a>
            </div>              
            <ul class="gnb_mobile">
                <li>
                    <a href="#" class="title active"><span>키워드</span> <i class="fa-solid fa-chevron-down"></i></a>
                    <div class="submenu" style="">
                        <ul class="">
                            <li><a href="#" class="active">키워드 찾기</a></li>
                        </ul>
                    </div>
                </li>
                <li>
                    <a href="#" class="title"><span>커뮤니티</span> <i class="fa-solid fa-chevron-down"></i></a>
                    <div class="submenu" style="display:none;">
                        <ul class="">
                            <li><a href="#">공지사항</a></li>
                            <li><a href="#">게시판</a></li>
                            <li><a href="#">셀러들 마당</a></li>
                        </ul>
                    </div>
                </li>
                <li>
                    <a href="#" class="title"><span>마이페이지</span> <i class="fa-solid fa-chevron-down"></i></a>
                    <div class="submenu" style="display:none;">
                        <ul class="">
                            <li><a href="#">정보수정</a></li>
                        </ul>
                    </div>
                </li>
            </ul>

            <div class="bottom_func">
                <ul>
                    <li>
                        <a href="#"><i class="fa-solid fa-pen"></i> <span>정보수정</span></a>
                    </li>
                    <li>
                        <a href="#"><i class="fa-solid fa-power-off"></i> <span>로그아웃</span></a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    <!--// GNB:mobile -->

</template>

<script>
import { useAuthPinia } from '../../store/authPinia'
import axios from 'axios'
import { onMounted, ref } from 'vue'
import api from '../../plugins/api'
import { useRouter } from 'vue-router'

export default {
  name: 'logInStatus',
  setup() {
    const authPinia = useAuthPinia()
    const showUserInfo = ref(false)

    const selectRole = ref('')
    
    const router = useRouter()

    const getMenu = ref([])

  //  console.log('userRoles:', authPinia.userRoles)




    function logOut() {
    
        authPinia.clearUserData();
        axios.post('http://localhost:8084/login/logOut',null,
            {
          withCredentials: true 
        })
        alert("logout");

        router.push('/LogIn');
    }
    function showdownInfo() {
        showUserInfo.value = !showUserInfo.value
    }
    async  function changeRole() {
        const selected = authPinia.userRoles.find(role => role.roleCode === selectRole.value)
        if (!selected) return
    //    alert('변경 전 토큰:' + authPinia.token);

        try{
            const params = new URLSearchParams()
            
            params.append('roleCode', selected.roleCode)
        
            const response = await  api.post('http://localhost:8084/login/changeRole', params,
         /*   {
             headers: {
                         'Content-Type': 'application/x-www-form-urlencoded'
             },
             withCredentials: true
            } */
         ) 
            if (response.data.token) {
                authPinia.setUserData({
                token: response.data.token,
                userId: authPinia.userId,
                userRoleList: authPinia.userRoles,
                currentRole: selected
                
            })
        }
            getUserMenu()
            // authPinia.setCurrentRole(selected)
            alert("권한이 " + (authPinia.currentRole.roleNm) + "(으)로 변경되었습니다.");
        //    alert('변경 후 응답 토큰:' + response.data.token);
        //    alert('변경 후 피니아 토큰:' + authPinia.token);

        } catch (error) {
                console.error('권한변경 실패 상세:', error)
        }
        
        
    }
    const getUserMenu = async () => {
         alert("asdasdas")
    //     params.append('roleCode', selected.roleCode)
        try {
            const resp = await api.get('http://localhost:8084/login/getUserMenu',{
                     params: { roleCode: (authPinia.currentRole.roleCode) }
            })
            authPinia.setMenuList(resp.data)
            getMenu.value = resp.data

            alert(getMenu)

        } catch (error) {
            console.error(error)
            alert('오류가 발생했습니다.')
        }
        //alert("asdasdas")
    }

    onMounted(() => {
        // 현재 권한이 설정되어 있다면 그것으로 초기화
    //    alert(authPinia.currentRole.roleNm);
        const current = authPinia.currentRole;
        if (current && current.roleCode) {
            selectRole.value = current.roleCode;
        }

        getUserMenu()
    }) 
  


    return {
        authPinia,
        showUserInfo,
        showdownInfo,
        logOut,
        changeRole,
        selectRole
        }


    },

    

    



}

</script>

<style scoped>


</style>