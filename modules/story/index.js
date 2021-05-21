define([
    "text!./index.html",
    "components/ui-modal",
    "./components/alert",
    "./components/tour",
    "./components/finish-modal",
], (html, UiModal, alert, tour, finishModal) => {

    return {
        template: html,
        props: {
            chapterModal: {
                type: Boolean
            },
        },
        data() {
            widthChapter = 160;
            return {
                story: this.$root.currentCourse,
                startShow: 0,
                modal: false,
                tour: false,
                finished: false,
                widthChapter,
                filterActivities: 'progress',
                maxShow: 0,
                chaptersShow: 0,
                chapters: []

            };
        },
        computed: {

        },
        components: {
            UiModal,
            alert,
            tour,
            finishModal
        },
        methods: {
            advance(activities) {
                return activities.filter(a => a.completed).length
            },
            nextSlider() {
                let nextStart = this.startShow + 1;
                let lengthSpace = nextStart + this.maxShow

                if (lengthSpace <= this.chapters.length) {
                    this.startShow = nextStart
                }
                this.updateLayout();
            },
            openActivity(c) {
                this.$router.push({ name: 'story:activity', params: { content: JSON.stringify(c) } })
            },
            previousSlider() {
                let previousStart = this.startShow - 1;

                if (previousStart >= 0) {
                    this.startShow = previousStart
                }
                this.updateLayout();
            },
            updateLayout() {
                let spaceAvailable = Math.floor((window.screen.width - 40) / this.widthChapter)
                if (spaceAvailable > this.chapters.length) {
                    this.maxShow = this.chapters.length
                } else {
                    this.maxShow = spaceAvailable
                }

                this.chaptersShow = this.chapters.slice(this.startShow, this.maxShow + this.startShow)
            }
        },
        created() {
            this.story.schedule.forEach((program, index) => {
                program.title = "Capítulo " + (index + 1)
                this.chapters.push(program)
            })
            //this.chapters = this.$root.chapters


            if (this.chapterModal) {
                this.modal = true
            }

            this.updateLayout();

        },
        mounted() {
            window.addEventListener("resize", this._resizeHandler = e => {
                this.updateLayout();
            });
            this.updateLayout();
        },
        beforeDestroy() {
            window.removeEventListener("resize", this._resizeHandler);
        }
    };
});