import { ref, computed } from 'vue'
import {defineStore} from 'pinia'
import type { PersistenceOptions } from 'pinia-plugin-persistedstate'

interface UserRoleDTO {
  userId: string;
  roleCode: string;
  roleNm: string;
  roleGroup: string;
}

interface LogInResponseDTO {
  userId: string;
  userRoleList: UserRoleDTO[];
  token: string;
  currentRole: UserRoleDTO;
}
interface UserMenuDTO {
  menuCode: number
  menuNm: string
  depth: number
  roleCode: string
  roleNm: string
  roleGroup: string
  parentCode: number
  path: string
  children: UserMenuDTO[]
}



export const useAuthPinia = defineStore('authPinia',()=>{
    const userId = ref<string>('')
    const currentRole = ref<UserRoleDTO | null>(null)

    const userRoles = ref<UserRoleDTO[]>([])
    
    const token = ref<string>('')

    const menuList = ref<UserMenuDTO[]>([])

    const activeMenuCode = ref<number | null>(null)

    function setUserData(userData: LogInResponseDTO ) {
      console.log('setUserData userData:', userData)
      userId.value = userData.userId
      userRoles.value = userData.userRoleList
      currentRole.value = userData.currentRole
      token.value = userData.token
      console.log('setUserData userRoles:', userData.userRoleList)
    }
    function setCurrentRole(role: UserRoleDTO){
      currentRole.value = role
    }

    function setUserRoles(roles:UserRoleDTO[]){
      userRoles.value = roles
      
    }
    function setMenuList(menus:UserMenuDTO[]) {
      menuList.value = menus
    }

    function clearUserData() {
      userId.value = ''
      userRoles.value = []
      currentRole.value = null
      token.value = ''
      sessionStorage.removeItem('authPinia')
      menuList.value = []
    }

    const roleCode = computed(() =>
      userRoles.value.map(role => role.roleGroup)
    );

    function setActiveMenuCode(menucode: number | null){
      activeMenuCode.value = menucode
    }
    

    return {
      userId,
      userRoles,
      roleCode,
      token,
      setUserData,
      setCurrentRole,
      clearUserData,
      setUserRoles,
      currentRole,

      setMenuList,
      menuList,

      activeMenuCode,
      setActiveMenuCode,
    }
  },
  {
  persist: {
  //  enabled: true,
    storage: sessionStorage,
    path:['userId','token','currentRole','userRoles','activeMenuCode'],
  } as PersistenceOptions

})


/*
function changeRole(newRoleCode: string) {
  const newRole = authPinia.userRoles.find(r => r.roleCode === newRoleCode)
  if (newRole) {
    authPinia.setCurrentRole(newRole)
  }
}*/