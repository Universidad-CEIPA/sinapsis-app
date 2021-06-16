define([
    "text!./autoevaluation.html",
    "local",
    "./components/alert",
    "./components/evaluation-cualitative",
    "./components/evaluation-cuantitative",
    "./components/evaluation-videoselfie"
], (html, local, alert, evaluationCualitative, evaluationCuantitative, evaluationVideoselfie) => {

    return {
        template: html,
        props: ["course"],
        data() {
            return {
                currentQuestion: 0,
                questions: [],
                modal: false,
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
        methods: {
            closeAlert() {
                this.course.removeAlert();
                this.modal = false
            },
            nextQuestion() {
                let next = this.currentQuestion + 1
                if (next <= this.questions.length - 1) {
                    this.currentQuestion = next
                } else {
                    local("questions", null)
                    this.course.setAlert("finish-evaluation")
                    this.modal = true
                }

            }
        },
        created() {
            this.questions = local("questions")


            if (this.course.getAlert()) {
                this.modal = true
            }
        },
        components: {
            alert,
            evaluationCualitative,
            evaluationCuantitative,
            evaluationVideoselfie
        }
    }
});