define([
	"api",
	"dayjs",
	"text!./ui-input.html"
], (api, dayjs, html) => {

	let htmlId = 0;

	return {
		template: html,
		inject: ["ui", "uiForm"],
		props: {
			modelValue: {
				type: [String, Number, Boolean, Date],
				default: null
			},
			label: {
				type: String,
				required: true
			},
			type: {
				type: String,
				default: "text"
			},
			required: {
				type: Boolean
			},
			min: {
				type: [Number, Date]
			},
			max: {
				type: [Number, Date]
			},
			minlength: {
				type: Number
			},
			maxlength: {
				type: Number
			},
			pattern: {
				type: String
			},
			placeholder: {
				type: String
			},
			disabled: {
				type: Boolean
			},
			readOnly: {
				type: Boolean
			},
			src: {
				type: String
			},
			selectOptions: {
				type: Array
			},
			query: {
				type: Object
			},
			idProp: {
				type: String,
				default: "id"
			},
			labelProp: {
				type: String,
				default: "name"
			}
		},
		data() {
			return {
				htmlId: `ui-input-${++htmlId}`,
				isValid: true,
				loading: false,
				options: this.selectOptions || []
			};
		},
		computed: {
			attributes() {
				let attrs = {
					...this.$props,
					id: this.htmlId,
					disabled: this.globallyDisabled
				};
				if (!this.readOnly) {
					delete attrs.readOnly;
				}
				delete attrs.idProp;
				delete attrs.labelProp;
				delete attrs.modelValue;
				delete attrs.selectOptions;
				return attrs;
			},
			uiClasses() {
				return [
					{
						valid: this.isValid,
						invalid: !this.isValid,
					},
					`ui-${this.type}`
				];
			},
			customStyle() {
				if (this.type === "range") {
					return {
						'--min-input': isNaN(this.min) ? 0 : this.min,
						'--max-input': isNaN(this.max) ? 100 : this.max,
						'--value-input' : this.modelValue || 0
					}

				}
			},
			filteredModelValue() {
				if (this.type === "select" && this.modelValue === null) {
					return "";
				} else {
					return this.modelValue;
				}
			},
			globallyDisabled() {
				return this.disabled || this.uiForm?.disabled || this.loading;
			}
		},
		methods: {
			castValue(rawValue) {
				switch (this.type) {
					case "number":
						return +rawValue;
					case "date":
						return dayjs(rawValue).toDate();
					case "datetime-local":
						return dayjs(rawValue).toDate();
					default:
						return rawValue === "" ? null : rawValue;
				}
			},
			getOptionLabel(item) {
				return typeof item === "object" ? item[this.labelProp] : item;
			},
			getOptionValue(item) {
				return typeof item === "object" ? item[this.idProp] : item;
			},
			handleInput(e) {
				let value = this.castValue(e.target.value);
				this.$emit("update:modelValue", value);
			},
			async loadFromSrc() {
				this.loading = true;
				this.options = await api.get(this.src, this.query);
				this.loading = false;
			},
			validate() {
				this.isValid = this.$refs.input.checkValidity();
				return this.isValid;
			}
		},
		created() {
			if (this.uiForm) {
				this.uiForm.registerUiField(this);
			}
			if (this.src && this.type === "select") {
				this.loadFromSrc();
			}
		},
		beforeDestroy() {
			this.$trigger("destroy");
		}
	};
});