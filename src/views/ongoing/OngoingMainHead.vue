<template>
  <header>
    <div>
       <!-- 스토리지 연결하기  -->
      <div v-if="authPinia.userId">
        <h2>반갑습니다. {{authPinia.userId}}!!</h2>

        <button @click="OngoingLogOut()">로그아웃</button>

      </div>
      <div v-else>
        <h2> 로그인 </h2>
        <router-link to="/OngoingLogIn">로그인</router-link>
      </div>
    </div>
    <div id="nav">
    
      
    </div>
  </header>
</template>

<script>
import { useAuthPinia } from '../../store/authPinia'
import axios from 'axios'
export default {
  name: 'logInStatus',
  setup() {
    const authPinia = useAuthPinia()
    
    return {authPinia}
  },
  methods:{
   OngoingLogOut() {
      this.authPinia.clearUserData();
      axios.post('http://localhost:8084/login/ongoing/ongoingLogOut',null,
        {
          withCredentials: true 
        })
      alert("logout");      
      this.$router.push('/OngoingLogIn');
    }
  }
}
</script>

<style scoped>

</style>