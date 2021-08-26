define([
], () => {
	// https://codepen.io/juliosgarbi/pen/kXyRQr
	class radialGraph {

		constructor(radius, maxValue, factor) {
			this.valueCrude = [];

			this.dataSetCrude = [];
			this.dataSets = [];

			this.snaps = {};
			this.tags = []

			this.xmlns = "http://www.w3.org/2000/svg";

			this.cfg = {
				radius: radius,
				w: radius * 2,
				h: radius * 2,
				line: -20,
				factor: !factor ? 1 : factor,
				maxValue: !maxValue ? 5 : maxValue,
				radians: 2 * Math.PI
			};
		}

		addDataSet(data, hexa) {
			if (typeof data !== "object") {
				console.log("Error dataset");
				return;
			}
			this.dataSetCrude.push([data, hexa]);
		}

		addPoint(value, name, hexa) {
			if (isNaN(value) || !isNaN(name)) {
				console.log("%c value: " + isNaN(value) + " name: " + !isNaN(name));
				console.log("%c first value must be numeric \n second value must be string \n third value must be a hexa color ex: '#fff' or '#fcafca'", 'background: #000; color: #f00');
				return;
			}

			this.valueCrude.push([value, name, hexa]);
		};

		addTags(tags) {
			this.tags = tags
		}

		addTemplate(canvas) {
			this.getPointsValue();


			this.cfg.pos = {};
			this.cfg.pos.x = ((parseFloat(canvas.getAttribute('width')) * .5) - this.cfg.radius);
			this.cfg.pos.y = ((parseFloat(canvas.getAttribute('height')) * .5) - this.cfg.radius);


			/****    Create group chart *****/
			var chartGroup = document.createElementNS(this.xmlns, 'g');
			chartGroup.setAttribute('class', 'chartGroup');
			chartGroup.setAttributeNS(null, "transform", "translate(" + this.cfg.pos.x + ", " + this.cfg.pos.y + ")");


			/****    Create circle around chart *****/
			var bigRadarCircle = this.createBaseChart(bigRadarCircle, 1);
			bigRadarCircle.setAttribute('class', 'bigCircle');
			chartGroup.appendChild(bigRadarCircle);
			this.snaps["bigRadarCircle"] = Snap(bigRadarCircle);

			var midRadarCircle = this.createBaseChart(bigRadarCircle, .5);
			midRadarCircle.setAttribute('class', 'midCircle');
			chartGroup.appendChild(midRadarCircle);
			this.snaps["midRadarCircle"] = Snap(midRadarCircle);

			/****    Create center point *****/
			var pointRadar = document.createElementNS(this.xmlns, 'circle');
			pointRadar.setAttribute('class', 'point-center');
			pointRadar.setAttributeNS(null, 'r', 3);
			pointRadar.setAttributeNS(null, 'cx', this.cfg.radius);
			pointRadar.setAttributeNS(null, 'cy', this.cfg.radius);
			pointRadar.setAttributeNS(null, 'fill', "#ededed");
			pointRadar.setAttributeNS(null, 'stroke', "#ededed");
			pointRadar.setAttributeNS(null, 'stroke-width', "1");
			chartGroup.appendChild(pointRadar);

			/****    Create points value in chart *****/
			this.dataSets.forEach(function (values, key) {
				var chart = this.createChart(values, values[0][1]);
				this.snaps["chartLines_" + key] = Snap(chart);
				chartGroup.appendChild(chart);

				values.forEach(function (data, index) {
					var point = this.createPoint(data);
					this.snaps["point_" + index + "_" + key] = Snap(point);
					chartGroup.appendChild(point);
				}.bind(this));
			}.bind(this));

			var maxLines = this.tags.length
			if (maxLines) {
				var xlinkns = "http://www.w3.org/1999/xlink";
				var xhtml = "http://www.w3.org/1999/xhtml"

				/****    Create prototype line for tags in chart *****/
				var lines = document.createElementNS(this.xmlns, 'g');
				lines.setAttributeNS(null, "id", "arrow");


				var line = document.createElementNS(this.xmlns, 'line');
				line.setAttribute("class", "arrow");
				line.setAttributeNS(null, 'stroke', "#fff")
				line.setAttributeNS(null, 'x1', this.cfg.radius);
				line.setAttributeNS(null, 'y1', this.cfg.radius);
				line.setAttributeNS(null, 'x2', this.cfg.radius);
				line.setAttributeNS(null, 'y2', this.cfg.line);
				lines.appendChild(line);
				chartGroup.appendChild(lines);




				var gradeRotate = 360 / maxLines;
				/****    Create lines and set tags *****/
				for (let x = 0; x < maxLines; x++) {
					var linesrotate = document.createElementNS(this.xmlns, 'use');
					linesrotate.setAttributeNS(xlinkns, "href", "#arrow");
					linesrotate.setAttributeNS(null, "transform", " rotate(" + (gradeRotate * x) + " " + this.cfg.radius + " " + this.cfg.radius + ") ");
					chartGroup.appendChild(linesrotate);

					var config = this.cfg
					var widthText = (parseFloat(canvas.getAttribute('width'))) / 4


					var posx = (config.w + widthText) / 2 * (1 - (parseFloat(Math.max(config.maxValue, 0)) / config.maxValue) * config.factor * Math.sin(x * config.radians / maxLines)) - widthText;
					var posy = (config.h + widthText) / 2 * (1 - (parseFloat(Math.max(config.maxValue, 0)) / config.maxValue) * config.factor * Math.cos(x * config.radians / maxLines)) - (widthText / 2) - (config.radius / 8);

					var foreignObject = document.createElementNS(this.xmlns, 'foreignObject')

					foreignObject.setAttributeNS(null, "x", posx);
					foreignObject.setAttributeNS(null, "y", posy);
					foreignObject.setAttributeNS(null, "height", widthText / 2);
					foreignObject.setAttributeNS(null, "width", widthText);

					var newText = document.createElementNS(xhtml, 'div');
					newText.setAttribute("class", "tag-name");
					newText.style.width = widthText - 2 + "px";
					newText.style.height = (widthText / 2) + "px";
					newText.style.fontSize = config.radius / 8 + "px";

					var textNode = document.createTextNode(this.tags[x]);
					newText.appendChild(textNode);
					foreignObject.appendChild(newText);
					chartGroup.appendChild(foreignObject);

				}
			}

			canvas.appendChild(chartGroup);

		};


		createBaseChart(obj, radius) {
			obj = document.createElementNS(this.xmlns, 'circle');
			obj.setAttributeNS(null, 'r', this.cfg.radius * radius);
			obj.setAttributeNS(null, 'cx', this.cfg.radius);
			obj.setAttributeNS(null, 'cy', this.cfg.radius);
			obj.setAttributeNS(null, 'fill', "none");
			//obj.setAttribute("class", "graph-circle");
			obj.setAttributeNS(null, 'stroke', "#c39b52");
			obj.setAttributeNS(null, 'stroke-width', "2");

			return obj;
		};
		createChart(values, color = "#fff") {
			var pointsValue = "";

			values.forEach(function (data) {
				pointsValue += data[0].x + "," + data[0].y + " ";
			}.bind(this));


			var chart = document.createElementNS(this.xmlns, "polygon");
			chart.setAttributeNS(null, 'id', 'chart');
			chart.setAttributeNS(null, 'class', 'polygonSvg');
			chart.setAttributeNS(null, 'points', pointsValue);
			chart.setAttributeNS(null, 'fill', color);
			chart.setAttributeNS(null, 'fill-opacity', ".34");
			chart.setAttributeNS(null, 'stroke', color);
			chart.setAttributeNS(null, 'stroke-width', "1");
			chart.setAttributeNS(null, 'opacity', "1");

			return chart;
		};

		createPoint(data) {
			var g = document.createElementNS(this.xmlns, 'g');
			g.setAttributeNS(null, "transform", "translate(" + data[0].x + ", " + data[0].y + ")");
			g.setAttributeNS(null, "id", data[1]);

			var circleLit = document.createElementNS(this.xmlns, 'circle');
			circleLit.setAttributeNS(null, 'r', '5');
			circleLit.setAttributeNS(null, 'cx', '0');
			circleLit.setAttributeNS(null, 'cy', '0');
			circleLit.setAttributeNS(null, 'fill', data[1]);
			circleLit.setAttributeNS(null, 'stroke', "none");
			g.appendChild(circleLit);

			return g;
		}

		getPointsValue() {
			if (this.valueCrude.length) {
				var values = []
				this.valueCrude.forEach(function (data, index) {
					var arr = [];

					arr.x = this.cfg.w / 2 * (1 - (parseFloat(Math.max(data[0], 0)) / this.cfg.maxValue) * this.cfg.factor * Math.sin(index * this.cfg.radians / this.valueCrude.length));
					arr.y = this.cfg.h / 2 * (1 - (parseFloat(Math.max(data[0], 0)) / this.cfg.maxValue) * this.cfg.factor * Math.cos(index * this.cfg.radians / this.valueCrude.length));

					values.push([arr, data[1]]);

				}.bind(this));

				values = values.reverse();

				if (values.length) {
					this.dataSets.push(values)
				}
			}
			if (this.dataSetCrude.length) {
				this.dataSetCrude.forEach(function (values, key) {
					var color = values[1]
					var lengthDataSet = values[0].length
					var valuesDataSet = []
					var config = this.cfg

					values[0].forEach(function (data, index) {
						var arr = [];

						arr.x = config.w / 2 * (1 - (parseFloat(Math.max(data.value, 0)) / config.maxValue) * config.factor * Math.sin(index * config.radians / lengthDataSet));
						arr.y = config.h / 2 * (1 - (parseFloat(Math.max(data.value, 0)) / config.maxValue) * config.factor * Math.cos(index * config.radians / lengthDataSet));

						valuesDataSet.push([arr, color]);
					})
					this.dataSets.push(valuesDataSet.reverse());
				}.bind(this));

			}
		};
	}

	return radialGraph;
})