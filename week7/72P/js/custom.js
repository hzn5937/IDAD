const { createApp } = Vue
const { createVuetify } = Vuetify

const vuetify = createVuetify( )  
const app = createApp()

app.component("read-data", {
    data() {
        return {
            units: [],
            err: ""
        }
    },
    mounted() {
        mercuryUrl = "https://mercury.swin.edu.au/cos30043/s104045937/72P/units.json"
        liveUrl = "http://127.0.0.1:5500/72P/units.json"
        vscodeUrl = "http://127.0.0.1:3000/72P/units.json"
        relativeUrl = "./units.json"

        fetch(relativeUrl).then(response => {
            return response.json()
        }).then(data => {
            this.units = data
        }).catch(error => {
            this.err = error
        })
    },
    template: `
        <v-table>
            <thead>
                <tr>
                    <th>Code</th>
                    <th>Description</th>
                    <th>cp</th>
                    <th>Type</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="unit in units">
                    <td>{{ unit.code }}</td>
                    <td>{{ unit.desc }}</td>
                    <td>{{ unit.cp }}</td>
                    <td>{{ unit.type }}</td>
                </tr>
            </tbody>
        </v-table>
        {{this.err}}
    `
})

app.use(vuetify)
app.mount('#app')