const app = Vue.createApp({});

app.component(
    "app-mypost", // indicating the component tag
    {
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
                    <label>Status: </label>
                    <input type='text' v-model='strStatus' class='ms-1'>
                    <button type='button' @click='add(strStatus)' class='ms-1'>Post</button>
                </div>
            </div>
            <div class='row'>
                <div class='col mt-3'>
                    <p v-for='(post, index) in statPosts'>
                        {{post}}
                        <button type='button' @click='remove(index)' class='ms-1'>Del</button>
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
);
app.mount("#app");
