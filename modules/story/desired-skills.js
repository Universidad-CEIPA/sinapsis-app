define([
    "text!./desired-skills.html",
    "components/ui-form",
    "components/ui-input",
], (html, UiForm, UiInput) => {

    return {
        template: html,
        data() {
            return {
                skills: [
                    { name: "Autosuficiencia", value: 40 },
                    { name: "Dirección de equipo", value: 60 },
                    { name: "Orientación al logro", value: 15 },
                    { name: "Competitividad", value: 42 },
                    { name: "Comunicación efectiva", value: 50 },
                    { name: "Inteligencia Social", value: 50 },
                    { name: "Manejo Emocional", value: 60 },
                    { name: "Innovación y creación", value: 20 }
                ]
            };
        },
        methods: {
            calculateLeft(value, event) {
                var elInput = document.querySelector('#' + event.target.id);
                var w = parseInt(window.getComputedStyle(elInput, null).getPropertyValue('width'));
                var prop = parseInt(window.getComputedStyle(document.documentElement)
                    .getPropertyValue('--input-height').slice(0, -2));
                var pxls = (w - prop) / 100;
                var etq = elInput.nextElementSibling;

                etq.style.left = (Math.floor(value * pxls) + 2) + "px";
            },
        },
        mounted(){
            var inputs = document.querySelectorAll('.input-field')

            inputs.forEach(function(input){
                input.click()
            })
        },
        components: {
            UiForm,
            UiInput
        }
    }
});