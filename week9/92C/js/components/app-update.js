const update = 
{
    data() {
        return {
            pageSize: 5,
            currentPage: 1,
            units: [],
            error: "",
            updateShow: false,
            selcetedUnit: {},
            msg: {},
            unchanged: {},
            index: 0,
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
        clickUpdate(unitObj, index)
        {
            this.updateShow = true
            this.selectedUnit = unitObj
            this.index = index 
            this.unchanged = Object.assign({}, unitObj)
        },
        cancel()
        {
            this.units[this.index] = this.unchanged
            this.updateShow = false
        },
        update(unitObj) 
        {
            this.msg = {}

            if (unitObj.description == "" || unitObj.type == "") {
                setTimeout(() => {
                    this.msg.error = "All fields are required!"
                }, 300);
                return
            }

            api = "resources/api_units.php"
            options = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    code: unitObj.code,
                    desc: unitObj.description,
                    cp: "12.5",
                    type: unitObj.type,
                }),
            }

            fetch(api, options).then(response => {
                return response.json()
            }).then(data => {
                setTimeout(() => {
                    this.msg = data
                }, 300)
            }).catch(error => {
                this.msg.error = error
            })

            this.updateShow = false
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
        <div v-if="!updateShow">
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
                            <v-btn class="ms-2 mt-2" color="primary" @click="clickUpdate(unit, index)">Update</v-btn>
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
        
        <div v-if="updateShow">
            
            <v-row class="mt-3">
                <v-col>
                    <v-row class="ms-2">
                        <v-text-field required label="code - readonly" v-model="selectedUnit.code" readonly></v-text-field>
                    </v-row>
                    <v-row class="ms-2">
                        <v-text-field required label="description" v-model="selectedUnit.description"></v-text-field>
                    </v-row>
                    <v-row class="ms-2">
                        <v-text-field required label="credit point" v-model="selectedUnit.cp"></v-text-field>
                    </v-row>
                </v-col>
                <v-col>
                    <label>Type:</label><br>
                    <input name="type" type="radio" id="core" v-model="selectedUnit.type" value="Core" required>
                    <label for="core">&ThickSpace; Core</label><br>
                    <input name="type" type="radio" id="sd" v-model="selectedUnit.type" value="Software Development">
                    <label for="sd">&ThickSpace; Software Development</label><br>
                    <input name="type" type="radio" id="sa" v-model="selectedUnit.type" value="Systems Analysis">
                    <label for="sa">&ThickSpace; Systems Analysis</label><br>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-btn class="ms-2 mb-2" color="green" @click="update(selectedUnit)">Update</v-btn>
                    <v-btn class="ms-2 mb-2" color="red" @click="cancel()">Cancel</v-btn>
                </v-col>
            </v-row>
        </div>
    `
}