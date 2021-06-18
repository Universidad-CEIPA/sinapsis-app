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
                position: 0
            }
        },
        computed: {
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

                return [
                    initialValue,
                    improvementDesired,
                    currentvalue
                ]
            }
        },
        methods: {
            updateGraph() {
                this.$refs.graph.reset();
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