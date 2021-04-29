define(() => {

    class CapacitorVideoRecorder {


        VideoRecorderPreviewFrame = {
            id: 'video-record',
            stackPosition: 'front', // 'front' overlays your app', 'back' places behind your app.
            width: 'fill',
            height: 'fill',
            x: 0,
            y: 200,
            borderRadius: 0


            /*id: string;
            stackPosition?: 'front' | 'back';
            x?: number;
            y?: number;
            width?: number | 'fill';
            height?: number | 'fill';
            borderRadius?: number;
            dropShadow?: {
                opacity?: number;
                radius?: number;
                color?: string;
            }*/
        };


        VideoRecorderCamera = {
            FRONT: 0, BACK: 1
        }

        static async get() {
            let backend;
            let Filesystem;

            if (window.Capacitor) {
                backend = Capacitor.Plugins.VideoRecorder;
                Filesystem = Capacitor.Plugins.Filesystem;
            }

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
            return await this.backend.stopRecording();
        }


        async destroy() {
            return await this.backend.destroy();
        }



    }

    return CapacitorVideoRecorder;
});