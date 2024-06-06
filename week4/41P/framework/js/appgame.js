Vue.createApp({
    data() {
        return {
            message: "Start Guessing",
            result: this.newNumber(),
            guess: "",
        };
    },
    methods: {
        checkNumber() {
            if (isNaN(this.guess)) {
                this.message = "Please enter a valid number";
            } else if (parseInt(this.guess) < 1 || parseInt(this.guess) > 100) {
                this.message = "Please enter a number between 1 and 100";
            } else {
                if (this.guess == this.result) {
                    this.message = "You got it!";
                } else if (this.guess < this.result) {
                    this.message = "Guess higher";
                } else {
                    this.message = "Guess lower";
                }
            }
        },
        giveUp() {
            this.message = "The number was: " + this.result;
        },
        startOver() {
            this.message = "Start Guessing";
            this.result = this.newNumber();
            this.guess = "";
        },
        newNumber() {
            return Math.floor(Math.random() * 100) + 1;
        },
    },
}).mount("#app");
