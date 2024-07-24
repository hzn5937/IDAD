import { createApp } from 'vue'


import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: "dark",
    },
})

import App from './App.vue'
import router from './router'

createApp(App)
.use(router)
.use(vuetify)
.mount('#app')
