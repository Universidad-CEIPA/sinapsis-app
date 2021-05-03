define([
    "text!./tour.html",
    "components/ui-modal",
], (html, UiModal) => {

    return {
        template: html,
        props: ["selected"],
        data() {
            return {
            };
        },
        methods: {
            addFocus() {
                var Item = "." + this.selected
                var focusItem = document.querySelector(Item)
                let newClass = "focusable";

                clasess = focusItem.className.split(" ");
                if (clasess.indexOf(newClass) == -1) {
                    focusItem.className += " " + newClass;
                }
            },
            removeTour() {
                var Item = "." + this.selected
                var focusItem = document.querySelector(Item)
                focusItem.classList.remove("focusable");

                this.$emit('close');
            }
        },
        components: {
            UiModal
        },
        mounted() {
            this.addFocus()
        }

    };
});