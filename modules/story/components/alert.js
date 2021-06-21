define([
    "text!./alert.html",
    "components/ui-modal",
], (html, UiModal) => {

    return {
        template: html,
        props: ["course"],
        methods: {
            addFocus() {
                var Item = "." + this.focusable
                var focusItem = document.querySelector(Item)
                let newClass = "focusable";

                clasess = focusItem.className.split(" ");
                if (clasess.indexOf(newClass) == -1) {
                    focusItem.className += " " + newClass;
                }
            },
            addClass() {
                var Item = "." + this.itemFront
                var focusItem = document.querySelector(Item)
                let newClass = "front";

                clasess = focusItem.className.split(" ");
                if (clasess.indexOf(newClass) == -1) {
                    focusItem.className += " " + newClass;
                }
            },
            remove() {
                this.course.removeAlert()
                this.$emit('close');
            },
            removeEvaluation(){
                this.course.removeAlert()
                this.$router.replace({ name: 'story:map' })
            },
            removeTour() {
                var Item = "." + this.focusable
                var focusItem = document.querySelector(Item)
                focusItem.classList.remove("focusable");

            },
            removeTourRol() {
                this.removeTour()
                this.course.removeAlert()
                this.course.setAlert("showTools")

                this.addFocus()
            },
            removeTourTools() {
                this.removeTour()
                this.course.removeAlert()

                this.$router.replace({ name: "story:profile" })
            },
            removeTourMaps() {
                this.removeTour()
                this.course.removeAlert()
                this.$router.push({ name: 'story:map', params: { content: JSON.stringify(this.course.currentChapter) } })
            },
            removeWelcome() {
                var Item = "." + this.itemFront
                var focusItem = document.querySelector(Item)
                focusItem.classList.remove("front");
                this.course.removeAlert()
            },
            removeContinue() {
                this.course.removeAlert()
                this.$router.replace({ name: "story:finish" })
            }
            
        },
        computed: {
            typeAlert() {
                return {
                    "startCourse": "startCourse",
                    "finishCourse": "finishCourse",
                    "continueTravel": "continueTravel",
                    "chapterCompleted": "chapterCompleted",
                    "showRol": "showRol",
                    "showTools": "showTools",
                    "showCities": "showCities",
                    "startQuestions": "startQuestions",
                    "newCity": "newCity",
                    "tiny": "tiny",
                    "tools": "tools",
                    "hero-letter": "hero-letter",
                    "chaptersPending": "chaptersPending",
                    "finish-evaluation": "finish-evaluation"
                }[this.course.getAlert()];
            },
            itemFront() {
                return {
                    "startCourse": "activities",
                }[this.course.getAlert()];
            },
            focusable() {
                return {
                    "showRol": "avatar",
                    "showTools": "tools",
                    "showCities": "position"
                }[this.course.getAlert()];
            },
        },
        mounted() {
            if (this.focusable) {
                this.addFocus()
            }

            if (this.itemFront) {
                this.addClass()
            }

        },
        components: {
            UiModal
        },
    };
});