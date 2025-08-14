<template>

    <div class="membership_page">

        <h2><router-link to="/CategoryList"><img src="/images/common/logo.png" class="logo"/></router-link> <span>회원가입</span></h2>

        <div class="form_content">

            <div class="member_title">이메일</div>
            <div class="inner_btn">
                <input type="text" class="" v-model="email" placeholder="이메일 주소 입력" :disabled="isVerified" />
                <button @click="verificationEmail" :disabled="isVerified" >인증코드 발송</button>
            </div>
            <div class="inner_btn">
                <input type="text" class="" v-model="code" placeholder="인증코드 입력" :disabled="isVerified"/>
                <button @click="checkVerificationCode" :disabled="isVerified">인증코드 확인</button>
            </div>

            <div class="confirm_msg" v-if="isVerified">* 메일 인증이 완료되었습니다.</div>

            <div class="member_title">패스워드</div>
            <div class="inner_full">
                <input type="password" class="" v-model="password" placeholder="비밀번호 입력" />
            </div>
            <div class="inner_full">
                <input type="password" class="" v-model="normalPassword" placeholder="비밀번호 확인 입력" />
            </div>
            <div class="confirm_msg" v-if="passwordError">* 비밀번호가 일치하지 않습니다.</div>

            <div class="member_title">이름</div>
            <div class="inner_full">
                <input type="text" class="" v-model="userNm" placeholder="이름 입력" />
            </div>

            <div class="member_title">휴대폰 번호</div>
            <div class="inner_full">
                <input type="text" class="" v-model="phoneNumber" placeholder="휴대폰 번호 입력 (-)는 빼고 숫자만 입력해주세요"  @input="onPhoneInput" />
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
                <input type="radio" name="sex" v-model="userGender" id="male" value="USER_GENDER_01" />
                <label for="male" class="mg_r20">남</label>

                <input type="radio" name="sex" v-model="userGender" id="female" value="USER_GENDER_02"/>
                <label for="female">여</label>
            </div>

        </div>

        <div class="form_footer">
            <button class="btn btn_mx bg_white" @click="goLogInPage">로그인 페이지로 돌아가기</button>
            <button class="btn btn_mx bg_primary" @click="insertUser">회원가입하기</button>
        </div>

    </div>

</template>

<script>
import { useRouter } from 'vue-router'
import axios from 'axios'
import { ref , watch , computed } from 'vue'



export default {
    name: 'joinStatus',
    setup() {
        const baseURL = import.meta.env.VITE_API_BASE_URL

        const router = useRouter()

        const email = ref('');
        const code = ref('');
        const password = ref('');
        const normalPassword = ref('');
        const passwordError = ref('');
        const userNm = ref('');
        const phoneNumber = ref('');
        const onPhoneInput = (event) => {
             phoneNumber.value = event.target.value.replace(/\D/g, '')
        }
        const birthYear = ref('');
        const birthMonth = ref('');
        const birthDay = ref('');
        const userGender = ref('');1

        const isVerified = ref(false);


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

        const goLogInPage = () => {
            router.push('/LogIn/')
        }
        const verificationEmail = async () => {
            try {
                const params = new URLSearchParams();
                params.append('email', email.value)
                await axios.post(`${baseURL}/join/membership/verification`, params);
                
                alert('인증코드 전송')

            } catch (error) {
                console.error(error)
                if (error.response && error.response.status === 400) {
                    alert('이미 가입된 이메일 입니다.')
                } else {
                    alert('인증코드 전송실패.')
                }
            }
        }
        const checkVerificationCode = async () => {
            try{
                await axios.post(`${baseURL}/join/membership/checkVerification`,{
                    email: email.value,
                    code: code.value
                })
                alert('인증완료')
                isVerified.value = true;
            } catch (error) {
                console.error(error)
                isVerified.value = false;
                alert(error)
                alert('인증코드 인증실패.')
            }
        }
        watch([password, normalPassword], ([pw, pw2]) => {
            if (!pw2) {
                passwordError.value = false;
            } else if (pw !== pw2) {
                passwordError.value = true;
            } else {
                passwordError.value = false;
            }
        })
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

        const insertUser = async () => {
            if (isVerified.value == false) {
                alert('메일 정보를 인증해 주세요.');
                return;
            }
            if (!passwordRegex.test(password.value)) {
                alert('비밀번호는 최소 8자, 영문, 숫자, 특수문자를 포함해야 합니다.');
                return;
            }
            if (password.value !== normalPassword.value) {
                alert('비밀번호가 일치하지 않습니다.');
                return;
            }
            if (!userNm.value) {
                alert('이름을 입력해 주세요.');
                return;
            }
            if (!phoneNumber.value) {
                alert('휴대폰 번호를 입력해 주세요.');
                return;
            }
            if (!userBirth.value) {
                alert('생년월일을 모두 선택하세요.')
                return
            }
            if (!userGender.value) {
                alert('성별을 선택해 주세요.');
                return;
            }
            // 회원가입 처리 로직...
            try{
                await axios.post(`${baseURL}/join/membership/insertUser`,{
                    email: email.value,
                    normalPassword: normalPassword.value,
                    userNm: userNm.value,
                    phoneNumber: phoneNumber.value,
                    userBirth: userBirth.value,
                    userGender: userGender.value,
                })
                alert('가입 완료')
                router.push('/LogIn/')
            } catch (error) {
                console.error(error)
                
                alert('가입 실패.')
            }

        };
        
        return {
        
        goLogInPage,
        verificationEmail,

        email,
        code,
        password,
        normalPassword,
        passwordError,
        userNm,
        phoneNumber,
        birthYear,
        birthMonth,
        birthDay,
        userGender,

        isVerified,
        checkVerificationCode,


        years,
        months,
        days, 
        userBirth,

        insertUser,
        onPhoneInput,
        }
    }
}
</script>

<style scoped>

</style>