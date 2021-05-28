define([
    "text!./finish.html",
], (html) => {

    return {
        template: html,
        props:["course"]
    };
});