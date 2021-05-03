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
                    { id: 'CC', name: 'CC' },
                    { id: 'CE', name: 'CE' },
                    { id: 'TI', name: 'TI' }
                ]
            };
        },
        methods: {
            success(result, data) {
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