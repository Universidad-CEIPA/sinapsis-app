define([
    "text!./welcome-course.html",
    "logic/ActivityNotifications"
], (html, ActivityNotifications) => {

    return {
        template: html,
        props: ["course"],
        methods:{
            async forceNotifications(){
                let router = this.$router
                await ActivityNotifications.get().then(n => {
                    n.forceReset(router)
                });
            }
        },
        async created(){
            let router = this.$router
            await ActivityNotifications.get().then(n => {
                n.reset(router)
            });
        }
    };
});