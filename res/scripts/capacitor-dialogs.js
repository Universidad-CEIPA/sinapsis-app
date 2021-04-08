if (window.Capacitor) {
	window.alertAsync = (message, title) => Capacitor.Plugins.Modals.alert({message, title});
	window.confirmAsync = (message, title) => Capacitor.Plugins.Modals.confirm({message, title}).then(result => result.value);
	window.promptAsync = (message, title) => Capacitor.Plugins.Modals.prompt({message, title}).then(result => !result.cancelled && result.value);
} else {
	window.alertAsync = message => Promise.resolve(alert(message));
	window.confirmAsync = message => Promise.resolve(confirm(message));
	window.promptAsync = (message, defaultValue) => Promise.resolve(prompt(message, defaultValue));
}