define([
    "text!./binnacle.html",
    "api",
], (html, api) => {

    return {
        template: html,
        props: ["course"],
        data() {
            return {
                videos: {},
                videoPlayer: null,
                showVideostatus: false
            }
        },
        methods: {
            addListenersToPlayerPlugin() {
                this.videoPlayer.addListener('jeepCapVideoPlayerPlay', (data) => { }, false);
                this.videoPlayer.addListener('jeepCapVideoPlayerPause', (data) => { }, false);
                this.videoPlayer.addListener('jeepCapVideoPlayerEnded', (data) => { this.showVideostatus = false }, false);
                this.videoPlayer.addListener('jeepCapVideoPlayerExit', (data) => { this.showVideostatus = false }, false);
                this.videoPlayer.addListener('jeepCapVideoPlayerReady', (data) => { }, false);
                this.videoPlayer.addListener('jeepCapVideoPlayerPlaying', async (data) => { }, false);
            },
            async getFileFromUrl(url, name, type) {
                const response = await fetch(url);
                const data = await response.blob();
                return new File([data], name, { type });
            },

            async playVideo(videoUrl) {
                this.showVideostatus = true
                await this.videoPlayer.initPlayer({ mode: "fullscreen", url: videoUrl, playerId: "player", componentTag: "#video-player" });
            }

        },

        async created() {
            if (window.Capacitor) {
                this.videoPlayer = Capacitor.Plugins.CapacitorVideoPlayer;
                this.addListenersToPlayerPlugin();
            }

            this.videos = await api.get(`students/getUploadVideos?courseId=${this.course.courseId}&studentId=${this.course.studentId}`);
            this.videos.forEach(async (element) => {
                const file = await this.getFileFromUrl(element.url, 'question_' + element.question.id + '.mp4', element.type);
                console.log(file)
            });
        }
    }
});