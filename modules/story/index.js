define([
    "text!./index.html",
    "local",
    "components/ui-modal",
    "./components/alert"
], (html, local, UiModal, alert) => {

    return {
        template: html,
        props: {
            course: {
                required: true
            },
            redirect: {
                type: Boolean,
                default: false
            },
            tiny: {
                type: Boolean,
                default: false
            }
        },
        data() {
            widthChapter = 160;
            return {
                startShow: 0,
                progressShow: 0,
                completedShow: 0,
                modal: false,
                widthChapter,
                filterActivities: 'progress',
                maxShow: 0,
                chaptersShow: 0,
                chapters: [],
                activityCompleted: [],
                activityPending: [],
                tinyAlert: false
            };
        },
        components: {
            UiModal,
            alert
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

                    return "hace " + diff_in_days + " días"
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
            setName(act) {
                return act.activity ? act.activity.name : act.map.name
            },
            updateLayout() {
                let spaceAvailable = Math.floor((window.screen.width - 40) / this.widthChapter)
                this.course.memoryShow(this.startShow)
                if (spaceAvailable > this.chapters.length) {
                    this.maxShow = this.chapters.length
                } else {
                    this.maxShow = spaceAvailable
                }

                this.chaptersShow = this.chapters.slice(this.startShow, this.maxShow + this.startShow)
            },
            handlePointerDown(e) {
                if (e.changedTouches) e = e.changedTouches[0];
                this._pointerStart = e;
                this._lastDelta = 0;
            },
            handlePointerMove(e) {
                if (e.changedTouches) e = e.changedTouches[0];
                if (this._lastDelta || Math.abs(this._pointerStart.clientX - e.clientX) > 5) {
                    this.dragX = Math.round(e.clientX - this._pointerStart.clientX);

                    let delta = this.dragX < 0 ? 1 : -1;

                    if (delta !== this._lastDelta) {
                        this._lastDelta = delta;

                        let nextStart = this.startShow + delta
                        if (nextStart >= 0 && nextStart + this.maxShow <= this.chapters.length) {
                            this.dragShow = nextStart
                        }
                    }
                }
            },
            handlePointerUp(e) {
                if (e.changedTouches) e = e.changedTouches[0];
                if (Math.abs(this._pointerStart.clientX - e.clientX) > 5 && this.dragShow >= 0 && this.dragShow + this.maxShow <= this.chapters.length && this.dragShow !== null) {
                    this.startShow = this.dragShow
                    this.updateLayout();
                }
                this._lastDelta = 0;
                this.dragShow = null;
            },




            handlePointerDownProgress(e) {
                if (e.changedTouches) e = e.changedTouches[0];
                this._pointerStart = e;
                this._lastDelta = 0;
            },
            handlePointerMoveProgress(e) {
                if (e.changedTouches) e = e.changedTouches[0];
                if (this._lastDelta || Math.abs(this._pointerStart.clientX - e.clientX) > 5) {
                    this.dragX = Math.round(e.clientX - this._pointerStart.clientX);

                    let delta = this.dragX < 0 ? 1 : -1;

                    if (delta !== this._lastDelta) {
                        this._lastDelta = delta;

                        let nextStart = this.progressShow + delta
                        if (nextStart >= 0 && nextStart + 1 <= this.activityPending.length) {
                            this.dragShow = nextStart
                        }
                    }
                }
            },
            handlePointerUpProgress(e) {
                if (e.changedTouches) e = e.changedTouches[0];
                if (Math.abs(this._pointerStart.clientX - e.clientX) > 5 && this.dragShow >= 0 && this.dragShow + 1 <= this.activityPending.length && this.dragShow !== null) {
                    this.progressShow = this.dragShow
                }
                this._lastDelta = 0;
                this.dragShow = null;
            },





            handlePointerDownCompleted(e) {
                if (e.changedTouches) e = e.changedTouches[0];
                this._pointerStart = e;
                this._lastDelta = 0;
            },
            handlePointerMoveCompleted(e) {
                if (e.changedTouches) e = e.changedTouches[0];
                if (this._lastDelta || Math.abs(this._pointerStart.clientX - e.clientX) > 5) {
                    this.dragX = Math.round(e.clientX - this._pointerStart.clientX);

                    let delta = this.dragX < 0 ? 1 : -1;

                    if (delta !== this._lastDelta) {
                        this._lastDelta = delta;

                        let nextStart = this.completedShow + delta
                        if (nextStart >= 0 && nextStart + 1 <= this.activityCompleted.length) {
                            this.dragShow = nextStart
                        }
                    }
                }
            },
            handlePointerUpCompleted(e) {
                if (e.changedTouches) e = e.changedTouches[0];
                if (Math.abs(this._pointerStart.clientX - e.clientX) > 5 && this.dragShow >= 0 && this.dragShow + 1 <= this.activityCompleted.length && this.dragShow !== null) {
                    this.completedShow = this.dragShow
                }
                this._lastDelta = 0;
                this.dragShow = null;
            }
        },
        created() {
            if (this.redirect) {
                this.$router.replace({ name: "story:profile" })
            } else {

                this.course.chapters.forEach((program, index) => {
                    program.title = "Capítulo " + (index + 1)
                    program.chapterNumber = index + 1
                    this.chapters.push(program)
                })


                if (this.course.getAlert()) {
                    if (this.course.getAlert() === "finishCourse") {
                        let finishTime = local("finishCourse") || []
                        finishTime.push(this.course.courseId)
                        local("finishCourse", finishTime)
                    }
                    this.modal = true


                } else if (!local("firtsTime") || !local("firtsTime").includes(this.course.courseId)) {
                    let firstTime = local("firtsTime") || []
                    this.course.setAlert("startCourse")
                    firstTime.push(this.course.courseId)
                    local("firtsTime", firstTime)
                    this.modal = true
                }

                [this.activityCompleted, this.activityPending] = this.course.activitiesTracking()
                this.startShow = this.course.memory
                this.updateLayout();
            }




        },
        mounted() {
            window.addEventListener("resize", this._resizeHandler = e => {
                this.updateLayout();
            });
            this.updateLayout();




            if (this.tiny) {
                this.tinyAlert = true
            }
        },
        beforeDestroy() {
            window.removeEventListener("resize", this._resizeHandler);
        }
    };
});