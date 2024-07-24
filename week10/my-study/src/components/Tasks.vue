<template>
    <div class="d-flex justify-center">
        <v-card width="80%" variant="text">
            <v-row class="ms-3">
                <v-col >
                    <v-text-field label="status" v-model='strStatus' ></v-text-field>
                </v-col>
                <v-col class="d-flex align-start">
                    <v-btn color="green" @click='add(strStatus)'>Post</v-btn>
                </v-col>
            </v-row>
            <v-row class="ms-3">
                <v-col>
                    <p v-for='(post, index) in statPosts' :key="post" class="d-flex align-start">
                        {{post}}
                        <v-btn color="red" @click='remove(index)' class='ms-1'>Del</v-btn>
                    </p>
                </v-col>
            </v-row>
        </v-card>
    </div>
</template>

<script>
    export default {
        name: "TaskPage",
        data: function () {
            return {
                statPosts: ["Testing Task 5.1", "Downloaded Task 5.1"],
                strStatus: "",
            };
        },
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
</script>