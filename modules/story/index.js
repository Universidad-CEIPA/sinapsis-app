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
                modal: false,
                widthChapter,
                filterActivities: 'progress',
                chapters: [],
                activityCompleted: [],
                activityPending: [],
                tinyAlert: false,

                animation: 20,
                limitAnimation: {
                    start: 20,
                    finish: 0
                }
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
            afterChaptersCompleted(chapterIndex) {
                let next = true

                for (let index = 0; index < chapterIndex; index++) {
                    if (!this.course.isCompletedChapter(this.chapters[index]))
                        next = false;
                }

                return next
            },
            disableTime(chapter) {
                let schedule = chapter.activities.length ? chapter.activities : chapter.maps

                let today = new Date();

                if (Array.isArray(schedule)) {

                    let dates = []

                    schedule.map(act => {
                        dates.push(this.course.castDate(act.date, act.time))
                    })

                    dates.sort((a, b) => new Date(a).getTime() > new Date(b).getTime())
                    return dates[0] > today
                } else {
                    let date = this.course.castDate(schedule.date, schedule.time)
                    return date > today
                }


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
            openActivity(c) {
                if (!this.disableTime(c)) {
                    if (this.afterChaptersCompleted(c.chapterNumber - 1)) {
                        if (this.course.chapterActiveMap.includes(c.chapterNumber)) {
                            this.course.activeMap = true
                            this.course.setAlert("showCities")
                            this.modal = true

                            this.course.currentChapter = c
                        } else {
                            this.$router.push({ name: 'story:activity', params: { content: JSON.stringify(c) } })
                        }
                    } else {
                        this.course.setAlert("chaptersPending")
                        this.modal = true
                    }

                }
            },
            openActivityList(content) {
                if (content.activity) {
                    let chapterID = this.course.getChapterByActivity(content.activity.id)

                    if (chapterID) {
                        let chapter = this.chapters.find(c => c.chapterNumber === chapterID)
                        this.$router.push({ name: 'story:activity', params: { content: JSON.stringify(chapter), forceActivity: content.id } })
                    } else {
                        content.type = "hero-letter"
                        this.$router.push({ name: 'story:activity', params: { content: JSON.stringify(content) } })
                    }

                } else {
                    let chapterID = this.course.getChapterByMap(content.map.id)
                    let chapter = this.chapters.find(c => c.chapterNumber === chapterID)
                    this.$router.push({ name: 'story:map', params: { content: JSON.stringify(chapter) } })
                }

            },
            setName(act) {
                return act.activity ? act.activity.name : act.map.name
            },
            setImage(act) {
                return act.activity ? act.activity.type : "map"
            },
            updateLayout() {

                this.limitAnimation.finish = -(this.widthChapter * this.chapters.length + this.chapters.length * 20) + window.screen.width


                let completedChapters = -1

                this.course.chapters.map((chapter, index) => {
                    if (!this.course.isCompletedChapter(chapter) && completedChapters < 0) { completedChapters = index; }
                })

                if (completedChapters > 0) {
                    let next = -(this.widthChapter * completedChapters + (completedChapters - 1) * 20)

                    while (next < this.limitAnimation.finish) {
                        next = next + 10
                    }
                    this.animation = next
                }



                let [_, pending] = this.course.activitiesTracking(false)
                let finishArray = local("finishCourse") || []
                if (pending.length === 0 && !(finishArray.length > 0 || finishArray.includes(this.courseId))) {
                    this.course.setAlert("finishCourse")
                    this.modal = true
                }


            },
            handlePointerDown(e) {
                if (e.changedTouches) e = e.changedTouches[0];
                this._pointerStart = e.clientX;
            },
            handlePointerMove(e) {
                if (e.changedTouches) e = e.changedTouches[0];
                if (Math.abs(this._pointerStart - e.clientX) > 1) {
                    this.dragX = Math.round(e.clientX - this._pointerStart);
                    this._pointerStart = e.clientX

                    let next = this.animation + this.dragX

                    if (next <= this.limitAnimation.start && next >= this.limitAnimation.finish) {
                        this.animation = next
                    }

                }
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
                this.updateLayout();
            }




        },
        mounted() {
            window.addEventListener("resize", this._resizeHandler = e => {
                this.updateLayout();
            });
            this.updateLayout();
            document.getElementById("story-home-view").scrollIntoView({ behavior: "smooth" });

            if (this.tiny) {
                this.tinyAlert = true
            }
        },
        beforeDestroy() {
            window.removeEventListener("resize", this._resizeHandler);
        }
    };
});