define([
    "text!./desired-skills.html",
    "components/ui-form",
    "components/ui-input",
], (html, UiForm, UiInput) => {

    return {
        template: html,
        props: ["course"],
        data() {
            return {
                skills: {
                    courseId: this.course.courseId,
                    studentId: this.course.studentId,
                    evaluations: []
                }
            };
        },
        methods: {
            calculateLeft(value, event) {
                var elInput = document.querySelector('#' + event.target.id);
                var w = parseInt(window.getComputedStyle(elInput, null).getPropertyValue('width'));
                var prop = parseInt(window.getComputedStyle(document.documentElement)
                    .getPropertyValue('--input-height').slice(0, -2));
                var pxls = (w - prop) / 100;
                var etq = elInput.nextElementSibling;

                etq.style.left = (Math.floor(value * pxls) + 2) + "px";
            },
            async success(result, data) {
                await this.course.setStudentCompetences()
                await this.course.setTools()
                this.$router.replace({ name: 'story:profile' })
            },
        },
        created() {
            let available = this.course.competences.filter(comp => comp.rubric)
            
            available.map((c) => {
                this.skills.evaluations.push({ name: c.name, ...c.evaluation })
            })
            
            this.skills.evaluations.forEach((s)=>{
                if (s.improvementDesired == 0){
                    s.improvementDesired = s.initialValue
                }
            })

        },
        mounted() {
            var inputs = document.querySelectorAll('.input-field')

            inputs.forEach(function (input) {
                input.click()
            })
        },
        components: {
            UiForm,
            UiInput
        }
    }
});