define([
    "text!./finish.html",
], (html) => {

    return {
        template: html,
        data() {
            return {
                course: this.$root.currentCourse
            };
        },
        methods: {
        },
        components: {
        },

    };
});