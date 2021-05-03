define([
    "text!./welcome-course.html",
    "api",
    "local"
], (html, api, local) => {

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
        }
    };
});