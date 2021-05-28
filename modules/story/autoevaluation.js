define([
    "text!./autoevaluation.html",
    "local",
    "./components/evaluation-cualitative",
    "./components/evaluation-cuantitative",
    "./components/evaluation-videoselfie"
], (html, local, evaluationCualitative, evaluationCuantitative, evaluationVideoselfie) => {

    return {
        template: html,
        props:["course"],
        data() {
            return {
                currentQuestion : 0,
                questions: []
            };
        },
        computed: {
            typeComponent() {
                return {
                    "qualitative": "evaluation-cualitative",
                    "quantitative": "evaluation-cuantitative",
                    "video": "evaluation-videoselfie"
                }[this.questions[this.currentQuestion].type];
            }
        },
        methods:{
            nextQuestion(){
                this.currentQuestion ++
            }
        },
        created(){
            this.questions = local("questions")
        },
        components: {
            evaluationCualitative,
            evaluationCuantitative,
            evaluationVideoselfie
        }
    }
});