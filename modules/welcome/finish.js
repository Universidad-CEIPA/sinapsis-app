define([
    "text!./finish.html",
    "components/ui-form",
    "components/ui-input",
    "api",
    "local"
], (html, UiForm, UiInput, api, local) => {

    return {
        template: html,
        data() {
            return {
                user: local('user'),
                username: local('user').name,
                options: [
                    {id:'CC' , name:'CC'},
                    {id:'CE' , name:'CE'},
                    {id:'TI' , name:'TI'}
                ]
            };
        },
        created() {
        },
        methods: {
            updateUser() {
                // api.post('students/:id',this.user)
                // this.$root.processUser(this.user);
                this.$router.replace({ name: "home" });
            }
        },
        components: {
            UiForm,
            UiInput
        }
    };
});