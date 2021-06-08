define([
    "text!./activity-read.html",
], (html) => {

    return {
        template: html,
        props: ['activity'],
        data() {
            return {
                fontSize: '1em'
            };
        },
        computed: {
            firstLetter() {
                return this.activity.content.charAt(0);
            },
            nextContent() {
                return this.activity.content.slice(1);
            }
        }
    };
});