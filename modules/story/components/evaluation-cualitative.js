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
        mounted() {
            this.answers = this.questions
            this.answers.answer = ""
            /*Object.entries(this.answers).forEach(([key, question]) => {
                question.answer = ""
            });*/
        },
        components: {
            UiForm,
            UiInput
        },
    };
});