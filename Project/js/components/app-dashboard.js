const dashboard = {
    data() {
        return {
            genreMenuHeight: 0,
            contentSectionHeight: 0,
            footerSectionHeight: 0,
            webToken: "",
            tab: "home",
            search: "",
            albums: [],
            genres: [],
            searchResult: [],
            tracks: [],
            menuItems: ["LOGOUT"],
            genreError: "",
            trackError: "",
            searched: false,
        }
    },
    async mounted() {

        // redirect if not authenticated
        if (!this.isLoggedIn())
        {
            this.$router.replace({ name: "login" })
        }

        this.contentSectionHeight = this.calculateContentSectionHeight()
        this.footerSectionHeight = this.calculteFooterSectionHeight()
        
        await this.getTracks();

        await this.getGenres();

        await this.transferPlayback();

        
    },
    methods: {
        // To-do: delete this function
        test() {
            window.location.reload()
        },
        isLoggedIn() {
            return localStorage.getItem("userId") != null
        },
        clickHome() {
            this.tab = "home"
        },
        clickSearch() {
            this.tab = "search"
            this.searched = false;
        },
        calculateContentSectionHeight:function() {
            return this.$refs.navSection.$el.offsetHeight + this.$refs.playlistSection.$el.offsetHeight + 4
        },
        calculteFooterSectionHeight:function() {
            let contentHeight = this.calculateContentSectionHeight()
            return window.innerHeight - contentHeight - 10
        },
        searchApiByGenre: function(params) {
            let api = "https://api.spotify.com/v1/search?q="
            let queryString = `genre:"${params}"`
            let type = "type=track"
            let url = `${api}${queryString}&${type}`

            fetch(url, {
                method: "GET",
                headers: { 
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            }).then(response => response.json())
            .then(data => { this.searchResult = data.tracks.items })
            
            this.searched = true
        },
        searchApi: function(params) {
            if (params == "")
            {
                return 
            }
            let api = "https://api.spotify.com/v1/search?q="
            let queryString = `${params}`
            let type = "type=track"
            let url = `${api}${queryString}&${type}`

            fetch(url, {
                method: "GET",
                headers: { 
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            }).then(response => response.json())
            .then(data => { this.searchResult = data.tracks.items })
            
            this.searched = true
        },
        logout() {
            localStorage.removeItem("userId")
            this.$emit("authenticated", false)
            localStorage.removeItem("token")
            localStorage.removeItem("refresh_token")
        },
        refreshAccessToken: async function() {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
            myHeaders.append("Cookie", "__Host-device_id=AQBz12dhVNyVny_HxhXtWX4QbX1RsLyH41Hs6srLCSY3zWISVwm9Y2zC6TL4fUTaM1HvdC8MyO3GDWNND8aOOOxz_-iWlsD0Z8U; sp_tr=false");

            const urlencoded = new URLSearchParams();
            urlencoded.append("grant_type", "refresh_token");
            urlencoded.append("refresh_token", "AQBUDKrcXMGQkLrPryioisCSCv9b38gcdWfD8rr13zzmMJWMdVY_RDxZsxFbox5cL0ID4jW_msb5AM8i03V9TAUH6RJCG3ddIiiw6WXS1d0PLgYtfsRVGS3OBSTCl3IxWGE");
            urlencoded.append("client_id", "9c613bc94240470db86c57dfed938509");
            urlencoded.append("client_secret", "a4896f7afdbd4553898339d9f818d3ad");

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: urlencoded,
                redirect: "follow"
            };

            const refreshTokenApi = await fetch("https://accounts.spotify.com/api/token", requestOptions)
            if (refreshTokenApi.ok)
            {
                const data = await refreshTokenApi.json()
                localStorage.setItem("token", data.access_token)
                localStorage.setItem("refresh_token", data.refresh_token)
                // refresh the page
                window.location.reload()
            }
            else 
            {
                localStorage.removeItem("userId")
                localStorage.removeItem("token")
                localStorage.removeItem("refresh_token")
                this.$router.replace({ name: "login", params: { code: '401' } })
            }
        },
        getTracks: async function() {
            let url = "https://api.spotify.com/v1/recommendations?market=VN&seed_genres=pop"
            options = {
                method: "GET",
                headers: { 
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            }
            const tracksApi = await fetch(url, options)
            if (tracksApi.ok)
            {
                const tracksData = await tracksApi.json()
                this.tracks = tracksData.tracks
                console.log(tracksData.tracks[0].uri)
            }
            else if (tracksApi.status == 401)
            {
                await this.refreshAccessToken();
            }
            else if (tracksApi.status == 403)
            {
                this.trackError = "403. Application is in development mode, you need to ask project owner permission to use the API."
            }
            else if (tracksApi.status == 429)
            {
                this.trackError = "429. Too many requests, please use the search bar."
            }
        },
        getGenres: async function() {
            let url = "https://api.spotify.com/v1/recommendations/available-genre-seeds"
            options = {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            }

            const getGenresApi = await fetch(url, options)
            if (getGenresApi.ok)
            {
                const genresData = await getGenresApi.json()
                this.genres = genresData.genres
            }
            else
            {
                if (getGenresApi.status == 403)
                {
                    this.genreError = "403. Application is in development mode, you need to ask project owner permission to use the API."
                }
                else if (getGenresApi.status == 429)
                {
                    this.genreError = "429. Too many requests, please use the search bar."
                }
            }
        },
        transferPlayback: async function() {
            let url = "https://api.spotify.com/v1/me/player"
            options = {
                method: "PUT",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "device_ids": [localStorage.getItem("device_id")],
                    "play": true
                })
            }

            const transferPlaybackApi = await fetch(url, options)
            if (transferPlaybackApi.ok)
            {
                console.log("Playback transfered")
            }
            else 
            {
                let response = await transferPlaybackApi.json()
                this.trackError += `\n${response.error.status}: ${response.error.message}`
            }
        }
    },
    computed: {
        // v-for doesnt support stepping
        // create an array of numbers and go through each of them 
        // (1,4,7,10) to simulate stepping
        steppedNumbersOfGenres: function() {
            var number = [];
            for (let i = 0; i <= this.genres.length; i += 3 )
            {
                number.push(i)
            }
            return number
        },
    },
    template: `
        <v-row>
            <v-col cols="2" lg="3" md="4" sm="4">
                <v-row>
                    <v-card width="99%" ref="navSection">
                        <v-card-text>
                            <p><v-btn variant="text" @click="clickHome()"><v-icon>mdi-home</v-icon> Home</v-btn></p>
                            <p><v-btn variant="text" @click="clickSearch()"><v-icon>mdi-magnify</v-icon> Search</v-btn></p>
                        </v-card-text>
                    </v-card>
                </v-row>
                <v-row class="mt-4">
                    <v-card width="99%" height="75vh" ref="playlistSection">
                        <v-card-text class="d-flex justify-space-between">
                            <v-btn variant="text" ><v-icon>mdi-playlist-music</v-icon> Your Library</v-btn>
                            <v-btn variant="text" ><v-icon>mdi-plus</v-icon></v-btn>
                        </v-card-text> 
                    </v-card>
                </v-row>
            </v-col>
            <v-col cols="10" lg="9" md="8" sm="8">
                <v-row>
                    <v-card width="100%" :height="contentSectionHeight" ref="homeCard" v-show="tab=='home'" class="overflow-auto">
                        <v-card-text>
                        <v-row ref="userBar">
                            <v-col class="d-flex flex-row-reverse">
                                <v-menu :menuItems="menuItems">
                                <template v-slot:activator="{ props }">
                                    <v-btn v-bind="props" variant="text" height="50">
                                        <v-icon size="50">mdi-account-circle</v-icon>
                                    </v-btn>
                                </template>
                                <v-list>
                                    <v-list-item>
                                        <router-link to="/login" @click="logout()">
                                            <v-list-item-title>Logout</v-list-item-title>
                                        </router-link>
                                    </v-list-item>
                                </v-list>
                                </v-menu>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-row>
                                <v-alert v-if="trackError" type="error" class="mt-1">{{trackError}}</v-alert>
                            </v-row>
                            <v-row>
                            <v-card v-for="track in tracks" :max-width="300" class="mb-3" variant="text">
                                <v-card-text>
                                    <v-img :height="track.album.images[1].height" :width="track.album.images[1].width" :src="track.album.images[1].url"></v-img>
                                </v-card-text>
                                <v-card-title>{{track.name}}</v-card-title>
                                <v-card-subtitle>{{track.artists[0].name}}</v-card-subtitle>
                            </v-card>
                            </v-row>
                        </v-row>
                        </v-card-text>
                    </v-card>
                    <v-card width="100%" :height="contentSectionHeight" ref="searchCard" v-show="tab=='search'" class="overflow-auto">
                        <v-card-text>
                            <v-row ref="searchBar">
                                <v-col cols="4">
                                    <v-text-field label="Search" v-model="search" rounded variant="outlined" @input="searchApi(search) "></v-text-field>
                                </v-col>
                                <v-col class="d-flex flex-row-reverse">
                                    <v-icon size=50>mdi-account-circle</v-icon>
                                </v-col>
                            </v-row>
                            <v-card variant="text" v-if="!searched">
                                <v-card-title class="d-flex justify-center mb-3">GENRES</v-card-title>
                                <v-card-text>
                                <v-alert v-if="genreError" type="error">{{genreError}}</v-alert>
                                <v-row v-for="i in steppedNumbersOfGenres">
                                    <v-col  class="d-flex justify-center">
                                        <v-btn @click="searchApiByGenre(genres[i])" v-if="i <= genres.length-1 ">{{i+1}}.{{genres[i]}}</v-btn>
                                    </v-col>
                                    <v-col class="d-flex justify-center">
                                        <v-btn @click="searchApiByGenre(genres[i+1])" v-if="i+1 <= genres.length-1 ">{{i+2}}.{{genres[i+1]}}</v-btn>
                                    </v-col>
                                    <v-col class="d-flex justify-center">
                                        <v-btn @click="searchApiByGenre(genres[i+2])" v-if="i+2 <= genres.length-1 ">{{i+3}}.{{genres[i+2]}}</v-btn>
                                    </v-col>
                                </v-row>
                                </v-card-text>
                            </v-card>
                            <v-card variant="text" v-if="searched">
                                <v-card-title class="d-flex justify-center">Search Results</v-card-title>
                                <v-card-text>
                                    <v-row>
                                        <v-card v-for="track in searchResult" :max-width="300" class="mb-3" variant="text">
                                            <v-card-text>
                                                <v-img :height="300" :width="300" :src="track.album.images[0].url"></v-img>
                                            </v-card-text>
                                            <v-card-title>{{track.name}}</v-card-title>
                                            <v-card-subtitle>{{track.artists[0].name}}</v-card-subtitle>
                                        </v-card>
                                    </v-row>
                                </v-card-text>
                            </v-card>

                        </v-card-text>
                    </v-card>
                </v-row>
            </v-col>
        </v-row>
        <v-row >
            <v-card class="mt-1" width="100%" :height="footerSectionHeight">
                <v-card-text>

                    <app-player></app-player>

                </v-card-text>
            </v-card>
        </v-row>
        
    `,
    
}

window.onSpotifyWebPlaybackSDKReady = () => {
    
}