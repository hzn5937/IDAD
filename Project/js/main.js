
const router = VueRouter.createRouter({
	history: VueRouter.createWebHashHistory(), 
	routes: [
        {
            path: '/login',
            component: login,
            name:"login",
            props: true
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
        // To-do: Change the route to login
        if(!this.authenticated) {
            this.$router.replace({ name: "login" });
        } else {
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

const store = Vuex.createStore({
    state: {
        player: {
            test: "test",
            isShuffle: false,
            isPlaying: false,
            isRepeat: false,
            isMuted: false,
            volume: 50,
            tempVolume: 50,
        },
    },
    getters: {},
    mutations: {
        
    },
    actions: {}
})


app.component('app-player', player)



app.use(vuetify)
app.use(router)
app.use(store)
app.mount('#app')