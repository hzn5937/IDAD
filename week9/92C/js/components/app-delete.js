const del = 
{
    data() {
        return {
            pageSize: 5,
            currentPage: 1,
            units: [],
            error: "",
            msg: {},
            clicked: "No"
        }
    },
    components: {
        paginate: VuejsPaginateNext,
    },
    mounted() {
        fetch("resources/api_units.php").
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
        },
        del(unitObj, index) 
        {
            this.units.splice(index, 1)

            api = "resources/api_units.php"
            options = {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    code: unitObj.code,
                }),
            }

            fetch(api, options).
            then(response => {
                return response.json()
            }).then(data => {
                this.msg = data
            }).catch(error => {
                this.msg.error = error
            })
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
        <div>
        <v-alert class="mt-3" v-if="msg.success" color="green">{{msg.success}}</v-alert>
        <v-alert class="mt-3" v-if="msg.error" color="red">{{msg.error}}</v-alert>
        <v-row>
            <v-col>
                <v-table>
                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>Description</th>
                            <th>cp</th>
                            <th>Type</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(unit, index) in displayUnits" :key="unit.code">
                            <td>{{ unit.code }}</td>
                            <td>{{ unit.description }}</td>
                            <td>{{ unit.cp }}</td>
                            <td>{{ unit.type }}</td>
                            <v-btn class="ms-2 mt-2" color="red" @click="del(unit, index)">Delete</v-btn>
                        </tr>
                    </tbody>
                </v-table>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <paginate
                :page-count="pageCount"
                :clickHandler="clickCallback"
                :container-class="'pagination'">
                </paginate>
            </v-col>
        </v-row>
        </div>
    `
}