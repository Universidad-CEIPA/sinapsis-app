define(() => {

    class CapacitorVideoRecorder {


        VideoRecorderPreviewFrame = {
            id: 'video-record',
            stackPosition: 'front',
            width: 250,
            height: 500,
            x: 100,
            y: 100,
            borderRadius: 0
        };


        VideoRecorderCamera = {
            FRONT: 0, BACK: 1
        }

        static async get(id = 'video-record' , position = 'front') {
            let backend;
            let Filesystem;

            if (window.Capacitor) {
                backend = Capacitor.Plugins.VideoRecorder;
                Filesystem = Capacitor.Plugins.Filesystem;
            }

            this.VideoRecorderPreviewFrame.id = id
            this.VideoRecorderPreviewFrame.stackPosition = position

            return new CapacitorVideoRecorder(backend, Filesystem);
        }

        constructor(backend, Filesystem) {
            this.backend = backend;
            this.filesystem = Filesystem;
        }


        async initialize() {
            await this.backend.initialize({
                camera: 0,
                previewFrames: [this.VideoRecorderPreviewFrame]
            });
        }

        async startRecording() {
            return await this.backend.startRecording().then();
        }

        async stopRecording() {
            let res = await this.backend.stopRecording();


            let video = res.videoUrl.split("/")
            video = video[video.length - 1]

            await this.filesystem.copy({
                from: video,
                to: video,
                directory: "CACHE",
                toDirectory: "DATA"
            });

            return video
        }


        destroy() {
            this.backend.destroy();
            this.backend = null
            return false
        }



    }

    return CapacitorVideoRecorder;
});