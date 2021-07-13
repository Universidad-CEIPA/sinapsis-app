define([
    "text!./activity.html",
    "api",
    "local",
    "./components/activity-audio",
    "./components/activity-read",
    "./components/activity-video",
    "./components/alert"
], (html, api, local, activityAudio, activityRead, activityVideo, alert) => {

    return {
        template: html,
        props: ["content", "forceActivity", "course"],
        data() {
            return {
                optionsPanel: false,
                type: "reading",
                activity: {},
                title: "",
                chapterName: "",
                cover: null,
                startShow: 0,
                scroll: false,
                activityScrolls: [],
                selectScroll: 0,
                chapter: null,
                modal: false

            };
        },
        computed: {
            showCompetence() {
                if (this.isMap) {
                    // just show second map
                    return this.course.indexMap() === 1
                } else if (this.isHero) {
                    return true
                } else {
                    return false
                }
            },
            itemsShow() {
                return this.activityScrolls.slice(this.startShow, this.maxShow + this.startShow)
            },
            maxShow() {
                return 4
            },
            typeComponent() {
                return {
                    "reading": "activity-read",
                    "audio": "activity-audio",
                    "video": "activity-video"
                }[this.type];
            },
            isMap() {
                return this.activity.type === "map"
            },
            isHero() {
                return this.activity.type === "hero-letter"
            },

        },
        methods: {
            changeActivity(index) {
                this.selectScroll = index
                this.activity = this.chapter.activities[index]
            },
            async completedActivity() {
                await api.post('students/studentCourseActivity', {
                    student: this.course.studentId,
                    activity: this.activity.activity.id,
                    status: "completed"
                })

                let questions = []
                if (!this.isMap && !this.isHero) {
                    this.chapter.activities.map((a) => {
                        if (a.id === this.activity.id) {
                            a.completed[0] = "completed"
                        }
                    })

                    this.course.updateChapters(this.chapter);

                    questions = this.activity.activity.questions || []

                } else {

                    let tempAct = this.activity
                    tempAct.completed[0] = "completed"
                    this.course.updateActivity(tempAct);
                    if (this.isMap) {
                        questions = this.activity.project_activities.questions
                    }
                    if (this.isHero) {
                        questions = this.activity.activity.questions || []
                    }
                }

                if (questions.length) {
                    local("questions", questions)
                    this.course.setAlert("startQuestions")
                    this.$router.push({ name: 'story:evaluation' })
                } else if (this.activity.type === "map") {
                    this.$router.replace({ name: 'story:map' })
                } else {
                    this.$router.replace({ name: 'story:home' })
                }
            },
            goDown() {
                document.getElementById("activity").scrollIntoView({ behavior: "smooth" });
            },
            nextSlider() {
                let nextStart = this.startShow + 1;

                let lengthSpace = nextStart + this.maxShow

                if (lengthSpace <= this.activityScrolls.length) {
                    this.startShow = nextStart
                }
            },
            previousSlider() {
                let previousStart = this.startShow - 1;

                if (previousStart >= 0) {
                    this.startShow = previousStart
                }
            },
            viewBack() {
                if (this.activity.type === "map") {
                    this.$router.replace({ name: 'story:map' })
                } else {
                    this.$router.replace({ name: 'story:home' })
                }
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
                        if (nextStart >= 0 && nextStart + this.maxShow <= this.activityScrolls.length) {
                            this.dragShow = nextStart
                        }
                    }
                }
            },
            handlePointerUp(e) {
                if (e.changedTouches) e = e.changedTouches[0];
                if (Math.abs(this._pointerStart.clientX - e.clientX) > 5 && this.dragShow >= 0 && this.dragShow + this.maxShow <= this.activityScrolls.length && this.dragShow !== null) {
                    this.startShow = this.dragShow
                }
                this._lastDelta = 0;
                this.dragShow = null;
            }

        },
        created() {
            if (this.content) {
                this.chapter = JSON.parse(this.content)


                let exceptions = [
                    'map',
                    'hero-letter'
                ]


                if (!exceptions.includes(this.chapter.type)) {
                    this.title = this.chapter.title
                    this.scroll = this.chapter.scroll
                    this.chapterName = this.chapter.name


                    if (this.chapter.scroll) {
                        let position = 0
                        this.chapter.activities.map((a) => {
                            let activityName = {}
                            activityName.id = a.activity.id
                            activityName.name = a.activity.name
                            activityName.position = position
                            activityName.img = a.activity.imagen || "modules/story/images/default-scroll.svg"
                            activityName.completed = a.completed[0] === "completed"
                            position++
                            this.activityScrolls.push(activityName)
                        })
                        if (!this.forceActivity) {
                            let activityPending = this.chapter.activities.filter(a => a.completed[0] !== "completed")

                            if (activityPending.length) {
                                this.activity = activityPending[0]
                                this.selectScroll = this.activityScrolls.findIndex(a => a.id === this.activity.activity.id)
                            } else {
                                this.activity = this.chapter.activities[this.chapter.activities.length - 1]
                                this.selectScroll = this.chapter.activities.length - 1
                            }
                        } else {
                            this.activity = this.chapter.activities.find(a => a.id == this.forceActivity)
                            this.selectScroll = this.activityScrolls.findIndex(a => a.id === this.activity.activity.id)
                        }


                    } else if (this.forceActivity) {
                        this.activity = this.chapter.activities.find(a => a.id == this.forceActivity)
                    } else {
                        let activityPending = this.chapter.activities.filter(a => a.completed[0] !== "completed")

                        if (activityPending.length) {
                            this.activity = activityPending[0]
                        } else {
                            this.activity = this.chapter.activities[this.chapter.activities.length - 1]
                        }
                    }

                    this.type = this.activity.activity.type


                } else if (this.chapter.type === 'hero-letter') {
                    this.activity = this.chapter
                } else {
                    this.cover = this.chapter.cover
                    this.activity = this.chapter
                    this.activity.activity = this.activity.project_activities
                    delete this.activity.project_activities
                }


                if (this.course.castDate(this.activity.date, this.activity.time) > new Date()) {
                    this.course.setAlert("activityDisable")
                    this.$router.replace({ name: "story:home" })
                }
            } else {
                this.$router.replace({ name: "story:home" })
            }
        },
        mounted() {
            if (document.getElementById("story-activity-view")){
                document.getElementById("story-activity-view").scrollIntoView({ behavior: "smooth" });
            }

            if (this.chapter.type === 'hero-letter') {
                this.course.setAlert("hero-letter")
                this.modal = true
            }
        },
        components: {
            activityAudio,
            activityRead,
            activityVideo,
            alert
        },
    };
});