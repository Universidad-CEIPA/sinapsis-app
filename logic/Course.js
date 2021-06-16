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
            this.chapters = currentCourse.chapters || null
            this.hero_letter = currentCourse.hero_letter || null

            this.profile = currentCourse.profile || null
            this.competences = currentCourse.competences || null
            this.rubrics = null

            this.notifications = ""
            this.mapActivity = []
            this.selectedTool = null

            this.activeRol = false
            this.activeCity = false
            this.activeMap = false
            this.activeTools = false


            this.chapterActiveRol = 2
            this.chapterActiveMap = []

            this.currentChapter = null
            this.memory = 0
        }

        static getCurrent() {
            return local("currentCourse");
        }

        showRol() {
            this.activeTools = this.isCompletedChapter(this.chapters[this.chapterActiveRol - 1])
            this.activeCity = this.isCompletedChapter(this.chapters[this.chapterActiveRol - 1])
            return this.activeRol = this.isCompletedChapter(this.chapters[this.chapterActiveRol - 1])
        }

        lastRolPending() {
            return this.chapters[this.chapterActiveRol - 1].activities.filter(a => a.completed[0] !== "completed").length === 1
        }

        advanceChapters() {
            let totalChapters = this.chapters.length
            let completedChapters = 0

            this.chapters.map(chapter => {
                if (this.isCompletedChapter(chapter)) { completedChapters++ }
            })

            return completedChapters + "/" + totalChapters
        }

        activitiesTracking() {
            let completed = []
            let pending = []
            this.chapters.map((chapter, index) => {
                let activity = chapter.activities.length ? chapter.activities : chapter.maps
                if (Array.isArray(activity)) {
                    activity.map(act => {
                        act.chapter = index + 1
                        if (act.completed[0] === "completed") {
                            completed.push(act)
                        } else {
                            pending.push(act)
                        }
                    })
                } else {
                    activity.chapter = index + 1
                    if (this.isCompletedChapter(chapter)) {
                        completed.push(activity)
                    } else {
                        pending.push(activity)
                    }
                }
            })

            this.hero_letter.map((card) => {
                pending.push(card)
            })


            return [completed.reverse(), pending]
        }


        currentActivity() {
            let activityOrder = []
            let schedule = local("currentCourse").chapters

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

            this.mapActivity = activityOrder
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
        getChapterByActivity(activityId) {
            let indexChapter = -1
            this.chapters.map((chapter, index) => {
                let content = chapter.activities.length ? chapter.activities : chapter.maps


                if (Array.isArray(content)) {
                    content.map(act => {
                        if (act.activity.id === activityId) {
                            indexChapter = index
                        }
                    })
                } else {
                    content.map.locations.map(act => {
                        if (act.project_activities.id === activityId) {
                            indexChapter = index
                        }

                    })
                }
            })

            return indexChapter + 1

        }

        getChapterByMap(mapId) {
            let indexChapter = this.chapters.findIndex((chapter) => chapter.maps.map.id === mapId)

            return indexChapter + 1
        }

        trackingMaps() {
            this.chapters.map((chapter, index) => {
                if (chapter.maps.id) {
                    this.chapterActiveMap.push(index + 1)
                }
            })
        }

        getCurrentChapter() {
            return this.chapters.find(chapter => this.currentChapter === chapter.id)
        }

        getFullInfo() {
            return {
                courseId: this.courseId,
                projectId: this.projectId,
                studentId: this.studentId,
                name: this.name,
                skin: this.skin,
                image: this.image,
                chapters: this.chapters,
                hero_letter: this.hero_letter,
                profile: this.profile,
                competences: this.competences,
                rubrics: this.rubrics,
                schedule: this.schedule
            }
        }

        getLocation() {
            return this.profile.location.name
        }

        getLocationImage() {
            return this.profile.location.cover
        }


        getRole() {
            return this.profile.rol.name
        }

        getRoleAvatar() {
            return this.profile.rol.avatar.url
        }

        getRoleIcon() {
            return this.profile.rol.icon.url
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

        indexMap() {
            let chapterNumber = this.chapters.findIndex(c => c.id === this.currentChapter) + 1
            return this.chapterActiveMap.findIndex(c => c === chapterNumber)
        }

        isCompletedChapter(chapter) {
            let activities = chapter.activities.length ? chapter.activities : chapter.maps.map.locations
            return activities.filter(a => a.completed[0] !== "completed").length === 0
        }

        memoryShow(index) {
            this.memory = index
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

            await this.setRubrics()

            this.setTools()
            local("currentCourse", this.getFullInfo());

            this.showRol()
            this.trackingMaps()


            // this.currentActivity()
        }

        selectTool(competence) {
            this.selectedTool = competence
        }

        setAlert(alert) {
            this.notifications = alert
        }

        setCurrentChapter(chapter) {
            this.currentChapter = chapter
        }

        async setSchedule() {
            this.schedule = await api.post('students/getInfoCourse', { courseId: this.courseId, studentId: this.studentId })
            this.chapters = this.schedule.chapters
            this.hero_letter = this.schedule.hero_letter
        }
        async setStudentProfile() {
            this.profile = await api.post('students/getProfileCourse', { courseId: this.courseId, studentId: this.studentId })
        }

        async setRubrics() {
            this.rubrics = await api.post('students/getTools', { rolId: this.profile.rol.id });
        }


        async setStudentCompetences() {
            this.competences = await api.get(`courses/competencyAssessment?courseId=${this.courseId}&projectId= ${this.projectId}&studentId=${this.studentId}`);
        }

        setTools() {
            this.competences.map(comp => {
                let rubric = this.rubrics.find(rub => comp.id === rub.competence.id)

                comp.rubric = rubric.rubrics[0].avatars.filter(av => av.threshold <= comp.evaluation.value).reverse()
            })
        }



        async updateChapters(chapter) {
            let index = this.chapters.findIndex(c => c.id === chapter.id)
            Object.assign(this.chapters[index], chapter)


            if (this.getAlert() !== "newCity") {
                this.setAlert("chapterCompleted")

                if (index === this.chapterActiveRol - 1 && this.showRol()) {
                    this.setAlert("showRol")
                }

                let [completed, pending] = this.activitiesTracking()

                if (pending.length === 0 && (!local("finishCourse") || !local("finishCourse").includes(this.courseId))) {
                    this.setAlert("finishCourse")
                }
            }

            await this.reset()
        }


        updateActivity(activity) {
            let indexChapter = 0
            this.chapters.map((chapter, index) => {
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


            this.updateChapters(this.chapters[indexChapter])
        }
    }

    return Course;
})