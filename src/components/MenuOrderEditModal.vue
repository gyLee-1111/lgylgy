<template>
    <div class="modal modal_pop_product">
        <div class="pop_header">
            <button class="btn_modal_close" @click="closeOrderEditModal"><i class="ri-close-large-line"></i></button>
        </div>
        <div class="pop_body">
            <div class="board_top_info">

                <div class="board_search_box">
                    <select v-model="menuType" @change="getListMenu">
                        <option value="MENU_H">홈페이지 용</option>
                        <option value="MENU_A">관리자 전용</option>
                    </select>
                </div>
            </div>

            <h2 class="title_pg">메뉴 순서 수정</h2>
            <table class="basic_list" id="basic_list">
                <colgroup>
                    <col width="10%"/>
                    <col width="10%"/>
                    <col width="15%"/>
                    <col width="15%"/>
                    <col width="15%"/>
                </colgroup>
                <thead>
                    <tr>
                        <th>메뉴 순서</th>
                        <th>메뉴 이름</th>
                        <th>메뉴 코드</th>
                        <th>활성화 여부</th>
                        <th>메뉴 타입</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in localMenuList" :key="item.menuCode">
                        <td>
                            <span v-if="item.sortOrder " class="reply-arrow">
                                <span v-for="n in item.depth - 1" :key="n">
                                    <td>-></td>
                                </span>
                            </span>
                            <button @click="moveUp(index)">↑</button>
                            <button @click="moveDown(index)">↓</button>
                            {{ item.sortOrder }}
                            
                        </td>
                        <td>{{ item.menuNm }}</td>
                        <td>{{ item.menuCode }}</td>
                        <td>{{ item.useYn === 'Y' ? '활성화' : '비활성화' }}</td>
                        <td>{{ item.menuTypeNm }}</td>
                    </tr>
                </tbody>
            </table>

                            

            <div class="table_btn_func">
                <div class="grid2">
                    <div class="left">
                        <button class="btn bg_white" @click="closeOrderEditModal"><i class="ri-file-list-3-line"></i> 닫기</button>
                    </div>
                    
                    <div class="right">
                        <button class="btn bg_blue" @click="updateSortOrder"><i class="ri-check-line"></i> 수정하기</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted ,watch } from 'vue'
import axios from 'axios'
import api from '../plugins/api'

