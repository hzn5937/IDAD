const login = {
    data() {
        return {
            input: {
                username: "",
                password: "",
            },
            msg: "",
            userId: null,
        }
    },
    template: `
        <v-row justify="center">
            <v-col cols="12" md="6" lg="5" xl="4">
                <v-card>
                    <v-card-title>Login</v-card-title>
                    <v-alert v-if="msg" closable icon="mdi-alert-circle" :text="msg" color="error"></v-alert>
                    <v-card-text>
                        <v-form @submit="login">
                            <v-text-field class="mt-3" label="Username" variant="outlined" v-model="input.username"></v-text-field>
                            <v-text-field class="mt-3" label="Password" variant="outlined" type="password" v-model="input.password"></v-text-field>
                            <v-btn class="bg-green mt-3" type="submit" @click="login()">Login</v-btn>
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
    `,
    methods: {
        login() {
			const client_id = '9c613bc94240470db86c57dfed938509';
            
            var self = this; 
            // GET request using fetch with error handling
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
            
            fetch("resources/api_user.php/", requestOptions)
            .then( response =>{
                //turning the response into the usable data
                return response.json( );
            })
            .then( data =>{ 
                //This is the data you wanted to get from url
                if (data.state == 0)
                {
                    this.msg = data.msg;
                }
                else if (data.state == 1)
                {
                    this.userId = data;
                    localStorage.setItem("userId", this.userId);
                    this.$emit("authenticated", true);
                    window.location.href = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=http://localhost/idad/project/callback&scope=streaming user-read-email user-read-private`

                    // this.$router.replace({ name: "dashboard" });
                }
            })
            .catch(error => {
                self.msg = "Error: "+error;
            });
		},
    },
    mounted() {
        

        if(localStorage.getItem("userId") != null)
        {
            this.$emit("authenticated", true);
            this.$router.replace({ name: "dashboard" });
        }
    }
}