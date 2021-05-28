define([
    "text!./finish-modal.html",
    "components/ui-modal",
], (html, UiModal) => {

    return {
        template: html,
        components: {
            UiModal
        },
    };
});