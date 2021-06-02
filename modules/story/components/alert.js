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
            removeTour() {
                var Item = "." + this.focusable
                var focusItem = document.querySelector(Item)
                focusItem.classList.remove("focusable");

                //this.$emit('close');
            },
            removeTourRol(){
                this.removeTour()
                this.course.removeAlert()
                this.course.setAlert("showTools")

                this.addFocus()
            },
            removeTourTools(){
                this.removeTour()
                this.course.removeAlert()

                this.$router.replace({name:"story:profile"})
            },
            removeTourMaps(){
                this.removeTour()
                this.course.removeAlert()
                this.$router.push({ name: 'story:map', params: { content: JSON.stringify(this.course.currentChapter) } })
            }
        },
        computed: {
            typeAlert() {
                return {
                    "chapterCompleted": "chapterCompleted",
                    "showRol": "showRol",
                    "showTools": "showTools",
                    "showCities": "showCities",
                    "startQuestions": "startQuestions",
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
            if(this.focusable){
                this.addFocus()
            }
        },
        components: {
            UiModal
        },
    };
});