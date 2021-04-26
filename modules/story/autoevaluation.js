define([
    "text!./autoevaluation.html",
    "./components/evaluation-cualitative",
    "./components/evaluation-cuantitative",
    "./components/evaluation-videoselfie"
], (html, evaluationCualitative, evaluationCuantitative, evaluationVideoselfie) => {

    return {
        template: html,
        props:["type"],
        data() {
            return {

                questions: [
                    { type: "cuantitative", question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim" },
                    { type: "cuantitative", question: "veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate" },
                    { type: "cualitative", question: "Como se sintio" },
                    { type: "videoselfie", question: "Grabar video" }
                ]
            };
        },
        computed: {
            typeComponent() {
                return {
                    "cualitative": "evaluation-cualitative",
                    "cuantitative": "evaluation-cuantitative",
                    "videoselfie": "evaluation-videoselfie"
                }[this.type];
            },
            questionsType() {
                return this.questions.filter(r => r.type === this.type)
            }
        },
        methods: {
        },
        mounted() {
        },
        components: {
            evaluationCualitative,
            evaluationCuantitative,
            evaluationVideoselfie
        }
    }
});