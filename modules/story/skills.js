define([
    "text!./skills.html",
    "components/ui-input",
    "./components/graph-svg"
], (html, UiInput, graphSvg) => {

    return {
        template: html,
        data() {
            return {
            };
        },
        components: {
            UiInput,
            graphSvg
        },
        methods: {
        }
    };
});