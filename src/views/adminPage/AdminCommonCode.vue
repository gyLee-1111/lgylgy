<template>
    <div class="content_page">

        <div class="base_width">

            <div class="content_box_white">
                <div class="content_inline">
                    <h1>공통 코드 관리</h1>
                </div>
            </div>

            <div class="content_box_white">
                <div class="content_body">
                    <div class="form_contents_box">

                        <!-- 공지사항 상세보기 -->
                         <div class="table_btn_func mg_b50">
                            <div class="grid1 ta_r">
                                <button class="btn bg_blue" @click="openCommonGroupModal"><i class="ri-check-line"></i> 그룹코드 관리</button>
                            </div>
                        </div>
                
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
                                <option value="code">코드</option>
                                <option value="codeNm">코드명</option>
                            </select>

                            <div class="board_search">
                                <input type="text" v-model="searchValue" placeholder="검색어를 입력하세요.">
                                <a href="#"><i class="fa-solid fa-magnifying-glass" @click="getListCommonUpperCode"></i></a>
                            </div>



                            </div>
                        </div>



                        
                        <div class="table_btn_func mg_b50">
                            <div class="grid1 ta_r">
                                <button class="btn bg_blue" @click="openInsertUpperCodeModal" ><i class="ri-check-line"></i>등록하기</button>
                            </div>
                        </div>
                        <!-- 게시물 정보 -->

             
                        <!-- <div class="ag-theme-alpine" style="height: 500px; width: 100%;">
                            <ag-grid-vue
                                style="width: 100%; height: 100%;"
                                class="ag-theme-alpine"
                                :rowData="rowData"
                                :columnDefs="columnDefs"
                                :defaultColDef="defaultColDef"
                                :rowSelection="'single'"
                                >
                            </ag-grid-vue>
                        </div> -->

                        <div class="ag-theme-alpine" style="width: 100%;">
                            <ag-grid-vue
                                style="width: 100%; height: auto;"
                                class="ag-theme-alpine"
                                :rowData="commonCodeList"
                                :columnDefs="columnDefs"
                                :defaultColDef="defaultColDef"

                                :domLayout="'autoHeight'"
                                :rowSelection="'single'"
                                @cell-clicked="clickButton"
                                >
                            </ag-grid-vue>
                        </div>

                        <CommonCode
                            v-if="commonCodeModalOpen"
                            :commonCodeModalOpen="commonCodeModalOpen"
                            :modalMode="modalMode"
                            :target="modalTarget"
                            :initialData="selectedData"
                            @close="closeModal"
                        >
                        </CommonCode>


                        <CommonGroupCode
                            v-if="commonGroupCodeModalOpen"
                            :commonGroupCodeModalOpen="commonGroupCodeModalOpen"
                            @close="closeCommonGroupModal"
                        >
                        </CommonGroupCode>

                        <div class="table_paging">
                            <a href="#" class="btn_pgmove" @click="goingPage(1)" ><i class="fa-solid fa-angles-left"></i></a>
                            <a href="#" class="btn_pgmove" @click="goingPage(currentPage - 1)"><i class="fa-solid fa-chevron-left"></i></a>

                            <span class="pagenum">
                                <a v-for="page in setPage" :key="page" href="#":class="{ active:page ===currentPage }" @click.prevent="goingPage(page)">{{ page }}</a>
                            </span>

                            <a href="#" class="btn_pgmove" @click="goingPage(currentPage + 1)"><i class="fa-solid fa-chevron-right"></i></a>
                            <a href="#" class="btn_pgmove" @click="goingPage(pageCount)"><i class="fa-solid fa-angles-right"></i></a>
                        </div>

                
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted, watch, computed } from 'vue'
import api from '../../plugins/api'

import CommonCode from '../../components/CommonCode.vue'
import CommonGroupCode from '../../components/CommonGroupCode.vue'
import { closeModalBackGround, openModalBackGround } from '../../utils/globalFunctions'

import { AgGridVue } from 'ag-grid-vue3'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'

import { ModuleRegistry } from 'ag-grid-community'
import { ClientSideRowModelModule } from 'ag-grid-community'
import { SymbolDisplayPartKind } from 'typescript'

ModuleRegistry.registerModules([
  ClientSideRowModelModule,
])




