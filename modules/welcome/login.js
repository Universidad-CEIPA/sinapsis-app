define([
	"text!./login.html",
	"components/ui-form",
	"components/ui-input",
	"api"
], (html, UiForm, UiInput, api) => {

	return {
		template: html,
		data() {
			return {
				user: {
					email: null,
					password: null
				},
				type: 'login'
			};
		},
		methods: {
			acceptUser(result, data) {
				this.$root.processUser(result);
				this.$router.replace({ name: "welcome:setup" })
			},
			resendEmail() {
				api.post("students/resend", this.user.email);
			}

		},
		components: {
			UiForm,
			UiInput
		}
	};
})