define([
	"modules/layout",
	"vue",
	"vue-date",
	"vue-util",
], (Layout, Vue, VueDate, VueUtil) => {
	
	const app = Vue.createApp(Layout);

	app
		.use(VueDate)
		.use(VueUtil)
	;

	return app;
});