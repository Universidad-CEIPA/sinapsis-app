define(() => {

    class CapacitorVideoRecorder {




        VideoRecorderCamera = {
            FRONT: 0, BACK: 1
        }

        static async get(setId = 'video-record', position = 'front') {
            let backend;
            let Filesystem;

            let VideoRecorderPreviewFrame = {
                    id: setId,
                    stackPosition:position,
                    width: 250,
                    height: 500,
                    x: 100,
                    y: 100,
                    borderRadius: 0
                };


            if (window.Capacitor) {
                backend = Capacitor.Plugins.VideoRecorder;
                Filesystem = Capacitor.Plugins.Filesystem;
            }

            // = VideoRecorderPreviewFrame
            //this.VideoRecorderPreviewFrame.id = setId
            //this.VideoRecorderPreviewFrame.stackPosition = position

            return new CapacitorVideoRecorder(backend, Filesystem,VideoRecorderPreviewFrame);
        }

        constructor(backend, Filesystem, VideoRecorderPreviewFrame) {
            this.VideoRecorderPreviewFrame = VideoRecorderPreviewFrame
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