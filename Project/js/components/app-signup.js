const signup = {
    data() {
        return {
            rules: {
                required: value => !!value || 'Required.',
                min: v => v.length >= 8 || 'Min 8 characters',
            },
            input: {
                username: "admin",
                password: "123123123",
            },
            msg: "",
            alertColor: "",
        }
    },
    template: `
        <v-row justify="center">
            <v-col cols="12" md="6" lg="5" xl="4">
                <v-card>
                    <v-card-title>Sign up to start listening</v-card-title>
                    <v-alert v-if="msg" icon="mdi-check-circle" :text="msg" :color="alertColor"></v-alert>
                    <v-card-text>
                        <v-form @submit.prevent="signup">
                            <v-text-field 
                                class="mt-3"
                                label="Username" 
                                variant="outlined" 
                                v-model="input.username"
                                :rules="[rules.required]">
                            </v-text-field>
                            <v-text-field 
                                class="mt-3"
                                label="Password" 
                                variant="outlined"
                                v-model="input.password" 
                                type="password"
                                :rules="[rules.required, rules.min]">
                            </v-text-field>
                            <v-btn class="bg-green mt-3" type="submit">Signup</v-btn>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-row justify="center">
            <v-col cols="12" md="6" lg="5" xl="4">
                <v-card variant="text" color="grey">
                    <v-card-text >Already have an account?
                        <router-link to="/login">
                            <v-btn variant="text text-decoration-underline">
                                Log in here
                            </v-btn>
                        </router-link>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    `,
    methods: {
        signup() 
        {
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: this.input.username,
                    password: this.input.password
                })
            };

            fetch("resources/api_registration.php", requestOptions)
            .then(response => {
                return response.json();
            })
            .then(data => { 
                this.msg = data.message;
                this.alertColor = data.alertColor;
            })
            .catch(error => {
                this.error = "Error: " + error.message;
                this.alertColor = data.alertColor;
            });
        }
    }
}