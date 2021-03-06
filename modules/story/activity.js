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
            widthScroll = 85;
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
                modal: false,

                widthScroll,
                animation: 20,
                limitAnimation: {
                    start: 0,
                    finish: 0
                }

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
            typeComponent() {
                return {
                    "reading": "activity-read",
                    "outdoor": "activity-read",
                    "indoor": "activity-read",
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
                this.updateScroll()
            },
            async completedActivity() {
                let result = await api.post('students/studentCourseActivity', {
                    student: this.course.studentId,
                    activity: this.activity.activity.id,
                    courseId: this.course.courseId,
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
                        this.activity.activity = this.activity.project_activities
                        questions = this.activity.project_activities.questions
                    }
                    if (this.isHero) {
                        questions = this.activity.activity.questions || []
                    }
                }

                if (questions.length) {
                    local("questions", questions)
                    this.course.setAlert("startQuestions");
                    this.$router.push({ name: 'story:evaluation', params: { 'type': this.activity.type} })
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
            },
            updateScroll() {
                let maxScroll = this.widthScroll * this.activityScrolls.length
                this.limitAnimation.finish = -(maxScroll) + window.screen.width

                if (window.screen.width > maxScroll) {
                    this.limitAnimation.finish = 0
                }

                if (this.selectScroll) {
                    let next = -(this.widthScroll * this.selectScroll)

                    while (next < this.limitAnimation.finish) {
                        next = next + 10
                    }
                    this.animation = next
                }
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

            if (this.chapter.scroll) {
                window.addEventListener("resize", this._resizeHandler = e => {
                    this.updateScroll();
                });
                this.updateScroll();
            }

            if (document.getElementById("story-activity-view")) {
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