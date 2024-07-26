const { createApp } = Vue
const { createVuetify } = Vuetify

const vuetify = createVuetify( )  
const app = createApp({
    data() {
        return {
            msg: "haha",
            isShuffle: false,
            isPlaying: false,
            isRepeat: false,
            // isMute: false,
            volume: 50,
            tempVolume: 50,
        }
    },
    template: `
        <v-row class="mt-4">
            <v-card class="mt-1" width="100%">
                <v-card-text>
                    <v-row>
                        <v-col>123</v-col>
                        <v-col>
                            <v-icon v-if="isShuffle">mdi-shuffle-disabled</v-icon>
                            <v-icon v-else>mdi-shuffle-variant</v-icon>

                            <v-icon>mdi-skip-previous</v-icon>

                            <v-icon v-if="isPlaying">mdi-pause</v-icon>
                            <v-icon v-else>mdi-play</v-icon>

                            <v-icon>mdi-skip-next</v-icon>

                            <v-icon v-if="isRepeat">mdi-repeat</v-icon>
                            <v-icon v-else>mdi-repeat-off</v-icon>
                            

                        </v-col>
                        <v-col>
                            <v-slider 
                            @click:prepend="toggleMute" 
                            @start="isMute = false"
                            v-model="volume" 
                            thumb-size="20" step="1" min="0" max="100"
                            :prepend-icon="isMute ? 'mdi-volume-off' : 'mdi-volume-high'">
                                
                            </v-slider>
                        </v-col>

                    </v-row>
                </v-card-text>
            </v-card>
        </v-row>
    `,
    methods: {
        toggleMute() {
            if (this.isMute) {
                let temp = this.tempVolume
                this.volume = temp
                this.isMute = false
            }
            else {
                let temp = this.volume
                this.tempVolume = temp
                this.volume = 0
                this.isMute = true
            }
        }
    },
    computed: {
        isMute() {
            return this.volume == 0
        }
    }
})

app.use(vuetify)
app.mount('#app')