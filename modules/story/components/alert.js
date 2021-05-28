define([
    "text!./alert.html",
    "components/ui-modal",
], (html, UiModal) => {

    return {
        template: html,
        components: {
            UiModal
        },
    };
});