<template>
    <v-row justify="center">
        <v-col cols="12" md="6" lg="5" xl="4">
            <v-card>
                <v-card-title>Login</v-card-title>
                <v-alert v-if="msg" closable icon="mdi-alert-circle" :text="msg" color="error"></v-alert>
                <v-card-text>
                    <v-form @submit="login">
                        <v-text-field class="mt-3" label="Username" variant="outlined" v-model="input.username"></v-text-field>
                        <v-text-field class="mt-3" label="Password" variant="outlined" type="password" v-model="input.password"></v-text-field>
                        <v-btn class="bg-green mt-3" type="submit">Login</v-btn>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
    <v-row justify="center">
        <v-col cols="12" md="6" lg="5" xl="4">
            <v-card variant="text" color="grey">
                <v-card-text class="gray--text">Don't have an account?
                    <router-link to="/signup">
                        <v-btn variant="text" class="text-decoration-underline">
                            sign up
                        </v-btn>
                    </router-link>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
    export default {
        name: 'LoginSection',
    }
</script>