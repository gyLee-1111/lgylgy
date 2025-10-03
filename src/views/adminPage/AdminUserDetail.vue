<template>
    <!-- <form @submit.prevent="handleSubmit"> -->
        <div class="content_page" >

            <div class="base_width">

                <div class="content_box_white">
                    <div class="content_inline">
                        <h1>{{ userId }}사용자의 정보</h1>
                    </div>
                </div>

                <div class="content_box_white">
                    <div class="content_body">
                        <div class="form_contents_box">
                                <!-- 공지사항 기본 리스트 -->
                                <!-- 공지사항 상세보기 -->
                            <table class="basic_write mg_t50">
                                <colgroup>
                                    <col width="30%"/>
                                    <col />
                                </colgroup>
                                <tbody>
                                    <tr>
                                        <th>사용자 ID<span class="fc_requisite">*</span></th>
                                        <td >
                                            <span v-if="userId">{{user.userId}}</span>
                                               
                                             <input type="text" v-model="user.userId" v-if="!userId"/>
                                        </td>
                                        <button @click="checkUserId" v-if="!userId" >ID 중복확인</button>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <div class="confirm_msg" v-if="checkedId">* ID 중복 확인이 되었습니다.</div>
                                    </tr>
                                    <tr v-if="!userId">
                                        <th>패스워드</th>
                                        <td>
                                            <input type="password"class="" v-model="password" placeholder="비밀번호 입력" />
                                            <input type="password" class="" v-model="normalPassword" placeholder="비밀번호 확인 입력" />
                                            <td class="confirm_msg" v-if="passwordError">* 비밀번호가 일치하지 않습니다.</td>
                                        </td>
                                        <td>
                                            
                                           
                                        </td>
                                       
                                        
                                    </tr>
                                   



                                    <tr>
                                        <th>사용자 이름<span class="fc_requisite">*</span></th>
                                        <td>
                                            <input type="text" v-model="user.userNm" >
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>사용자 성별</th>
                                        <td>
                                            <select v-model="user.userGender">
                                                <option v-for="genderGroup in genderList" :key="genderGroup.commonCode" :value="genderGroup.commonCode">{{ genderGroup.commonCodeNm }}</option>
                                            </select>
                                            <!-- <input type="text" v-model="user.userGenderNm" /> -->
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

                                    <tr v-if="userId" >
                                        <th>사용자 전자우편</th>
                                        <td>
                                            <input type="text" v-model="user.email" disabled class="input_disabled" />
                                        </td>
                                    </tr>
                                     <tr>
                                        <th>연락처</th>
                                        <td>
                                            <input type="text" v-model="user.phoneNumber" />
                                        </td>
                                    </tr>
                                    <tr v-if="userId">
                                        <th>활동정지</th>
                                        <td>
                                            <label>
                                                <input type="radio" value="Y" v-model="user.lockYn" />
                                                <span>정지 계정 입니다.</span>
                                            </label>
                                            <label>
                                                <input type="radio" value="N" v-model="user.lockYn" />
                                                <span>정지 계정이 아닙니다.</span>
                                            </label>
                                            <!-- <input type="text" v-model="user.lockYn" /> -->
                                        </td>
                                    </tr>
                                    <tr v-if="userId">
                                        <th>휴면계정</th>
                                        <td>
                                            <label>
                                                <input type="radio" value="Y" v-model="user.dormantYn" />
                                                <span>휴면 계정 입니다.</span>
                                            </label>
                                            <label>
                                                <input type="radio" value="N" v-model="user.dormantYn" />
                                                <span>휴면 계정이 아닙니다.</span>
                                            </label>
                                            <!-- <input type="text" v-model="user.dormantYn" /> -->
                                        </td>
                                    </tr>
                                    <tr v-if="userId">
                                        <th>가입일자</th>
                                        <td>
                                            <input type="text" v-model="user.insertDt"  disabled class="input_disabled" />
                                        </td>
                                    </tr>

                                    <tr v-if="userId">
                                        <th>가입 경로</th>
                                        <td>
                                            <select v-model="user.membership">
                                                <option v-for="membershipGroup  in membershipList" :key="membershipGroup.commonCode" :value="membershipGroup.commonCode">{{ membershipGroup.commonCodeNm }}</option>
                                            </select>
                                            
                                        </td>
                                    </tr>

                                    <!-- <tr>
                                        <th>메뉴 타입 여부</th>
                                        <td>
                                            <select >
                                                <option>{{ }}</option>
                                            </select>
                                        </td>
                                    </tr> -->
                                    
                                </tbody>
                            </table>

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
                                                <td><input type="checkbox" v-model="userRole[userCurrentRole.roleCode]" true-value="Y" false-value="N"/> 열람 가능</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div class="table_btn_func">
                                <div class="grid2">
                                    <div class="left">
                                        <button class="btn bg_white" @click="goBack"><i class="ri-file-list-3-line"></i> 뒤로가기</button>
                                    </div>
                                    <div class="center" v-if="userId">
                                        <button class="btn bg_white" @click="deleteUser" ><i class="ri-file-list-3-line"></i> 삭제하기</button>
                                    </div>
                                    <div class="right" v-if="userId">
                                        <button class="btn bg_blue" @click="updateUser"><i class="ri-check-line"></i> 수정하기</button>
                                    </div>
                                    <div class="right" v-if="!userId">
                                        <button class="btn bg_blue" @click="insertUser"><i class="ri-check-line"></i> 등록하기</button>
                                    </div>
                                </div>
                            </div>
                            

                
                        </div>
                    </div>
                </div>
            </div>
        </div>
    <!-- </form> -->
