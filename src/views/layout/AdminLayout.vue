<template>
    
     <div class="wrapper">
        <AdminHeader />

        <main>  
        <div class="modal_screen" v-if="modalStore.isModalBackGround"></div>
          <router-view/>

        </main>
    </div>
     <AdminFooter />

</template>

<script>
import AdminHeader from './AdminHeader.vue';
import AdminFooter from './AdminFooter.vue';
import { useModalStore } from '../../store/modal'
import api from '../../plugins/api'
export default {
  name: "Layout",
  components: {
    AdminHeader,

    AdminFooter,
  },
  setup() {
    const modalStore = useModalStore();

    
    return {
      modalStore
    }
  }
}


</script>

<style scoped>

</style>