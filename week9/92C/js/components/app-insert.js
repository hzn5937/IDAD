const insert = {
    data() {
        return {
            input: {
                code: "",
                desc: "",
                cp: "12.5",
                type: "",
            },
        }
    },
    template: `
        <div class="row">
            <div class="col">
                <div class="row">
                    <div class="col-lg-6">
                        <label for="code">Code:</label>
                        <input type="text" class="form-control" v-model="unitObj.code">
                    </div>

                    <div class="col-lg-6">
                        <label for="desc">Description:</label>
                        <input type="text" class="form-control" v-model="unitObj.desc">
                    </div>
                </div>
            </div>

            <div class="col">
                <label>Type</label><br>
                <input type="radio" id="core" v-model="unitObj.type" value="Core">
                <label for="core">&ThickSpace; Core</label><br>
                <input type="radio" id="sd" v-model="unitObj.type" value="Software Development">
                <label for="sd">&ThickSpace; Software Development</label><br>
                <input type="radio" id="sa" v-model="unitObj.type" value="Systems Analysis">
                <label for="sa">&ThickSpace; Systems Analysis</label><br>
                <input type="radio" id="all" v-model="unitObj.type" value="">
                <label for="all">&ThickSpace; All</label>


            </div>
    `
}