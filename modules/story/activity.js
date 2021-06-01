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
                cover: null,
                startShow: 0,
                scroll: false,
                activityScrolls: [],
                selectScroll: 0
            };
        },
        computed: {
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
            welcome() {
                return this.activity.type === "map"
            }
        },
        methods: {
            changeActivity(index) {
                this.selectScroll = index
                let chapter = JSON.parse(this.content)
                this.activity = chapter.activities[index]
            },
            async completedActivity() {
                if (this.activity.type !== "map") {
                    let result = await api.post('students/studentCourseActivity', {
                        student: this.course.courseId,
                        activity: this.activity.id,
                        status: "completed"
                    })


                    let chapter = JSON.parse(this.content)
                    chapter.activities.map((a) => {
                        if (a.id === this.activity.id) {
                            a.completed[0] = "completed"
                        }
                    })
                    this.$root.updateChapters(chapter)

                    let activityPending = chapter.activities.filter(a => a.completed[0] !== "completed")




                    if (activityPending.length === 0) {
                        this.$router.push({ name: 'story:home', params: { chapterModal: true } })
                    } else if (!this.scroll) {
                        this.$router.replace({ name: 'story:home' })
                    }
                } else if (this.activity.activity.questions.length) {
                    local("questions", this.activity.activity.questions)
                    this.$router.push({ name: 'story:evaluation' })
                } else {
                    this.$router.replace({ name: 'story:map' })
                }


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

        },
        created() {
            if (this.content) {
                let chapter = JSON.parse(this.content)
                if (chapter.type !== "map") {
                    this.title = chapter.title
                    this.scroll = chapter.scroll

                    if (chapter.scroll) {
                        let position = 0
                        chapter.activities.map((a) => {
                            let activityName = {}
                            activityName.name = a.activity.name
                            activityName.position = position
                            activityName.img = a.activity.image || "modules/story/images/Navegante.svg"
                            activityName.completed = a.completed[0] === "completed"
                            position++
                            this.activityScrolls.push(activityName)
                        })
                        this.activity = chapter.activities[0]
                        this.selectScroll = 0
                    } else {
                        let activityPending = chapter.activities.filter(a => a.completed[0] !== "completed")

                        if (activityPending.length) {
                            this.activity = activityPending[0]
                        } else {
                            this.activity = chapter.activities[chapter.activities.length - 1]
                        }
                    }

                    this.type = this.activity.activity.type
                } else {
                    this.cover = chapter.cover
                    this.activity = chapter
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