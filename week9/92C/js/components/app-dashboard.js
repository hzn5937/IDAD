const dashboard = {
    data() {
        return {
            tab: "1"
        }
    },
    template: `
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
            <v-tab-item>
            <v-card>
                <app-view v-if="tab==1"></app-view>
                <app-insert v-if="tab==2"></app-insert>         
                <app-update v-if="tab==3"></app-update>   
                <app-delete v-if="tab==4"></app-delete>
            </v-card>    
            </v-tab-item>
        </v-tab-items>
    `
}