define([
    "text!./index.html",
    "components/ui-modal",
    "./components/tour",
    "./components/finish-modal",
], (html, UiModal, tour, finishModal) => {

    return {
        template: html,
        data() {
            widthChapter = 160;
            return {
                story: this.$root.currentCourse,
                startShow: 0,
                modal: false,
                finished: true,
                widthChapter,
                filterActivities: 'progress',
                maxShow: 0,
                chaptersShow: 0,
                chapters:
                    [{
                        name: "Capítulo 1",
                        advance: "1",
                        total: "5",
                        summary: "La historia de los siete Sabios Portocalenses",
                        title: "CAPÍTULO 1",
                        text: '<p>Hacia comienzos del siglo VIII de la era cristiana, durante el apogeo de las sociedades germánicas de laPenínsula Ibérica, un grupo de siete obispos portocalenses de la secta arriana dedicaban sus vidas al estudio y conocimiento de la obra de Dios en la tierra y su palabra.Estos obispos, que también eran eruditos y filósofos, después de muchos años de estudio y meditación llegaron a la conclusión que el conocimiento de la obra del Dios debía estar acompañado del conocimiento y aceptación de otros pueblos y modos de vida a partir de su comprensión de la compasión de Cristo. </p> <p> Debido a sus filosofías e interpretaciones de la Palabra, contaban tanto con fieles seguidores - una minoría entre la mayoría católica romana ibérica - como con acérrimos enemigos, especialmente dentro de la Iglesia Católica, que no sólo condenaba que los arrianos no asumieran a Cristo como un ser divino (desde lo que justamente partía su indiscriminada compasión hacia la condición humana), sino que también veía con malos ojos un discurso de aceptación y reconocimiento de otros pueblos con base pacífica, arguyendo que se ponía en contra de la sagrada labor de la evangelización, la encarnación de la esencia divina en el hombre y la conversión al catolicismo de todas las gentes de la tierra. </p> <p> Sin embargo, los reyes y obispos católicos visigodos no emprendieron acciones directas en contra de los obispos arrianos, conocidos como Los Siete Sabios Portocalenses, quienes tenían una pequeña, pero consistente y fervorosa cantidad de seguidores. Las noticias de sus palabras llegaban lejos y la periferia galaica se vio enriquecida tanto por su sabiduría como por sus decisiones estratégicas en cuanto a temas de comercio. Así, los Sabios planteaban que una de las formas más efectivas de aprender y recopilar conocimientos era mediante el comercio, ya que las relaciones de intercambio exigían un respeto mutuo por parte de ambos lados, además del privilegio que implicaba convivir con diversas comunidades y aprender de sus costumbres. </p> <p> De esta manera comenzaron a plantear que las ciudades deberían relacionarse a partir de rutas comerciales y no desde las conquistas armadas, costumbre no desconocida en los antiguos imperios de la Humanidad. Sus planes fueron fructíferos, los Sabios vivían sin problemas con sus comunidades, hasta que una conjunción de eventualidades y nuevos desafíos les obligaron a tomar una decisión que cambiaría sus vidas radicalmente. </p>',
                        scroll: false,
                        type: "outdoor"
                    },
                    {
                        name: "Capítulo 2",
                        advance: "2",
                        total: "3",
                        summary: "La profecía se cumple",
                        title: "CAPÍTULO 2",
                        text: '<p>Hacia comienzos del siglo VIII de la era cristiana, durante el apogeo de las sociedades germánicas de laPenínsula Ibérica, un grupo de siete obispos portocalenses de la secta arriana dedicaban sus vidas al estudio y conocimiento de la obra de Dios en la tierra y su palabra.Estos obispos, que también eran eruditos y filósofos, después de muchos años de estudio y meditación llegaron a la conclusión que el conocimiento de la obra del Dios debía estar acompañado del conocimiento y aceptación de otros pueblos y modos de vida a partir de su comprensión de la compasión de Cristo. </p> <p> Debido a sus filosofías e interpretaciones de la Palabra, contaban tanto con fieles seguidores - una minoría entre la mayoría católica romana ibérica - como con acérrimos enemigos, especialmente dentro de la Iglesia Católica, que no sólo condenaba que los arrianos no asumieran a Cristo como un ser divino (desde lo que justamente partía su indiscriminada compasión hacia la condición humana), sino que también veía con malos ojos un discurso de aceptación y reconocimiento de otros pueblos con base pacífica, arguyendo que se ponía en contra de la sagrada labor de la evangelización, la encarnación de la esencia divina en el hombre y la conversión al catolicismo de todas las gentes de la tierra. </p> <p> Sin embargo, los reyes y obispos católicos visigodos no emprendieron acciones directas en contra de los obispos arrianos, conocidos como Los Siete Sabios Portocalenses, quienes tenían una pequeña, pero consistente y fervorosa cantidad de seguidores. Las noticias de sus palabras llegaban lejos y la periferia galaica se vio enriquecida tanto por su sabiduría como por sus decisiones estratégicas en cuanto a temas de comercio. Así, los Sabios planteaban que una de las formas más efectivas de aprender y recopilar conocimientos era mediante el comercio, ya que las relaciones de intercambio exigían un respeto mutuo por parte de ambos lados, además del privilegio que implicaba convivir con diversas comunidades y aprender de sus costumbres. </p> <p> De esta manera comenzaron a plantear que las ciudades deberían relacionarse a partir de rutas comerciales y no desde las conquistas armadas, costumbre no desconocida en los antiguos imperios de la Humanidad. Sus planes fueron fructíferos, los Sabios vivían sin problemas con sus comunidades, hasta que una conjunción de eventualidades y nuevos desafíos les obligaron a tomar una decisión que cambiaría sus vidas radicalmente. </p>',
                        scroll: true,
                        type: "outdoor"
                    },
                    {
                        name: "Capítulo 3 / card",
                        advance: "1",
                        total: "5",
                        summary: "La historia de los siete Sabios Portocalenses",
                        title: "CAPÍTULO 3",
                        text: '<p>Hacia comienzos del siglo VIII de la era cristiana, durante el apogeo de las sociedades germánicas de laPenínsula Ibérica, un grupo de siete obispos portocalenses de la secta arriana dedicaban sus vidas al estudio y conocimiento de la obra de Dios en la tierra y su palabra.Estos obispos, que también eran eruditos y filósofos, después de muchos años de estudio y meditación llegaron a la conclusión que el conocimiento de la obra del Dios debía estar acompañado del conocimiento y aceptación de otros pueblos y modos de vida a partir de su comprensión de la compasión de Cristo. </p> <p> Debido a sus filosofías e interpretaciones de la Palabra, contaban tanto con fieles seguidores - una minoría entre la mayoría católica romana ibérica - como con acérrimos enemigos, especialmente dentro de la Iglesia Católica, que no sólo condenaba que los arrianos no asumieran a Cristo como un ser divino (desde lo que justamente partía su indiscriminada compasión hacia la condición humana), sino que también veía con malos ojos un discurso de aceptación y reconocimiento de otros pueblos con base pacífica, arguyendo que se ponía en contra de la sagrada labor de la evangelización, la encarnación de la esencia divina en el hombre y la conversión al catolicismo de todas las gentes de la tierra. </p> <p> Sin embargo, los reyes y obispos católicos visigodos no emprendieron acciones directas en contra de los obispos arrianos, conocidos como Los Siete Sabios Portocalenses, quienes tenían una pequeña, pero consistente y fervorosa cantidad de seguidores. Las noticias de sus palabras llegaban lejos y la periferia galaica se vio enriquecida tanto por su sabiduría como por sus decisiones estratégicas en cuanto a temas de comercio. Así, los Sabios planteaban que una de las formas más efectivas de aprender y recopilar conocimientos era mediante el comercio, ya que las relaciones de intercambio exigían un respeto mutuo por parte de ambos lados, además del privilegio que implicaba convivir con diversas comunidades y aprender de sus costumbres. </p> <p> De esta manera comenzaron a plantear que las ciudades deberían relacionarse a partir de rutas comerciales y no desde las conquistas armadas, costumbre no desconocida en los antiguos imperios de la Humanidad. Sus planes fueron fructíferos, los Sabios vivían sin problemas con sus comunidades, hasta que una conjunción de eventualidades y nuevos desafíos les obligaron a tomar una decisión que cambiaría sus vidas radicalmente. </p>',
                        scroll: false,
                        type: "card"
                    }

                    ]

            };
        },
        computed: {
        },
        components: {
            UiModal,
            tour,
            finishModal
        },
        methods: {
            nextSlider() {
                let nextStart = this.startShow + 1;
                let lengthSpace = nextStart + this.maxShow

                if (lengthSpace <= this.chapters.length) {
                    this.startShow = nextStart
                }
            },
            openActivity(c) {
                this.$router.push({ name: 'story:activity', params: { content: JSON.stringify(c) } })
            },
            previousSlider() {
                let previousStart = this.startShow - 1;

                if (previousStart >= 0) {
                    this.startShow = previousStart
                }
            },
            updateLayout() {
                let spaceAvailable = Math.floor((window.screen.width - 40) / this.widthChapter)
                if (spaceAvailable > this.chapters.length) {
                    this.maxShow = this.chapters.length
                } else {
                    this.maxShow = spaceAvailable
                }

                this.chaptersShow = this.chapters.slice(this.startShow, this.maxShow + this.startShow)
            }
        },
        created() {
            this.updateLayout();
        },
        mounted() {
            window.addEventListener("resize", this._resizeHandler = e => {
                this.updateLayout();
            });
        },
        beforeDestroy() {
            window.removeEventListener("resize", this._resizeHandler);
        }
    };
});