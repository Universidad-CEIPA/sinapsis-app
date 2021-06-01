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

        processNotification(id, router) {
            router.push({ name: "story:home" });
        }

        async reset() {
            let text = "Alarma";

            /*const device = window.Capacitor ? await Capacitor.Plugins.Device.getInfo() : {};
            const FIRST_WAVE_DAYS = 14;
            const SECOND_WAVE_DAYS = device.operatingSystem === "ios" ? FIRST_WAVE_DAYS + 3 : 365;*/
            let id = 1;


            this.course.schedule.map(chapter => {
                let activity = chapter.activities.length ? chapter.activities : chapter.maps

                if (Array.isArray(activity)) {
                    activity.map(act => {

                        let date = new Date(act.date)
                        let time = new Date(act.time)

                        date.setHours(time.getHours())
                        date.setMinutes(time.getMinutes());
                        date.setSeconds(0);
                        text = "Nueva Actividad de " + act.activity.type


                        this.schedule({
                            id: id++,
                            text: text,
                            group: "activity",
                            trigger: { at: date }
                        });
                    })
                } else {

                    let date = new Date(activity.date)
                    let time = new Date(activity.time)

                    date.setHours(time.getHours())
                    date.setMinutes(time.getMinutes());
                    date.setSeconds(0);

                    text = "Nuevo Mapa disponible"

                    this.schedule({
                        id: id++,
                        text: text,
                        group: "activity",
                        trigger: { at: date }
                    });

                }
            })


        }

        schedule(options) {
            console.log("ActivityNotifications::schedule", options.trigger ? options.trigger.at : "(now)", options.text);
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
