define([
    "text!./activity.html",
    "api",
    "local",
    "./components/activity-audio",
    "./components/activity-read",
    "./components/activity-video"
], (html, api, local, activityAudio, activityRead, activityVideo) => {

    return {
        template: html,
        props: ["content", "course"],
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
                chapter: null
            };
        },
        computed: {
            showCompetence() {
                if (this.isMap) {
                    // just show second map
                    return this.course.indexMap() === 1
                } else {
                    return false
                }
            },
            header() {
                return this.activity.type !== "card"
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
                if (this.activity.type !== "map") {
                    this.chapter.activities.map((a) => {
                        if (a.id === this.activity.id) {
                            a.completed[0] = "completed"
                        }
                    })

                    await this.course.updateChapters(this.chapter);

                    questions = this.activity.activity.questions

                } else {

                    this.activity.completed[0] = "completed"
                    await this.course.updateActivity(this.activity);
                    questions = this.activity.project_activities.questions
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
                if (this.chapter.type !== "map") {
                    this.title = this.chapter.title
                    this.scroll = this.chapter.scroll
                    this.chapterName = this.chapter.name


                    if (this.chapter.scroll) {
                        let position = 0
                        this.chapter.activities.map((a) => {
                            let activityName = {}
                            activityName.name = a.activity.name
                            activityName.position = position
                            activityName.img = a.activity.imagen || "modules/story/images/Navegante.svg"
                            activityName.completed = a.completed[0] === "completed"
                            position++
                            this.activityScrolls.push(activityName)
                        })
                        this.activity = this.chapter.activities[0]
                        this.selectScroll = 0
                    } else {
                        let activityPending = this.chapter.activities.filter(a => a.completed[0] !== "completed")

                        if (activityPending.length) {
                            this.activity = activityPending[0]
                        } else {
                            this.activity = this.chapter.activities[this.chapter.activities.length - 1]
                        }
                    }

                    this.type = this.activity.activity.type
                } else {
                    this.cover = this.chapter.cover
                    this.activity = this.chapter
                    this.activity.activity = this.activity.project_activities
                    delete this.activity.project_activities
                }



            } else {
                this.$router.replace({ name: "story:home" })
            }
        },
        components: {
            activityAudio,
            activityRead,
            activityVideo
        },
    };
});