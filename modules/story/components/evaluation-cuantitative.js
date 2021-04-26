define([
    "text!./evaluation-cuantitative.html",
    "components/ui-form",
    "components/ui-input",
], (html, UiForm, UiInput) => {

    return {
        template: html,
        props: ["questions"],
        data() {
            return {
                answers: []
            }
        },
        computed: {

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
        mounted() {
            this.answers = this.questions
            Object.entries(this.answers).forEach(([key, question]) => {
                question.answer = 0
            });
        },
        components: {
            UiForm,
            UiInput
        }
    }
});