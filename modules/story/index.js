define([
    "text!./index.html",
    "local"
], (html, local) => {

    return {
        template: html,
        data() {
            widthChapter = 160;
            return {
                story: this.$root.currentCourse,
                startShow: 0,
                widthChapter,
                filterActivities: 'progress',
                chapters:
                    [{
                        name: "Capítulo 1",
                        advance: "1",
                        total: "5",
                        text: "La historia de los siete Sabios Portocalenses"
                    },
                    {
                        name: "Capítulo 2",
                        advance: "2",
                        total: "3",
                        text: "La profecía se cumple"
                    },
                    {
                        name: "Capítulo 3",
                        advance: "1",
                        total: "5",
                        text: "La historia de los siete Sabios Portocalenses"
                    }]

            };
        },
        computed: {
            maxShow() {
                let spaceAvailable = Math.floor((window.screen.width - 40) / this.widthChapter)

                if (spaceAvailable > this.chapters.length) {
                    return this.chapters.length
                } else {
                    return spaceAvailable
                }
            }
        },
        created() {
        },
        components: {
        },
        methods: {
        },
        watch:{

        }
    };
});