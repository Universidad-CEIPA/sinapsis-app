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
		methods: {
			processUser(user) {

				if (user.birthday) {
					let current_datetime = new Date(user.birthday)
					user.birthday = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate()
				}

				this.user = user;
				local("user", user);
				// api.post('students/' + this.user.id, this.user)
			},
			setCourse(course) {
				local("currentCourse", course);
				this.currentCourse = course;
			}
		}
	};
});