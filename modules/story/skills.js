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
        computed: {
        },
        components: {
            UiInput,
            graphSvg
        },
        methods: {
        }
    };
});