const login = {
    data() {
        return 
    },
    template: `
        <v-row justify="center">
            <v-col cols="12" md="6" lg="5" xl="4">
                <v-card>
                    <v-card-title>Login</v-card-title>
                    <v-card-text>
                        <v-form>
                            <v-text-field label="Username"></v-text-field>
                            <v-text-field label="Password"></v-text-field>
                            <v-btn class="bg-green">Login</v-btn>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-row justify="center">
            <v-col cols="12" md="6" lg="5" xl="4">
                <v-card variant="text">
                    <v-card-text>Don't have an account?
                        <router-link to="/signup">
                            <v-btn variant="text text-decoration-underline">
                                sign up
                            </v-btn>
                        </router-link>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    `
}