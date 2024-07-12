const { createApp } = Vue
const { createVuetify } = Vuetify
const vuetify = createVuetify({
    theme: {
        defaultTheme: "dark",
      },
})  

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
            this.$router.replace({ name: "login" });
        }
    }
})



app.component("app-signup", signup)
app.component("app-login", login)
app.component("dashboard", dashboard)

app.use(router)
app.use(vuetify)
app.mount('#app')