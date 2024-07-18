const mypost = {
    // defining data to be used in the component
    data: function () {
        return {
            statPosts: ["Testing Task 5.1", "Downloaded Task 5.1"],
            strStatus: "",
        };
    },
    // define the template for the component
    template: `
        <div class='row'>
            <div class='col'>
                <v-text-field label="status" v-model='strStatus' ></v-text-field>
            </div>
            <div class='col'>
                <v-btn color="green" @click='add(strStatus)'>Post</v-btn>
            </div>
        </div>
        <div class='row'>
            <div class='col mt-3'>
                <p v-for='(post, index) in statPosts'>
                    {{post}}
                    <v-btn color="red" @click='remove(index)' class='ms-1'>Del</v-btn>
                </p>
            </div>
        </div>
    `,
    // defining the methods for add and remove status messages
    methods: {
        add: function (status) {
            //push status into statPosts array
            this.statPosts.unshift(status);
            this.strStatus = "";
        },
        remove: function (index) {
            this.statPosts.splice(index, 1);
        },
    },
}