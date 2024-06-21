const { createApp } = Vue
const { createVuetify } = Vuetify

const vuetify = createVuetify( )  
const app = createApp()

app.component('read-data', {
    data() {
        return {
            posts: []
        }
    },
    mounted() {
        $.getJSON("https://jsonplaceholder.typicode.com/posts", (data) => {
            this.posts = data
        }).fail(() => {
            alert("Failed to load data from the server!")
        })
    },
    template: `
        <v-card-text v-for="post in posts">
            {{ post.id }} -- {{ post.title }}
        </v-card-text>
    `
})

app.use(vuetify)
app.mount('#app')