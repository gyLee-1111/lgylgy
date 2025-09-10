<template>

  
 <!--  헤더  -->
    <header class="header_pos">

        <div id="header" class="header">
            <!-- 사이트 로고 -->
            <h1 class="logo">
                <router-link to="/CategoryList">
                    adasdasdasdasd<img src="/images/common/logo.png" />
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
                        <a href="#" :class="{title: true, active: menu.children?.some(child => child.menuCode === authPinia.activeMenuCode)}">{{ menu.menuNm }}</a>
                        <div class="submenu" style="opacity: 1;"v-if="menu.children && menu.children.length">
                            <ul class="">
                                <li v-for="child in menu.children" :key="child.menuCode">
                                    <a href="#" :class="{ active: authPinia.activeMenuCode === child.menuCode }" @click.prevent="goMenuPage(child.path, child.menuCode)">{{ child.menuNm }}</a>
                                </li>
                            </ul>
                        </div>
                    </li>
                    
                <!--<li>
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
                          
                            <div v-if="showUserInfo" class="user_info_pop" style="display:none;">
                                <ol>
                                    <router-link to="/admin/main">
                                        <li v-if="authPinia.currentRole.roleGroup === 'ADMIN'"><a href="#"><i class="fa-solid fa-user-tie"></i> 일반 페이지</a></li>
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
            <a href="#" class="btn_sidemenu" @click.prevent="openMobileMenu">
                <i class="fa-solid fa-bars"></i>
            </a>
            <!--// 모바일용 햄버거 메뉴 -->

        </div>

    </header>
    <!--//  헤더  -->

    <!-- GNB:mobile -->
    <!-- <nav class="gnbarea_mobile" style="right: -300px; display: none;"> -->
        <nav class="gnbarea_mobile" style="display:none;">
        <div class="outline">
            <div class="self_info_area" >

                <!-- 상단 타이틀 -->
                <div class="logo_mobile">
                    <h1 class="">
                        <router-link to="/CategoryList">
                            <img src="/images/common/logo_sidemenu.png" />
                        </router-link>
                    </h1>
                </div>
                <!--// 상단 타이틀 -->

                <!-- 로그인 박스 -->
                <div class="loginbox_mobile">
                
                    <!-- 로그인 전 -->
                   
                    <!--// 로그인 전 -->

                    <!-- 로그인 후 -->
                    <div v-if="authPinia.userId" class="after" style="">
                        <div class="userinfo">
                            <div class="user_txbox">
                                <i class="fa-regular fa-circle-user"></i>
                                <span>
                                    <strong>{{ authPinia.userId }}</strong>님 안녕하세요.
                                </span>
                            </div>
                        </div>
                         <!-- 권한선택 -->
                        <div class="selectbox">
                            <select v-model="selectRole" @change="changeRole">
                                <option v-for="role in authPinia.userRoles" :key="role.roleCode" :value="role.roleCode">{{ role.roleNm }}</option>
                            </select>
                        </div>
                        <!--// 권한선택 -->
                        <div class="bottom">
                            <button v-if="authPinia.currentRole.roleGroup === 'ADMIN'" class="btn_myclass" @click="goAdminPage"><i class="fa-solid fa-user-tie"></i> 일반 페이지로 이동</button>
                        </div>
                    </div>
                    <!--// 로그인 후 -->

                </div>
                <!--// 로그인 박스 -->
                <!--모바일 햄버거 닫기 버튼 -->
                <a href="#" class="btn_sidemenu_close" @click.prevent="openMobileMenu"><i class="fa-solid fa-xmark"></i></a>
                <!--//모바일 햄버거 닫기 버튼 -->
            </div>              
            <ul class="gnb_mobile" v-if="authPinia.menuList.length">
                <li v-for="menu in authPinia.menuList" :key="menu.menuCode">
                    <a href="#" :class="{title: true, active: menu.children?.some(child => child.menuCode === authPinia.activeMenuCode)}">
                        <span @click.prevent="toggleMenu(menu.menuCode)">{{ menu.menuNm }}</span>
                        <i class="fa-solid fa-chevron-down"></i>
                    </a>
                    <div class="submenu" v-if="menu.children && menu.children.length" style="display:none;">
                    <!-- <div class="submenu" v-if="menu.children && menu.children.length" :style="{
                        display: (menu.children.some(child => child.menuCode === authPinia.activeMenuCode) || openMenuCode === menu.menuCode) ? 'block' : 'none'}"> -->
                        <ul class="">
                            <li v-for="child in menu.children" :key="child.menuCode">
                                <a href="#" :class="{ active: authPinia.activeMenuCode === child.menuCode }" @click.prevent="goMenuPage(child.path, child.menuCode)">{{ child.menuNm }}</a>
                            </li>
                        </ul>
                    </div>
                </li>
                

                <!-- <li>
                    <a href="#" class="title active">
                        <span>키워드</span>
                        <i class="fa-solid fa-chevron-down"></i>
                    </a>
                    <div class="submenu" style="opacity: 0;">
                        <ul class="">
                            <li>
                                <a href="#" class="active">키워드 찾기</a>
                            </li>
                        </ul>
                    </div>
                </li>
                <li>
                    <a href="#" class="title"><span>커뮤니티</span> <i class="fa-solid fa-chevron-down"></i></a>
                    <div class="submenu" style="">
                        <ul class="">
                            <li><a href="#">공지사항</a></li>
                            <li><a href="#">게시판</a></li>
                            <li><a href="#">셀러들 마당</a></li>
                        </ul>
                    </div>
                </li>
                <li>
                    <a href="#" class="title"><span>마이페이지</span> <i class="fa-solid fa-chevron-down"></i></a>
                    <div class="submenu" style="">
                        <ul class="">
                            <li><a href="#">정보수정</a></li>
                        </ul>
                    </div>
                </li> -->
            </ul>

            <div class="bottom_func">
                <ul>
                    <li>
                        <a href="#"><i class="fa-solid fa-pen"></i> <span>정보수정</span></a>
                    </li>
                    <li>
                        <a href="#" @click.prevent="logOut"><i class="fa-solid fa-power-off"></i> <span>로그아웃</span></a>
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
import { onMounted, ref, computed } from 'vue'
import api from '../../plugins/api'
import { useRouter } from 'vue-router'



