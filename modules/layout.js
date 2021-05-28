define([
	"text!./layout.html",
	"api",
	"local",
	"logic/Course",
], (html, api, local, Course) => {

	return {
		template: html,
		data() {
			let user = local("user")
			return {
				user,
				currentCourse: null
			};
		},
		methods: {
			destroyCourse() {
				this.currentCourse.destroy();
				this.currentCourse = null;
				this.$router.replace({ name: 'home' })
			},
			logout() {
				local("user", null);
				this.user = null;
				this.$router.replace({ name: 'welcome:login' })
			},
			processUser(user) {
				if (user.birthday) {
					user.birthday = this.$toDateValue(user.birthday)
				}
				local("user", user);
				this.user = user;
			},
			async setCourse(course) {
				if (course !== null) {
					this.currentCourse = await new Course(course, this.user.id)

					await this.currentCourse.reset()

					local("currentCourse", this.currentCourse.getFullInfo());
					return true
				}
				return false


			},
			updateChapters(chapter) {
				this.currentCourse.updateChapters(chapter);

				local("currentCourse", this.currentCourse.getFullInfo());
			}
		},
		async created() {
			await this.setCourse(local("currentCourse"))
		}
	};
});