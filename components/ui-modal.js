define([
	"text!./ui-modal.html"
], (html) => {

	return {
		template: html,
		inject: ["ui"],
		props: {
			title: {
				type: String,
				default: ""
			}
		},
		data() {
			return {

			};
		},
		methods: {
			close() {
				this.$trigger("close");
			}
		}
	};
});