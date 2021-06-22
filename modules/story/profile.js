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
                if(this.course.activeTools){
                    this.course.selectTool(competence)
                    this.course.setAlert("tools")
                    this.modal = true
                }
            },
            getCoverTool(competence){
                if(competence.rubric && competence.rubric.length){
                    return competence.rubric[0]?.media?.url ??'modules/story/images/default-tool.png'
                }else {
                    return 'modules/story/images/default-tool.png'
                }
            }
        },
        beforeDestroy() {
            this.$refs.graph.destroy()
        },
        components: {
            UiModal,
            alert,
            graphSvg
        }
    };
});