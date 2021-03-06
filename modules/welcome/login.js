define([
	"text!./login.html",
	"components/ui-form",
	"components/ui-input",
	"api"
], (html, UiForm, UiInput, api) => {

	return {
		template: html,
		props: ["close"],
		data() {
			return {
				user: {
					email: null,
					password: null
				},
				recoverData: {
					email: null,
				},
				type: 'login',
				typePassword: "password",
				icon: "eyes"
			};
		},
		methods: {
			acceptUser(result, data) {
				this.$root.processUser(result);
				this.$router.replace({ name: "welcome:setup" })
			},
			resendEmail() {
				api.post("students/resend", this.user.email);
			},
			passwordChangeType() {
				if (this.typePassword === "password") {
					this.typePassword = "text";
					this.icon = "close-eyes";
				}
				else if (this.typePassword === "text") {
					this.typePassword = "password";
					this.icon = "eyes";
				}
			},

		},
		created() {
			if (this.close) {
				this.$root.destroyCourse()
				this.$root.destroyUser()
			}
		},
		components: {
			UiForm,
			UiInput
		}
	};
})