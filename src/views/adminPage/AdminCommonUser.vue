<template>
    <div class="content_page">

        <div class="base_width">

            <div class="content_box_white">
                <div class="content_inline">
                    <h1>사용자 관리</h1>
                </div>
            </div>

            <div class="content_box_white">
                <div class="content_body">
                    <div class="form_contents_box">

                        <!-- 공지사항 상세보기 -->
                
                        <div class="board_top_info">
                            <div class="info">
                                전체: <strong>{{ totalCount }}</strong>개 게시물

                                <div class="board_search_box">
                                    <select v-model="pageSize">
                                        <option value="5">5</option>
                                        <option value="10">10</option>
                                        <option value="20">20</option>
                                    </select>개 보기
                                </div>

                            </div>

                            <div class="board_search_box">
                                <select v-model="searchType">
                                <option value="">전체</option>
                                <option value="title">ID</option>
                                <option value="user">유저이름</option>
                            </select>

                            <div class="board_search">
                                <input type="text" v-model="searchValue" placeholder="검색어를 입력하세요.">
                                <a href="#"><i class="fa-solid fa-magnifying-glass" @click="getListUser"></i></a>
                            </div>



                            </div>
                        </div>
                        <!-- 게시물 정보 -->

                        <div class="table_container_outer">
                            <div class="table_container">
                                <table class="basic_list" id="basic_list">
                                    <colgroup>
                                        <col width="%"/>
                                        <col width="%"/>
                                        <col width="%"/>
                                        <col width="%"/>
                                        <col width="%"/>
                                        <col width="%"/>
                                        <col width="%"/>
                                        <col width="%"/>
                                        <col width="%"/>
                                        <col width="%"/>
                                        <col width="%"/>
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th>번호</th>
                                            <th>사용자 ID</th>
                                            <th>사용자 이름</th>
                                            <th>사용자 성별</th>
                                            <th>사용자 생년월일</th>
                                            <th>사용자 연락처</th>
                                            <th>사용자 전자우편</th>
                                            <th>활동정지</th>
                                            <th>휴면계정</th>
                                            <th>가입 일자</th>
                                            <th>가입 경로</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item, index) in userList" :key="item.userId">
                                            <!-- <td> {{ (currentPage - 1) * pageSize + index + 1}} </td> -->
                                            <td> {{ totalCount - ((currentPage - 1) * pageSize + index)}} </td>
                                            <td @click="detailUser(item.userId)">{{ item.userId }}</td>
                                            <td @click="detailUser(item.userId)">{{ item.userNm }}</td>
                                            <td @click="detailUser(item.userId)">{{ item.userGenderNm }}</td>
                                            <td @click="detailUser(item.userId)">{{ item.userBirth }}</td>
                                            <td @click="detailUser(item.userId)">{{ item.phoneNumber }}</td>
                                            <td @click="detailUser(item.userId)">{{ item.email }}</td>
                                            <td @click="changeLockYn(item.userId,item.lockYn)">{{ item.lockYn === 'Y' ? '잠김' : '정상' }}</td>
                                            <td @click="changeDormantYn(item.userId,item.dormantYn)">{{ item.dormantYn === 'Y' ? '휴면' : '활성' }}</td>
                                            <td @click="detailUser(item.userId)">{{ item.insertDt }}</td>
                                            <td @click="detailUser(item.userId)">{{ item.membershipNm }}</td>
                                            
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <!-- 페이징-->
                        <div class="table_paging">
                            <a href="#" class="btn_pgmove" @click="goingPage(1)" ><i class="fa-solid fa-angles-left"></i></a>
                            <a href="#" class="btn_pgmove" @click="goingPage(currentPage - 1)"><i class="fa-solid fa-chevron-left"></i></a>

                            <span class="pagenum">
                                <a v-for="page in setPage" :key="page" href="#":class="{ active:page ===currentPage }" @click.prevent="goingPage(page)">{{ page }}</a>
                            </span>

                            <a href="#" class="btn_pgmove" @click="goingPage(currentPage + 1)"><i class="fa-solid fa-chevron-right"></i></a>
                            <a href="#" class="btn_pgmove" @click="goingPage(pageCount)"><i class="fa-solid fa-angles-right"></i></a>
                        </div>
                        <!--// 페이징-->
                 

                        <div class="table_btn_func mg_b50">
                            <div class="grid1 ta_r">
                                <button class="btn bg_blue" @click="insertUser"><i class="ri-check-line"></i> 회원 등록하기</button>
                            </div>
                        </div>
                <!-- 게시판 글 상세보기 -->
                <!--// 게시판 글 상세보기 -->
                    </div>
                </div>
                 
  
                
                    
            </div>
        </div>
    </div>
