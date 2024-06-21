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
        unitsUrl = "https://mercury.swin.edu.au/cos30043/s104045937/72P/units.json"
        
        fetch(unitsUrl).then(response => {
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
    `
})

app.use(vuetify)
app.mount('#app')