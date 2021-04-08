define([
	"loader",
	"local",
	"vue-router",
], (loader, local, VueRouter) => {

	const m = loader("modules");

	const router = VueRouter.createRouter({
		history: VueRouter.createWebHashHistory(),
		routes: [

			{ name: "home", path: "/", component: m("home/index") },

			{ name: "story:profile", path: "/story/profile", component: m("story/profile") },
			{ name: "story:welcome", path: "/story/welcome", component: m("story/welcome-course") },

			{ name: "welcome:finish", path: "/setup/finish", component: m("welcome/finish")},
			{ name: "welcome:index", path: "/welcome/:token", component: m("welcome/index"), props: true  },
			{ name: "welcome:login", path: "/login", component: m("welcome/login") },
			{ name: "welcome:setup", path: "/setup", component: m("welcome/setup") },
		]
	});

	router.beforeEach((to, from, next) => {
		let user = local('user');
		if (!user && to.name !== "welcome:login" && to.name !== "welcome:index") {
			next({ name: "welcome:login" });
		} else {
			next();
		}
	});

	return router;
});