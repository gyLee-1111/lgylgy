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

export default {
  name: "FrontLayout",
  components: {
    FrontHeader,

    FrontFooter,
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