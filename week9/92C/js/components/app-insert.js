const insert = 
{
    template: `
        <v-alert class="mt-3" v-if="msg.success" color="green">{{msg.success}}</v-alert>
        <v-alert class="mt-3" v-if="msg.error" color="red">{{msg.error}}</v-alert>
        <v-row class="mt-3">
            <v-col>
                <v-row class="ms-2">
                    <v-text-field label="code" v-model="input.code"></v-text-field>
                </v-row>
                <v-row class="ms-2">
                    <v-text-field label="description" v-model="input.desc"></v-text-field>
                </v-row>
            </v-col>
            <v-col>
                <label>Type:</label><br>
                <input type="radio" id="core" v-model="input.type" value="Core">
                <label for="core">&ThickSpace; Core</label><br>
                <input type="radio" id="sd" v-model="input.type" value="Software Development">
                <label for="sd">&ThickSpace; Software Development</label><br>
                <input type="radio" id="sa" v-model="input.type" value="Systems Analysis">
                <label for="sa">&ThickSpace; Systems Analysis</label><br>
            </v-col>
        </v-row>
        <v-row>
            <v-col class="ms-3 mb-3">
                <v-btn color="green" @click="insert(input)">Insert</v-btn>
            </v-col>
        </v-row>
    `,
    data() {
        return {
            msg: {},
            input: {
                code: "",
                desc: "",
                cp: "12.5",
                type: "",
            },
        }
    },
    methods: {
        insert(unit) {
            api = "resources/api_units.php"
            options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    code: unit.code,
                    desc: unit.desc,
                    cp: unit.cp,
                    type: unit.type,
                }),
            }

            fetch(api, options).
            then(response => {
                return response.json()
            }).then(data => {
                this.msg = data
            }).catch(error => {
                this.error = error
            })
        }
    },
}