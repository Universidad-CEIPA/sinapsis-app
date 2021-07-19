define([
    "text!./credits.html",
], (html) => {

    return {
        template: html,
        props:["course"]
    };
});