export default {
  name: 'AdminHeader',
  setup() {
    const baseURL = import.meta.env.VITE_API_BASE_URL
   

    const authPinia = useAuthPinia()
    const showUserInfo = ref(false)

    const selectRole = ref('')
    
    const router = useRouter()

    const getMenu = ref([])

  //  console.log('userRoles:', authPinia.userRoles)
    const isMenuOpen = ref(false)
    const menuStyle = computed(() => ({
        right: isMenuOpen.value ? '0' : '-300px',
    }))
    const openMobileMenu = () => {
        isMenuOpen.value = !isMenuOpen.value
    }

//    const REST_API_KEY = "fe59b027894ddb6206595e9c8c0f113e";
//    const REDIRECT_URI = "http://localhost:5174/oauth/callback/kakao";

    

    

    function logOut() {
        isMenuOpen.value = !isMenuOpen.value
        authPinia.clearUserData();
        axios.post(`${baseURL}/login/logOut`,null,
            {
          withCredentials: true 
        })
    //    alert("logout");

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
        
            const response = await  api.post('/login/changeRole', params,
        /*  {
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
            getAdminMenu()
            // authPinia.setCurrentRole(selected)
        //  alert("권한이 " + (authPinia.currentRole.roleNm) + "(으)로 변경되었습니다.");
        //    alert('변경 후 응답 토큰:' + response.data.token);
        //    alert('변경 후 피니아 토큰:' + authPinia.token);
            } catch (error) {
                console.error('권한변경 실패 상세:', error)
        }
        
        
    }
    const getAdminMenu = async () => {
    //     alert("asdasdas")
        try {
           // const roleCode = authPinia.roleCode !== '' && authPinia.roleCode !== null 
            let roleCode = authPinia.roleCode && authPinia.roleCode !== '' ? authPinia.currentRole?.roleCode ?? 'GUEST': 'GUEST';
            const resp = await api.get(`${baseURL}/admin/getAdminMenu`,{
            
                params: { roleCode }
            })
            authPinia.setMenuList(resp.data)
            getMenu.value = resp.data

        } catch (error) {
            console.error(error)
            alert('오류가 발생했습니다.')
        }
        //alert("asdasdas")
    }
    const goAdminPage = () => {
        router.push('/admin/main')
    }
    const activeMenuCode = ref(null)

    const goMenuPage = async(path, menuCode) =>{
        if (!path) {
            authPinia.setActiveMenuCode(menuCode)
            return
        }
        authPinia.setActiveMenuCode(menuCode)
        router.push(path)
    }
    const openMenuCode = ref(null)
    const toggleMenu = (menuCode) => {
        openMenuCode.value = openMenuCode.value === menuCode ? null : menuCode
    }
    
    onMounted(() => {
        // 현재 권한이 설정되어 있다면 그것으로 초기화
    //    alert(authPinia.currentRole.roleNm);
        const current = authPinia.currentRole;
        if (current && current.roleCode) {
            selectRole.value = current.roleCode;
        }
       
        getAdminMenu()
        
    }) 
  


    return {
        authPinia,
        showUserInfo,
        showdownInfo,
        logOut,
        changeRole,
        selectRole,
        goAdminPage,
        openMobileMenu,
        isMenuOpen,
        menuStyle,
        goMenuPage,
        activeMenuCode,

        toggleMenu,
        openMenuCode,
        
        }


    },

    

    



}

</script>

<style scoped>

/*
.slide-down-enter-active, .slide-down-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}
.slide-down-enter-from {
  max-height: 0;
  opacity: 0;
  transform: translateY(-20px);
}
.slide-down-enter-to {
  max-height: 500px; 
  opacity: 1;
  transform: translateY(0);
}
.slide-down-leave-from {

  max-height: 500px;
  opacity: 1;
  transform: translateY(0);
}
.slide-down-leave-to {
  max-height: 0;
  opacity: 0;
  transform: translateY(-20px);
}
.menuItem {
  position: relative;
}

.submenu {
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.3s ease, transform 0.3s ease;
  display: block;
  pointer-events: none;
  position: absolute;
  background: white;
  top: 100%;
  left: 0;
  z-index: 100;
}

.menuItem:hover .submenu {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}
*/


</style>