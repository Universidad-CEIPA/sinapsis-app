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
                filter: 'all',
                videos: []
            };
        },
        computed: {
            colors() {
                let [initialValue, improvementDesired, currentvalue] = this.course.graphColors()

                let filter = {
                    'all': [
                        initialValue,
                        improvementDesired,
                        currentvalue
                    ],
                    'auto': [
                        initialValue
                    ],
                    'desired': [
                        improvementDesired
                    ],
                    'current': [
                        currentvalue
                    ],
                }
                return filter[this.filter]
            },
            dataSets() {
                let [initialValue, improvementDesired, currentvalue] = this.course.graphDataSets()

                let filter = {
                    'all': [
                        initialValue,
                        improvementDesired,
                        currentvalue
                    ],
                    'auto': [
                        initialValue
                    ],
                    'desired': [
                        improvementDesired
                    ],
                    'current': [
                        currentvalue
                    ],
                }

                return filter[this.filter]
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

                if (filter === this.filter) {
                    this.filter = 'all'
                } else {
                    this.filter = filter
                }
                this.$nextTick(() => {
                    this.updateGraph();
                });
            }
        },
        async created() {
            let videoList = []
            if (window.Capacitor) {
                const storage = Capacitor.Plugins.Storage;
                const videoKey = "videos_" + this.course.courseId;
                videoList = await storage.get({ key: videoKey });
            }

            this.videos = (videoList?.value) ? JSON.parse(videoList.value) : await this.course.getVideos()
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