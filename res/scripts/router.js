define([
	"loader",
	"vue-router",
], (loader, VueRouter) => {

	const c = loader("modules");
	
	const router = VueRouter.createRouter({
		history: VueRouter.createWebHashHistory(),
		routes: [
			{name: "home", path: "/", component: c("home/index")},
			{name: "welcome:login", path: "/login", component: c("welcome/index")},
		]
	});

	return router;
});