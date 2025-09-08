<template>
    
     <div class="wrapper">
        <FrontHeader />

        <main>  
        <div class="modal_screen" v-if="modalStore.isModalBackGround"></div>
          <router-view/>

        </main>
    </div>
     <FrontFooter />

</template>

<script>
import FrontHeader from './FrontHeader.vue';
import FrontFooter from './FrontFooter.vue';
import { useModalStore } from '../../store/modal'
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default {
  name: "FrontLayout",
  components: {
    FrontHeader,

    FrontFooter,
  },
  setup() {
    const router = useRouter();
    const modalStore = useModalStore();

    const goCategoryList = () => {
        router.push('/categoryList/')
    }
    onMounted(() => {
        goCategoryList()
   
    })

    
    return {
      modalStore,
      goCategoryList,
    }
  }
}


</script>

<style scoped>

</style>