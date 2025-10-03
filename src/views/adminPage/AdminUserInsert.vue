<template>

    <div class="membership_page">

        <h2><router-link to="/CategoryList"><img src="/images/common/logo.png" class="logo"/></router-link> <span>회원가입</span></h2>

        <div class="form_content">

            <tr class="member_title">ID</tr>
            <tr>
                <td>
                    <input type="text" class="" v-model="userId" placeholder="ID 입력"  />
                    <button @click="checkUserId"  >ID 중복확인</button>
                </td>
            </tr>
            <div class="confirm_msg" v-if="checkedId">* ID 중복 확인이 되었습니다.</div>


            <tr>
                <th>패스워드</th>
                <td>
                    <input type="password"class="" v-model="password" placeholder="비밀번호 입력" />
                </td>
                <td>
                    <input type="password" class="" v-model="normalPassword" placeholder="비밀번호 확인 입력" />
                </td>
                
            </tr>
            <td class="confirm_msg" v-if="passwordError">* 비밀번호가 일치하지 않습니다.</td>



            <tr>
                <th>사용자 이름<span class="fc_requisite">*</span></th>
                <td>
                    <input type="text" v-model="userNm" >
                </td>
            </tr>

            <tr>
                <th>휴대폰 번호</th>
                <td>
                    <input type="text" v-model="phoneNumber" placeholder="휴대폰 번호 입력 (-)는 빼고 숫자만 입력해주세요" >
                </td>
            </tr>

    

            <tr>
                <th>사용자 생년월일</th>
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
                <!-- <th>사용자 생년월일</th>
                <td>
                    <input type="text" v-model="user.userBirth" />
                </td> -->
            </tr>

            <tr>
                <th>사용자 성별</th>
                <td>
                    <select v-model="userGender">
                        <option v-for="genderGroup in genderList" :key="genderGroup.commonCode" :value="genderGroup.commonCode">{{ genderGroup.commonCodeNm }}</option>
                    </select>
                    <!-- <input type="text" v-model="user.userGenderNm" /> -->
                </td>
            </tr>




            <div class="table_container_outer mg_t50">
                <div class="table_container">
                    <table class="basic_list" id="basic_list">
                        <colgroup>
                            <col width="%" />
                            <col width="%" />
                        </colgroup>
                        <thead>
                            <tr>
                                <th>권한</th>
                                <th>권한 체크</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="userCurrentRole in roleList" :key="userCurrentRole.roleCode">
                                <td>{{ userCurrentRole.roleNm }}</td>
                                <td>
                                    <input type="checkbox" v-model="userRole[userCurrentRole.roleCode]" true-value="Y" false-value="N"/> 열람 가능</td>
                               
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        

        <div class="table_btn_func">
            <div class="grid2">
                <div class="left">
                    <button class="btn bg_white" @click="goBack"><i class="ri-file-list-3-line"></i> 뒤로가기</button>
                </div>
                
                <div class="right">
                    <button class="btn bg_blue" @click="insertUser"><i class="ri-check-line"></i> 회원가입 하기</button>
                </div>
            </div>
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
        const code = ref('');
        const password = ref('');
        const normalPassword = ref('');
        const passwordError = ref('');
        const userNm = ref('');
        const phoneNumber = ref('');
        
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
        
        watch([password, normalPassword], ([pw, pw2]) => {
            if (!pw2) {
                passwordError.value = false;
            } else if (pw !== pw2) {
                passwordError.value = true;
            } else {
                passwordError.value = false;
            }
        })

        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

        const insertUser = async () => {
            if (checkedId.value == false) {
                alert('ID 중복 확인을 하시오.');
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
                normalPassword: normalPassword.value,
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

                const response = await api.post('admin/insertUser',params)
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

        checkedId,

        years,
        months,
        days, 
        userBirth,

        insertUser,

        getListRole,
        roleList,
        userRole,
        }
    }
}
</script>

<style scoped>

</style>