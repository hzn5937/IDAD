const { createApp } = Vue
const { createVuetify } = Vuetify

const router = VueRouter.createRouter({
	history: VueRouter.createWebHashHistory(), 
	routes: [
        {
            path: '/login',
            component: login,
            name:"login"
        },
        {
            path: "/signup",
            component: signup,
            name: "signup"
        },
        {
            path: "/dashboard",
            component: dashboard,
            name: "dashboard"
        }
    ]
})

const vuetify = createVuetify( )  
const app = createApp({

    data: () => ({
       authenticated: false,
    }),

    methods: {
        setAuthenticated(status) {
            this.authenticated = status
        },
        logout() {
            this.authenticated = false
        }
    },

    mounted() {
        if(!this.authenticated) {
            this.$router.replace({ name: "dashboard" });
        }
    }
})



app.component("app-signup", signup)
app.component("app-login", login)
app.component("dashboard", dashboard)

app.use(router)
app.use(vuetify)
app.mount('#app')