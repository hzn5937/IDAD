const { createApp } = Vue;
const { createVuetify } = Vuetify

const vuetify = createVuetify();
const app = createApp({
    data: () => ({
        rules: {
            required: value => !!value || 'This field is required.',
            onlyLetter: value => /^[a-zA-Z]*$/.test(value) || 'Only letters are allowed.',
            min(length) { 
                return value => (value || '').length >= length || `Minimum of ${length} characters are required.`
            },
            max(length) {
                return value => (value || '').length <= length || `Maximum of ${length} characters are allowed.`
            },
            specialCharacter: value => /[$%^&*]/.test(value) || 'Must contain at least 1 special character',
            passwordMatch: value => value === this.password || 'Password does not match',
            email: value => /.+@.+\..+/.test(value) || 'E-mail must be valid',
            postcode: value => /^[0-9]{4}$/.test(value) || 'Postcode must be 4 digits',
            passwordMatch(password) {
                return value => value === password || 'Password does not match'
            },
            phone: value => /^04[0-9]{8}$/.test(value) || 'Phone number must start with 04 and be 10 digits long',
        },
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        cPassword: "",
        email: "",
        streetAddress: "",
        suburb: "",
        postcode: "",
        phoneNumber: "",
        show: false,
    }),
    methods: {

    }
})

app.use(vuetify);
app.mount("#app");
