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
				user
			};
		},
		methods: {
			processUser(user) {
				this.user = user;
				local("user", user);
				api.post('students/' + this.user.id, this.user)
			},
		}
	};
});