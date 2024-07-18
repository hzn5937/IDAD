const nametest = {
    data() {
        return {
            strName: "Hello World",
        }
    },
    computed: {
        isAmy() {
            return this.strName.toLowerCase() == 'amy';
        }
    },
    template: 
    `
        <h1 class="text-center">String Test</h1>
        <div class="row">
            <div class="col-sm">
                
                <v-text-field v-model="strName" label="Name"></v-text-field>
            </div>
        </div>
        <div class="row">
            <div class="col-sm">
                <div v-if="isAmy">
                    <p>Awesome Name!</p>
                </div>
                <div v-else>
                    <p>{{strName}} is not my name!</p>
                </div>
            </div>
        </div>
    `
}