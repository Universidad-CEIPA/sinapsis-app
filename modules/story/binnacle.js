define([
    "text!./binnacle.html",
], (html) => {

    return {
        template: html,
        props:["course"]
    };
});