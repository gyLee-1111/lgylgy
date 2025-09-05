
import axios from 'axios'
import { useAuthPinia } from '../store/authPinia'
import router from '../router'
console.log(import.meta.env.VITE_API_BASE_URL)
const api = axios.create({
  
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  timeout: 10000
})

api.interceptors.request.use(
  
  async config => {
    const authPinia = useAuthPinia();
    //const token = authPinia.token;
    
    if(authPinia.token) {
    //  alert(authPinia.token);  
      config.headers.Authorization = `Bearer ${authPinia.token}`;
    }
    return config;
  },
  error => Promise.reject(error)
)

api.interceptors.response.use(
 async response => {

  //alert(response);
  
  

    return response
 }, 
  async error => {
    const authPinia = useAuthPinia();
   // const router = useRouter();
//    const originalRequest = error.config
console.log(error.response?.status)
    if (error.response?.status === 401 && !error.config._retry) {
      console.log('토큰 x')
      error.config._retry = true;

      try {
        const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/login/refreshToken`,
        null, 
        {
             withCredentials: true //  쿠키 자동 포함
        }
        )

        
        const newAccessToken = res.data.token
        
        authPinia.setUserData({
          userId: res.data.userId,
          userRoleList: res.data.userRoleList,
          token: newAccessToken,
          currentRole: res.data.currentRole
        });

        error.config.headers.Authorization = `Bearer ${newAccessToken}`
        return api.request(error.config)

      } catch (refreshError) {
        console.log(refreshError)
        console.error('Refresh Token 만료 로그아웃')
        authPinia.clearUserData()
        await axios.post(`${import.meta.env.VITE_API_BASE_URL}/login/logOut`,null,
        {
          withCredentials: true 
        })
        
        
        alert("세션이 만료되어 로그인 페이지로 이동합니다.");
        router.push('/logIn')

        return Promise.reject(refreshError)
      }
    }
    else if(error.response?.status === 403){
      console.log(error.response);
      alert("잘못된 접근입니다.");
      router.push('/categoryList');
      return Promise.reject(error);
    }
    else{
      console.log("다른 에러");
      console.log(error.response);
      if (axios.isAxiosError(error)) {
    console.log('Axios 에러 메시지:', error.message);
    console.log('응답 데이터:', error.response?.data);
    console.log('상태 코드:', error.response?.status);
  } else {
    console.log('일반 JS 에러:', error);
  }
    }
  }
)

export default api