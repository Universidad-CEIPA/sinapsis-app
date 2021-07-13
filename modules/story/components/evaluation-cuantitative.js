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
                answers: {
                    courseId: this.$root.currentCourse.courseId,
                    studentId: this.$root.currentCourse.studentId,
                    questionId: null,
                    evaluation: 0,
                    type: null,
                    title: null
                },
            }
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
            async success(result, data) {
                this.$emit('next')
            },
            reset() {
                this.answers.courseId = this.$root.currentCourse.courseId
                this.answers.studentId = this.$root.currentCourse.studentId
                this.answers.evaluation = 0
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
        }
    }
});