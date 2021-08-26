define([
    "text!./graph-svg.html",
    "radialGraph"
], (html, radialGraph) => {

    return {
        template: html,
        props:
        {
            tags: {
                required: true
            },
            values: {
                required: true
            },
            colors: {
                required: true
            },
        },
        computed: {
            
        },
        methods: {
            sizeChart() {
                var widthS = window.screen.width
                if (widthS < 370) {
                    return 250
                }

                if (widthS <= 760) {
                    return 300
                }

                if (widthS > 370) {
                    return 500
                }
            },
            init() {
                var templateSvg = document.querySelector("#graph-svg");

                var radius = this.sizeChart() / 4
                var chart = new radialGraph(radius, 100);

                chart.addTags(this.tags)

                this.values.map((dataset, index) => {
                    if (this.colors.length === this.values.length)
                        chart.addDataSet(dataset, this.colors[index])
                    else
                        chart.addDataSet(dataset, this.colors[0])
                })

                chart.addTemplate(templateSvg);

            },
            reset() {
                let element = document.querySelector(".chartGroup")
                if(element){
                    element.remove()
                    this.init()
                }
                
            },
            destroy(){
                window.removeEventListener("resize", this._resizeHandler);
            }
        },
        mounted() {
            window.addEventListener("resize", this._resizeHandler = e => {
                this.reset();
            });
            this.init();
        },
        beforeDestroy() {
            this.destroy()
        }
    };
});