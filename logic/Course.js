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
            this.invitation = currentCourse.invitation || null

            this.profile = currentCourse.profile || null
            this.competences = currentCourse.competences || null
            this.rubrics = null

            this.notifications = ""
            this.mapActivity = []
            this.selectedTool = null

            this.activeRol = false
            this.activeCity = false
            this.activeMap = local("activeMap")?.includes(this.courseId) ?? false
            this.activeTools = false


            this.chapterActiveRol = this.skin === 'dorado' ? 2 : 1
            this.chapterActiveMap = []

            this.currentChapter = null
        }

        static getCurrent() {
            return local("currentCourse");
        }

        showRol() {
            this.activeTools = this.isCompletedChapter(this.chapters[this.chapterActiveRol - 1])
            this.activeCity = this.isCompletedChapter(this.chapters[this.chapterActiveRol - 1]) && this.skin === 'dorado'
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

        activitiesTracking(filterDate = true) {
            let completed = []
            let pending = []

            let today = new Date();

            this.chapters.map((chapter, index) => {
                let activity = chapter.activities.length ? chapter.activities : chapter.maps
                if (Array.isArray(activity)) {
                    activity.map(act => {
                        act.chapter = index + 1
                        if (act.completed[0] === "completed") {
                            completed.push(act)
                        } else if (filterDate) {
                            if (this.castDate(act.date, act.time) < today)
                                pending.push(act)
                        } else {
                            pending.push(act)
                        }
                    })
                } else {
                    activity.chapter = index + 1
                    if (this.isCompletedChapter(chapter)) {
                        completed.push(activity)
                    } else if (filterDate) {
                        if (this.castDate(activity.date, activity.time) < today)
                            pending.push(activity)
                    } else {
                        pending.push(activity)
                    }
                }
            })

            this.hero_letter.map((card) => {
                if (card.completed[0] === "completed") {
                    completed.push(card)
                } else if (this.castDate(card.date, card.time) < today) {
                    pending.push(card)
                }

            })


            pending.sort((a, b) => this.castDate(b.date, b.time).getTime() - this.castDate(a.date, a.time).getTime())
            completed.sort((a, b) => this.castDate(b.date, b.time).getTime() - this.castDate(a.date, a.time).getTime())
            return [completed, pending]
        }


        castDate(date, time) {
            let current = new Date(date)
            let hour = new Date(time)

            current.setHours(hour.getHours())
            current.setMinutes(hour.getMinutes());
            current.setSeconds(hour.getSeconds());

            return current
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
                invitation: this.invitation,
                profile: this.profile,
                competences: this.competences,
                rubrics: this.rubrics,
                schedule: this.schedule
            }
        }

        getLocation() {
            return this.profile.location?.name ?? ''
        }

        getRole() {
            return this.profile.rol.name
        }

        getRoleAvatar() {
            return this.profile.rol.avatar?.url ?? `modules/story/images/${this.skin}/avatar-default.png`
        }

        getRoleIcon() {
            return this.profile.rol.icon?.url ?? null
        }

        graphColors() {
            return {
                "dorado": [
                    "#263239",//initialValue
                    "#95bfcb",//improvementDesired
                    "#c39b52"//currentvalue
                ],
                "mision": [
                    "#505659",//initialValue
                    "#c39b52",//improvementDesired
                    "#37356C"//currentvalue
                ]
            }[this.skin]
        }

        graphDataSets() {
            let initialValue = []
            let improvementDesired = []
            let currentvalue = []

            let competencesAvailable = this.competences.filter(comp => comp.rubric)

            competencesAvailable.map((c) => {
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
            let competencesAvailable = this.competences.filter(comp => comp.rubric)
            return competencesAvailable.map((c) => { return c.name })
        }

        indexMap() {
            let chapterNumber = this.chapters.findIndex(c => c.id === this.currentChapter) + 1
            return this.chapterActiveMap.findIndex(c => c === chapterNumber)
        }

        isCompletedChapter(chapter) {
            let activities = chapter.activities.length ? chapter.activities : chapter.maps.map.locations
            return activities.filter(a => a.completed[0] !== "completed").length === 0
        }

        needImprovementDesired() {
            return this.competences.filter((c) => c.evaluation.improvementDesired === 0).length
        }

        removeAlert() {
            this.notifications = ""
        }

        async reset() {
            await this.setSchedule()
            await this.setStudentProfile()
            await this.setStudentCompetences()

            if (this.validateCourse()) {
                await this.setRubrics()

                this.setTools()
                local("currentCourse", this.getFullInfo());

                this.showRol()
                this.trackingMaps()

                let [_, pending] = this.activitiesTracking(false)
                let finishArray = local("finishCourse") || []
                if (pending.length === 0 && !(finishArray.length > 0 || finishArray.includes(this.courseId))) {
                    this.setAlert("finishCourse")
                }
                return true
            } else {
                this.destroy()
                return false
            }
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
            this.invitation = this.schedule.invitation
        }

        async setStudentProfile() {
            this.profile = await api.post('students/getProfileCourse', { courseId: this.courseId, studentId: this.studentId })
        }

        async setRubrics() {
            this.rubrics = await api.post('students/getTools', { rolId: this.profile.rol.id });
        }

        async setStudentCompetences() {
            this.competences = await api.get(`courses/competencyAssessment?courseId=${this.courseId}&projectId=${this.projectId}&studentId=${this.studentId}`);
        }

        setTools() {
            this.competences.map(comp => {
                let rubric = this.rubrics.find(rub => comp.id === rub.competence.id)
                if (rubric) {
                    comp.rubric = rubric.rubrics[0].avatars.filter(av => av.threshold >= comp.evaluation.value)
                }
            })
        }

        tools() {
            return this.competences.filter(comp => comp.rubric?.length)
        }

        async updateChapters(chapter) {
            let index = this.chapters.findIndex(c => c.id === chapter.id)
            Object.assign(this.chapters[index], chapter)


            if (this.getAlert() !== "newCity") {
                this.setAlert("chapterCompleted")

                if (index === this.chapterActiveRol - 1 && this.showRol()) {
                    this.setAlert("showRol")
                }
            }

            await this.reset()
        }


        async updateActivity(activity) {

            if (activity.type !== 'hero-letter') {
                let indexChapter = -1
                this.chapters.map((chapter, index) => {
                    let content = chapter.activities.length ? chapter.activities : chapter.maps


                    if (Array.isArray(content)) {
                        let indexActivity = content.findIndex(act => act.id === activity.id)
                        if (indexActivity >= 0) {
                            indexChapter = index
                            Object.assign(content[indexActivity], activity)
                        }
                    } else {
                        let cities = content.map.locations.filter(l => l.end === 0)
                        let end = content.map.locations.filter(l => l.end === 1).length
                        let pending = cities.filter(a => a.completed[0] !== "completed").length === 1

                        if (pending && end) {
                            this.setAlert("newCity")
                        }

                        let indexActivity = content.map.locations.findIndex(act => act.id === activity.id)
                        if (indexActivity >= 0) {
                            activity.project_activities = activity.activity
                            delete activity.activity
                            indexChapter = index
                            Object.assign(content.map.locations[indexActivity], activity)
                        }

                    }
                })

                await this.updateChapters(this.chapters[indexChapter])
            } else {
                let indexActivity = this.hero_letter.findIndex(act => act.id === activity.id)
                if (indexActivity >= 0) {
                    Object.assign(this.hero_letter[indexActivity], activity)
                }
                await this.reset()
            }
        }


        validateCourse() {
            let status = true

            if (typeof this.profile === "string") {
                return false
            }

            this.chapters.map(c => {
                let activities = c.activities.length ? c.activities : c.maps.map.locations

                if (typeof activities === "undefined") {
                    status = false
                }
            })

            return status
        }
    }

    return Course;
})