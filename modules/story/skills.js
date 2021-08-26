define([
    "text!./skills.html",
    "api",
    "components/ui-input",
    "dayjs",
    "./components/graph-svg"
], (html, api, UiInput, dayjs, graphSvg) => {

    return {
        template: html,
        props: ["course"],
        data() {
            return {
                history: [],
                dates: [],
                position: 0,
                filter: {
                    auto: true,
                    desired: true,
                    current: true
                },
            }
        },
        computed: {
            
        },
        methods: {
            dataSets() {
                let [initialValue, improvementDesired, currentvalue] = this.course.graphDataSets()

                if (this.dates.length !== this.position + 1) {
                    let diff = this.dates.length - this.position - 1
                    let initialPosition = this.dates.length - 2
                    while (diff > 0) {
                        this.history
                            .filter(h => h.date === this.dates[initialPosition])
                            .map(c => { currentvalue[c.index] = { value: c.value } })
                        initialPosition--
                        diff--
                    }
                }

                let fil = []

                this.filter.auto ? fil.push(initialValue) : false
                this.filter.desired ? fil.push(improvementDesired) : false
                this.filter.current ? fil.push(currentvalue) : false

                return fil
            },
            colors() {
                let [initialValue, improvementDesired, currentvalue] = this.course.graphColors()

                let fil = []

                this.filter.auto ? fil.push(initialValue) : false
                this.filter.desired ? fil.push(improvementDesired) : false
                this.filter.current ? fil.push(currentvalue) : false

                return fil
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
        },
        async mounted() {
            await api.post('students/getHistoryCompetences', { courseId: this.course.courseId, studentId: this.course.studentId }).then(result => {
                result.map((c, index) => {
                    c.history.map((h) => {
                        let date = dayjs(h.created).format("YYYYMMDD")
                        if (!this.dates.includes(date))
                            this.dates.push(date)
                        this.history.push({ value: h.value, date, index })
                    })
                })
                this.dates.push("Actual")

                this.updateGraph()
            })
            this.position = this.dates.length - 1
        },
        beforeDestroy() {
            this.$refs.graph.destroy()
        },
        components: {
            UiInput,
            graphSvg
        }
    };
});