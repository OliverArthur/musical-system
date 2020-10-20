import { createApp } from 'vue'
import App from './App.vue'
import store from './store'

// import the css from vue-material
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

// create new instance of vue
const app = createApp(App)

app.use(store)
app.mount('#app')
