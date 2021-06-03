define([
    "text!./index.html",
    "local",
    "components/ui-modal",
    "./components/alert",
    "./components/finish-modal",
], (html, local, UiModal, alert, finishModal) => {

    return {
        template: html,
        props: {
            course: {
                required: true
            },
            redirect: {
                type: Boolean,
                default: false
            }
        },
        data() {
            widthChapter = 160;
            return {
                startShow: 0,
                modal: false,
                finished: false,
                widthChapter,
                filterActivities: 'progress',
                maxShow: 0,
                chaptersShow: 0,
                chapters: [],
                activityCompleted: [],
                activityPending: [],

            };
        },
        components: {
            UiModal,
            alert,
            finishModal
        },
        methods: {
            advanceCompleted(chapter) {
                let activities = chapter.activities.length ? chapter.activities : chapter.maps.map.locations
                return activities.filter(a => a.completed[0] === "completed").length + "/" + activities.length
            },
            advancePercent(chapter) {
                let activities = chapter.activities.length ? chapter.activities : chapter.maps.map.locations
                return (activities.filter(a => a.completed[0] === "completed").length * 100) / activities.length
            },

            dateAgo(activity) {
                let date = new Date(activity.date)
                let time = new Date(activity.time)

                date.setHours(time.getHours())
                date.setMinutes(time.getMinutes());
                date.setSeconds(0);

                let diff = new Date() - date

                let day_as_milliseconds = 86400000;
                if (Math.abs(diff) < day_as_milliseconds) {
                    return "hoy"
                } else {
                    diff_in_days = Math.trunc(diff / day_as_milliseconds);

                    return "hace " + diff_in_days +" días"
                }

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

                if (this.course.chapterActiveMap.includes(c.chapterNumber)) {
                    this.course.activeMap = true
                    this.course.setAlert("showCities")
                    this.modal = true

                    this.course.currentChapter = c
                } else {
                    this.$router.push({ name: 'story:activity', params: { content: JSON.stringify(c) } })
                }

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
            if (this.redirect) {
                this.$router.replace({ name: "story:profile" })
            } else {

                this.course.schedule.forEach((program, index) => {
                    program.title = "Capítulo " + (index + 1)
                    program.chapterNumber = index + 1
                    this.chapters.push(program)
                })

                if (this.course.getAlert()) {
                    this.modal = true
                } else if (!local("firtsTime") || !local("firtsTime").includes(this.course.courseId)) {
                    let firstTime = local("firtsTime") || []
                    this.course.setAlert("startCourse")
                    firstTime.push(this.course.courseId)
                    local("firtsTime", firstTime)
                    this.modal = true
                }

                [this.activityCompleted, this.activityPending] = this.course.activitiesTracking()

                this.updateLayout();
            }




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