export default {
    name: "commonCode",
    components: {
        AgGridVue,
        CommonCode,
        CommonGroupCode,
    },
    setup() {
        const expandedGroups = ref(new Set());

        const columnDefs = [
            { headerName: "하위", flex: 0.3,
                cellRenderer:(params) => { if(params.data._isSubCode){return ''}
                return `<button class="btn btn-blue" data-action="openSubCodeList">+</button>`}
             },
            { headerName: "번호", valueGetter: (params) =>{ if(params.data._isSubCode){return ''}
                const data = commonCodeList.value
                let count = 0
                for (let i = 0; i < data.length; i++) {
                    if (!data[i]._isSubCode) {
                        count++
                    }
                    if (data[i] === params.data) {
                        return count
                    }
                }
                return
                }, flex: 0.3
            },
            { headerName: "공통 코드", field: "commonCode" , flex: 0.6 },
            { headerName: "공통 코드 이름",field: "commonCodeNm" , flex: 0.5 },
            { headerName: "설명", field: "description", flex: 0.5 },
            { headerName: "사용 여부", field: "useYn", flex: 0.4 },
            { headerName: "등록자", field: "userId", flex: 0.3 },
            { headerName: "등록일자", field: "insertDt", flex: 0.5 },
            { headerName: "비고", width: 1000,
                cellRenderer:(params) =>{
                    const isSubCode = params.data._isSubCode === true;
                    let buttons = `<button class="btn btn-blue" data-action="openUpdateUpperCodeModal">수정</button>`

                    if(!isSubCode){
                        buttons += `<button class="btn btn-green" data-action="openInsertSubCodeModal">하위등록</button>`
                    }
                    buttons += `<button class="btn btn-red" data-action="deleteCode">삭제</button>`
                    return buttons;
                }
            }
        ]
        const clickButton = async (params) =>{
            //params에 event값 없으면 리턴 target값없으면 리턴 dataset없으면 리턴 action 없으면 리턴
            const action = params.event?.target?.dataset?.action
            
            if(!action){
                return
            }

            const rowData = params.data;
            const rowIndex = params.node.rowIndex;  // 여기에 rowIndex 추가

            switch(action){
                case 'openSubCodeList':
                    if (expandedGroups.value.has(rowData.commonCode)) {
                        // 이미 확장된 상태 -> 하위 행 제거
                        collapseSubRows(rowIndex);
                        expandedGroups.value.delete(rowData.commonCode);
                    } else {
                        // 확장 안된 상태 -> 하위 코드 가져와서 추가
                        const subCode = await getListCommonSubCode(rowData.commonCode);
                        insertSubRows(rowIndex, subCode);
                        expandedGroups.value.add(rowData.commonCode);
                    }
                    break
                case 'openUpdateUpperCodeModal':
                    if (rowData._isSubCode) {
                        modalMode.value = 'updateSubCode'; // 하위 코드 수정 모드
                    }else {
                        modalMode.value = 'updateUpperCode'; // 상위 코드 수정 모드
                    }
                    selectedData.value = rowData
                    commonCodeModalOpen.value = true
                    document.body.style.overflow = 'hidden'
                    openModalBackGround()
                    break
                
                case 'openInsertSubCodeModal':
                    modalMode.value = 'insertSubCode'
                    selectedData.value = rowData
                    commonCodeModalOpen.value = true
                    document.body.style.overflow = 'hidden'
                    openModalBackGround()
                    break

                case 'deleteCode':
                    if (!confirm('정말 삭제하시겠습니까?')) {
                        return
                    }
                    if (rowData._isSubCode) {
                        try {
                            const response = await api.post('/admin/deleteSubCommonCode',{
                                commonCode : rowData.commonCode
                            });
                            if(response.status == 200){
                            console.log('코드 삭제 성공:', response.data)
                            alert('코드 삭제 완료.')
                            }
                            getListCommonUpperCode()
                        } catch (error) {
                            console.error('코드 삭제 실패:', error)
                            alert('코드 삭제 실패.')
                        }
                    }else {
                         try {
                            const response = await api.post('/admin/deleteUpperCommonCode',{
                                commonCode : rowData.commonCode
                            });
                            if(response.status == 200){
                            console.log('코드 삭제 성공:', response.data)
                            alert('코드 삭제 완료.')
                            }
                            getListCommonUpperCode()
                        } catch (error) {
                            const message = error.response?.data?.message || '하위코드를 먼저 삭제하세요.'
                            alert(message)
                        }
                        
                    }
                   
            }
        }


        const defaultColDef = {
            sortable: true,
            filter: true,
            resizable: true,
            flex: 1
        }
      
        const commonCodeList = ref([])

        const getListCommonUpperCode = async () =>{

            const data = {

                listView: pageSize.value,
                searchType: searchType.value,
                searchValue: searchValue.value,
                page: currentPage.value,
            }

            try{
                const response = await api.post('/admin/getListCommonUpperCode',data)
                console.log(response)
                if(response.status==200){
                    commonCodeList.value = response.data.adminCommonCodeDto
                    totalCount.value = response.data.totalCount
                }
                else{
                    alert("리스트 불러오기 실패")
                }
            }catch(error){
            console.error(error)
            }

        }

        const getListCommonSubCode = async (commonCode) => {
            try {
                const response = await api.get('/admin/getListCommonSubCode', { params: { commonCode } });
                if (response.status === 200) {
                    console.log('하위코드 데이터:', response.data);
                    return response.data;
                }
            } catch (error) {
                console.error(error);
                return
            }
        }

        const insertSubRows = (rowIndex, subCodes) => {
            // commonCode 배열을 복사해서 사용하세요 (reactivity 유지용)
            const newData = [...commonCodeList.value];

            // subCodes가 배열이고 각 아이템에 commonCodeList 필드가 있어야 구분 가능
            // 예: 하위코드는 commonCodeList 구분하기 위해 별도 필드 필요할 수 있음 (ex: isSubCode: true)

            // subCodes가 undefined거나 빈 배열일 수 있으니 체크
            if (!subCodes || subCodes.length === 0) return;

            // 예를 들어, 하위코드 앞에 공백/들여쓰기 처리하려면,
            // 여기서 하위코드 각 객체에 표시용 필드를 추가 가능
            subCodes = subCodes.map(sub => ({
                ...sub,
                _isSubCode: true, // 표시용 플래그(원하면)
            }));

            // rowIndex 뒤에 subCodes 삽입
            newData.splice(rowIndex + 1, 0, ...subCodes);

            // 업데이트
            commonCodeList.value = newData;
            };

            const collapseSubRows = (rowIndex) => {
            const newData = [...commonCodeList.value];
            // rowIndex 다음부터 하위코드가 몇 개 있는지 찾아서 제거해야 함

            // 하위 코드가 _isSubCode 플래그로 구분된다고 가정
            let removeCount = 0;
            for (let i = rowIndex + 1; i < newData.length; i++) {
                if (newData[i]._isSubCode) {
                removeCount++;
                } else {
                break; // 하위코드가 아니면 중단
                }
            }

            if (removeCount > 0) {
                newData.splice(rowIndex + 1, removeCount);
                commonCodeList.value = newData;
            }
        };

        const commonCodeModalOpen = ref(false)

        const modalMode = ref('')
        const selectedData = ref(null)
        const modalTarget = ref(null)

        const openInsertUpperCodeModal = () =>{
            modalMode.value = 'insertUpperCode'
            selectedData.value = null
            commonCodeModalOpen.value = true
            document.body.style.overflow = 'hidden'
            openModalBackGround()
        }
        const closeModal = () =>{
            commonCodeModalOpen.value = false
            document.body.style.overflow = 'auto'
            closeModalBackGround()
            getListCommonUpperCode()
        }

                
        const pageSize = ref(10)
        const pageCount = computed(() => Math.ceil(totalCount.value/pageSize.value))

        const searchType = ref('')
        const searchValue = ref('')
        const totalCount = ref(0)
        const currentPage = ref(1)

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
            getListCommonUpperCode()
        }

        const commonGroupCodeModalOpen = ref(false)

         const openCommonGroupModal = () =>{
            commonGroupCodeModalOpen.value = true
            document.body.style.overflow = 'hidden'
            openModalBackGround()
        }
        const closeCommonGroupModal = () =>{
            commonGroupCodeModalOpen.value = false
            document.body.style.overflow = 'auto'
            closeModalBackGround()
            
        }

        watch(pageSize, (newValue, oldValue) =>{
            pageSize.value = newValue
            currentPage.value = 1
            getListCommonUpperCode()
        })

        
    

        onMounted(() => {
            getListCommonUpperCode()

        })
        return {
            getListCommonUpperCode,

            commonCodeList,
            columnDefs,
            defaultColDef,


            commonCodeModalOpen,
            modalMode,
            selectedData,
            modalTarget,

            clickButton,


            openInsertUpperCodeModal,
            closeModal,

            pageSize,
            searchType,
            searchValue,
            currentPage,
            totalCount,
            setPage,
            pageCount,
            goingPage,

            commonGroupCodeModalOpen,
            openCommonGroupModal,
            closeCommonGroupModal,
        }
    }
}


</script>

<style scoped>

</style>