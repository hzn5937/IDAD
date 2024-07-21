const view = {
    data() {
        return {
            pageSize: 5,
            currentPage: 1,
            units: [],
            error: "",
        }
    },
    components: {
        paginate: VuejsPaginateNext,
    },
    mounted() {
        fetch("data/units.json").
        then(response => {
            return response.json()
        }).then(data => {
            this.units = data
        }).catch(error => {
            this.error = error
        })
    },
    methods: {
        clickCallback(pageNum) {
            this.currentPage = Number(pageNum)
        }
    },
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
    template: `
        <v-row>
            <v-col>
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
                        <tr v-for="unit in displayUnits">
                            <td>{{ unit.code }}</td>
                            <td>{{ unit.desc }}</td>
                            <td>{{ unit.cp }}</td>
                            <td>{{ unit.type }}</td>
                        </tr>
                    </tbody>
                </v-table>
            </v-col>
        </v-row>
        <v-row></v-row>
            <v-col cols="12">
                <paginate
                :page-count="pageCount"
                :clickHandler="clickCallback"
                :container-class="'pagination'">
                </paginate>
            </v-col>
        </v-row>
    `
}