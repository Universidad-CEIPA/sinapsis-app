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
                answers: {
                    courseId: this.$root.currentCourse.courseId,
                    studentId: this.$root.currentCourse.studentId,
                    questionId: this.questions.id,
                    evaluation: "",
                    type: this.questions.type,
                    title: this.questions.content
                },
            };
        },
        methods: {
            async success(result, data) {
                this.$emit('next')
            }
        },
        mounted() {
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