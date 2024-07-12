const signup = {
    data() {
        return {
            rules: {
                required: value => !!value || 'Required.',
                min: v => v.length >= 8 || 'Min 8 characters',
                emailMatch: () => ('The email and password you entered don\'t match')
            },
            input: {
                username: "a",
                password: "",
            },
            msg: "",
            error: ""
        }
    },
    template: `
        <v-row justify="center">
            <v-col cols="12" md="6" lg="5" xl="4">
                <v-card>
                    <v-card-title>Sign up to start listening</v-card-title>
                    <v-alert v-if="msg" closable icon="mdi-check-circle" :text="msg" color="success"></v-alert>
                    <v-alert v-if="error" closable icon="mdi-alert-circle" :text="error" color="error"></v-alert>
                    <v-card-text>
                        <v-form @submit="signup">
                            <v-text-field label="Username" variant="outlined" v-model="input.username"></v-text-field>
                            <v-text-field label="Password" variant="outlined" v-model="input.password" type="password"></v-text-field>
                            <v-btn class="bg-green" type="submit" @click="signup()">Signup</v-btn>
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
                if (!response.ok) {
                    throw new Error('Failed to fetch');
                }
                return response.json();
            })
            .then(data => { 
                this.msg = data.message;
            })
            .catch(error => {
                this.error = "Error: " + error.message;
            });
        }
    }
}