define([
    "text!./profile.html",
    "components/ui-modal",
    "./components/alert",
    "./components/graph-svg",
], (html, UiModal, alert, graphSvg) => {

    return {
        template: html,
        data() {
            return {
                story: this.$root.currentCourse,
                modal: false,
            };
        },
        computed: {
        },
        methods: {
        },
        components: {
            UiModal,
            alert,
            graphSvg
        }
    };
});