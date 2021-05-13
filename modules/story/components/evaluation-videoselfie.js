define([
    "text!./evaluation-videoselfie.html",
    "CapacitorVideoRecorder",
    "local"
], (html, CapacitorVideoRecorder, local) => {

    return {
        template: html,
        props: ['questions'],
        data() {
            let video = local("video") || null
            return {
                recorder: null,
                fileSystem: null,
                videoPlayer: null,
                camera: 0,
                showVideostatus: 0,
                video
            };
        },
        methods: {
            addListenersToPlayerPlugin() {
                this.videoPlayer.addListener('jeepCapVideoPlayerPlay', (data) => { }, false);
                this.videoPlayer.addListener('jeepCapVideoPlayerPause', (data) => { }, false);
                this.videoPlayer.addListener('jeepCapVideoPlayerEnded', async (data) => { }, false);
                this.videoPlayer.addListener('jeepCapVideoPlayerExit', async (data) => { }, false);
                this.videoPlayer.addListener('jeepCapVideoPlayerReady', async (data) => { }, false);
                this.videoPlayer.addListener('jeepCapVideoPlayerPlaying', async (data) => { }, false);
            },
            destroy() {
                this.recorder.destroy();
                this.camera = 0;
            },
            async showVideo() {
                let url = "application/files/" + this.video;
                await this.videoPlayer.initPlayer({ mode: "fullscreen", url: url, playerId: "player", componentTag: "#video-player" });
                showVideostatus = 1
                await this.videoPlayer.isPlaying({ playerId: "player" });

                await this.videoPlayer.play({ playerId: "player" });
                await this.videoPlayer.isPlaying({ playerId: "player" });

            },
            async startCamera() {
                await this.recorder.initialize();
                this.camera = 1
            },
            startVideo() {
                this.recorder.startRecording();
            },
            async stopVideo() {
                this.video = await this.recorder.stopRecording();

                local("video", this.video)
                return this.video;
            },
        },
        components: {
        },
        async created() {
            await CapacitorVideoRecorder.get().then(recorder => this.recorder = recorder)
            if (window.Capacitor) {
                this.videoPlayer = Capacitor.Plugins.CapacitorVideoPlayer;
                this.addListenersToPlayerPlugin();
            }
        },
        mounted() {
            this.answers = this.questions
            Object.entries(this.answers).forEach(([key, question]) => {
                question.answer = []
            });
        },
        beforeDestroyed() {
            this.destroy()
        },
        destroyed() {
            this.destroy()
        }
    }



});