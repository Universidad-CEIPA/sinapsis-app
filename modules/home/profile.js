define([
    "text!./profile.html",
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
                    { id: 'CC', name: 'Cédula de Ciudadania' },
                    { id: 'CE', name: 'Cédula de Extranjería' },
                    { id: 'TI', name: 'Tarjeta de Identidad' }
                ]
            };
        },
        methods: {
            success(result, data) {
                // this.$toDateValue()
                this.$root.processUser(result);
                if (this.$root.currentCourse) {
                    this.$router.replace({ name: "story:profile" });
                } else {
                    this.$router.replace({ name: "home" });
                }
            }
        },
        components: {
            UiForm,
            UiInput
        }
    };
});