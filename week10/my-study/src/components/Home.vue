<template>
    <h2 v-if="fname || lname">Welcome {{ fname }} {{ lname }}</h2>
    <p color="error">What is your name?</p>
    <div class="d-flex justify-center">
        <v-card width="40%" variant="text">
            <v-text-field label="First Name" v-model="fname"></v-text-field>
            <v-text-field label="Last Name" v-model="lname"></v-text-field>
            <input name="type" type="radio" id="windows" v-model="img" value="Windows">
            <label for="window">&ThickSpace; Windows</label>
            <input class="ms-3" name="type" type="radio" id="mac" v-model="img" value="Mac">
            <label for="mac">&ThickSpace; MacOS</label><br>

            <img v-if="img === 'Windows'" width="50%" src="../assets/windows.png" alt="Windows">
            <img v-else-if="img === 'Mac'" src="../assets/MacOS.png" alt="Mac">
        </v-card>
    </div>

</template>

<script>
    export default {
        name: "HomePage",
        data() {
            return {
                fname: "",
                lname: "",
                img: "",
            }
        }

    }
</script>