</template>

<script>
import { ref, watch, reactive, computed, onMounted } from 'vue'
import api from '../../plugins/api'
import { useRoute, useRouter } from 'vue-router'
import { useAuthPinia } from '../../store/authPinia'


export default {
    name: "AdminDetailUser",
    components: {
    },
    setup() {
        const router = useRouter()
        
        const route = useRoute()

        const userId = route.params.userId || ''
        
        const isEditMode = computed(() => !!userId) //userId가 없을경우 insert Form
        const password = ref('');
        const normalPassword = ref('')
        const passwordError = ref(false)
        const checkedId = ref(false)



        const birthYear = ref('');
        const birthMonth = ref('');
        const birthDay = ref('');


        
        const user = reactive({
            userId:'',
            userNm:'',
            userGender:'',
            userGenderNm:'',
            userBirth:'',
            phoneNumber:'',
            email:'',
            lockYn:'',
            dormantYn:'',
            membership:'',
            membershipNm:'',
            insertDt:''
        })
        const userRole = reactive({})
        const roleList = ref([])

        const genderList = ref([])
        const membershipList = ref([])

    
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

        
        const getDetailUser = async (userId) => {
            if (!isEditMode.value) {
                return
            }
            try {
                const response = await api.get('/admin/getDetailUser',{
                params: { userId }
                })
                const data = response.data
                const userData = data.adminUserDto;
                const roleData = data.adminUserMappingDto;
                const allRoles = data.allUserRoleDto;

                console.log('받은 userData:', userData); // 확인

                user.userId = userData.userId
                user.userNm = userData.userNm
                user.userGender = userData.userGender
                user.userGenderNm = userData.userGenderNm
                user.userBirth = userData.userBirth
                user.phoneNumber = userData.phoneNumber
                user.email = userData.email
                user.lockYn = userData.lockYn
                user.dormantYn = userData.dormantYn
                user.membership = userData.membership,
                user.membershipNm = userData.membershipNm,
                user.insertDt = userData.insertDt

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

                console.log(user)
                roleList.value = allRoles;

                allRoles.forEach(role => {
                    // 할당된 권한 리스트에 roleCode가 있으면 'Y' 아니면 'N'
                    const roleState = roleData.find(roleSelect => roleSelect.roleCode === role.roleCode)
                    userRole[role.roleCode] = roleState ? 'Y' : 'N'
                })

                
            } catch(error) {
                console.error('메뉴 상세 조회 오류:', error)
            }
        }

        const getInfoList = async() =>{
            try{
                const response = await api.get('/admin/getInfoList')
                if(response.status==200) {
                    const data = response.data
                    genderList.value = data.adminUserGenderDto;
                    membershipList.value = data.adminUserMembershipDto;
                }
                else{
                    alert("잘못된 요청입니다.");
                }
            } catch (error) {
                console.error(error)
            }
        }



        const updateUser = async () => {
            if (!user.userNm.trim()) {
                alert('사용자 이름을 입력해주세요.');
                return
            }
            user.userBirth = userBirth.value;

            const entries = Object.entries(userRole);
            const userRoles = [];
            for (let i = 0; i < entries.length; i++) {
                const [roleCode, useRole] = entries[i];
                if(useRole === 'Y') {
                userRoles.push({ roleCode })
                }
            }
            const params = {
                adminUserDto: user,
                adminUserMappingDto: userRoles
            }


            try {
                const response = await api.post('/admin/updateUser', params);
                if(response.status == 200) {
                alert('회원 정보 수정 완료.');
                console.log('회원 정보 수정 성공:', response.data);
                goBack()
                }
            } catch (error) {
                console.error('회원 정보 수정 실패:', error)
                alert(message)
            }
        }
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
            if (!user.userNm) {
                alert('이름을 입력해 주세요.');
                return;
            }
            if (!user.phoneNumber) {
                alert('휴대폰 번호를 입력해 주세요.');
                return;
            }
            if (!userBirth.value) {
                alert('생년월일을 모두 선택하세요.')
                return
            }
            if (!user.userGender) {
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
            const userDto = {
                userId: user.userId,
                normalPassword: normalPassword.value,
                userNm: user.userNm,
                phoneNumber: user.phoneNumber,
                userBirth: userBirth.value,
                userGender: user.userGender
            };
          //  const userRoles = [];
            // for (const [roleCode, useRole] of Object.entries(userRole)) {
            //     if (useRole === 'Y') {
            //         userRoles.push({ roleCode });
            //     }
            // }
            const params = {
                adminUserDto: userDto,
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

        }

        const goBack = () => {
            router.push('/admin/commonUser/' )
        }

        const deleteUser = async() => {
            if (!confirm('정말 삭제하시겠습니까?')) {
                return
            }
            try {
                const response = await api.post(`/admin/deleteUser?userId=${userId}`);
                if(response.status == 200){
                   console.log('ID 삭제 성공:', response.data)
                   alert('ID 삭제 완료.')
                }
                router.push('/admin/commonUser/' )
            } catch (error) {
                console.error('ID 삭제 실패:', error)
                alert('ID 삭제 실패.')
            }

        }
        const getListRole = async() => {getListRole
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
        const checkUserId = async () => {
            console.log('확인할 아이디:', user.userId)
            if(!user.userId || user.userId.trim() === ''){
                alert('ID를 입력하세요')
                return
            }
            try{
                const response = await api.get('/admin/checkUserId',{
                params: { userId: user.userId }
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
        watch(() => user.userId, (newVal) => {
            const validId = newVal.replace(/[^a-zA-Z0-9@.]/g, ''); // 영문, 숫자, @, . 만 허용
            if (newVal !== validId) {
                user.userId = validId;
            }
        });
        watch(() => user.userNm, (newVal) => {
            const validId = newVal.replace(/[^a-zA-Z가-힣]/g, ''); // 영문, 숫자, @, . 만 허용
            if (newVal !== validId) {
                user.userNm = validId;
            }
        });

        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        
        onMounted(() => {
            
            getDetailUser(userId)
            getInfoList()
            getListRole()
        
        })
        return {
            getDetailUser,
            user,
            userId,
            roleList,
            userRole,

            getInfoList,
            genderList,
            membershipList,

            birthYear,
            birthMonth,
            birthDay,

            years,
            months,
            days, 
            userBirth,

            updateUser,

            goBack,
            deleteUser,

            insertUser,
            getListRole,
            checkUserId,
            passwordError,
            normalPassword,
            password,
            checkedId,

        }   
    }
}


</script>

<style scoped>

</style>