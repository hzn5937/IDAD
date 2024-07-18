const { createApp } = Vue
const { createVuetify } = Vuetify

const vuetify = createVuetify( )  
const app = createApp({
    data() {
        return {
            msg: "haha"
        }
    }
})

app.use(vuetify)
app.mount('#app')