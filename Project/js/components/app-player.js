const player = 
{
    data() {
        return {
            test: "test",
            isShuffle: false,
            isPlaying: false,
            isRepeat: false,
            volume: 50,
            tempVolume: 50,
        }
    },
    template: `
            <v-card class="mt-1" width="100%">
                <v-card-text>
                    <v-row>
                        <v-col cols="5" lg="5" md="5">
                        </v-col>
                        <v-col cols="3" lg="5" md="5">
                            <v-icon size="x-large" v-if="isShuffle">mdi-shuffle-disabled</v-icon>
                            <v-icon size="x-large" v-else>mdi-shuffle-variant</v-icon>

                            <v-icon size="x-large">mdi-skip-previous</v-icon>

                            <v-icon size="x-large" v-if="isPlaying">mdi-pause</v-icon>
                            <v-icon size="x-large" v-else>mdi-play</v-icon>

                            <v-icon size="x-large">mdi-skip-next</v-icon>

                            <v-icon size="x-large" v-if="isRepeat">mdi-repeat</v-icon>
                            <v-icon size="x-large" v-else>mdi-repeat-off</v-icon>
                        </v-col>
                        <v-col cols="4" lg="2" md="2">
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
            this.$store.state.player.isMute = this.volume == 0 ? true : false
            return this.$store.state.player.isMute
        },
    },
    watch: {
        volume(newVolume)
        {
            this.$store.state.player.volume = newVolume
        },
        isShuffle(newShuffle)
        {
            this.$store.state.player.isShuffle = newShuffle
        },
        isPlaying(newPlaying)
        {
            this.$store.state.player.isPlaying = newPlaying
        },
        isRepeat(newRepeat)
        {
            this.$store.state.player.isRepeat = newRepeat
        },
    }
}