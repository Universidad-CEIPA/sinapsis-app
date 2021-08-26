define([
    "CapacitorNotifications",
    "local",
    "logic/Course",
    "dayjs"
], (CapacitorNotifications, local, Course, dayjs) => {

    class ActivityNotifications {

        static get() {
            return Promise.all([
                CapacitorNotifications.get(),
                Course.getCurrent()
            ]).then(r => new ActivityNotifications(...r));
        }

        constructor(backend, course) {
            this.backend = backend;
            this.course = course;
        }

        cancelAll() {
            this.backend.cancelAll();
        }

        init(router) {
            this.backend.onNotificactionActivation(id => this.processNotification(id, router));
        }

        processNotification(router) {
            router.push({ name: 'story:home', params: { 'tiny': true } })
        }

        async reset(router) {
            // this.backend.cancelAll();
            let id = 1;

            let today = new Date()

            let text = {
                "reading": "Tienes una nueva lectura",
                "map": "Tienes un nuevo mapa",
                "hero-letter": "Tienes una nueva lectura",
            };

            this.course.chapters.map(chapter => {
                let activity = chapter.activities.length ? chapter.activities : chapter.maps

                if (Array.isArray(activity)) {
                    activity.map(act => {

                        let date = new Date(act.date)
                        let time = new Date(act.time)

                        date.setHours(time.getHours())

                        date.setMinutes(time.getMinutes());
                        date.setSeconds(0);


                        if (date > today)
                            this.schedule({
                                id: id++,
                                text: text[act.activity.type],
                                group: "activity",
                                trigger: { at: date },
                                extra: {
                                    route: "story:home",
                                    params: { tiny: true }
                                }
                            });
                    })
                } else {

                    let date = new Date(activity.date)
                    let time = new Date(activity.time)

                    date.setHours(time.getHours())
                    date.setMinutes(time.getMinutes());
                    date.setSeconds(0);

                    if (date > today)
                        this.schedule({
                            id: id++,
                            text: text["map"],
                            group: "activity",
                            trigger: { at: date },
                            extra: {
                                route: "story:home",
                                params: { tiny: true }
                            }
                        });

                }
            })


            this.course.hero_letter.map(card => {
                let date = new Date(card.date)
                let time = new Date(card.time)

                date.setHours(time.getHours())
                date.setMinutes(time.getMinutes());
                date.setSeconds(0);

                if (date > today)
                    this.schedule({
                        id: id++,
                        text: text[card.activity.type],
                        group: "activity",
                        trigger: { at: date },
                        extra: {
                            route: "story:home",
                            params: { tiny: true }
                        }
                    });
            })

            this.backend.listener(router);
        }

        async forceReset(router) {
            //this.backend.cancelAll();
            let id = 1;

            let addMinute = 5;

            let today = new Date()

            let text = {
                "reading": "Tienes una nueva lectura",
                "map": "Tienes un nuevo mapa",
                "hero-letter": "Tienes una carta del héroe",
            };

            this.course.chapters.map(chapter => {
                let activity = chapter.activities.length ? chapter.activities : chapter.maps

                if (Array.isArray(activity)) {
                    activity.map(act => {
                        today.setMinutes(today.getMinutes() + addMinute);

                        this.schedule({
                            id: id++,
                            text: text[act.activity.type],
                            group: "activity",
                            trigger: { at: today },
                            extra: {
                                route: "story:home",
                                params: { tiny: true }
                            }
                        });
                    })
                } else {
                    today.setMinutes(today.getMinutes() + addMinute);

                    this.schedule({
                        id: id++,
                        text: text["map"],
                        group: "activity",
                        trigger: { at: today },
                        extra: {
                            route: "story:home",
                            params: { tiny: true }
                        }
                    });

                }
            })


            this.course.hero_letter.map(card => {
                today.setMinutes(today.getMinutes() + addMinute);

                this.schedule({
                    id: id++,
                    text: text[card.activity.type],
                    group: "activity",
                    trigger: { at: today },
                    extra: {
                        route: "story:home",
                        params: { tiny: true }
                    }
                });
            })

            this.schedule({
                id: id++,
                title: "Notificaciones forzadas",
                text: "Las notificaciones han sido reprogramadas",
                extra: null
            });

            this.backend.listener(router);
        }


        schedule(options) {
            // control de notificaciones en web
            //console.log("ActivityNotifications::schedule", options.trigger ? options.trigger.at : "(now)", options.text);

            return this.backend.schedule({
                icon: null,
                smallIcon: "res://notification",
                foreground: true,
                ...options
            });
        }
    }

    return ActivityNotifications;
});
