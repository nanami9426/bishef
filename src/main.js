import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const options = {
    position: "bottom-left",
    timeout: 1500,
    hideProgressBar: true,
    icon: false,
    closeButton: false,
    toastClassName: "my-toast"
}

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Toast, options);


app.mount('#app')
