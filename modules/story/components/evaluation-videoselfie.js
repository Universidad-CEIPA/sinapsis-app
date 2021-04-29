define([
    "text!./evaluation-videoselfie.html",
    "CapacitorVideoRecorder",
    "CapacitorFilesystem",
    "local"
], (html, CapacitorVideoRecorder, CapacitorFilesystem, local) => {

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
            async startCamera() {
                await this.recorder.initialize();
                this.camera = 1
            },
            startVideo() {
                this.recorder.startRecording();
            },
            async StopVideo() {
                this.video = await this.recorder.stopRecording();

                local("video", this.video)
                return this.video;
            },
            destroy() {
                this.recorder.destroy();
                this.camera = 0;
            },
            async showVideo() {
                let url = "application/files/" + this.video;
                let res = await this.videoPlayer.initPlayer({ mode: "fullscreen", url: url, playerId: "player", componentTag: "#video-player" });
                showVideostatus = 1
                await this.videoPlayer.isPlaying({ playerId: "player" });

                await this.videoPlayer.play({ playerId: "player" });
                await this.videoPlayer.isPlaying({ playerId: "player" });

            },
            addListenersToPlayerPlugin() {
                this.videoPlayer.addListener('jeepCapVideoPlayerPlay', (data) => { }, false);
                this.videoPlayer.addListener('jeepCapVideoPlayerPause', (data) => { }, false);
                this.videoPlayer.addListener('jeepCapVideoPlayerEnded', async (data) => { }, false);
                this.videoPlayer.addListener('jeepCapVideoPlayerExit', async (data) => { }, false);
                this.videoPlayer.addListener('jeepCapVideoPlayerReady', async (data) => { }, false);
                this.videoPlayer.addListener('jeepCapVideoPlayerPlaying', async (data) => { }, false);
            }

        },
        components: {
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
        },
        async created() {
            await CapacitorVideoRecorder.get().then(recorder => this.recorder = recorder)
            if (window.Capacitor) {
                this.videoPlayer = Capacitor.Plugins.CapacitorVideoPlayer;
                this.addListenersToPlayerPlugin();
            }
        }
    }



});