</template>

<script>
import { watch, ref, onMounted, computed } from 'vue'
import api from '../../plugins/api'
import { useRouter } from 'vue-router'
//import AdminUserDetail from '../adminPage/AdminUserDetail.vue'
// import { closeModalBackGround, openModalBackGround } from '../../utils/globalFunctions'
// import AdminUserDetail from '../../components/AdminUserDetail.vue'

export default {
    name: "AdminUser",
    components: {
       
    },
    setup() {


        const pageSize = ref(10)
        const pageCount = computed(() => Math.ceil(totalCount.value/pageSize.value))

        const userList = ref([])
        const searchType = ref('')
        const searchValue = ref('')
        const totalCount = ref(0)
        const currentPage = ref(1)


        // const detailUserModalOpen = ref(false)
        // const selectedUserId = ref(null)
        // const selectedUser = ref(null)

        const router = useRouter();

        const setPage = computed(() => {
            const pages = []
            const total = pageCount.value
            const current = currentPage.value
            const maxSet = 5

            let start = Math.max(1, current - Math.floor(maxSet/2))
            let end = start + maxSet - 1

            if(end > total) {
                end = total
                start = Math.max(1,end - maxSet + 1)
            }

            for (let i = start; i <= end; i++) {
                pages.push(i)
            }
            return pages
        })

        const goingPage = (page) => {
            if (page < 1 || page > pageCount.value || page === currentPage.value) return
            currentPage.value = page
            getListUser()
        }
        
        const getListUser = async() =>{
            
            const data = {

                listView: pageSize.value,
                searchType: searchType.value,
                searchValue: searchValue.value,
                page: currentPage.value,
            }

            try{
                const response = await api.post('/admin/getListUserResponse',data)
                console.log(response);
                if(response.status==200) {
                    userList.value = response.data.adminUserDto;
                    totalCount.value = response.data.totalCount;
                }
                else{
                    alert("잘못된 요청입니다.");
                }
            } catch (error){
                console.error(error)
            }
        }
        
        const detailUser = async(userId) =>{
            router.push('/admin/userDetail/' + userId)
        }
        const insertUser = async() =>{
            router.push('/admin/userInsert/')
        }

        const changeLockYn = async(userId, currentValue) =>{
            const newValue = currentValue === 'Y' ? 'N' : 'Y'
            try{
                const response = await api.post('/admin/changeLockYn', {
                    userId,
                    lockYn: newValue
                })
                if(response.status === 200){
                    getListUser()
                }else {
                    alert('변경 실패.')
                }
            }catch (error) {
                console.error(error)
                alert('오류가 발생했습니다.')
            }
        }
        const changeDormantYn = async(userId, currentValue) =>{
            const newValue = currentValue === 'Y' ? 'N' : 'Y'
            try{
                const response = await api.post('/admin/changeDormantYn', {
                    userId,
                    dormantYn: newValue
                })
                if(response.status === 200){
                    getListUser()
                }else {
                    alert('변경 실패.')
                }
            }catch (error) {
                console.error(error)
                alert('오류가 발생했습니다.')
            }
        }

        
        watch(pageSize, (newValue, oldValue) =>{
            pageSize.value = newValue
            currentPage.value = 1
            getListUser()
        })
      

        onMounted(() => {
          getListUser()
        })
        return {
            userList,
            getListUser,

            insertUser,
            detailUser,

            changeLockYn,
            changeDormantYn,

            pageSize,
            searchType,
            searchValue,
            goingPage,
            currentPage,
            setPage,
            totalCount,

            pageCount,
          

        }
    }
}


</script>

<style scoped>

</style>