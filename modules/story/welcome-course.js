define([
    "text!./welcome-course.html"
], (html) => {

    return {
        template: html,
        props: ["course"]
    };
});