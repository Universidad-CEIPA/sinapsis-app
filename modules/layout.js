define([
	"text!./layout.html",
	"api",
	"local"
], (html, api, local) => {

	return {
		template: html,
		data() {
			let user = local("user")
			let currentCourse = local("currentCourse") || null


			let chapters = [{
				id: 1,
				name: "La historia de los Siete Sabios Portocalenses",
				scroll: 0,
				title: "CAPÍTULO 1",
				activities: [
					{
						date: "2021-02-20T00:00:00.000Z",
						id: 1,
						time: "1970-01-01T11:43:00.000Z",
						type: "individual",
						completed: true,
						activity: {
							id: 1,
							questions: [],
							summary: "Hacia comienzos del siglo VIII",
							type: "reading",
							name: "Los Siete Sabios y la importancia del comercio",
							content: {
								text: '<p>Hacia comienzos del siglo VIII de la era cristiana, durante el apogeo de las sociedades germánicas de laPenínsula Ibérica, un grupo de siete obispos portocalenses de la secta arriana dedicaban sus vidas al estudio y conocimiento de la obra de Dios en la tierra y su palabra.Estos obispos, que también eran eruditos y filósofos, después de muchos años de estudio y meditación llegaron a la conclusión que el conocimiento de la obra del Dios debía estar acompañado del conocimiento y aceptación de otros pueblos y modos de vida a partir de su comprensión de la compasión de Cristo. </p> <p> Debido a sus filosofías e interpretaciones de la Palabra, contaban tanto con fieles seguidores - una minoría entre la mayoría católica romana ibérica - como con acérrimos enemigos, especialmente dentro de la Iglesia Católica, que no sólo condenaba que los arrianos no asumieran a Cristo como un ser divino (desde lo que justamente partía su indiscriminada compasión hacia la condición humana), sino que también veía con malos ojos un discurso de aceptación y reconocimiento de otros pueblos con base pacífica, arguyendo que se ponía en contra de la sagrada labor de la evangelización, la encarnación de la esencia divina en el hombre y la conversión al catolicismo de todas las gentes de la tierra. </p> <p> Sin embargo, los reyes y obispos católicos visigodos no emprendieron acciones directas en contra de los obispos arrianos, conocidos como Los Siete Sabios Portocalenses, quienes tenían una pequeña, pero consistente y fervorosa cantidad de seguidores. Las noticias de sus palabras llegaban lejos y la periferia galaica se vio enriquecida tanto por su sabiduría como por sus decisiones estratégicas en cuanto a temas de comercio. Así, los Sabios planteaban que una de las formas más efectivas de aprender y recopilar conocimientos era mediante el comercio, ya que las relaciones de intercambio exigían un respeto mutuo por parte de ambos lados, además del privilegio que implicaba convivir con diversas comunidades y aprender de sus costumbres. </p> <p> De esta manera comenzaron a plantear que las ciudades deberían relacionarse a partir de rutas comerciales y no desde las conquistas armadas, costumbre no desconocida en los antiguos imperios de la Humanidad. Sus planes fueron fructíferos, los Sabios vivían sin problemas con sus comunidades, hasta que una conjunción de eventualidades y nuevos desafíos les obligaron a tomar una decisión que cambiaría sus vidas radicalmente. </p>'
							}
						}
					},
					{
						date: "2021-02-20T00:00:00.000Z",
						id: 2,
						time: "1970-01-01T11:43:00.000Z",
						type: "individual",
						completed: false,
						activity: {
							id: 2,
							questions: [],
							summary: "Hacia comienzos del siglo VIII",
							type: "reading",
							name: "El sueño de Frandán",
							content: {
								text: "<p>En el año 713, dos años después de comenzada la conquista omeya de Iberia, las comunidades arrianas, minoritarias entre los católicos visigodos que se oponían a los omeyas, se vieron acorraladas hacia el océano. Aunque no se consideraban un enemigo directo, la conquista islámica indirectamente favoreció el marginamiento que los nobles y clérigos católicos ejercían sobre los arrianos, abandonándolos a su suerte a menos de que entraran en comunión y huyeran a las montañas del norte peninsular.<p>"
							}


						}
					},
					{
						date: "2021-02-20T00:00:00.000Z",
						id: 3,
						time: "1970-01-01T11:43:00.000Z",
						type: "individual",
						completed: false,

						activity: {
							id: 3,
							questions: [],
							summary: "Hacia comienzos del siglo VIII",
							type: "reading",
							name: "Se abre una esperanza",
							content: {
								text: '<p>Hacia comienzos del siglo VIII de la era cristiana, durante el apogeo de las sociedades germánicas de laPenínsula Ibérica, un grupo de siete obispos portocalenses de la secta arriana dedicaban sus vidas al estudio y conocimiento de la obra de Dios en la tierra y su palabra.Estos obispos, que también eran eruditos y filósofos, después de muchos años de estudio y meditación llegaron a la conclusión que el conocimiento de la obra del Dios debía estar acompañado del conocimiento y aceptación de otros pueblos y modos de vida a partir de su comprensión de la compasión de Cristo. </p> <p> Debido a sus filosofías e interpretaciones de la Palabra, contaban tanto con fieles seguidores - una minoría entre la mayoría católica romana ibérica - como con acérrimos enemigos, especialmente dentro de la Iglesia Católica, que no sólo condenaba que los arrianos no asumieran a Cristo como un ser divino (desde lo que justamente partía su indiscriminada compasión hacia la condición humana), sino que también veía con malos ojos un discurso de aceptación y reconocimiento de otros pueblos con base pacífica, arguyendo que se ponía en contra de la sagrada labor de la evangelización, la encarnación de la esencia divina en el hombre y la conversión al catolicismo de todas las gentes de la tierra. </p> <p> Sin embargo, los reyes y obispos católicos visigodos no emprendieron acciones directas en contra de los obispos arrianos, conocidos como Los Siete Sabios Portocalenses, quienes tenían una pequeña, pero consistente y fervorosa cantidad de seguidores. Las noticias de sus palabras llegaban lejos y la periferia galaica se vio enriquecida tanto por su sabiduría como por sus decisiones estratégicas en cuanto a temas de comercio. Así, los Sabios planteaban que una de las formas más efectivas de aprender y recopilar conocimientos era mediante el comercio, ya que las relaciones de intercambio exigían un respeto mutuo por parte de ambos lados, además del privilegio que implicaba convivir con diversas comunidades y aprender de sus costumbres. </p> <p> De esta manera comenzaron a plantear que las ciudades deberían relacionarse a partir de rutas comerciales y no desde las conquistas armadas, costumbre no desconocida en los antiguos imperios de la Humanidad. Sus planes fueron fructíferos, los Sabios vivían sin problemas con sus comunidades, hasta que una conjunción de eventualidades y nuevos desafíos les obligaron a tomar una decisión que cambiaría sus vidas radicalmente. </p>'
							}
						}

					},
					{
						date: "2021-02-20T00:00:00.000Z",
						id: 4,
						time: "1970-01-01T11:43:00.000Z",
						type: "individual",
						completed: false,

						activity: {
							id: 4,
							questions: [],
							summary: "Hacia comienzos del siglo VIII",
							type: "reading",
							name: "La travesía",
							content: {
								text: '<p>Hacia comienzos del siglo VIII de la era cristiana, durante el apogeo de las sociedades germánicas de laPenínsula Ibérica, un grupo de siete obispos portocalenses de la secta arriana dedicaban sus vidas al estudio y conocimiento de la obra de Dios en la tierra y su palabra.Estos obispos, que también eran eruditos y filósofos, después de muchos años de estudio y meditación llegaron a la conclusión que el conocimiento de la obra del Dios debía estar acompañado del conocimiento y aceptación de otros pueblos y modos de vida a partir de su comprensión de la compasión de Cristo. </p> <p> Debido a sus filosofías e interpretaciones de la Palabra, contaban tanto con fieles seguidores - una minoría entre la mayoría católica romana ibérica - como con acérrimos enemigos, especialmente dentro de la Iglesia Católica, que no sólo condenaba que los arrianos no asumieran a Cristo como un ser divino (desde lo que justamente partía su indiscriminada compasión hacia la condición humana), sino que también veía con malos ojos un discurso de aceptación y reconocimiento de otros pueblos con base pacífica, arguyendo que se ponía en contra de la sagrada labor de la evangelización, la encarnación de la esencia divina en el hombre y la conversión al catolicismo de todas las gentes de la tierra. </p> <p> Sin embargo, los reyes y obispos católicos visigodos no emprendieron acciones directas en contra de los obispos arrianos, conocidos como Los Siete Sabios Portocalenses, quienes tenían una pequeña, pero consistente y fervorosa cantidad de seguidores. Las noticias de sus palabras llegaban lejos y la periferia galaica se vio enriquecida tanto por su sabiduría como por sus decisiones estratégicas en cuanto a temas de comercio. Así, los Sabios planteaban que una de las formas más efectivas de aprender y recopilar conocimientos era mediante el comercio, ya que las relaciones de intercambio exigían un respeto mutuo por parte de ambos lados, además del privilegio que implicaba convivir con diversas comunidades y aprender de sus costumbres. </p> <p> De esta manera comenzaron a plantear que las ciudades deberían relacionarse a partir de rutas comerciales y no desde las conquistas armadas, costumbre no desconocida en los antiguos imperios de la Humanidad. Sus planes fueron fructíferos, los Sabios vivían sin problemas con sus comunidades, hasta que una conjunción de eventualidades y nuevos desafíos les obligaron a tomar una decisión que cambiaría sus vidas radicalmente. </p>'
							}
						}
					}
					,
					{
						date: "2021-02-20T00:00:00.000Z",
						id: 5,
						time: "1970-01-01T11:43:00.000Z",
						type: "individual",
						completed: false,

						activity: {
							id: 5,
							questions: [],
							summary: "Hacia comienzos del siglo VIII",
							type: "reading",
							name: "La Atlántida está al frente",
							content: {
								text: '<p>Hacia comienzos del siglo VIII de la era cristiana, durante el apogeo de las sociedades germánicas de laPenínsula Ibérica, un grupo de siete obispos portocalenses de la secta arriana dedicaban sus vidas al estudio y conocimiento de la obra de Dios en la tierra y su palabra.Estos obispos, que también eran eruditos y filósofos, después de muchos años de estudio y meditación llegaron a la conclusión que el conocimiento de la obra del Dios debía estar acompañado del conocimiento y aceptación de otros pueblos y modos de vida a partir de su comprensión de la compasión de Cristo. </p> <p> Debido a sus filosofías e interpretaciones de la Palabra, contaban tanto con fieles seguidores - una minoría entre la mayoría católica romana ibérica - como con acérrimos enemigos, especialmente dentro de la Iglesia Católica, que no sólo condenaba que los arrianos no asumieran a Cristo como un ser divino (desde lo que justamente partía su indiscriminada compasión hacia la condición humana), sino que también veía con malos ojos un discurso de aceptación y reconocimiento de otros pueblos con base pacífica, arguyendo que se ponía en contra de la sagrada labor de la evangelización, la encarnación de la esencia divina en el hombre y la conversión al catolicismo de todas las gentes de la tierra. </p> <p> Sin embargo, los reyes y obispos católicos visigodos no emprendieron acciones directas en contra de los obispos arrianos, conocidos como Los Siete Sabios Portocalenses, quienes tenían una pequeña, pero consistente y fervorosa cantidad de seguidores. Las noticias de sus palabras llegaban lejos y la periferia galaica se vio enriquecida tanto por su sabiduría como por sus decisiones estratégicas en cuanto a temas de comercio. Así, los Sabios planteaban que una de las formas más efectivas de aprender y recopilar conocimientos era mediante el comercio, ya que las relaciones de intercambio exigían un respeto mutuo por parte de ambos lados, además del privilegio que implicaba convivir con diversas comunidades y aprender de sus costumbres. </p> <p> De esta manera comenzaron a plantear que las ciudades deberían relacionarse a partir de rutas comerciales y no desde las conquistas armadas, costumbre no desconocida en los antiguos imperios de la Humanidad. Sus planes fueron fructíferos, los Sabios vivían sin problemas con sus comunidades, hasta que una conjunción de eventualidades y nuevos desafíos les obligaron a tomar una decisión que cambiaría sus vidas radicalmente. </p>'
							}
						}
					}
				],
			},
			{
				id: 3,
				name: "La historia de los Siete Sabios Portocalenses",
				scroll: 0,
				title: "CAPÍTULO 2",
				activities: [
					{
						date: "2021-02-20T00:00:00.000Z",
						id: 2,
						time: "1970-01-01T11:43:00.000Z",
						type: "individual",
						completed: true,
						activity: {
							id: 2,
							questions: [],
							summary: "Hacia comienzos del siglo VIII",
							type: "reading",
							name: "Los Siete Sabios y la importancia del comercio",
							content: {
								text: '<p>Hacia comienzos del siglo VIII de la era cristiana, durante el apogeo de las sociedades germánicas de laPenínsula Ibérica, un grupo de siete obispos portocalenses de la secta arriana dedicaban sus vidas al estudio y conocimiento de la obra de Dios en la tierra y su palabra.Estos obispos, que también eran eruditos y filósofos, después de muchos años de estudio y meditación llegaron a la conclusión que el conocimiento de la obra del Dios debía estar acompañado del conocimiento y aceptación de otros pueblos y modos de vida a partir de su comprensión de la compasión de Cristo. </p> <p> Debido a sus filosofías e interpretaciones de la Palabra, contaban tanto con fieles seguidores - una minoría entre la mayoría católica romana ibérica - como con acérrimos enemigos, especialmente dentro de la Iglesia Católica, que no sólo condenaba que los arrianos no asumieran a Cristo como un ser divino (desde lo que justamente partía su indiscriminada compasión hacia la condición humana), sino que también veía con malos ojos un discurso de aceptación y reconocimiento de otros pueblos con base pacífica, arguyendo que se ponía en contra de la sagrada labor de la evangelización, la encarnación de la esencia divina en el hombre y la conversión al catolicismo de todas las gentes de la tierra. </p> <p> Sin embargo, los reyes y obispos católicos visigodos no emprendieron acciones directas en contra de los obispos arrianos, conocidos como Los Siete Sabios Portocalenses, quienes tenían una pequeña, pero consistente y fervorosa cantidad de seguidores. Las noticias de sus palabras llegaban lejos y la periferia galaica se vio enriquecida tanto por su sabiduría como por sus decisiones estratégicas en cuanto a temas de comercio. Así, los Sabios planteaban que una de las formas más efectivas de aprender y recopilar conocimientos era mediante el comercio, ya que las relaciones de intercambio exigían un respeto mutuo por parte de ambos lados, además del privilegio que implicaba convivir con diversas comunidades y aprender de sus costumbres. </p> <p> De esta manera comenzaron a plantear que las ciudades deberían relacionarse a partir de rutas comerciales y no desde las conquistas armadas, costumbre no desconocida en los antiguos imperios de la Humanidad. Sus planes fueron fructíferos, los Sabios vivían sin problemas con sus comunidades, hasta que una conjunción de eventualidades y nuevos desafíos les obligaron a tomar una decisión que cambiaría sus vidas radicalmente. </p>'
							}
						}
					},
					{
						date: "2021-02-20T00:00:00.000Z",
						id: 2,
						time: "1970-01-01T11:43:00.000Z",
						type: "individual",
						completed: false,
						activity: {
							id: 2,
							questions: [],
							summary: "Hacia comienzos del siglo VIII",
							type: "reading",
							name: "El sueño de Frandán",
							content: {
								text: '<p>Hacia comienzos del siglo VIII de la era cristiana, durante el apogeo de las sociedades germánicas de laPenínsula Ibérica, un grupo de siete obispos portocalenses de la secta arriana dedicaban sus vidas al estudio y conocimiento de la obra de Dios en la tierra y su palabra.Estos obispos, que también eran eruditos y filósofos, después de muchos años de estudio y meditación llegaron a la conclusión que el conocimiento de la obra del Dios debía estar acompañado del conocimiento y aceptación de otros pueblos y modos de vida a partir de su comprensión de la compasión de Cristo. </p> <p> Debido a sus filosofías e interpretaciones de la Palabra, contaban tanto con fieles seguidores - una minoría entre la mayoría católica romana ibérica - como con acérrimos enemigos, especialmente dentro de la Iglesia Católica, que no sólo condenaba que los arrianos no asumieran a Cristo como un ser divino (desde lo que justamente partía su indiscriminada compasión hacia la condición humana), sino que también veía con malos ojos un discurso de aceptación y reconocimiento de otros pueblos con base pacífica, arguyendo que se ponía en contra de la sagrada labor de la evangelización, la encarnación de la esencia divina en el hombre y la conversión al catolicismo de todas las gentes de la tierra. </p> <p> Sin embargo, los reyes y obispos católicos visigodos no emprendieron acciones directas en contra de los obispos arrianos, conocidos como Los Siete Sabios Portocalenses, quienes tenían una pequeña, pero consistente y fervorosa cantidad de seguidores. Las noticias de sus palabras llegaban lejos y la periferia galaica se vio enriquecida tanto por su sabiduría como por sus decisiones estratégicas en cuanto a temas de comercio. Así, los Sabios planteaban que una de las formas más efectivas de aprender y recopilar conocimientos era mediante el comercio, ya que las relaciones de intercambio exigían un respeto mutuo por parte de ambos lados, además del privilegio que implicaba convivir con diversas comunidades y aprender de sus costumbres. </p> <p> De esta manera comenzaron a plantear que las ciudades deberían relacionarse a partir de rutas comerciales y no desde las conquistas armadas, costumbre no desconocida en los antiguos imperios de la Humanidad. Sus planes fueron fructíferos, los Sabios vivían sin problemas con sus comunidades, hasta que una conjunción de eventualidades y nuevos desafíos les obligaron a tomar una decisión que cambiaría sus vidas radicalmente. </p>'
							}
						}
					},
					{
						date: "2021-02-20T00:00:00.000Z",
						id: 2,
						time: "1970-01-01T11:43:00.000Z",
						type: "individual",
						completed: false,

						activity: {
							id: 2,
							questions: [],
							summary: "Hacia comienzos del siglo VIII",
							type: "reading",
							name: "Se abre una esperanza",
							content: {
								text: '<p>Hacia comienzos del siglo VIII de la era cristiana, durante el apogeo de las sociedades germánicas de laPenínsula Ibérica, un grupo de siete obispos portocalenses de la secta arriana dedicaban sus vidas al estudio y conocimiento de la obra de Dios en la tierra y su palabra.Estos obispos, que también eran eruditos y filósofos, después de muchos años de estudio y meditación llegaron a la conclusión que el conocimiento de la obra del Dios debía estar acompañado del conocimiento y aceptación de otros pueblos y modos de vida a partir de su comprensión de la compasión de Cristo. </p> <p> Debido a sus filosofías e interpretaciones de la Palabra, contaban tanto con fieles seguidores - una minoría entre la mayoría católica romana ibérica - como con acérrimos enemigos, especialmente dentro de la Iglesia Católica, que no sólo condenaba que los arrianos no asumieran a Cristo como un ser divino (desde lo que justamente partía su indiscriminada compasión hacia la condición humana), sino que también veía con malos ojos un discurso de aceptación y reconocimiento de otros pueblos con base pacífica, arguyendo que se ponía en contra de la sagrada labor de la evangelización, la encarnación de la esencia divina en el hombre y la conversión al catolicismo de todas las gentes de la tierra. </p> <p> Sin embargo, los reyes y obispos católicos visigodos no emprendieron acciones directas en contra de los obispos arrianos, conocidos como Los Siete Sabios Portocalenses, quienes tenían una pequeña, pero consistente y fervorosa cantidad de seguidores. Las noticias de sus palabras llegaban lejos y la periferia galaica se vio enriquecida tanto por su sabiduría como por sus decisiones estratégicas en cuanto a temas de comercio. Así, los Sabios planteaban que una de las formas más efectivas de aprender y recopilar conocimientos era mediante el comercio, ya que las relaciones de intercambio exigían un respeto mutuo por parte de ambos lados, además del privilegio que implicaba convivir con diversas comunidades y aprender de sus costumbres. </p> <p> De esta manera comenzaron a plantear que las ciudades deberían relacionarse a partir de rutas comerciales y no desde las conquistas armadas, costumbre no desconocida en los antiguos imperios de la Humanidad. Sus planes fueron fructíferos, los Sabios vivían sin problemas con sus comunidades, hasta que una conjunción de eventualidades y nuevos desafíos les obligaron a tomar una decisión que cambiaría sus vidas radicalmente. </p>'
							}
						}

					},
					{
						date: "2021-02-20T00:00:00.000Z",
						id: 2,
						time: "1970-01-01T11:43:00.000Z",
						type: "individual",
						completed: false,

						activity: {
							id: 2,
							questions: [],
							summary: "Hacia comienzos del siglo VIII",
							type: "reading",
							name: "La travesía",
							content: {
								text: '<p>Hacia comienzos del siglo VIII de la era cristiana, durante el apogeo de las sociedades germánicas de laPenínsula Ibérica, un grupo de siete obispos portocalenses de la secta arriana dedicaban sus vidas al estudio y conocimiento de la obra de Dios en la tierra y su palabra.Estos obispos, que también eran eruditos y filósofos, después de muchos años de estudio y meditación llegaron a la conclusión que el conocimiento de la obra del Dios debía estar acompañado del conocimiento y aceptación de otros pueblos y modos de vida a partir de su comprensión de la compasión de Cristo. </p> <p> Debido a sus filosofías e interpretaciones de la Palabra, contaban tanto con fieles seguidores - una minoría entre la mayoría católica romana ibérica - como con acérrimos enemigos, especialmente dentro de la Iglesia Católica, que no sólo condenaba que los arrianos no asumieran a Cristo como un ser divino (desde lo que justamente partía su indiscriminada compasión hacia la condición humana), sino que también veía con malos ojos un discurso de aceptación y reconocimiento de otros pueblos con base pacífica, arguyendo que se ponía en contra de la sagrada labor de la evangelización, la encarnación de la esencia divina en el hombre y la conversión al catolicismo de todas las gentes de la tierra. </p> <p> Sin embargo, los reyes y obispos católicos visigodos no emprendieron acciones directas en contra de los obispos arrianos, conocidos como Los Siete Sabios Portocalenses, quienes tenían una pequeña, pero consistente y fervorosa cantidad de seguidores. Las noticias de sus palabras llegaban lejos y la periferia galaica se vio enriquecida tanto por su sabiduría como por sus decisiones estratégicas en cuanto a temas de comercio. Así, los Sabios planteaban que una de las formas más efectivas de aprender y recopilar conocimientos era mediante el comercio, ya que las relaciones de intercambio exigían un respeto mutuo por parte de ambos lados, además del privilegio que implicaba convivir con diversas comunidades y aprender de sus costumbres. </p> <p> De esta manera comenzaron a plantear que las ciudades deberían relacionarse a partir de rutas comerciales y no desde las conquistas armadas, costumbre no desconocida en los antiguos imperios de la Humanidad. Sus planes fueron fructíferos, los Sabios vivían sin problemas con sus comunidades, hasta que una conjunción de eventualidades y nuevos desafíos les obligaron a tomar una decisión que cambiaría sus vidas radicalmente. </p>'
							}
						}
					}
					,
					{
						date: "2021-02-20T00:00:00.000Z",
						id: 2,
						time: "1970-01-01T11:43:00.000Z",
						type: "individual",
						completed: false,

						activity: {
							id: 2,
							questions: [],
							summary: "Hacia comienzos del siglo VIII",
							type: "reading",
							name: "La Atlántida está al frente",
							content: {
								text: '<p>Hacia comienzos del siglo VIII de la era cristiana, durante el apogeo de las sociedades germánicas de laPenínsula Ibérica, un grupo de siete obispos portocalenses de la secta arriana dedicaban sus vidas al estudio y conocimiento de la obra de Dios en la tierra y su palabra.Estos obispos, que también eran eruditos y filósofos, después de muchos años de estudio y meditación llegaron a la conclusión que el conocimiento de la obra del Dios debía estar acompañado del conocimiento y aceptación de otros pueblos y modos de vida a partir de su comprensión de la compasión de Cristo. </p> <p> Debido a sus filosofías e interpretaciones de la Palabra, contaban tanto con fieles seguidores - una minoría entre la mayoría católica romana ibérica - como con acérrimos enemigos, especialmente dentro de la Iglesia Católica, que no sólo condenaba que los arrianos no asumieran a Cristo como un ser divino (desde lo que justamente partía su indiscriminada compasión hacia la condición humana), sino que también veía con malos ojos un discurso de aceptación y reconocimiento de otros pueblos con base pacífica, arguyendo que se ponía en contra de la sagrada labor de la evangelización, la encarnación de la esencia divina en el hombre y la conversión al catolicismo de todas las gentes de la tierra. </p> <p> Sin embargo, los reyes y obispos católicos visigodos no emprendieron acciones directas en contra de los obispos arrianos, conocidos como Los Siete Sabios Portocalenses, quienes tenían una pequeña, pero consistente y fervorosa cantidad de seguidores. Las noticias de sus palabras llegaban lejos y la periferia galaica se vio enriquecida tanto por su sabiduría como por sus decisiones estratégicas en cuanto a temas de comercio. Así, los Sabios planteaban que una de las formas más efectivas de aprender y recopilar conocimientos era mediante el comercio, ya que las relaciones de intercambio exigían un respeto mutuo por parte de ambos lados, además del privilegio que implicaba convivir con diversas comunidades y aprender de sus costumbres. </p> <p> De esta manera comenzaron a plantear que las ciudades deberían relacionarse a partir de rutas comerciales y no desde las conquistas armadas, costumbre no desconocida en los antiguos imperios de la Humanidad. Sus planes fueron fructíferos, los Sabios vivían sin problemas con sus comunidades, hasta que una conjunción de eventualidades y nuevos desafíos les obligaron a tomar una decisión que cambiaría sus vidas radicalmente. </p>'
							}
						}
					}
				]
			},
			{
				id: 1,
				name: "La historia de los Siete Sabios Portocalenses",
				scroll: 0,
				title: "CAPÍTULO 3",
				activities: [
					{
						date: "2021-02-20T00:00:00.000Z",
						id: 2,
						time: "1970-01-01T11:43:00.000Z",
						type: "individual",
						completed: true,
						activity: {
							id: 2,
							questions: [],
							summary: "Hacia comienzos del siglo VIII",
							type: "reading",
							name: "Los Siete Sabios y la importancia del comercio",
							content: {
								text: '<p>Hacia comienzos del siglo VIII de la era cristiana, durante el apogeo de las sociedades germánicas de laPenínsula Ibérica, un grupo de siete obispos portocalenses de la secta arriana dedicaban sus vidas al estudio y conocimiento de la obra de Dios en la tierra y su palabra.Estos obispos, que también eran eruditos y filósofos, después de muchos años de estudio y meditación llegaron a la conclusión que el conocimiento de la obra del Dios debía estar acompañado del conocimiento y aceptación de otros pueblos y modos de vida a partir de su comprensión de la compasión de Cristo. </p> <p> Debido a sus filosofías e interpretaciones de la Palabra, contaban tanto con fieles seguidores - una minoría entre la mayoría católica romana ibérica - como con acérrimos enemigos, especialmente dentro de la Iglesia Católica, que no sólo condenaba que los arrianos no asumieran a Cristo como un ser divino (desde lo que justamente partía su indiscriminada compasión hacia la condición humana), sino que también veía con malos ojos un discurso de aceptación y reconocimiento de otros pueblos con base pacífica, arguyendo que se ponía en contra de la sagrada labor de la evangelización, la encarnación de la esencia divina en el hombre y la conversión al catolicismo de todas las gentes de la tierra. </p> <p> Sin embargo, los reyes y obispos católicos visigodos no emprendieron acciones directas en contra de los obispos arrianos, conocidos como Los Siete Sabios Portocalenses, quienes tenían una pequeña, pero consistente y fervorosa cantidad de seguidores. Las noticias de sus palabras llegaban lejos y la periferia galaica se vio enriquecida tanto por su sabiduría como por sus decisiones estratégicas en cuanto a temas de comercio. Así, los Sabios planteaban que una de las formas más efectivas de aprender y recopilar conocimientos era mediante el comercio, ya que las relaciones de intercambio exigían un respeto mutuo por parte de ambos lados, además del privilegio que implicaba convivir con diversas comunidades y aprender de sus costumbres. </p> <p> De esta manera comenzaron a plantear que las ciudades deberían relacionarse a partir de rutas comerciales y no desde las conquistas armadas, costumbre no desconocida en los antiguos imperios de la Humanidad. Sus planes fueron fructíferos, los Sabios vivían sin problemas con sus comunidades, hasta que una conjunción de eventualidades y nuevos desafíos les obligaron a tomar una decisión que cambiaría sus vidas radicalmente. </p>'
							}
						}
					},
					{
						date: "2021-02-20T00:00:00.000Z",
						id: 2,
						time: "1970-01-01T11:43:00.000Z",
						type: "individual",
						completed: true,
						activity: {
							id: 2,
							questions: [],
							summary: "Hacia comienzos del siglo VIII",
							type: "reading",
							name: "El sueño de Frandán",
							content: {
								text: '<p>Hacia comienzos del siglo VIII de la era cristiana, durante el apogeo de las sociedades germánicas de laPenínsula Ibérica, un grupo de siete obispos portocalenses de la secta arriana dedicaban sus vidas al estudio y conocimiento de la obra de Dios en la tierra y su palabra.Estos obispos, que también eran eruditos y filósofos, después de muchos años de estudio y meditación llegaron a la conclusión que el conocimiento de la obra del Dios debía estar acompañado del conocimiento y aceptación de otros pueblos y modos de vida a partir de su comprensión de la compasión de Cristo. </p> <p> Debido a sus filosofías e interpretaciones de la Palabra, contaban tanto con fieles seguidores - una minoría entre la mayoría católica romana ibérica - como con acérrimos enemigos, especialmente dentro de la Iglesia Católica, que no sólo condenaba que los arrianos no asumieran a Cristo como un ser divino (desde lo que justamente partía su indiscriminada compasión hacia la condición humana), sino que también veía con malos ojos un discurso de aceptación y reconocimiento de otros pueblos con base pacífica, arguyendo que se ponía en contra de la sagrada labor de la evangelización, la encarnación de la esencia divina en el hombre y la conversión al catolicismo de todas las gentes de la tierra. </p> <p> Sin embargo, los reyes y obispos católicos visigodos no emprendieron acciones directas en contra de los obispos arrianos, conocidos como Los Siete Sabios Portocalenses, quienes tenían una pequeña, pero consistente y fervorosa cantidad de seguidores. Las noticias de sus palabras llegaban lejos y la periferia galaica se vio enriquecida tanto por su sabiduría como por sus decisiones estratégicas en cuanto a temas de comercio. Así, los Sabios planteaban que una de las formas más efectivas de aprender y recopilar conocimientos era mediante el comercio, ya que las relaciones de intercambio exigían un respeto mutuo por parte de ambos lados, además del privilegio que implicaba convivir con diversas comunidades y aprender de sus costumbres. </p> <p> De esta manera comenzaron a plantear que las ciudades deberían relacionarse a partir de rutas comerciales y no desde las conquistas armadas, costumbre no desconocida en los antiguos imperios de la Humanidad. Sus planes fueron fructíferos, los Sabios vivían sin problemas con sus comunidades, hasta que una conjunción de eventualidades y nuevos desafíos les obligaron a tomar una decisión que cambiaría sus vidas radicalmente. </p>'
							}
						}
					},
					{
						date: "2021-02-20T00:00:00.000Z",
						id: 2,
						time: "1970-01-01T11:43:00.000Z",
						type: "individual",
						completed: false,

						activity: {
							id: 2,
							questions: [],
							summary: "Hacia comienzos del siglo VIII",
							type: "reading",
							name: "Se abre una esperanza",
							content: {
								text: '<p>Hacia comienzos del siglo VIII de la era cristiana, durante el apogeo de las sociedades germánicas de laPenínsula Ibérica, un grupo de siete obispos portocalenses de la secta arriana dedicaban sus vidas al estudio y conocimiento de la obra de Dios en la tierra y su palabra.Estos obispos, que también eran eruditos y filósofos, después de muchos años de estudio y meditación llegaron a la conclusión que el conocimiento de la obra del Dios debía estar acompañado del conocimiento y aceptación de otros pueblos y modos de vida a partir de su comprensión de la compasión de Cristo. </p> <p> Debido a sus filosofías e interpretaciones de la Palabra, contaban tanto con fieles seguidores - una minoría entre la mayoría católica romana ibérica - como con acérrimos enemigos, especialmente dentro de la Iglesia Católica, que no sólo condenaba que los arrianos no asumieran a Cristo como un ser divino (desde lo que justamente partía su indiscriminada compasión hacia la condición humana), sino que también veía con malos ojos un discurso de aceptación y reconocimiento de otros pueblos con base pacífica, arguyendo que se ponía en contra de la sagrada labor de la evangelización, la encarnación de la esencia divina en el hombre y la conversión al catolicismo de todas las gentes de la tierra. </p> <p> Sin embargo, los reyes y obispos católicos visigodos no emprendieron acciones directas en contra de los obispos arrianos, conocidos como Los Siete Sabios Portocalenses, quienes tenían una pequeña, pero consistente y fervorosa cantidad de seguidores. Las noticias de sus palabras llegaban lejos y la periferia galaica se vio enriquecida tanto por su sabiduría como por sus decisiones estratégicas en cuanto a temas de comercio. Así, los Sabios planteaban que una de las formas más efectivas de aprender y recopilar conocimientos era mediante el comercio, ya que las relaciones de intercambio exigían un respeto mutuo por parte de ambos lados, además del privilegio que implicaba convivir con diversas comunidades y aprender de sus costumbres. </p> <p> De esta manera comenzaron a plantear que las ciudades deberían relacionarse a partir de rutas comerciales y no desde las conquistas armadas, costumbre no desconocida en los antiguos imperios de la Humanidad. Sus planes fueron fructíferos, los Sabios vivían sin problemas con sus comunidades, hasta que una conjunción de eventualidades y nuevos desafíos les obligaron a tomar una decisión que cambiaría sus vidas radicalmente. </p>'
							}
						}

					},
					{
						date: "2021-02-20T00:00:00.000Z",
						id: 2,
						time: "1970-01-01T11:43:00.000Z",
						type: "individual",
						completed: false,

						activity: {
							id: 2,
							questions: [],
							summary: "Hacia comienzos del siglo VIII",
							type: "reading",
							name: "La travesía",
							content: {
								text: '<p>Hacia comienzos del siglo VIII de la era cristiana, durante el apogeo de las sociedades germánicas de laPenínsula Ibérica, un grupo de siete obispos portocalenses de la secta arriana dedicaban sus vidas al estudio y conocimiento de la obra de Dios en la tierra y su palabra.Estos obispos, que también eran eruditos y filósofos, después de muchos años de estudio y meditación llegaron a la conclusión que el conocimiento de la obra del Dios debía estar acompañado del conocimiento y aceptación de otros pueblos y modos de vida a partir de su comprensión de la compasión de Cristo. </p> <p> Debido a sus filosofías e interpretaciones de la Palabra, contaban tanto con fieles seguidores - una minoría entre la mayoría católica romana ibérica - como con acérrimos enemigos, especialmente dentro de la Iglesia Católica, que no sólo condenaba que los arrianos no asumieran a Cristo como un ser divino (desde lo que justamente partía su indiscriminada compasión hacia la condición humana), sino que también veía con malos ojos un discurso de aceptación y reconocimiento de otros pueblos con base pacífica, arguyendo que se ponía en contra de la sagrada labor de la evangelización, la encarnación de la esencia divina en el hombre y la conversión al catolicismo de todas las gentes de la tierra. </p> <p> Sin embargo, los reyes y obispos católicos visigodos no emprendieron acciones directas en contra de los obispos arrianos, conocidos como Los Siete Sabios Portocalenses, quienes tenían una pequeña, pero consistente y fervorosa cantidad de seguidores. Las noticias de sus palabras llegaban lejos y la periferia galaica se vio enriquecida tanto por su sabiduría como por sus decisiones estratégicas en cuanto a temas de comercio. Así, los Sabios planteaban que una de las formas más efectivas de aprender y recopilar conocimientos era mediante el comercio, ya que las relaciones de intercambio exigían un respeto mutuo por parte de ambos lados, además del privilegio que implicaba convivir con diversas comunidades y aprender de sus costumbres. </p> <p> De esta manera comenzaron a plantear que las ciudades deberían relacionarse a partir de rutas comerciales y no desde las conquistas armadas, costumbre no desconocida en los antiguos imperios de la Humanidad. Sus planes fueron fructíferos, los Sabios vivían sin problemas con sus comunidades, hasta que una conjunción de eventualidades y nuevos desafíos les obligaron a tomar una decisión que cambiaría sus vidas radicalmente. </p>'
							}
						}
					}
					,
					{
						date: "2021-02-20T00:00:00.000Z",
						id: 2,
						time: "1970-01-01T11:43:00.000Z",
						type: "individual",
						completed: false,

						activity: {
							id: 2,
							questions: [],
							summary: "Hacia comienzos del siglo VIII",
							type: "reading",
							name: "La Atlántida está al frente",
						}
					}
				],

			},
			]



			return {
				chapters,
				user,
				currentCourse
			};


		},
		computed: {
			skin() {
				if (this.currentCourse !== null) {
					return this.currentCourse.skin[0]
				} else {
					return ""
				}
			}

		},
		methods: {
			destroyCourse() {
				local("currentCourse", null);
				this.currentCourse = null;
				this.$router.replace({ name: 'home' })
			},
			logout() {
				this.user = null;
				local("user", null);
				this.$router.replace({ name: 'welcome:login' })
			},
			processUser(user) {
				if (user.birthday) {
					user.birthday = this.$toDateValue(user.birthday)
				}
				this.user = user;
				local("user", user);
			},
			async setCourse(course) {

				let currentCourse = course
				currentCourse.schedule = await api.post('students/getInfoCourse', { courseId: course.course })

				local("currentCourse", currentCourse);
				this.currentCourse = currentCourse;
				return true

			},
			updateChapters(chapter) {
				let index = this.currentCourse.schedule.findIndex(c => c.id === chapter.id)
				Object.assign(this.currentCourse.schedule[index], chapter)

				local("currentCourse", this.currentCourse);


			}
		}
	};
});