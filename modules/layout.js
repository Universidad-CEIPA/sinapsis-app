define([
	"text!./layout.html",
	"api",
	"local"
], (html, api, local) => {

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
			processUser(user) {

				if (user.birthday) {
					//user.birthday = user.birthday.split('T')
					let current_datetime = new Date(user.birthday)
					user.birthday = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate()
					
				}

				this.user = user;
				local("user", user);
				// api.post('students/' + this.user.id, this.user)
			},
		}
	};
});