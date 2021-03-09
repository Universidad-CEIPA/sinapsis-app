define([
	"text!./index.html",
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
                type:'login'
			};
		},
		methods: {
			login () {
				console.log(this.user)
                api.post("students/login",this.user);
			}
		},
		components: {
			UiForm,
			UiInput
		}
	};
})