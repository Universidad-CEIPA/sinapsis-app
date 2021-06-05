define([
    "text!./welcome-course.html",
    "logic/ActivityNotifications"
], (html, ActivityNotifications) => {

    return {
        template: html,
        props: ["course"],
        async created(){
            let router = this.$router
            await ActivityNotifications.get().then(n => {
                n.reset(router)
            });
        }
    };
});