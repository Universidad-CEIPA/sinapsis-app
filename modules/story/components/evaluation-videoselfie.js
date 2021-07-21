define([
    "text!./evaluation-videoselfie.html",
    "api",
    "local"
], (html, api, local) => {

    return {
        template: html,
        props: ['questions'],
        data() {
            return {
                fileSystem: null,
                storage: null,
                videoPlayer: null,

                videos: [],
                maxTime: 60,
                videoFile: null,

                showVideostatus: false,
            };
        },
        methods: {
            handleInput(e) {
                let file = e.target.files[0];

                let videoUrl = URL.createObjectURL(file);
                let audioElement = new Audio(videoUrl);

                audioElement.addEventListener("loadedmetadata", () => {
                    let duration = audioElement.duration;
                    if (duration > this.maxTime) {
                        console.log("El video no debe durar mas de 1 minuto")
                        return false;
                    }
                    this.addVideo(file);
                });
            },

            async addVideo(file) {
                const fileName = "question-" + this.questions.id + ".mp4";
                const base64Data = await this.convertToBase64(file)

                if (window.Capacitor) {

                    const savedFile = await this.filesystem.writeFile({
                        path: fileName,
                        data: base64Data,
                        directory: 'DATA'
                    });

                    const videoKey = "videos_" + this.$root.currentCourse.courseId
                    const videoList = await this.storage.get({ key: videoKey })

                    this.videos = videoList.value ? JSON.parse(videoList.value) : []
                    this.videos.unshift(savedFile.uri)
                    this.videoFile = savedFile.uri

                    this.storage.set({
                        key: videoKey,
                        value: JSON.stringify(this.videos)
                    })
                }
                this.answer.append("file", file);
            },


            async saveVideo() {
                this.uploading = true;

                let respons = await api.post("students/uploadVideo", this.answer, {
                    /*onUploadProgress: e => {
                        this.progress = ((e.loaded / e.total) * 100).toFixed(1);
                    }*/
                });

                this.uploading = false;

                if (respons) {
                    this.$emit('next')
                } else {
                    console.log("error")
                }

                return false;
            },

            convertToBase64(blob) {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader

                    reader.onerror = reject;

                    reader.onload = () => {
                        resolve(reader.result)
                    }
                    reader.readAsDataURL(blob)
                })
            },
            addListenersToPlayerPlugin() {
                this.videoPlayer.addListener('jeepCapVideoPlayerPlay', (data) => { }, false);
                this.videoPlayer.addListener('jeepCapVideoPlayerPause', (data) => { }, false);
                this.videoPlayer.addListener('jeepCapVideoPlayerEnded', (data) => { this.showVideostatus = false }, false);
                this.videoPlayer.addListener('jeepCapVideoPlayerExit', (data) => { this.showVideostatus = false }, false);
                this.videoPlayer.addListener('jeepCapVideoPlayerReady', (data) => { }, false);
                this.videoPlayer.addListener('jeepCapVideoPlayerPlaying', async (data) => { }, false);
            },
            async showVideo() {
                let video = this.videoFile.split("/")
                video = video[video.length - 1]

                //if (Capacitor.platform === "android") {
                let url = "application/files/" + video;
                /*} else if (Capacitor.platform === "ios") {
                    let url = "application/" + video;
                }*/

                this.showVideostatus = true
                await this.videoPlayer.initPlayer({ mode: "fullscreen", url: url, playerId: "player", componentTag: "#video-player" });
            },
            reset() {
                this.answer = new FormData();
                this.answer.append("studentId", this.$root.currentCourse.studentId);
                this.answer.append("questionId", this.questions.id);
                this.answer.append("courseId", this.$root.currentCourse.courseId);

            }
        },
        async created() {
            if (window.Capacitor) {
                this.videoPlayer = Capacitor.Plugins.CapacitorVideoPlayer;
                this.filesystem = Capacitor.Plugins.Filesystem;
                this.storage = Capacitor.Plugins.Storage;
                this.addListenersToPlayerPlugin();
            }
            this.reset()
        },
    }



});