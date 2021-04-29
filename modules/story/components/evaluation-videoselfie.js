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
            return {
                recorder: null,
                fileSystem: null,
                videoPlayer: null,
                camera: 0,
                showVideostatus: 0,
                video: null,
                _handlerPlay: null,
                _handlerPause: null,
                _handlerEnded: null,
                _handlerExit: null,
                _handlerReady: null,
                _handlerPlaying: null,


                _apiTimer1: null,
                _apiTimer2: null,
                _apiTimer3: null
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
                let res = await this.recorder.stopRecording();

                this.video = res.videoUrl
                local("video", res.videoUrl)
                return this.video;
            },
            async destroy() {
                await this.recorder.destroy();
                this.camera = 0;
            },
            async showVideo() {
                if (this.video) {

                    let res = await this.videoPlayer.initPlayer({ mode: "fullscreen", url: this.video, playerId: "player", componentTag: "#video-player" });
                    showVideostatus = 1
                    const isPlaying = await this.videoPlayer.isPlaying({ playerId: "player" });
                    console.log('const isPlaying ', isPlaying)


                    const duration = await this.videoPlayer.getDuration({ playerId: "player" });
                    console.log("duration ", duration);

                    const play = await this.videoPlayer.play({ playerId: "player" });
                    console.log('const play ', play);


                    const isPlaying2 = await this.videoPlayer.isPlaying({ playerId: "player" });
                    console.log('const isPlaying ', isPlaying2)
                }
            },
            addListenersToPlayerPlugin() {
                this._handlerPlay = this.videoPlayer.addListener('jeepCapVideoPlayerPlay', (data) => {
                    console.log('Event jeepCapVideoPlayerPlay ', data);
                }, false);
                this._handlerPause = this.videoPlayer.addListener('jeepCapVideoPlayerPause', (data) => {
                    console.log('Event jeepCapVideoPlayerPause ', data);
                }, false);
                this._handlerEnded = this.videoPlayer.addListener('jeepCapVideoPlayerEnded', async (data) => {
                    console.log('Event jeepCapVideoPlayerEnded ', data);
                }, false);
                this._handlerExit = this.videoPlayer.addListener('jeepCapVideoPlayerExit', async (data) => {
                    console.log('Event jeepCapVideoPlayerExit ', data)
                }, false);
                this._handlerReady = this.videoPlayer.addListener('jeepCapVideoPlayerReady', async (data) => {
                    console.log('Event jeepCapVideoPlayerReady ', data)
                }, false);
                this._handlerPlaying = this.videoPlayer.addListener('jeepCapVideoPlayerPlaying', async (data) => {
                    console.log('Event jeepCapVideoPlayerPlaying ', data)
                    const isPlaying = await this._videoPlayer.isPlaying({ playerId: "player" });
                    console.log('const isPlaying ', isPlaying)
                }, false);
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
        async created() {
            await CapacitorVideoRecorder.get().then(recorder => this.recorder = recorder)
            //await CapacitorFilesystem.get().then(fileSystem => this.fileSystem = fileSystem)
            if (window.Capacitor) {
                this.videoPlayer = Capacitor.Plugins.CapacitorVideoPlayer;
                this.addListenersToPlayerPlugin();
            }
        }
    }



});