define([
    "text!./activity.html",
    "./components/activity-audio",
    "./components/activity-read",
    "./components/activity-video"
], (html, activityAudio, activityRead, activityVideo) => {

    return {
        template: html,
        props: ["content"],
        data() {
            return {
                optionsPanel: false,
                type: "reading",
                activity: {},
                title: "",
                startShow: 0,
                scroll: false,
                activityScrolls: [],
                selectScroll: 0,
                /*activityScrolls: [
                    { name: "Abridores de Caminos", img: "modules/story/images/Navegante.svg" },
                    { name: "Sacerdotes", img: "modules/story/images/Sacerdotes.svg" },
                    { name: "Oradores", img: "modules/story/images/Oradores.svg" },
                    { name: "Magos", img: "modules/story/images/Magos.svg" },
                    { name: "Navegante", img: "modules/story/images/Navegante.svg" }
                ]*/

            };
        },
        computed: {
            maxShow() {
                return 4
            },
            itemsShow() {
                return this.activityScrolls.slice(this.startShow, this.maxShow + this.startShow)
            },
            typeComponent() {
                return {
                    "reading": "activity-read",
                    "audio": "activity-audio",
                    "video": "activity-video"
                }[this.type];
            },
            header() {
                return this.activity.type !== "card"
            },
            welcome() {
                return this.activity.type === "map"
            }
        },
        methods: {
            completedActivity() {
                let chapter = JSON.parse(this.content)
                chapter.activities.map((a) => {
                    if (a.id === this.activity.id) {
                        a.completed = true
                    }
                })

                let activityPending = chapter.activities.filter(a => !a.completed)

                this.$root.updateChapters(chapter)

                if (activityPending.length === 0) {
                    this.$router.push({ name: 'story:home', params: { chapterModal: true } })
                } else if (!this.scroll) {
                    this.$router.replace({ name: 'story:home' })
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
            changeActivity(index) {
                this.selectScroll = index
                let chapter = JSON.parse(this.content)
                this.activity = chapter.activities[index]
            }
        },
        mounted() {
            if (this.content) {
                let chapter = JSON.parse(this.content)
                this.title = chapter.title
                this.scroll = chapter.scroll

                if (chapter.scroll) {
                    let position = 0
                    chapter.activities.map((a) => {
                        let activityName = {}
                        activityName.name = a.activity.name
                        activityName.position = position
                        activityName.img = "modules/story/images/Navegante.svg"
                        position++
                        this.activityScrolls.push(activityName)
                    })
                    this.activity = chapter.activities[0]
                    this.selectScroll = 0
                } else {
                    let activityPending = chapter.activities.filter(a => !a.completed)

                    if (activityPending.length) {
                        this.activity = activityPending[0]
                    } else {
                        this.activity = chapter.activities[chapter.activities.length - 1]
                    }
                }



                this.type = this.activity.activity.type
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