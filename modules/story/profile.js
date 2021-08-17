define([
    "text!./profile.html",
    "components/ui-modal",
    "./components/alert",
    "./components/graph-svg",
    "api"
], (html, UiModal, alert, graphSvg, api) => {

    return {
        template: html,
        props: ["course"],
        data() {
            return {
                modal: false,
                filter: {
                    auto: true,
                    desired: true,
                    current: true
                },
                videos: []
            };
        },
        computed: {
            colors() {
                let [initialValue, improvementDesired, currentvalue] = this.course.graphColors()

                let fil = []

                this.filter.auto ? fil.push(initialValue): false
                this.filter.desired ? fil.push(improvementDesired) : false
                this.filter.current ? fil.push(currentvalue) : false

                return fil
            },
            dataSets() {
                let [initialValue, improvementDesired, currentvalue] = this.course.graphDataSets()

                let fil = []

                this.filter.auto ? fil.push(initialValue) : false
                this.filter.desired ? fil.push(improvementDesired) : false
                this.filter.current ? fil.push(currentvalue) : false

                return fil
            },

        },
        methods: {
            showInfoTool(competence) {
                if (this.course.activeTools) {
                    this.course.selectTool(competence)
                    this.course.setAlert("tools")
                    this.modal = true
                }
            },
            getCoverTool(competence) {
                if (competence.rubric && competence.rubric.length) {
                    return competence.rubric[0]?.media?.url ?? `modules/story/images/${this.course.skin}/default-tool.png`
                } else {
                    return `modules/story/images/default-tool.png`
                }
            },
            updateGraph() {
                this.$refs.graph.reset();
            },
            filterGraph(filter) {
                this.filter[filter] = !this.filter[filter]
                this.$nextTick(() => {
                    this.updateGraph();
                });
            }
        },
        async created() {
            this.videos = await this.course.getBinnacle()
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