const login = {
    data() {
        return {
            msg: "",
            input: {
                username: "",
                password: "",
            },
            
        }
    },
    methods: {
        login() {
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
                if (data == null) {// didn't find this username password pair
                    self.msg="username or password incorrect.";
                }
                else{
                    this.$emit("authenticated", true);//$emit() function allows you to pass custom events up the component tree.
                    this.$router.replace({ name: "dashboard" });
                }
            })
            .catch(error => {
                self.msg = "Error: "+error;
            });
        },
    },
    template: `
        <v-row class="d-flex justify-center">
            <v-col cols="12" lg="8" md="10" sm="10">
                <v-alert class="mt-3" v-if="msg" color="red">{{msg}}</v-alert>
                <v-card>
                    
                    <v-card-title class='text-center'>Login</v-card-title>
                    <v-card-text>
                        <v-form @submit="login">
                        <v-text-field label="username" v-model="input.username"></v-text-field>
                        <v-text-field label="password" v-model="input.password" type="password"></v-text-field>
                        <div class="d-flex justify-center">
                            <v-btn rounded color="green" type="submit" width="200">Login</v-btn>
                        </div>
                        </v-form>
                    </v-card-text>
                </v-card>
                
            </v-col>
        </v-row>
    `
}