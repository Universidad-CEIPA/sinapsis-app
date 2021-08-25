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
        props: {
            course: {
                required: true
            },
            type:{
                default: "whatever"
            }
        },
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
                    local("questions", this.questions.slice(this.currentQuestion))
                } else {
                    local("questions", null)
                    if (this.type === "map"){
                        this.course.setAlert("finish-evaluation")
                        this.modal = true
                    }else{
                        this.$router.replace({ name: 'story:home' })
                    }
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