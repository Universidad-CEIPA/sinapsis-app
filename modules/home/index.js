define([
	"text!./index.html"
], (html) => {

	return {
		template: html,
		props: ["course", "close"],
		data() {
			return {
				projects: this.$root.user.projects,
				currentIndex: 0,
				_lastDelta: 0,
				dragX: 0,
				dragProject: null,
				notification: null
			};
		},
		computed: {
			defaultImage() {
				return '#263239';
			},
		},
		methods: {
			async goCourse() {
				if (await this.$root.setCourse(this.projects[this.currentIndex])) {
					this.$router.replace({ name: "story:welcome" });
				} else {
					this.notification = "No es posible cargar el curso, comunicarse con un administrador"

					setInterval(function () { this.notification = null }, 3000);
				}
			},
			handlePointerDown(e) {
				if (e.changedTouches) e = e.changedTouches[0];
				this._pointerStart = e;
				this._lastDelta = 0;
				this.notification = null
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
				if (Math.abs(this._pointerStart.clientX - e.clientX) > 10 && this.dragProject >= 0 && this.dragProject <= this.projects.length - 1 && this.dragProject !== null) {
					this.currentIndex = this.dragProject
				}
				this._lastDelta = 0;
				this.dragProject = null;
			},
			setImage(image) {
				if (image.length) {
					return `url(${image[0].url.trim().replace(' ', "%20")})`
				} else {
					return this.defaultImage
				}
			}
		},
		created() {
			if (this.close) {
				this.$root.destroyCourse()
			} else if (this.course) {
				this.$router.replace({ name: "story:profile" });
			}
		},
	};
});