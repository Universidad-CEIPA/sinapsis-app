define([
	"text!./ui-list.html",
	"components/ui-pagination"
], (html, UiPagination) => {

	return {
		template: html,
		inject: ["ui"],
		props: {
			data: {
				type: Array,
				required: true
			},
			selection: {
				type: Array
			},
		},
		methods: {
			isItemSelected(item) {
				return this.selection.includes(item);
			},
			loadPage(page) {
				if (this.data.updateMerged) {
					this.data.updateMerged({[this.pageKey]: page});
				}

				this.$trigger("page", page);
			},
			selectItem(item) {
				let selection = this.selection.slice();
				selection.push(item);
				this.$emit("update:selection", selection);
			},
			toggleSelectedItem(item) {
				if (this.isItemSelected(item)) {
					this.unselectItem(item);
				} else {
					this.selectItem(item);
				}
			},
			unselectItem(item) {
				let selection = this.selection.slice();
				selection.splice(selection.indexOf(item), 1);
				this.$emit("update:selection", selection);
			}
		},
		components: {
			UiPagination
		}
	};
});