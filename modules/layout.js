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
			},
			destroyUser() {
				local("user", null);
				this.user = null;
			},
			logout() {
				this.$router.push({ name: 'welcome:login', params: { 'close': true } })
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
					return true
				}
				return false
			},
		},
		async created() {
			if (local("currentCourse")) {
				await this.setCourse(local("currentCourse"))
			}
		}
	};
});