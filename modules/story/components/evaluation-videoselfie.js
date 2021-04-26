define([
    "text!./evaluation-videoselfie.html",
], (html) => {

    return {
        template: html,
        props: ['questions'],
        data() {
            return {
            };
        },
        methods: {
        },
        components: {
        },
        mounted() {
            this.answers = this.questions
            Object.entries(this.answers).forEach(([key, question]) => {
                question.answer = []
            });
        }
    };
});