export default {
    name: "MenuOrderEditModal",
    props: {
        orderEditModalOpen: Boolean,
        menuList: {
            type: Array,
            required: true
        },
       
    },
    emits: ['close'],
    setup(props, { emit }) {

        const menuList = ref([])

        const localMenuList = ref([])

        const menuType = ref('MENU_H')

        const closeOrderEditModal = () => {
            emit('close') // 부모에게 닫으라고 신호 보냄
            
            document.body.style.overflow = 'auto'
        }

        const getListMenu = async() =>{
            
            try{
                const response = await api.get('/admin/getListMenu',{
                    params:{
                        menuType: menuType.value
                   }
                })
                console.log(response);
                console.log(menuType);
                if(response.status==200) {
                    menuList.value = response.data
                }
                else{
                    alert("잘못된 요청입니다.");
                }
            } catch (error){
                console.error(error)
            }
        }

        const moveUp = (index) => {
            const list = localMenuList.value 
            
            const current = list[index] //이동시키려는 항목을 index로 가져옴
            //현재 항목이 잘못된 값일 경우 종료
            if (!current) {
                return;
            }

            //  1. 상위 메뉴: 그룹 이동
            if (current.depth === 1) {
                const [start, end] = getGroupRange(list, index);
                //현재 메뉴 그룹의 시작 인덱스 (start)와 끝 인덱스(end)를 계산

                // 이전 그룹 찾기
                let prevStart = -1; //이전 그룹의 시작 인덱스를 저장할 변수 초기화
                
                //현재 그룹보다 위쪽에 있는 항목들을 역방향으로 탐색
                for (let i = start - 1; i >= 0; i--) {
                    //depth === 1 인 항목을 찾으면, 상위 메뉴 그룹의 시작이라고 판단
                    if (list[i].depth === 1) {
                        //이전 그룹의 시작 인덱스를 저장하고 반복 종료
                        prevStart = i;
                        break;
                        //그룹을 찾는 반복문 종료
                    }
                }
                //위쪽에 그룹이 없다면 더이사 이동 불가 종료
                if (prevStart === -1) {
                    return;
                }
                
                //이전 그룹의 시작과 끝 인덱스
                const [prevStartIdx, prevEndIdx] = getGroupRange(list, prevStart);

                //현재 그룹 항목을 잘라서 저장
                const currentGroup = list.slice(start, end);

                //이전 그룹 항목을 잘라서 저장
                const prevGroup = list.slice(prevStartIdx, prevEndIdx);

                //리스트에서 현재 그룹과 이전 그룹 위치를 바꿈
                list.splice(prevStartIdx, currentGroup.length + prevGroup.length, ...currentGroup, ...prevGroup);
            }

            //  2. 하위 메뉴: 같은 parentCode 끼리 교체
            else {
                //첫번째 항목 일 경우 종료
                if (index === 0) {
                    return;
                }
                // 위로 이동할 대상 인덱스 저장할 변수 초기화
                let targetIdx = -1;

                //현재 항목보다 위에있는 항목들 역순으로 탐색
                for (let i = index - 1; i >= 0; i--) {

                    // 뎁스가 같다 && 부모코드가 같다
                    if (list[i].depth === current.depth && list[i].parentCode === current.parentCode) {
                        //바꾼 인덱스 저장하고 종료
                        targetIdx = i;
                        break;
                    }
                }
                //바꿀대상이 없다 종료
                if (targetIdx === -1) {
                    return;
                }
                //현재 항목 임시변수 저장
                const temp = list[index];

                //현재 항목 위치에 교환대상 항목 저장
                list[index] = list[targetIdx];

                //임시변수의 현재 항목을 교환한 위에 저장
                list[targetIdx] = temp;
            }
        }

        const moveDown = (index) => {
            const list = localMenuList.value;
            const current = list[index];

            //현재 항목이 잘못된 값일 경우 종료
            if (!current) {
                return;
            }

            //  1. 상위 메뉴: 그룹 이동
            if (current.depth === 1) {

                //현재 그룹의 속한 그룹의 범위를 [start, end) 형태로 가져옴
                const [start, end] = getGroupRange(list, index);

                // 다음 그룹 찾기
                let nextStart = end;

                //뎁스가 1인 다음 상위 메뉴를 찾을떄 까지 반복 -> 다음 그룹이 나올때까지 스킵
                while (nextStart < list.length && list[nextStart].depth !== 1) {
                    nextStart++;
                }
                //리스트 끝에 도달하거나 다음 그룹이 없으면 이동불가 종료
                if (nextStart >= list.length) {
                    return;
                }
                // 다음 그룹 범위 계산
                const [nextGroupStart, nextGroupEnd] = getGroupRange(list, nextStart);
                // 현재 그룹과 다음 그룹의 항목을 자름
                const currentGroup = list.slice(start, end);
                const nextGroup = list.slice(nextGroupStart, nextGroupEnd);

                //splice로 현재 그룹 자리에 다음그룹과 현재 그룹의 순서를 바꿔서 삽입
                list.splice(start, currentGroup.length + nextGroup.length, ...nextGroup, ...currentGroup);
            }

            //  2. 하위 메뉴: 같은 parentCode 끼리 교체
            else {
                //이동 대상 인덱스를 저장할 변수 초기화
                let targetIdx = -1;
                // 현재항목 아래쪽으로 탐색
                for (let i = index + 1; i < list.length; i++) {
                    //같은 뎁스&& 같은 부모코드 
                    if (list[i].depth === current.depth && list[i].parentCode === current.parentCode) {
                        //교체 종료
                        targetIdx = i;
                        break;
                    }
                }
                //교체 대상 없음 종료
                if (targetIdx === -1) {
                    return;
                }
                //현재 항목과 교체 항목의 위치 변경
                const temp = list[index];
                list[index] = list[targetIdx];
                list[targetIdx] = temp;
            }
        }
        const getGroupRange = (list, startIndex) => {
            //시작 항목과 해당항목의 뎁스 저장
            const startItem = list[startIndex];
            const startDepth = startItem.depth;

            //범위의 끝 endIndex눈 다음 항목부터 시작
            let endIndex = startIndex + 1;
            //더 낮은 depth가 나오면 그룹의 끝
            while (endIndex < list.length && list[endIndex].depth > startDepth) {
                endIndex++;
            }
           // 그룹의 시작과 끝 범위를 반환
            return [startIndex, endIndex];
        }

        const applySortOrder = () => {
            //상위 메뉴 뎁스 에 부여할 순서를 위한 카운터
            let parentSort = 1;

            //메뉴 리스트 앞에서 부터 순회하면서 학목 확인
            for (let i = 0; i < localMenuList.value.length; i++) {
                const item = localMenuList.value[i];
                //현재 항목이 상위 메뉴인 경우
                if (item.depth === 1) {
                    // 상위 메뉴: 전체 순서로 지정
                    item.sortOrder = parentSort++;
                    let childSort = 1;

                    
                    // 그 다음 항목들 중 하위 메뉴들에 대해서 sortOrder 설정
                    for (let j = i + 1; j < localMenuList.value.length; j++) {

                        const child = localMenuList.value[j];
                         //다음 상위 메뉴가 나올때까지 (범위를 구함)
                        if (child.depth === 1) {
                            break;
                        }
                       //현재 메뉴가 상위 메뉴의 자식이면 childSort를 부여
                        if (child.parentCode === item.menuCode) {
                            child.sortOrder = childSort++;
                        }
                    }
                }
            }
        }

        const updateSortOrder = async () => {
            applySortOrder(); // 먼저 현재 순서 기반으로 sortOrder 재설정

            const payload = localMenuList.value.map(item => ({
                menuCode: item.menuCode,
                sortOrder: item.sortOrder,
                parentCode: item.parentCode
            }));

            try {
                const response = await api.post('/admin/updateSortOrder', {
                    menus: payload
                });

                if (response.status === 200) {
                    alert('메뉴 순서가 저장되었습니다.');
                    closeOrderEditModal();
                } else {
                    alert('저장 실패');
                }
            } catch (error) {
                console.error(error);
                alert('오류 발생');
            }
        };


       

        watch(() => menuList.value, (newVal) => {
            localMenuList.value = [...newVal]
        },
        { immediate: true })

        
     

        onMounted(() => {
            getListMenu()
        })
        return {
            closeOrderEditModal,
            getListMenu,
            menuType,
            moveUp,
            moveDown,
            menuList,
            localMenuList,

            updateSortOrder,
        }

    }

}
</script>

<style scoped>

</style>