<template>
	<div class="uk-card uk-card-default">
		<highcharts ref="chart" :options="defaultSetting"></highcharts>
	</div>
</template>

<script>
export default {
	name: "LINECOLUMNPIE",

	props: {
		setting: {
			type: Object,
			default: () => {},
		},
		dataset: {
			type: Object,
			default: () => {},
		},
	},

	data () {
		return {
			defaultSetting: {
				chart: {
					zoomType: "xy",
					backgroundColor: "#ffffff",
					height:'463px'
				},
				title: {
					text: "",
				},
				legend: {
					layout: 'vertical',
					align: 'right',
					verticalAlign: 'middle'
				},
				xAxis: {
					title: {
						text: "",
					},
					categories: [],
				},
				yAxis: {
					title: {
						text: "",
					},
				},
				labels: {
					items: [
						{
							html: "",
							style: {
								left: "50px",
								top: "18px",
								// theme
								color: "black",
							},
						},
					],
				},
				plotOptions: {
					pie: {
						allowPointSelect: true,
						cursor: "pointer",
						dataLabels: {
							enabled: true,
							format: "<b>{point.name}</b>: {point.percentage:.1f} %",
						},
						showInLegend: false,
					},
				},
				series: [],
			},
		};
	},
	created: async function () {
		// this.defaultSetting.series = this.dataset.graphData;
		for (let i = 0; i < this.dataset.graphData.length; i++) {
			let element = this.dataset.graphData[i];
			element.type = "column";
			this.defaultSetting.series.push(element);
		}

		let obj = {
			type: "pie",
			name: "Value",
			center: [80, 70],
			size: 100,
			colorByPoint: true,
			data: [],
		};
		for (let i = 0; i < this.dataset.graphData.length; i++) {
			let element = this.dataset.graphData[i];
			let avg = await this.avgFun(element.data);
			avg = parseFloat(avg.toFixed(2));
			obj.data.push({ name: element.name, y: avg });
		}

		this.defaultSetting.series.push(obj);


		let seriesData = {
			type: "spline",
			name: "Average",
			data: [],
			marker: {
				lineWidth: 2,
				fillColor: "white",
			},
		};

		for (let i = 0; i < this.dataset.graphData[0].data.length; i++) {
			let num = 0;
			for (let j = 0; j < this.dataset.graphData.length; j++) {
				num += this.dataset.graphData[j].data[i];
			}
			seriesData.data.push(Math.round(num / this.dataset.graphData.length));
		}

		this.defaultSetting.series.push(seriesData);

		this.defaultSetting.xAxis.categories = this.dataset.label;
		this.defaultSetting.title.text = this.setting.chart_title;

		this.defaultSetting.xAxis.title.text = this.setting.x_axis_title;
		this.defaultSetting.yAxis.title.text =
      this.setting.y_axis_title != "" ? this.setting.y_axis_title : "";
	  this.defaultSetting.legend.layout = this.setting.legend_layout  != "" ? this.setting.legend_layout : "vertical"
	  this.defaultSetting.legend.align = this.setting.legend_align  != "" ? this.setting.legend_align : "right"
	  this.defaultSetting.legend.verticalAlign = this.setting.legend_verticalAlign  != "" ? this.setting.legend_verticalAlign : "center"
	  this.defaultSetting.chart.backgroundColor = this.setting.background_color  != "" ? this.setting.background_color : "#ffffff"
	},

	methods: {
		avgFun: async function (arr) {
			const sum = arr.reduce((acc, cur) => acc + cur);
			const average = sum / arr.length;
			return average;
		},
	},
};
</script>