const { createApp } = Vue
const { createVuetify } = Vuetify

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes: [
        {
            path: '/login',
            component: login,
            name: 'login',
        },
        {
            path: '/dashboard',
            component: dashboard,
            name: 'dashboard',
        }
    ],
})

const vuetify = createVuetify( )  
const app = createApp({
    data() {
        return {
            authenticated: false,
            authenticatedUser: "",
        }
    },
    methods: {
        logout() {
            this.authenticated = false
            this.authenticatedUser = ""
        },
        setAuthenticated(status) {
            this.authenticated = status
        },
    },
    mounted() {
        if (!this.authenticated) {
            this.$router.replace({ name: 'dashboard' })
        }
    }
})

app.component("app-view", view)
app.component("app-insert", insert)

app.component('app-bar', {
    template: `
    <div>
		<v-spacer></v-spacer>
		<v-btn>
			<router-link  to="/login" v-on:click="logout()" replace>
				Logout<v-icon>mdi-logout</v-icon>
			</router-link>
			<!-- replace: the navigation will not leave a history record.  -->
		</v-btn>
		</div>
    `,
    methods: {
        logout() {
            this.$root.logout()
        }
    }
})

app.use(vuetify)
app.use(router)
app.mount('#app')