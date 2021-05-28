define([
    "api",
    "local",
], (api, local) => {

    class Course {

        constructor(currentCourse, studentId) {

            this.courseId = currentCourse.course || currentCourse.courseId
            this.projectId = currentCourse.id || currentCourse.projectId
            this.studentId = studentId
            this.name = currentCourse.name
            this.skin = Array.isArray(currentCourse.skin) ? currentCourse.skin[0] : currentCourse.skin
            this.image = currentCourse.image[0].url || currentCourse.image
            this.schedule = currentCourse.schedule || null
            this.profile = currentCourse.profile || null
            this.competences = currentCourse.competences || null
        }

        destroy() {
            local("currentCourse", null);
        }

        graphColors() {
            return [
                "#263239",//initialValue
                "#95bfcb",//improvementDesired
                "#c39b52"//currentvalue
            ]
        }

        graphDataSets() {
            let initialValue = []
            let improvementDesired = []
            let currentvalue = []
            this.competences.map((c) => {
                initialValue.push({ value: c.evaluation.initialValue })
                improvementDesired.push({ value: c.evaluation.improvementDesired })
                currentvalue.push({ value: c.evaluation.value })
            })
            return [
                initialValue,
                improvementDesired,
                currentvalue
            ]
        }

        graphTags() {
            return this.competences.map((c) => { return c.name })
        }

        getFullInfo() {
            return {
                courseId: this.courseId,
                projectId: this.projectId,
                studentId: this.studentId,
                name: this.name,
                skin: this.skin,
                image: this.image,
                schedule: this.schedule,
                profile: this.profile,
                competences: this.competences
            }
        }

        getLocation() {
            return this.profile.location.name
        }
        
        getRole() {
            return this.profile.rol.name
        }
        

        needImprovementDesired() {
            this.competences.filter((c) => c.evaluation.improvementDesired === 0).length
        }

        async reset() {
            this.setSchedule()
            this.setStudentProfile()
            this.setStudentCompetences()
        }

        async setSchedule() {
            this.schedule = await api.post('students/getInfoCourse', { courseId: this.courseId, studentId: this.studentId })
        }
        async setStudentProfile() {
            this.profile = await api.post('students/getProfileCourse', { courseId: this.courseId, studentId: this.studentId })
        }

        async setStudentCompetences() {
            this.competences = await api.get(`courses/competencyAssessment?courseId=${this.courseId}&projectId= ${this.projectId}&studentId=${this.studentId}`);
        }

        updateChapters(chapter) {
            let index = this.schedule.findIndex(c => c.id === chapter.id)
            Object.assign(this.schedule[index], chapter)
        }
    }

    return Course;
})