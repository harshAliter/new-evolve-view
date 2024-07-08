<template>
	<div class="uk-card uk-card-default">
		<highcharts ref="chart" :options="defaultSetting"></highcharts>
	</div>
</template>

<script>
export default {
	name: "PIECHART",

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
					type: "pie",
					backgroundColor: "#ffffff",
					height:'463px'
				},
				title: {
					text: "",
				},
				yAxis: {
					title: {
						text: "",
					},
				},
				legend: {
					layout: 'vertical',
					align: 'right',
					verticalAlign: 'middle'
				},

				credits: {
					enabled: false,
				},

				plotOptions: {
					pie: {
						allowPointSelect: true,
						cursor: "pointer",
						dataLabels: {
							enabled: true,
							format: "<b>{point.name}</b>: {point.percentage:.1f} %",
						},
						showInLegend: true,
					},
				},
				series: [],
			},
		};
	},
	created: async function () {
		this.defaultSetting.series = [
			{
				name: "Value",
				colorByPoint: true,
				data: [],
			},
		];
		for (let i = 0; i < this.dataset.graphData.length; i++) {
			let element = this.dataset.graphData[i];
			let avg = await this.avgFun(element.data);
			avg = parseFloat(avg.toFixed(2));
			this.defaultSetting.series[0].data.push({ name: element.name, y: avg });
		}
		this.defaultSetting.title.text = this.setting.chart_title;
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