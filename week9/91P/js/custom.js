const { createApp } = Vue
const { createVuetify } = Vuetify

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes: [
        // {
        //     path: '/',
        //     component: nametest,
        //     name: 'nametest',
        // },
        {
            path: '/nametest',
            component: nametest,
            name: 'nametest',
        },
        {
            path: '/mypost',
            component: mypost,
            name: 'mypost',
        },
        {
            path: '/marks',
            component: marks,
            name: 'marks',
        }
    ],
})

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
        <v-tabs v-model="tab" bg-color="primary">
            <v-tab>
                <router-link to="/nametest"><span class="text-white">name test</span></router-link>
            </v-tab>
            <v-tab>
                <router-link to="/mypost"><span class="text-white">post management</span></router-link>
            </v-tab>
            <v-tab>
                <router-link to="/marks"><span class="text-white">student mark</span></router-link>
            </v-tab>
        </v-tabs>
    </v-card>

    <div class="mt-3">
        <router-view></router-view>
    </div>
    `,
    mounted() {
        this.$router.replace({ name: 'nametest' })
    }
})

app.use(vuetify)
app.use(router)
app.mount('#app')