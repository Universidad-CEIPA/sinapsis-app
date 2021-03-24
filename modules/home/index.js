define([
	"text!./index.html"
], (html) => {

	return {
		template: html,
		data() {
			return {
				projects: this.$root.user.projects,
				currentIndex: 0,
				lastDelta: 0,
				dragX: 0,
				dragProject: null
			};
		},
		methods: {
			handlePointerUp(e) {
				if (e.changedTouches) e = e.changedTouches[0];

				this._pointerStart = e;
				this.lastDelta = 0;


			},
			handlePointerMove(e) {
				if (e.changedTouches) e = e.changedTouches[0];

				if (this.lastDelta || Math.abs(this._pointerStart.clientX - e.clientX) > 2) {
					this.dragX = Math.round(e.clientX - this._pointerStart.clientX);

					let delta = this.dragX < 0 ? 1 : -1;

					if (delta !== this.lastDelta) {
						this.lastDelta = delta;

						let preview = this.currentIndex + delta
						console.log(preview)
						if (preview >= 0 && preview <= this.projects.length - 1) {

							this.currentIndex = preview
							this.dragProject = projects[preview]
						}
					}
				}
			},
			handlePointerDown(e) {
				if (e.changedTouches) e = e.changedTouches[0];

				this.lastDelta = 0;
				this.dragProject = null;
			},
		},
		components: {
		}
	};
});