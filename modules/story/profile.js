define([
    "text!./profile.html",
    "components/ui-modal",
    "./components/alert",
    "./components/graph-svg",
], (html, UiModal, alert, graphSvg) => {

    return {
        template: html,
        props:["course"],
        data() {
            return {
                modal: false,
            };
        },
        components: {
            UiModal,
            alert,
            graphSvg
        }
    };
});