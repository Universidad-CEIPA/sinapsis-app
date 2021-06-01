define(() => {
	
	class CapacitorNotifications {

		static async get() {
			if (this.instance) {
				return this.instance;
			} else {
				let backend;
				let Plugins = window.Capacitor && Capacitor.Plugins;

				if (Plugins) {
					backend = Plugins.LocalNotifications;

					if (Capacitor.platform === "android") {
						let channel = (await backend.listChannels()).channels.filter(c => c.id === "ceipa")[0];

						if (!channel) {
							backend.createChannel({
								id: "ceipa",
								name: "Ceipa",
								description: 'Contraceptive alerts',
								importance: 5,
								visibility: 1,
								lights: true,
								vibration: true
							});
						}
					} else if (Capacitor.platform === "ios") {
						await backend.requestPermission();
					}
				} else {
					backend = this.getVoidBackend();
				}

				return new CapacitorNotifications(backend);
			}
		}

		static getVoidBackend() {
			return {
				cancelAll() { return Promise.resolve(); },
				createChannel() { return Promise.resolve(); },
				addListener() { return Promise.resolve({}); },
				getPending() { return Promise.resolve({notifications: []}); },
				listChannels() { return Promise.resolve({channels: []}); },
				schedule() { return Promise.resolve({}); }
			};
		}

		constructor(backend) {
			this.backend = backend;
		}

		cancelAll() {
			this.backend.cancel({
				notifications: this.backend.getPending()
			});
		}

		onNotificactionActivation(callback) {
			this.backend.addListener("localNotificationActionPerformed", e => callback(e.notification.id));
		}

		schedule(options) {
			let moreOptions = {};

			if (window.Capacitor && Capacitor.platform === "ios") {
				moreOptions.sound = "whatever";
			}

			return this.backend.schedule({
				notifications: [{
					...moreOptions,
					id: options.id,
					title: "Ceipa",
					body: options.text,
					schedule: options.trigger,
					group: options.group,
					channelId: "ceipa",
					threadIdentifier: "Ceipa",
					summaryArgument: "Ceipa",
					attachments: null,
					actionTypeId: "",
					extra: null
				}]
			})
		}
	}

	return CapacitorNotifications;
});