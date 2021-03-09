define([
	"text!./layout.html",
	"local"
], (html, local) => {

	return {
		template: html,
		data() {
			let user = local("user")
			return {
				user,
				userdummy: {
					email: "dalaven1996@gmail.com",
					name: "Daniel Avendaño",
					document: "1022418865",
					documentType: "CC",
					birthday: "1996-08-21",
					gender: "M",
					educationLevel: "primary",
				}
			};
		},
		methods: {
			processUser(user) {
				this.user = user;
				local("user", user);
			},
		}
	};
});