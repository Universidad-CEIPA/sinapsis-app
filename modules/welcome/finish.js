define([
    "text!./finish.html",
    "components/ui-form",
    "components/ui-input",
    "local"
], (html, UiForm, UiInput, local) => {

    return {
        template: html,
        data() {
            return {
                user: local('user'),
                username: local('user').name,
                options: [
                    { id: 'CC', name: 'CC' },
                    { id: 'CE', name: 'CE' },
                    { id: 'TI', name: 'TI' }
                ]
            };
        },
        created() {
        },
        methods: {
            success(result, data) {
                this.$root.processUser(result);
                this.$router.replace({ name: "home" });
            }
        },
        components: {
            UiForm,
            UiInput
        }
    };
});