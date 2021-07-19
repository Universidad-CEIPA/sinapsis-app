define([
	"api",
	"text!./ui-form.html"
], (api, html) => {

	return {
		template: html,
		props: {
			action: {
				type: [String, Function],
				required: true
			},
			model: {
				type: Object
			},
			submitLabel: {
				type: String
			},
			cancelLabel: {
				type: String
			},
			cancelPrompt: {
				type: String
			},
			formData: {
				type: Boolean
			},
			disabled: {
				type: Boolean
			}
		},
		data() {
			return {
				loading: false,
				error: null,
				fields: []
			};
		},
		provide() {
			return {
				uiForm: this
			}
		},
		methods: {
			cancel() {
				if (!this.cancelPrompt || confirm(this.cancelPrompt)) {
					this.$router.back();
				}
			},
			async getSubmittedData() {
				let data;

				if (this.formData) {
					data = new FormData(this.$el);
				} else {
					data = this.model;
				}

				let dataTransformPromise = Promise.resolve(data);
				this.$trigger("data", promise => dataTransformPromise = dataTransformPromise.then(promise));
				data = await dataTransformPromise;

				return data;
			},
			registerUiField(instance) {
				this.fields.push(instance);
				instance.$once("destroy", () => this.fields.splice(this.fields.indexOf(instance), 1));
			},
			async submit() {
				this.loading = true;
				this.error = null;

				let data = await this.getSubmittedData();

				try {
					await this.validate(data);

					let result;

					if (typeof this.action === "function") {
						result = await this.action(data, this.model);
					} else {
						result = await api.post(this.action, data);
					}
					this.loading = false;
					this.$trigger("success", result, data);
				} catch (err) {
					this.error = err.response?.data?.message ?? err.message;
					this.loading = false;
					this.$trigger("error", err);
				}
			},
			async validate(data) {
				let validationPromises = [];

				for (let field of this.fields) {
					if (!field.validate()) {
						validationPromises.push(Promise.reject(new Error()));
					}
				}

				this.$trigger("validate", data, promise => validationPromises.push(promise));
				return Promise.all(validationPromises);
			}
		}
	};
});