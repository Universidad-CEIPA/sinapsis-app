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
				}else{
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
					let current_datetime = new Date(user.birthday)
					user.birthday = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate()
				}
				this.user = user;
				local("user", user);
			},
			setCourse(course) {
				local("currentCourse", course);
				this.currentCourse = course;
			}
		}
	};
});