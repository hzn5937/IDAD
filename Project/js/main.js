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
    computed: {
        spotifyPlayer() {
            return this.$store.state.player.player;
        }
    },
    async mounted() {
        // To-do: Change the route to login
        if(!this.authenticated) {
            this.$router.replace({ name: "login" });
        } else {
            this.$router.replace({ name: "dashboard" });
        }

        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;

        document.body.appendChild(script);

        window.onSpotifyWebPlaybackSDKReady = () => {
            const token = localStorage.getItem("token");
            const player = new window.Spotify.Player({
                name: 'Bach Playback API',
                getOAuthToken: cb => { cb(token); }
            });

            this.$store.commit('updatePlayerState', { property: 'player', value: player });
            
            // To-do: delete unused console.log and event listeners
            this.spotifyPlayer.addListener('ready', ({ device_id }) => {
                localStorage.setItem("device_id", device_id);
            });
        
            this.spotifyPlayer.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id);
            });
        
            this.spotifyPlayer.connect()

        };
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
            player: null,
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
        updatePlayerState(state, payload) {
            state.player[payload.property] = payload.value
        }
    },
    actions: {}
})


app.component('app-player', player)



app.use(vuetify)
app.use(router)
app.use(store)
app.mount('#app')