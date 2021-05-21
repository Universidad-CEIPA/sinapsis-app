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
			{ name: "home:profile", path: "/profile", component: m("home/profile") },

			{ name: "story:activity", path: "/story/activity", component: m("story/activity"), props: true },
			{ name: "story:binnacle", path: "/story/binnacle", component: m("story/binnacle") },
			{ name: "story:credits", path: "/story/credits", component: m("story/credits") },
			{ name: "story:evaluation:cuantitative", path: "/story/autoevaluation/cuantitative", component: m("story/autoevaluation"), props: { type: "cuantitative" } },
			{ name: "story:evaluation:cualitative", path: "/story/autoevaluation/cualitative", component: m("story/autoevaluation"), props: { type: "cualitative" } },
			{ name: "story:evaluation:video", path: "/story/autoevaluation/video", component: m("story/autoevaluation"), props: { type: "videoselfie" } },
			{ name: "story:finish", path: "/story/finish", component: m("story/finish") },
			{ name: "story:home", path: "/story/home", component: m("story/index"), props: true },
			{ name: "story:map", path: "/story/map", component: m("story/map"), props: true },
			{ name: "story:profile", path: "/story/profile", component: m("story/profile") },
			{ name: "story:skills", path: "/story/skills", component: m("story/skills") },
			{ name: "story:skills:desired", path: "/story/desired", component: m("story/desired-skills") },
			{ name: "story:welcome", path: "/story/welcome", component: m("story/welcome-course") },


			{ name: "welcome:index", path: "/welcome/:token", component: m("welcome/index"), props: true },
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