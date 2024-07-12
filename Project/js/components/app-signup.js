const signup = {
    data() {
        return {
            rules: {
                required: value => !!value || 'Required.',
                min: v => v.length >= 8 || 'Min 8 characters',
                emailMatch: () => ('The email and password you entered don\'t match')
            }
        }
    },
    template: `
        <v-row justify="center">
            <v-col cols="12" md="6" lg="5" xl="4">
                <v-card>
                    <v-card-title>Sign up to start listening</v-card-title>
                    <v-card-text>
                        <v-form>
                            <v-text-field label="Username"></v-text-field>
                            <v-text-field label="Password"></v-text-field>
                            <v-btn class="bg-green">Signup</v-btn>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-row justify="center">
            <v-col cols="12" md="6" lg="5" xl="4">
                <v-card variant="text">
                    <v-card-text>Already have an account?
                        <router-link to="/login">
                            <v-btn variant="text text-decoration-underline">
                                Log in here
                            </v-btn>
                        </router-link>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    `
}