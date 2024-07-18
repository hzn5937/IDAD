

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

const app = Vue.createApp({

	data: function () {
		return {
			authenticated: false,
			authenticatedUser: '',
			error:false,
			errorMsg:'',
		}
	},
   mounted() {
        if(!this.authenticated) {
                this.$router.replace({ name: "dashboard" });
            }
        },
	methods: {
		setAuthenticated(status) {
			this.authenticated = status;

		},
	},  
    
});


const vuetify = Vuetify.createVuetify({
    theme: {
        defaultTheme: "dark",
      },
})  


app.use(vuetify)
app.use(router)
app.mount('#app')