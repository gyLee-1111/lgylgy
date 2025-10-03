<template>

    <div class="membership_page">

        <h2><router-link to="/CategoryList"><img src="/images/common/logo.png" class="logo"/></router-link> <span>권한 추가</span></h2>

        <div class="form_content">

            <div class="member_title">권한 코드</div>
            <div class="inner_btn">
                <t type="text" class="" v-model="userId" placeholder="코드 입력"  />
                <button @click="checkUserId"  >권한 중복확인</button>
            </div>

            <div class="confirm_msg" v-if="checkedId">* 권한 중복 확인이 되었습니다.</div>

            

            <div class="member_title">권한 이름</div>
            <div class="inner_full">
                <input type="text" class="" v-model="userNm" placeholder="권한 이름 입력" />
            </div>

            <div class="member_title">휴대폰 번호</div>
            <div class="inner_full">
                <input type="text" class="" v-model="phoneNumber" placeholder="휴대폰 번호 입력 (-)는 빼고 숫자만 입력해주세요"  @input="onPhoneInput" />
            </div>

            

            <!-- <div class="member_title">성별</div>
            <div class="inner_full">
                <input type="radio" name="sex" v-model="userGender" id="male" value="USER_GENDER_01" />
                <label for="male" class="mg_r20">남</label>

                <input type="radio" name="sex" v-model="userGender" id="female" value="USER_GENDER_02"/>
                <label for="female">여</label>
            </div> -->
            
        </div>
        

        <div class="form_footer">
            <button class="btn btn_mx bg_white" @click="goBack">뒤로 돌아가기</button>
            <button class="btn btn_mx bg_primary" @click="insertRole">권한 등록</button>
        </div>

    </div>

</template>

<script>
import { useRouter } from 'vue-router'
import axios from 'axios'
import { ref , watch , computed , onMounted , reactive } from 'vue'
import api from '../../plugins/api'


export default {
    name: 'UserInsert',
    setup() {
        const baseURL = import.meta.env.VITE_API_BASE_URL

        const router = useRouter()

        const userId = ref('');
        const userNm = ref('');
        const phoneNumber = ref('');
        const onPhoneInput = (event) => {
             phoneNumber.value = event.target.value.replace(/\D/g, '')
        }
        const birthYear = ref('');
        const birthMonth = ref('');
        const birthDay = ref('');
        const userGender = ref('');

        const checkedId = ref(false);
        const roleList = ref([])
        const userRole = reactive({})

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

        const goBack = () => {
            router.push('/admin/commonUser/')
        }
        const checkUserId = async () => {
            console.log('확인할 아이디:', userId.value)
            if(!userId.value || userId.value.trim() === ''){
                alert('ID를 입력하세요')
                return
            }
            try{
                const response = await api.get('/admin/checkUserId',{
                params: { userId: userId.value }
                })
                if(response.status == 200) {
                    alert('인증되었습니다')
                    checkedId.value = true
                }
            } catch (error) {
                console.error('중복된 ID입니다.:', error)
                alert('중복된 ID입니다')
            }
            
        }
        
       


        const insertRole = async () => {
            if (checkedId.value == false) {
                alert('ID 중복 확인을 하시오.');
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
            const entries = Object.entries(userRole);
            const userRoles = [];
            for (let i = 0; i < entries.length; i++) {
                const [roleCode, useRole] = entries[i];
                if(useRole === 'Y') {
                userRoles.push({ roleCode })
                }
            }
            const user = {
                userId: userId.value,
                userNm: userNm.value,
                phoneNumber: phoneNumber.value,
                userBirth: userBirth.value,
                userGender: userGender.value
            };
          //  const userRoles = [];
            // for (const [roleCode, useRole] of Object.entries(userRole)) {
            //     if (useRole === 'Y') {
            //         userRoles.push({ roleCode });
            //     }
            // }
            const params = {
                adminUserDto: user,
                adminUserMappingDto: userRoles
            }
            try{

                const response = await api.post('admin/insertRole',params)
                if(response.status == 200) {
                    console.log('회원 가입 성공:', response.data);
                    alert('가입 완료')
                }
                router.push('/admin/commonUser/')
            } catch (error) {
                console.error(error)
                
                alert('가입 실패.')
            }

        };
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
        onMounted(() => {
            
            getListRole()
            
        })
        
        return {
        
        goBack,
        checkUserId,

        userId,
        userNm,
        phoneNumber,
        birthYear,
        birthMonth,
        birthDay,
        userGender,

        checkedId,

        years,
        months,
        days, 
        userBirth,

        insertRole,
        onPhoneInput,

        getListRole,
        roleList,
        userRole,
        }
    }
}
</script>

<style scoped>

</style>