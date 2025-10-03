<template>

    <div class="membership_page">

        <div class="form_content">
            <div v-if="userInfo.membership === 'MEMBERSHIP_01'">
                <div class="member_title">패스워드</div> <button @click="changePassword">패스워드 변경</button>
                    <div class="inner_full">
                        
                        <input type="password" class="" :disabled="!emptyPassword" v-model="userInfo.userPassword" placeholder="비밀번호 입력" />
                    </div>
                <div class="inner_full">
                    <input type="password" class="" :disabled="!emptyPassword" v-model="userInfo.normalPassword" placeholder="비밀번호 확인 입력" />
                </div>
                
                <div class="confirm_msg" v-if="passwordError">* 비밀번호가 일치하지 않습니다.</div>
            </div>
            <div class="member_title">이름</div>
                <div class="inner_full">
                    <input type="text" class="" v-model="userInfo.userNm" placeholder="이름 입력" />
                </div>

            <div class="member_title">휴대폰 번호</div>
                <div class="inner_full">
                    <input type="text" class="" v-model="userInfo.phoneNumber" placeholder="휴대폰 번호 입력 (-)는 빼고 숫자만 입력해주세요"  @input="onPhoneInput" />
                </div>

            <div class="member_title">생년월일</div>
            <div class="inner_full">
                <select name="" id="" v-model="birthYear">
                    <option value="">년도</option>
                    <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
                </select>
                <select name="" id="" v-model="birthMonth">
                    <option value="">월</option>
                    <option v-for="month in months" :key="month" :value="month">{{ month }}</option>
                </select>
                <select name="" id="" v-model="birthDay">
                    <option value="">일</option>
                    <option  v-for="day in days" :key="day" :value="day">{{ day }}</option>
                    
                </select>
            </div>

            <div class="member_title">성별</div>
            <div class="inner_full">
                <input type="radio" name="sex" v-model="userInfo.userGender" id="male" value="USER_GENDER_01" />
                <label for="male" class="mg_r20">남</label>

                <input type="radio" name="sex" v-model="userInfo.userGender" id="female" value="USER_GENDER_02"/>
                <label for="female">여</label>
            </div>

        </div>

        <div class="form_footer">
            <button class="btn btn_mx bg_white" @click="goMainPage">메인 페이지로 돌아가기</button>
            <button class="btn btn_mx bg_primary" @click="updateUser">수정하기</button>
        </div>

    </div>

</template>

<script>
import { useRouter } from 'vue-router'
import axios from 'axios'
import api from '../../plugins/api'
import { ref , watchEffect , computed , onMounted , reactive , watch } from 'vue'



