const { createApp } = Vue
const { createVuetify } = Vuetify

const vuetify = createVuetify( )  
const app = createApp({})

app.component("nametest", nametest)
app.component("app-mypost", mypost)
app.component("marks", marks)

app.component("nav-bar", {
    data() {
        return {
            tab: ""
        }
    },
    template: `
    <v-card>
        <v-tabs
        v-model="tab"
        bg-color="primary"
        >
        <v-tab value="one">name test</v-tab>
        <v-tab value="two">post management</v-tab>
        <v-tab value="three">student mark</v-tab>
        </v-tabs>
    </v-card>

    <div class="mt-4" v-if="tab == 'one'">
        <nametest></nametest>
    </div>
    <div class="mt-4" v-else-if="tab == 'two'">
        <app-mypost></app-mypost>
    </div>
    <div class="mt-4" v-else-if="tab == 'three'">
        <marks></marks>
    </div>
    `
})

app.use(vuetify)
// app.use(router)
app.mount('#app')