define([
	"text!./layout.html",
	"api",
	"local"
], (html, api, local) => {

	return {
		template: html,
		data() {
			let user = local("user")
			let currentCourse = local("currentCourse") || null
			return {
				user,
				currentCourse
			};
		},
		computed: {
			skin() {
				if (this.currentCourse !== null) {
					return this.currentCourse.skin[0]
				} else {
					return ""
				}
			}

		},
		methods: {
			destroyCourse() {
				local("currentCourse", null);
				this.currentCourse = null;
				this.$router.replace({ name: 'home' })
			},
			logout() {
				this.user = null;
				local("user", null);
				this.$router.replace({ name: 'welcome:login' })
			},
			processUser(user) {
				if (user.birthday) {
					user.birthday = this.$toDateValue(user.birthday)
				}
				this.user = user;
				local("user", user);
			},
			async setCourse(course) {

				console.log(course)
				let currentCourse = course
				currentCourse.schedule = await api.post('students/getInfoCourse', { courseId: course.course })

				local("currentCourse", currentCourse);
				this.currentCourse = currentCourse;
				return true

			}
		}
	};
});