define([
    "text!./skills.html",
    "components/ui-input",
    "./components/graph-svg"
], (html, UiInput, graphSvg) => {

    return {
        template: html,
        props:["course"],
        // getHistoryCompetences($courseId, $studentId)
        components: {
            UiInput,
            graphSvg
        }
    };
});