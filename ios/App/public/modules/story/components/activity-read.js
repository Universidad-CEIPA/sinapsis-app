define([
    "text!./activity-read.html",
], (html) => {

    return {
        template: html,
        props: ['activity', 'course'],
        data() {
            return {
                fontSize: '1em',
                currentChapter: null
            };
        },
        computed: {
            showImages() {
                return this.currentChapter === this.course.chapterActiveRol && this.course.chapters[this.currentChapter - 1].scroll
            },
            countActivity() {
                return this.course.chapters[this.currentChapter - 1].activities.findIndex(activity => activity.activity.id === this.activity.id) + 1
            },
            title(){
                return this.course.chapters[this.currentChapter - 1].title || ""
            }

        },
        created() {
            this.currentChapter = this.course.getChapterByActivity(this.activity.id)
        }

    };
});