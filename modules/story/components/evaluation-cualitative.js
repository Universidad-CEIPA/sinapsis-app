define([
    "text!./evaluation-cualitative.html",
    "components/ui-form",
    "components/ui-input",
], (html, UiForm, UiInput) => {

    return {
        template: html,
        props: ['questions'],
        data() {
            return {
                answers: []
            };
        },
        methods: {
        },

        mounted() {
            this.answers = this.questions
            Object.entries(this.answers).forEach(([key, question]) => {
                question.answer = ""
            });
        },
        components: {
            UiForm,
            UiInput
        },
    };
});