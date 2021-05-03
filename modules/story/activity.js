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
                type: "read",
                activity: {},

                startShow: 0,
                activityScrolls: [
                    { name: "Abridores de Caminos", img: "modules/story/images/Navegante.svg" },
                    { name: "Sacerdotes", img: "modules/story/images/Sacerdotes.svg" },
                    { name: "Oradores", img: "modules/story/images/Oradores.svg" },
                    { name: "Magos", img: "modules/story/images/Magos.svg" },
                    { name: "Navegante", img: "modules/story/images/Navegante.svg" }
                ]

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
                    "read": "activity-read",
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

            }
        },
        mounted() {
            if (this.content) {
                this.activity = JSON.parse(this.content)
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