const dashboard = {
    data() {
        return {
            tab: "1"
        }
    },
    template: `
    <v-card>
        <v-card-text>
            <v-tabs
            v-model="tab"
            bg-color="primary"
            slider-color="warning"
            >
            <v-tab value="1">view</v-tab>
            <v-tab value="2">insert</v-tab>
            <v-tab value="3">update</v-tab>
            <v-tab value="4">delete</v-tab>
            </v-tabs>
            <v-tab-items v-model="tab">
                <v-card>
                    <app-view v-if="tab==1"></app-view>            
                </v-card>    
            </v-tab-items>
        </v-card-text>
    </v-card>
    `
}