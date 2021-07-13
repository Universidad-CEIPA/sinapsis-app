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
                    questionId: null,
                    evaluation: "",
                    type: null,
                    title: null
                },
            };
        },
        methods: {
            async success(result, data) {
                this.$emit('next')
            },
            reset() {
                this.answers.courseId = this.$root.currentCourse.courseId
                this.answers.studentId = this.$root.currentCourse.studentId
                this.answers.evaluation = null
                this.answers.questionId = this.questions.id
                this.answers.type = this.questions.type
                this.answers.title = this.questions.content
            }
        },
        created() {
            this.reset()
        },
        watch: {
            questions() {
                this.reset()
            }
        },
        components: {
            UiForm,
            UiInput
        },
    };
});