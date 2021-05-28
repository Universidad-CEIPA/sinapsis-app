define([
    "text!./setup.html"
], (html) => {

    return {
        template: html,
        data() {
            return {
                WELCOME_STEP: 1,
                INSTRUCTION_STEP: 2,
                FINISH_STEP: 3,
                MAX_STEPS: 3,
                step: 1
            };
        },
        methods: {
            back() {
                switch (this.step) {
                    case this.INSTRUCTION_STEP:
                        this.step = this.WELCOME_STEP;
                        break;
                    case this.FINISH_STEP:
                        this.step = this.INSTRUCTION_STEP;
                        break;
                }
            },
            next() {
                switch (this.step) {
                    case this.WELCOME_STEP:
                        this.step = this.INSTRUCTION_STEP;
                        break;
                    case this.INSTRUCTION_STEP:
                        this.step = this.FINISH_STEP;
                        break;
                    case this.FINISH_STEP:
                        this.$router.push({ name: "home:profile" });
                        break;
                }
            }
        }
    };
});