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
            searched: false,
        }
    },
    async mounted() {
        this.contentSectionHeight = this.calculateContentSectionHeight()
        this.footerSectionHeight = this.calculteFooterSectionHeight()
        // redirect if not authenticated
        const client_id = '9c613bc94240470db86c57dfed938509';
        const client_secret = 'a4896f7afdbd4553898339d9f818d3ad';

        const SpotifyWebApi = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": "Basic " + btoa(client_id + ":" + client_secret),
            },
            body : "grant_type=client_credentials",
        })  
        const webToken = await SpotifyWebApi.json()
        this.webToken = webToken.access_token

        const getGenresApi = await fetch("https://api.spotify.com/v1/recommendations/available-genre-seeds",{
            method: "GET",
            headers: { 
                "Authorization": "Bearer " + this.webToken
            }
        })
        if (getGenresApi.ok)
        {
            const genresData = await getGenresApi.json()
            this.genres = genresData.genres
        }
        else
        {
            if (getGenresApi.status == 429)
            {
                this.genreError = "429. Too many requests, please use the search bar."
            }
        }

        const tracksApi = await fetch("https://api.spotify.com/v1/recommendations?market=VN&seed_genres=pop", {
            method: "GET",
            headers: { 
                "Authorization": "Bearer " + this.webToken
            }
        })
        const tracksData = await tracksApi.json()
        this.tracks = tracksData.tracks

        window.location.href = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=http://localhost/idad/project/#/dashboard&scope=streaming user-read-email user-read-private`
    },
    methods: {
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
                    "Authorization": "Bearer " + this.webToken
                }
            }).then(response => response.json())
            .then(data => { this.searchResult = data.tracks.items })
            
            this.searched = true
        },
        searchApi: function(params) {
            let api = "https://api.spotify.com/v1/search?q="
            let queryString = `${params}`
            let type = "type=track"
            let url = `${api}${queryString}&${type}`

            fetch(url, {
                method: "GET",
                headers: { 
                    "Authorization": "Bearer " + this.webToken
                }
            }).then(response => response.json())
            .then(data => { this.searchResult = data.tracks.items })
            
            this.searched = true
        },
        logout() {
            this.$emit("authenticated", false)
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
                            {{authenticated}}
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
                            <v-card v-for="track in tracks" :max-width="300" class="mb-3" variant="text">
                                <v-card-text>
                                    <v-img :height="track.album.images[1].height" :width="track.album.images[1].width" :src="track.album.images[1].url"></v-img>
                                </v-card-text>
                                <v-card-title>{{track.name}}</v-card-title>
                                <v-card-subtitle>{{track.artists[0].name}}</v-card-subtitle>
                            </v-card>
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



                </v-card-text>
            </v-card>
        </v-row>
    `,
    
}

window.onSpotifyWebPlaybackSDKReady = () => {
    
}