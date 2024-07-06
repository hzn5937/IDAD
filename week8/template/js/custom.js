const { createApp } = Vue
const { createVuetify } = Vuetify

const vuetify = createVuetify( )  
const app = createApp({
    data: () => ({
       
    })
})

app.use(vuetify)
app.mount('#app')