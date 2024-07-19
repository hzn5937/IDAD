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
        >
        <v-tab value="1">view</v-tab>
        <v-tab value="2">insert</v-tab>
        <v-tab value="3">update</v-tab>
        <v-tab value="4">delete</v-tab>
        </v-tabs>
    `
}