import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
//import './style.css'

import App from './App.vue'
import router from './router/index.ts'
// import Dropzone from './components/Dropzone.vue'

import './assets/css/base.css'
import './assets/css/ongoing_contents.css'
import './assets/css/ongoing.css'
import 'remixicon/fonts/remixicon.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'dropzone/dist/dropzone.css'

import { openModalBackGround } from './utils/globalFunctions'
import { closeModalBackGround } from './utils/globalFunctions'

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)
app.config.globalProperties.$apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

app.config.globalProperties.$openModalBackGround = openModalBackGround;
app.config.globalProperties.$closeModalBackGround = closeModalBackGround;

// app.component('Dropzone', Dropzone)

router.isReady().then(() => {
app.mount('#app')
})