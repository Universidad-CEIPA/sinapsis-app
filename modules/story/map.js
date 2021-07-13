define([
    "text!./map.html",
    "local",
    "./components/alert",
], (html, local, alert) => {

    return {
        template: html,
        props: ["content", "course"],
        data() {
            return {
                locations: [],
                finalDistribution: [],
                sizeWidth: 0,
                sizeHeight: 0,
                chapter: null,
                modal: false
            };
        },
        computed: {
            classes() {
                return "map-" + (this.course.indexMap() + 1)
            }
        },
        methods: {

            calculateDistribute() {
                let distribute = [1]

                let acumulate = 1
                let length = this.locations.length
                let position = 1

                while (acumulate < length) {
                    let next = 2
                    let nextAcumulate = acumulate + next
                    let lastData = distribute[position - 1]

                    if (nextAcumulate <= length && lastData != next) {
                        distribute.push(next);
                        acumulate = nextAcumulate
                        position++
                    } else {
                        next = 1
                        nextAcumulate = acumulate + next
                        if (nextAcumulate <= length && lastData != next) {
                            distribute.push(next);
                            acumulate = nextAcumulate
                            position++
                        } else if (nextAcumulate <= length && next === 1) {
                            distribute[position - 1] = lastData + next
                            acumulate = nextAcumulate
                            position++
                        } else {
                            distribute.push(next);
                            acumulate = nextAcumulate
                            position++
                        }
                    }
                }
                distribute = distribute.reverse()

                let start = 0
                let side = 1
                let top = 1

                distribute.forEach((value, index) => {
                    let tempContent = this.locations.slice(start, start + value)
                    let styleCSS = {}// = { "text-align": "-webkit-center", "vertical-align": "middle" }
                    styleCSS["text-align"] = "-webkit-center"
                    styleCSS["vertical-align"] = "middle"
                    styleCSS["side"] = side
                    styleCSS["top"] = top

                    if (value === 1) {
                        styleCSS["text-align"] = side > 0 ? "-webkit-right" : "-webkit-left"
                        styleCSS["side"] = side
                        styleCSS["top"] = 0

                        side = side * -1
                        tempContent[0].pos = 0

                        if (tempContent[0].end === 0) {
                            tempContent[0].style = styleCSS
                        }
                    } else {
                        tempContent[0].style = {}
                        tempContent[0].style["text-align"] = side > 0 ? "-webkit-right" : "-webkit-left"
                        tempContent[0].style["vertical-align"] = top > 0 ? "top" : "bottom"
                        tempContent[0].style["side"] = side
                        tempContent[0].style["top"] = top
                        tempContent[0].pos = 1

                        side = side * -1
                        top = top * -1
                        //tempContent[0].style = styleCSS

                        styleCSS["text-align"] = side > 0 ? "-webkit-right" : "-webkit-left"
                        styleCSS["vertical-align"] = top > 0 ? "top" : "bottom"
                        styleCSS["side"] = side
                        styleCSS["top"] = top
                        side = side * -1
                        top = top * -1
                        tempContent[1].style = styleCSS
                        tempContent[1].pos = 2
                    }

                    start = start + value

                    this.finalDistribution.push(tempContent)
                })
            },
            drawRoads() {
                var xmlns = "http://www.w3.org/2000/svg";

                var memoryPoints = []
                document.querySelector(".roads").remove()

                let canvas = document.createElementNS(xmlns, 'svg');
                canvas.setAttribute('class', 'roads')
                canvas.setAttribute('width', this.sizeWidth)
                canvas.setAttribute('height', this.sizeHeight)


                this.finalDistribution.forEach((value, index) => {

                    let heightMax = 120;
                    let positionHeight = heightMax / 2 + (heightMax * index)


                    value.forEach(function (data, key) {
                        const positionSide = data.style ? (data.style.side * 20/*(24 + ((value.length === 2) ? 5 : 0))*/) : 0;
                        const positionTop = data.style ? -(data.style.top * 10) : 0;
                        let positionWidth = (key + 1) * ((this.sizeWidth) / (value.length + 1)) + positionSide

                        if (value.length === 2) {
                            positionWidth = positionWidth + (key ? 15 : -15)
                        }

                        memoryPoints.push({ x: positionWidth, y: (positionHeight + positionTop), pos: data.pos })
                    }.bind(this));
                })

                var lines = document.createElementNS(xmlns, 'g');

                memoryPoints.forEach((value, index) => {
                    memoryPoints.slice(index, index + 4).forEach((next, key) => {
                        var line = document.createElementNS(xmlns, 'line');
                        line.setAttributeNS(null, 'stroke', "#000")
                        line.setAttributeNS(null, 'stroke-width', "20");
                        line.setAttributeNS(null, 'x1', value.x);
                        line.setAttributeNS(null, 'y1', value.y);
                        line.setAttributeNS(null, 'x2', next.x);
                        line.setAttributeNS(null, 'y2', next.y);

                        var line2 = document.createElementNS(xmlns, 'line');
                        line2.setAttributeNS(null, 'stroke', "#E1CDA8")
                        line2.setAttributeNS(null, 'stroke-width', "18");
                        line2.setAttributeNS(null, 'x1', value.x);
                        line2.setAttributeNS(null, 'y1', value.y);
                        line2.setAttributeNS(null, 'x2', next.x);
                        line2.setAttributeNS(null, 'y2', next.y);

                        if (!(value.pos === 2 && next.pos === 1)) {
                            lines.appendChild(line);
                            lines.appendChild(line2);
                        }
                    })
                })

                canvas.appendChild(lines);
                document.querySelector(".map-container").appendChild(canvas)
            },
            goBack() {
                this.course.setCurrentChapter(null)
                this.$router.replace({ name: 'story:home' })
            },
            openActivity(c) {
                c.type = "map"
                if (!c.end) {
                    this.$router.push({ name: 'story:activity', params: { content: JSON.stringify(c) } })
                } else {
                    let cities = this.locations.filter(l => l.end === 0)
                    let pending = cities.filter(a => a.completed[0] !== "completed").length === 0
                    if (pending) {
                        this.$router.push({ name: 'story:activity', params: { content: JSON.stringify(c) } })
                    }
                }
            },
            reset() {
                if (this.chapter) {
                    this.title = this.chapter.title
                    this.locations = this.chapter.maps.map.locations
                    this.course.setCurrentChapter(this.chapter.id)
                } else {
                    this.$router.replace({ name: "story:home" })
                }

            },
            updateLayout() {
                let content = document.querySelector(".map-container")

                this.sizeWidth = content.offsetWidth
                this.sizeHeight = this.finalDistribution.length * 120

                this.drawRoads();
            },

        },
        async created() {
            await this.course.setSchedule()
        },
        mounted() {

            this.chapter = this.content ? JSON.parse(this.content) : this.course.getCurrentChapter()
            this.reset()
            this.calculateDistribute();
            this.updateLayout();

            if (this.course.getAlert())
                this.modal = true

            window.addEventListener("resize", this._resizeHandler = e => {
                this.updateLayout();
            });
        },
        beforeDestroy() {
            window.removeEventListener("resize", this._resizeHandler);
        },
        components: {
            alert
        }
    };
});