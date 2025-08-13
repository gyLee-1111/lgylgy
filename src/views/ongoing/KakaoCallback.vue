<template>
  <div>로그인 처리 중...</div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useAuthPinia } from '../../store/authPinia'
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const router = useRouter();
const authPinia = useAuthPinia()

onMounted(async () => {
  const code = route.query.code;
  if (code) {
    try {
      // 백엔드에 인가코드 전달
      const response = await axios.get(`http://localhost:8084/login/kakao/logIn?code=${code}`);
      const { accessToken, nickname } = response.data;

      // 로그인 성공 처리 (로컬스토리지 저장 등)
     // localStorage.setItem('accessToken', accessToken);
      alert(`${nickname}님 환영합니다!`);
      authPinia.setUserData(response.data)
      router.push('/categoryList');
    } catch (err) {
      console.error('로그인 실패', err);
    }
  }
});
</script>
<style>

</style>