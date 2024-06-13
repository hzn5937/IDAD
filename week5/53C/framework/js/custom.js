var units = [
    {code:'ICT10001', desc:'Problem Solving with ICT', cp:12.5, type:'Core'},
    {code:'COS10005', desc:'Web Development', cp:12.5, type:'Core'},
    {code:'INF10003', desc:'Introduction to Business Information Systems', cp:12.5, type:'Core'},
    {code:'INF10002', desc:'Database Analysis and Design', cp:12.5, type:'Core'},
    {code:'COS10009', desc:'Introduction to Programming', cp:12.5, type:'Core'},
    {code:'INF30029', desc:'Information Technology Project Management', cp:12.5, type:'Core'},
    {code:'ICT30005', desc:'Professional Issues in Information Technology', cp:12.5, type:'Core'},
    {code:'ICT30001', desc:'Information Technology Project', cp:12.5, type:'Core'},
    {code:'COS20001', desc:'User-Centred Design', cp:12.5, type:'Software Development'}
];

const Unit = {
    prop:['id'],
    data() {
        return { units };
    },
    //define the template for the route results
    template: `<div>
        <ul v-for='unit in filteredUnits'>
            <h2> Unit Code: {{unit.code}}</h2>
            <li>{{unit.code}}</li>
            <li>{{unit.desc}}</li>
            <li>{{unit.cp}}</li>
            <li>{{unit.type}}</li>
        </ul></div>
    `,
    computed: {
        //filter function (returns the selected unit object )
        filteredUnits: function () {
            return this.units.filter((unit) => unit.code.toLowerCase() === this.$route.params.id.toLowerCase());
        },
    },
};

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes: [
        {
            path: "/unit/:id",
            component: Unit,
            // Defining path and the component
        },
    ],
});

const app = Vue.createApp({});

app.component("app-lookup", {
    data: function () {
        return {
            units,
        };
    },
    template: `
            <router-view></router-view>
            <h1>Unit Information System</h1>
            <div class="table-responsive">
            <table class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th scope="col">Code</th>
                        <th scope="col">Description</th>
                        <th scope="col">More Detail</th>
                    </tr>
                </thead>
                <tbody>
                <tr v-for="unit in units">
                <td>{{unit.code}}</td>
                <td>{{unit.desc}}</td>
                <td><router-link :to="'/unit/' + unit.code">show details</router-link></td>
                </tr>
                </tbody>
                </table>
                </div>
        `,
});
app.use(router);
app.mount("#app");

