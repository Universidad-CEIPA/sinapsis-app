define([
    "text!./profile.html",
    "local"
], (html, local) => {

    return {
        template: html,
        data() {
            return {
                story: this.$root.currentStory
            };
        },
        methods: {
        },
        components: {
        },
        methods: {
        }
    };
});