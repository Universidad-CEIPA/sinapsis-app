define([
    "text!./welcome-course.html",
    "api",
    "local"
], (html, api, local) => {

    return {
        template: html,
        data() {
            return {
            };
        },
        computed:{
            course(){
                return this.$root.currentCourse
            }
        },
        methods: {   
        },
        components: {
        }
    };
});