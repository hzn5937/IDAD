const app = Vue.createApp({});

app.component("custom", {
    data: function () {
        return {
            msg: "data",
        };
    },
    template: `
            <h1>Hello World</h1>
            <p>{{msg}}</p>
        `,
    methods: {
        add: function (param) {
            // function()
        },
        remove: function (param) {
            //fuction()
        },
    },
});
app.mount("#app");
