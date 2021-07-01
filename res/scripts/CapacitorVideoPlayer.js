"use strict";

define(["capacitor-video-player"], function (_capacitorVideoPlayer) {
    "use strict";

    var CapacitorVideoPlayer = {};
    Object.defineProperty(CapacitorVideoPlayer, "__esModule", {
        value: true
    });
    CapacitorVideoPlayer.setVideoPlayer = undefined;

    const setVideoPlayer = CapacitorVideoPlayer.setVideoPlayer = async () => {
        const platform = Capacitor.getPlatform();
        return {
            plugin: _capacitorVideoPlayer.CapacitorVideoPlayer,
            platform
        };
    };

    return CapacitorVideoPlayer;
});