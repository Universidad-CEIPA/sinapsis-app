define([
    "api",
    "local",
    "dayjs",
    "dayjs-relativeTime",
    "dayjs-utc",
    "dayjs-es",
], (api, local, dayjs, relativeTime, utc) => {

    dayjs.extend(relativeTime);
    dayjs.extend(utc);
    dayjs.locale("es");

    class Course {

        constructor(currentCourse, studentId) {

            this.courseId = currentCourse.course || currentCourse.courseId
            this.projectId = currentCourse.id || currentCourse.projectId
            this.studentId = studentId
            this.name = currentCourse.name
            this.skin = Array.isArray(currentCourse.skin) ? currentCourse.skin[0] : currentCourse.skin
            this.image = Array.isArray(currentCourse.image) ? currentCourse.image[0]?.url : currentCourse.image
            this.schedule = currentCourse.schedule || null
            this.profile = currentCourse.profile || null
            this.competences = currentCourse.competences || null

            this.notifications = ""

            this.activeRol = false
            this.activeCity = false
            this.activeMap = false
            this.activeTools = false


            this.currentChapter = null,

                this.chapterActiveRol = 2
            this.chapterActiveMap = []
        }

        static getCurrent() {
            return local("currentCourse");
        }

        showRol() {
            this.activeTools = this.isCompletedChapter(this.schedule[this.chapterActiveRol - 1])
            this.activeCity = this.isCompletedChapter(this.schedule[this.chapterActiveRol - 1])
            return this.activeRol = this.isCompletedChapter(this.schedule[this.chapterActiveRol - 1])
        }

        lastRolPending() {
            return this.schedule[this.chapterActiveRol - 1].activities.filter(a => a.completed[0] !== "completed").length === 1
        }

        advanceChapters() {
            let totalChapters = this.schedule.length
            let completedChapters = 0

            this.schedule.map(chapter => {
                if (this.isCompletedChapter(chapter)) { completedChapters++ }
            })

            return completedChapters + "/" + totalChapters
        }

        currentActivity() {
            let activityOrder = []
            let schedule = local("currentCourse").schedule

            schedule.map(chapter => {
                let activity = chapter.activities.length ? chapter.activities : chapter.maps
                activity


                if (Array.isArray(activity)) {
                    activity.map(act => {

                        act.chapter = chapter.id
                        activityOrder.push(act)

                    })
                } else {
                    activity.chapter = chapter.id
                    activityOrder.push(activity)
                }
            })
        }

        destroy() {
            local("currentCourse", null);
        }

        getAlert() {
            if (this.notifications) {
                return this.notifications
            } else {
                return false
            }
        }

        getChaptersMap() {
            this.schedule.map((chapter, index) => {
                if (chapter.maps.id) {
                    this.chapterActiveMap.push(index + 1)
                }
            })
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

        isCompletedChapter(chapter) {
            let activities = chapter.activities.length ? chapter.activities : chapter.maps.map.locations
            return activities.filter(a => a.completed[0] !== "completed").length === 0
        }

        needImprovementDesired() {

            this.competences.filter((c) => c.evaluation.improvementDesired === 0).length
        }

        removeAlert() {
            this.notifications = ""
        }

        async reset() {
            await this.setSchedule()
            await this.setStudentProfile()
            await this.setStudentCompetences()
            local("currentCourse", this.getFullInfo());

            this.showRol()
            this.getChaptersMap()


            this.currentActivity()
        }


        setAlert(alert) {
            this.notifications = alert
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

        async updateChapters(chapter) {
            let index = this.schedule.findIndex(c => c.id === chapter.id)
            Object.assign(this.schedule[index], chapter)

            if (this.getAlert() !== "newCity") {
                this.setAlert("chapterCompleted")

                if (index === this.chapterActiveRol - 1 && this.showRol()) {
                    this.setAlert("showRol")
                }
            }


            await this.reset()
        }


        updateActivity(activity) {
            let indexChapter = 0
            this.schedule.map((chapter, index) => {
                let content = chapter.activities.length ? chapter.activities : chapter.maps


                if (Array.isArray(content)) {
                    content.map(act => {
                        if (act.id === activity.id) {
                            indexChapter = index
                            act = activity
                        }

                    })
                } else {
                    let cities = content.map.locations.filter(l => l.end === 0)
                    let end = content.map.locations.filter(l => l.end === 1).length
                    let pending = cities.filter(a => a.completed[0] !== "completed").length === 1

                    if (pending && end) {
                        this.setAlert("newCity")
                    }

                    content.map.locations.map(act => {
                        if (act.id === activity.id) {
                            activity.project_activities = activity.activity
                            delete activity.activity
                            indexChapter = index
                            act = activity
                        }

                    })
                }
            })

            this.schedule[indexChapter]


            this.updateChapters(this.schedule[indexChapter])
        }
    }

    return Course;
})