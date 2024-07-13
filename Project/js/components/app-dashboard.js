const dashboard = {
    data() {
        return {
            genreMenuHeight: 0,
            browseMenuHeight: 0,
            token: "",
            tab: "home",
            search: "nothing",
            albums: [],
            genres: [],
            searchResult: [],
        }
    },
    async mounted() {
        const client_id = 'b01d098f7b5d4412aa72b571f4cf672f';
        const client_secret = '4923391b875d4d8f9a5517c26c7e07a8';

        const result = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": "Basic " + btoa(client_id + ":" + client_secret)
            },
            body : "grant_type=client_credentials"
        })  

        const token = await result.json()
        this.token = token.access_token

        const result2 = await fetch("https://api.spotify.com/v1/browse/new-releases?limit=10", {
            method: "GET",
            headers: { 
                "Authorization": "Bearer " + this.token
            }
        })
        const data = await result2.json()

        this.albums = data.albums.items

        const genresResult = await fetch("https://api.spotify.com/v1/recommendations/available-genre-seeds",{
            method: "GET",
            headers: { 
                "Authorization": "Bearer " + this.token
            }
        })
        const genresData = await genresResult.json()
        this.genres = genresData.genres
        this.browseMenuHeight = this.browseSectionSize()
    },
    methods: {
        load ({ done }) {
            setTimeout(() => {
                done('empty')
            }, 1000)
        },
        clickHome() {
            this.tab = "home"
            setTimeout(() => {
                this.browseMenuHeight = this.browseSectionSize()
            }, 10)
        },
        clickSearch() {
            this.tab = "search"
            setTimeout(() => {
                this.genreMenuHeight = this.genreSectionSize()
            }, 10)
        },
        genreSectionSize: function() {
            // 25 is the padding of the search bar
            return this.$refs.searchCard.$el.offsetHeight - this.$refs.searchBar.$el.offsetHeight - 25
        },
        browseSectionSize:function() {
            return this.$refs.homeCard.$el.offsetHeight - this.$refs.userBar.$el.offsetHeight - 25
        },
        searchByGenre: function(genre) {
            this.search = genre
            let api = "https://api.spotify.com/v1/search?q="
            let queryString = `genre:"${genre}"`
            let type = "type=track"
            let url = `${api}${queryString}&${type}`

            fetch(url, {
                method: "GET",
                headers: { 
                    "Authorization": "Bearer " + this.token
                }
            }).then(response => response.json())
            .then(data => { this.searchResult = data.tracks.items })
            
            this.tab = "searched"
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
        steppedNumberOfAlbums: function() {
            var number = [];
            for (let i = 0; i <= this.albums.length; i += 4 )
            {
                number.push(i)
            }
            return number
        },
        computedImages: function() {
            var images = []
            for (let i = 0; i < this.albums.length; i++) {
                images.push({
                    url: this.albums[i].images[0]?.url || "",
                    height: this.albums[i].images[0]?.height || 0,
                    width: this.albums[i].images[0]?.width || 0
                })
            }
            return images
        }
    },
    template: `
        <v-row>
            <v-col cols="2" lg="3" md="4" sm="4">
                <v-row>
                    <v-card width="99%">
                        <v-card-text>
                            <p><v-btn variant="text" @click="clickHome()"><v-icon>mdi-home</v-icon> Home</v-btn></p>
                            <p><v-btn variant="text" @click="clickSearch()"><v-icon>mdi-magnify</v-icon> Search</v-btn></p>
                        </v-card-text>
                    </v-card>
                </v-row>
                <v-row class="mt-4">
                    <v-card width="99%" height="75vh">
                        <v-card-text class="d-flex justify-space-between">
                            <v-btn variant="text" ><v-icon>mdi-playlist-music</v-icon> Your Library</v-btn>
                            <v-btn variant="text" ><v-icon>mdi-plus</v-icon></v-btn>
                        </v-card-text>
                    </v-card>
                </v-row>
            </v-col>
            <v-col cols="10" lg="9" md="8" sm="8">
                <v-row>
                    <v-card width="99%" height="90vh" ref="homeCard" v-show="tab=='home'" class="overflow-auto">
                        <v-card-text>
                        <v-row ref="userBar">
                            <v-col class="d-flex flex-row-reverse">
                                <v-icon size=50>mdi-account-circle</v-icon>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-card v-for="album in albums" :max-width="300" class="mb-3" variant="text">
                                <v-card-text>
                                    <v-img :height="album.images[0].height" :width="album.images[0].width" :src="album.images[0].url"></v-img>
                                </v-card-text>
                                <v-card-title>{{album.name}}</v-card-title>
                                <v-card-subtitle>{{album.artists[0].name}}</v-card-subtitle>
                            </v-card>
                        </v-row>
                        </v-card-text>
                    </v-card>
                    <v-card width="99%" height="90vh" ref="searchCard" v-show="tab=='search'" class="overflow-auto">
                        <v-card-text>
                            <v-row ref="searchBar">
                                <v-col cols="4">
                                    <v-text-field label="Search" v-model="search" rounded variant="outlined"></v-text-field>
                                </v-col>
                                <v-col class="d-flex flex-row-reverse">
                                    <v-icon size=50>mdi-account-circle</v-icon>
                                </v-col>
                            </v-row>
                            <v-row v-for="i in steppedNumbersOfGenres">
                                <v-col>
                                    <v-btn @click="searchByGenre(genres[i])" v-if="i <= genres.length-1">{{i+1}}.{{genres[i]}}</v-btn>
                                </v-col>
                                <v-col>
                                    <v-btn @click="searchByGenre(genres[i+1])" v-if="i+1 <= genres.length-1">{{i+2}}.{{genres[i+1]}}</v-btn>
                                </v-col>
                                <v-col>
                                    <v-btn @click="searchByGenre(genres[i+2])" v-if="i+2 <= genres.length-1">{{i+3}}.{{genres[i+2]}}</v-btn>
                                </v-col>
                            </v-row>

                        </v-card-text>
                    </v-card>
                </v-row>
            </v-col>
        </v-row>
    `,
    
}

