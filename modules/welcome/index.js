define([
    "text!./index.html"
], (html) => {

    return {
        template: html,
        props: ["token"],
        data() {
            return {
            };
        },
        methods: {
        },
        components: {
        },
        methods: {
            loginToken()
            {
                // let userlogin = api.post("students/loginToken", this.token);

                this.$root.processUser(this.$root.userdummy);
            }
        },
        created() {
            this.loginToken();
        }

    };
});