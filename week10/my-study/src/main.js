import { createApp } from 'vue'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import Paginate from "vuejs-paginate-next";

import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'


const vuetify = createVuetify({
    components,
    directives,
})

createApp(App)
.use(router)
.use(vuetify)
.use(Paginate)
.mount('#app')
