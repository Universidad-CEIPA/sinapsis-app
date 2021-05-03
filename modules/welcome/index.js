define([
    "text!./index.html",
    "api"
], (html, api) => {

    return {
        template: html,
        props: ["token"],
        data() {
            return {
            };
        },
        methods: {
            loginToken() {
                api.post("students/loginToken", { token: this.token })
                    .then(result => {
                        this.$root.processUser(result);
                        this.$router.replace({ name: "welcome:setup" })
                    }).catch(err => {
                        this.$router.replace({ name: "welcome:login" })
                    });
            }
        },
        created() {
            this.loginToken();
        },
        components: {
        },

    };
});