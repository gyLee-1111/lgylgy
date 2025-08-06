<template>
   
  <div>
    <h2>Ongoing MAIN</h2>
    Ongoing MAIN

    
     <div class="wrapper">
        <OngoingMainHead/>

        <main>  
        
          <router-view/>

        </main>

        <OngoingMainFoot/>
    </div>
  </div>
</template>

<script>



import OngoingMainHead from './OngoingMainHead.vue';
import OngoingMainFoot from './MainFoot.vue';


export default {
  name: "OngoingMainView",
  components: {
    OngoingMainHead,

    OngoingMainFoot
  }
}

</script>

<style scoped>

</style>