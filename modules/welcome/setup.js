define([
    "text!./setup.html"
], (html) => {

    return {
        template: html,
        data() {
            return {
                WELCOME_STEP: 1,
                INSTRUCTION_STEP: 2,
                FINISH_STEP: 3,
                MAX_STEPS: 3,
                step: 1
            };
        },
        methods: {

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

						let preview = this.step + delta
						if (preview > 0 && preview <= this.MAX_STEPS) {
							this.dragStep = preview
						}
					}
				}
			},
			handlePointerUp(e) {
				if (e.changedTouches) e = e.changedTouches[0];
				if (Math.abs(this._pointerStart.clientX - e.clientX) > 10 && this.dragStep > 0 && this.dragStep <= this.MAX_STEPS && this.dragStep !== null) {
					this.step = this.dragStep
				}
				this._lastDelta = 0;
				this.dragStep = null;

			},
            returnStep(step){
                this.step = step;
            },

        }
    };
});