export default {
    name: 'userInfoStatus',
    setup() {
    
        const baseURL = import.meta.env.VITE_API_BASE_URL

        const router = useRouter()
        const passwordError = ref(false)
        
        const onPhoneInput = (event) => {
             userInfo.phoneNumber = event.target.value.replace(/\D/g, '')
        }
     //   const phoneNumber = ref('');
        const birthYear = ref('');
        const birthMonth = ref('');
        const birthDay = ref('');
        const userGender = ref('');
        const isPasswordChange = ref(false)

        const userInfo = reactive({
            userId:'',
            userPassword:'',
            normalPassword:'',
            userNm:'',
            phoneNumber:'',
            userBirth:'',
            userGender:'',
            membership:''
        });


        //-날짜
        const currentYear = new Date().getFullYear()
        const years = Array.from({ length: 100 }, (_, i) => currentYear - i)
        const months = Array.from({ length: 12 }, (_, i) => i + 1)
        const days = computed(() => {
            if (!birthYear.value || !birthMonth.value) return []
            const lastDay = new Date(birthYear.value, birthMonth.value, 0).getDate()
            return Array.from({ length: lastDay }, (_, i) => i + 1)
        })

        const userBirth = computed(() => {
            if (!birthYear.value || !birthMonth.value || !birthDay.value) {
                return ''
            }
            const mm = String(birthMonth.value).padStart(2, '0')
            const dd = String(birthDay.value).padStart(2, '0')
            return `${birthYear.value}-${mm}-${dd}`
        })

        const getUserInfo = async () => {
            try {
                const response = await api.post('/login/getUserInfo')

                const userData = response.data

                if (!userData) {
                    console.error('userInfoDto가 없습니다.')
                    return
                }

                userInfo.userId = userData.userId
                userInfo.userPassword = userData.userPassword
                userInfo.normalPassword = userData.userPassword
                userInfo.userNm = userData.userNm
                userInfo.phoneNumber = userData.phoneNumber
                userInfo.userBirth = userData.userBirth
                userInfo.userGender = userData.userGender
                userInfo.membership = userData.membership

                if (userData.userBirth) {
                    const birthParts = userData.userBirth.split('-')
                    birthYear.value = birthParts[0] || ''
                    birthMonth.value = birthParts[1] ? Number(birthParts[1]) : ''
                    birthDay.value = birthParts[2] ? Number(birthParts[2]) : ''
                } else {
                    birthYear.value = ''
                    birthMonth.value = ''
                    birthDay.value = ''
                    }

            } catch(error) {
                console.error('유저 정보 조회 오류:', error)
            }
        }

        const goMainPage = () => {
            router.push('/CategoryList/')
        }
        const emptyPassword = ref(false)
        const changePassword = () => {
            if (confirm('비밀번호를 변경하시겠습니까?')) {
            emptyPassword.value = true
            userInfo.userPassword = ''
            userInfo.normalPassword = ''
            isPasswordChange.value = true;
            }
        }
        watchEffect(() => {
            if (!userInfo.normalPassword) {
                passwordError.value = false
            } else if (userInfo.userPassword !== userInfo.normalPassword) {
                passwordError.value = true
            } else {
                passwordError.value = false
            }
        })
   
/*        watch([userInfo.userPassword, userInfo.normalPassword], ([pw, pw2]) => {
            if (!pw2) {
                passwordError.value = false;
            } else if (pw !== pw2) {
                passwordError.value = true;
            } else {
                passwordError.value = false;
            }
        })
            */
        /*
        const checkStute = async () => {
            alert(email.value)
            alert(normalPassword.value)
            alert(userNm.value)
            alert(phoneNumber.value)
            alert(userBirth.value)
            alert(userGender.value)
        }
            */
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

        const updateUser = async () => {
           
           
            if (!userInfo.userNm) {
                alert('이름을 입력해 주세요.');
                return;
            }
            if (!userInfo.phoneNumber) {
                alert('휴대폰 번호를 입력해 주세요.');
                return;
            }
            if (!userBirth.value) {
                alert('생년월일을 모두 선택하세요.')
                return
            }
            if (!userInfo.userGender) {
                alert('성별을 선택해 주세요.');
                return;
            }
            
            // 회원정보 수정 로직...
            if(isPasswordChange.value === true){
                 if (!passwordRegex.test(userInfo.userPassword)) {
                alert('비밀번호는 최소 8자, 영문, 숫자, 특수문자를 포함해야 합니다.');
                return;
                }
                if (userInfo.userPassword !== userInfo.normalPassword) {
                    alert('비밀번호가 일치하지 않습니다.');
                    return;
                }
                try{
                    await axios.post(`${baseURL}/join/membership/updateUser`,{
                        userId: userInfo.userId,
                        normalPassword: userInfo.normalPassword,
                        userNm: userInfo.userNm,
                        phoneNumber: userInfo.phoneNumber,
                        userBirth: userBirth.value,
                        userGender: userInfo.userGender,
                    })
                    alert('수정 완료')
                    router.push('/categoryList/')
                } catch (error) {
                    console.error(error)
                    
                    alert('수정 실패.')
                }
            }else{
                
                try{
                    await axios.post(`${baseURL}/join/membership/updateUserNotPass`,{
                        userId: userInfo.userId,
                        userNm: userInfo.userNm,
                        phoneNumber: userInfo.phoneNumber,
                        userBirth: userBirth.value,
                        userGender: userInfo.userGender,
                    })
                    alert('수정 완료 패스워드 x')
                    router.push('/categoryList/')
                } catch (error) {
                    console.error(error)
                    
                    alert('수정 실패 패스워드 x.')
                }
            }

        };
        watch(() => userInfo.userNm, (newVal) => {
            const validId = newVal.replace(/[^a-zA-Z가-힣]/g, ''); //못쓰게 막는다 영문, 한글 제외
            if (newVal !== validId) {
                userInfo.userNm = validId;
            }
        });


        onMounted(() => {
            getUserInfo()
        })
        
        return {
        
        goMainPage,

        passwordError,
        birthYear,
        birthMonth,
        birthDay,
        userGender,

        years,
        months,
        days, 
        userBirth,
      
        onPhoneInput,

        getUserInfo,
        updateUser,
        userInfo,
        changePassword,
        emptyPassword,

        }
    }
}
</script>

<style scoped>

</style>