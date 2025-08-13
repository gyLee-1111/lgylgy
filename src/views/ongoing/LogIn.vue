<template>

 
<body class="page_bg_gray">

<div class="login_page">

    <div class="outline">
        
        <div class="thum"></div>
                
        <div class="login_box">

            <div class="inner_box">

                <h2><img src="/images/common/logo.png" class="logo"/> <span>로그인</span></h2>

                <div class="login_ment">
                    <strong>ONGOING</strong>의 서비스 이용을 위해 <strong>로그인</strong>이 필요합니다.
                </div>
                <form @submit.prevent = "Login">
                  <input type="text" class="" placeholder="ID 입력" v-model="userId" />
                  <input type="password" class="" placeholder="비밀번호 입력" v-model="userPassword"/>

                  <button class="btn_login" type="submit">로그인</button>
                </form>
                <div class="func_area">
                    <a href="#" @click="goJoinPage">회원가입</a>
                    <a href="#">아이디 찾기</a>
                    <a href="#">비밀번호 찾기</a>
                </div>

                <!-- 카카오 단일 로그인 -->
                <div class="sns_login_row">
                    <ul>
                        <li class="kakao">
                            <a href="#">
                                <span class="sns_icon">
                                    <img src="/images/login/sns_icon_kakao.png" alt="">
                                </span>
                                <span class="name" @click="kakaoLogin">카카오로 시작하기</span>
                            </a>
                        </li>
                    </ul>                    
                </div>
                <!--// 카카오 단일 로그인 -->
                 
                <!-- sns 멀티 로그인 -->
                <div class="sns_login" style="display:none;">                   

                    <ul>
                        <li>
                            <a href="#">
                                <span class="sns_icon">
                                    <img src="../images/login/sns_icon_kakao.png" alt="">
                                </span>
                                <span class="name">카카오로<br/>시작하기</span>
                            </a>
                        </li>

                        <li>
                            <a href="#">
                                <span class="sns_icon">
                                    <img src="/images/login/sns_icon_naver.png" alt="">
                                </span>
                                <span class="name">네이버로<br/>시작하기</span>
                            </a>
                        </li>

                        <li class="google">
                            <a href="#">
                                <span class="sns_icon">
                                    <img src="/images/login/sns_icon_google.png" alt="">
                                </span>
                                <span class="name">구글로<br/>시작하기</span>
                            </a>
                        </li>
                    </ul>
                </div>
                <!--// sns 멀티 로그인 -->

            </div>            

        </div>

    </div>

</div>



</body>
</template>

<script>
import axios from 'axios'
import { useAuthPinia } from '../../store/authPinia'
import { ref , nextTick } from 'vue'
import { useRouter } from 'vue-router'



export default {
  name: 'logInStatus',
  setup() {
    const userId = ref('')
    const userPassword = ref('')

    const router = useRouter()
    const authPinia = useAuthPinia()

    const REST_API_KEY = "fe59b027894ddb6206595e9c8c0f113e";
    const REDIRECT_URI = "http://localhost:5174/oauth/callback/kakao";

    const kakaoLogin = () => {
      const kakaoLoginUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code&prompt=login`;
      window.location.href = kakaoLoginUrl;
    }

    const Login = async () => {

      //env
      if (!userId.value) {
        alert('ID를 입력하세요.')
        return
      }

      if (!userPassword.value) {
        alert('비밀번호를 입력하세요.')
        return
      }
       try {
        const params = new URLSearchParams()
        params.append('userId',userId.value)
        params.append('userPassword',userPassword.value)
   //     alert(userId.value)
        //alert(this.userPassword)

       
        const response = await axios.post('http://localhost:8084/login/logInApi', params,
        {
          headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
          },
          withCredentials: true
        })
      //  alert(response)
        console.log(response);
        //status가 200
        if(response.status == 200){
          console.log(response);
          alert('로그인 되었습니다')
            //alert(response.data.token);
       
          console.log(response.data);
         // alert(response.data);

          //필요한 데이터만 담기
        // userStore.setUserData(response.data)
          
          console.log('로그인 응답 데이터:', response.data);
          authPinia.setUserData(response.data)
  //        alert(authPinia.currentRole);

          await nextTick()
          router.push('/categoryList')
      }
      } catch (error) {
        console.error('로그인 실패 상세:', error)

        console.log('error.response:', error.response)
        console.log('error.response?.data:', error.response?.data)

        const message = error.response?.data?.message || '로그인 중 오류가 발생했습니다.'
        alert(message)
       
      }
    }
    const goJoinPage = () => {
        router.push('/JoinPage/')
    }
    return {
      
      userId,
      userPassword,
      Login,
      kakaoLogin,
      goJoinPage,
    }



  }
    

}
</script>
<style>

</style>