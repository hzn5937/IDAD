const { createApp } = Vue
const { createVuetify } = Vuetify

const vuetify = createVuetify( )  
const app = createApp({
    data: () => ({
       msg: "Hello World!"
    })
})

app.component('student-table', {
    components: {
        paginate: VuejsPaginateNext,
    },
    data: function() {
        return {
            currentPage: 1,
            pageSize: 5,
            units: [],
        }
    },
    mounted()
    {
        fetch('data/units.json')
        .then(response => response.json())
        .then(data => this.units = data) 
        
    },
    template: `
        <v-col cols="12">
            <v-row>
                <table class="table table-bordered table-striped">
                    <caption id="units-caption">Table of Units</caption>
                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>Description</th>
                            <th>cp</th>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="unit in displayUnits" :key="unit.code">
                            <td headers="th-code">{{ unit.code }}</td>
                            <td headers="th-desc">{{ unit.desc }}</td>
                            <td headers="th-cp">{{ unit.cp }}</td>
                            <td headers="th-type">{{ unit.type }}</td>
                        </tr>
                    </tbody>
                </table>
            </v-row>
        </v-col>
        <v-col cols="12">
            <v-row>
                <paginate
                :page-count="pageCount"
                :clickHandler="clickCallback"
                :container-class="'pagination'">
                </paginate>
            </v-row>
        </v-col>
    `,
    computed: {
        displayUnits() {
            let start = (this.currentPage - 1) * this.pageSize
            let end = start + this.pageSize
            return this.units.slice(start, end)
        },
        pageCount() {
            return Math.ceil(this.units.length / this.pageSize)
        }
    },
    methods: {
        clickCallback(pageNum) {
            this.currentPage = Number(pageNum)
        }
    }
})

app.use(vuetify)
app.mount('#app')