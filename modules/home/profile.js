define([
    "text!./profile.html",
    "components/ui-form",
    "components/ui-input",
    "local"
], (html, UiForm, UiInput, local) => {

    return {
        template: html,
        props:["course"],
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
                this.$root.processUser(result);
                if (this.course) {
                    this.$router.replace({ name: "story:profile" });
                } else {
                    this.$router.replace({ name: "home" });
                }
            },
            habeasData(){
                window.open("https://ceipa.edu.co/politicas-de-privacidad-y-habeas-data?_gl=1*1s26xlw*_ga*MTYyNjI4MzEzMi4xNjIzNzg4NzE2*_ga_KPMW4DLCY2*MTYyMzc4ODcxNS4xLjEuMTYyMzc4ODc3MC4w","_blank")
                
            }
        },
        components: {
            UiForm,
            UiInput
        }
    };
});