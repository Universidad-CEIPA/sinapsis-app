define([
	"text!./index.html"
], (html) => {

	return {
		template: html,
		data() {
			return {
				projects: this.$root.user.projects,
				currentIndex: 0,
				_lastDelta: 0,
				dragX: 0,
				dragProject: null
			};
		},
		computed: {
			defaultImage() {
				return '#263239';
			},
		},
		methods: {
			async goCourse() {
				if (await this.$root.setCourse(this.projects[this.currentIndex])){
					this.$router.replace({ name: "story:welcome" });
				}
			},
			handlePointerDown(e) {
				if (e.changedTouches) e = e.changedTouches[0];
				this._pointerStart = e;
				this._lastDelta = 0;
			},
			handlePointerMove(e) {
				if (e.changedTouches) e = e.changedTouches[0];
				if (this._lastDelta || Math.abs(this._pointerStart.clientX - e.clientX) > 10) {
					this.dragX = Math.round(e.clientX - this._pointerStart.clientX);

					let delta = this.dragX < 0 ? 1 : -1;

					if (delta !== this._lastDelta) {
						this._lastDelta = delta;

						let preview = this.currentIndex + delta
						if (preview >= 0 && preview <= this.projects.length - 1) {
							this.dragProject = preview
						}
					}
				}
			},
			handlePointerUp(e) {
				if (e.changedTouches) e = e.changedTouches[0];
				console.log(e)
				if (Math.abs(this._pointerStart.clientX - e.clientX) > 10 && this.dragProject >= 0 && this.dragProject <= this.projects.length - 1 && this.dragProject !== null) {
					this.currentIndex = this.dragProject
				}
				this._lastDelta = 0;
				this.dragProject = null;

			}
		},
		created() {
			if (this.$root.currentCourse) {
				this.$router.replace({ name: "story:profile" });
			}
		},
		components: {
		}
	};
});