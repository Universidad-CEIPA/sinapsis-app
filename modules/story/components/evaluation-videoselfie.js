
define([
    "text!./evaluation-videoselfie.html",
    "CapacitorVideoPlayer",
    "local"
], (html, CapacitorVideoPlayer, local) => {

    return {
        template: html,
        props: ['questions'],
        data() {
            let video = local("video") || "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4"
            return {
                recorder: null,
                fileSystem: null,
                videoPlayer: null,
                camera: false,
                showVideostatus: false,
                video,
                interval:null,
                _testApi: true,
                _first: false,
                _apiTimer1:null,
                _apiTimer2:null,
                _apiTimer3:null,
            };
        },
        methods: {
            addListenersToPlayerPlugin() {
                this.videoPlayer.addListener('jeepCapVideoPlayerPlay', (data) => { console.log('Event jeepCapVideoPlayerPlay ', data); }, false);
                this.videoPlayer.addListener('jeepCapVideoPlayerPause', (data) => { console.log('Event jeepCapVideoPlayerPause ', data); }, false);
                this.videoPlayer.addListener('jeepCapVideoPlayerEnded', async (data) => { console.log('Event jeepCapVideoPlayerEnded ', data); }, false);
                this.videoPlayer.addListener('jeepCapVideoPlayerExit', async (data) => { console.log('Event jeepCapVideoPlayerExit ', data) }, false);
                this.videoPlayer.addListener('jeepCapVideoPlayerReady', async (data) => {
                    console.log('Event jeepCapVideoPlayerReady ', data)
                    console.log("testVideoPlayerPlugin testAPI ", this._testApi);
                    console.log("testVideoPlayerPlugin first ", this._first);
                    if (this._testApi && this._first) {
                        // test the API
                        this._first = false;
                        console.log("testVideoPlayerPlugin calling isPlaying ");
                        const isPlaying = await this.videoPlayer.isPlaying({ playerId: "player" });
                        console.log('const isPlaying ', isPlaying)
                        this._apiTimer1 = setTimeout(async () => {
                            const pause = await this.videoPlayer.pause({ playerId: "player" });
                            console.log('const pause ', pause)
                            const isPlaying = await this.videoPlayer.isPlaying({ playerId: "player" });
                            console.log('const isPlaying after pause ', isPlaying)
                            let currentTime = await this.videoPlayer.getCurrentTime({ playerId: "player" });
                            console.log('const currentTime ', currentTime);
                            let muted = await this.videoPlayer.getMuted({ playerId: "player" });
                            console.log('initial muted ', muted);
                            const setMuted = await this.videoPlayer.setMuted({ playerId: "player", muted: !muted.value });
                            console.log('setMuted ', setMuted);
                            muted = await this.videoPlayer.getMuted({ playerId: "player" });
                            console.log('const muted ', muted);
                            const duration = await this.videoPlayer.getDuration({ playerId: "player" });
                            console.log("duration ", duration);
                            // valid for movies havin a duration > 25
                            const seektime = currentTime.value + 0.5 * duration.value < duration.value - 25 ? currentTime.value + 0.5 * duration.value
                                : duration.value - 25;
                            const setCurrentTime = await this.videoPlayer.setCurrentTime({ playerId: "player", seektime: (seektime) });
                            console.log('const setCurrentTime ', setCurrentTime);
                            const play = await this.videoPlayer.play({ playerId: "player" });
                            console.log("play ", play);
                            this._apiTimer2 = setTimeout(async () => {
                                const setMuted = await this.videoPlayer.setMuted({ playerId: "player", muted: false });
                                console.log('setMuted ', setMuted);
                                const setVolume = await this.videoPlayer.setVolume({ playerId: "player", volume: 0.5 });
                                console.log("setVolume ", setVolume);
                                const volume = await this.videoPlayer.getVolume({ playerId: "player" });
                                console.log("Volume ", volume);
                                this._apiTimer3 = setTimeout(async () => {
                                    const pause = await this.videoPlayer.pause({ playerId: "player" });
                                    console.log('const pause ', pause);
                                    const duration = await this.videoPlayer.getDuration({ playerId: "player" });
                                    console.log("duration ", duration);
                                    const volume = await this.videoPlayer.setVolume({ playerId: "player", volume: 1.0 });
                                    console.log("Volume ", volume);
                                    const setCurrentTime = await this.videoPlayer.setCurrentTime({ playerId: "player", seektime: (duration.value - 3) });
                                    console.log('const setCurrentTime ', setCurrentTime);
                                    const play = await this.videoPlayer.play({ playerId: "player" });
                                    console.log('const play ', play);
                                }, 10000);
                            }, 10000);
                        }, 5000);
                    }
                }, false);

                this.videoPlayer.addListener('jeepCapVideoPlayerPlaying', async (data) => { console.log('Event jeepCapVideoPlayerPlaying ', data) }, false);
            },
            destroy() {
                this.recorder.destroy();
                this.camera = false;
            },
            async showVideo() {
                let url = this.video //"application/files/" + this.video;
                showVideostatus = true
                await this.videoPlayer.initPlayer({ mode: "fullscreen", url: url, playerId: "player", componentTag: "#video-player" });

                //await this.videoPlayer.isPlaying({ playerId: "player" });

                //await this.videoPlayer.play({ playerId: "player" });
                //await this.videoPlayer.isPlaying({ playerId: "player" });

            },
            async startCamera() {
                await this.recorder.initialize().then(a => {
                    this.camera = true
                    //this.timeVideo()
                });

            },
            startVideo() {
                this.recorder.startRecording();
            },
            async stopVideo() {

                this.video = await this.recorder.stopRecording().then(a => {
                    //clearInterval(this.interval);
                });

                local("video", this.video)
                return this.video;
            },
            timeVideo() {
                let global = this
                this.interval = setInterval(async () => {
                    console.log(await global.recorder.getDuration());
                }, 500)
            },
            reset() {
                //this.answers.courseId = this.$root.currentCourse.courseId
                //this.answers.studentId = this.$root.currentCourse.studentId
                //this.answers.evaluation = 0
                //this.answers.questionId = this.questions.id
                //this.answers.type = this.questions.type
                //this.answers.title = this.questions.content

            }
        },
        async created() {
            //await CapacitorVideoRecorder.get().then(recorder => this.recorder = recorder)
            if (window.Capacitor) {
                this.videoPlayer = CapacitorVideoPlayer;
                this.addListenersToPlayerPlugin();
            }

            this.reset()
        },
        beforeDestroyed() {
            this.destroy()
        },
        destroyed() {
            this.destroy()
        }
    }



});