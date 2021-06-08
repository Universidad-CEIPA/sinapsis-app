define([
    "text!./profile.html",
    "components/ui-modal",
    "./components/alert",
    "./components/graph-svg",
], (html, UiModal, alert, graphSvg) => {

    return {
        template: html,
        props: ["course"],
        data() {
            return {
                modal: false,
            };
        },
        methods:{
            showInfoTool(competence){
                if(!this.course.activeTools){
                    this.course.selectTool(competence)
                    this.course.setAlert("tools")
                    this.modal = true
                }
            }
        },
        components: {
            UiModal,
            alert,
            graphSvg
        }
    };
});