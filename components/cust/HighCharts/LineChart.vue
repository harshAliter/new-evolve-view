<template>
	<div class="uk-card uk-card-default">
		<highcharts ref="chart" :options="defaultSetting"></highcharts>
	</div>
</template>

<script>
export default {
	name: "LineChart",

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
				 
				title: {
					text: "",
				},

				subtitle: {
					text: "",
				},

				yAxis: {
					title: {
						text: "",
					},
				},
				credits: {
					enabled: false,
				},

				xAxis: {
					categories: [],
					title: {
						text: "",
					},
				},
				legend: {
					layout: 'vertical',
					align: 'right',
					verticalAlign: 'middle'
				},
				chart: {
					zoomType: "xy",
					backgroundColor: "#ffffff",
					height:'463px'
				},
				plotOptions: {
					series: {
						label: {
							connectorAllowed: false,
						},
					},
				},
				series: [],

				responsive: {
					rules: [
						{
							condition: {
								maxWidth: 500,
							},
							// chartOptions: {
							// 	legend: {
							// 		layout: "horizontal",
							// 		align: "center",
							// 		verticalAlign: "bottom",
							// 	},
							// },
						},
					],
				},
			},
		};
	},
	created: async function () {
		this.defaultSetting.series = this.dataset.graphData;
		this.defaultSetting.xAxis.categories = this.dataset.label;
		this.defaultSetting.title.text = this.setting.chart_title;
		this.defaultSetting.xAxis.title.text = this.setting.x_axis_title;
		this.defaultSetting.yAxis.title.text =
      this.setting.y_axis_title != "" ? this.setting.y_axis_title : "";
	  this.defaultSetting.legend.layout = this.setting.legend_layout  != "" ? this.setting.legend_layout : "vertical"
	  this.defaultSetting.legend.align = this.setting.legend_align  != "" ? this.setting.legend_align : "right"
	  this.defaultSetting.legend.verticalAlign = this.setting.legend_verticalAlign  != "" ? this.setting.legend_verticalAlign : "middle"
	  this.defaultSetting.chart.backgroundColor = this.setting.background_color  != "" ? this.setting.background_color : "#ffffff";
		this.defaultSetting.chart.height = (this.setting.chart_height != undefined) ? this.setting.chart_height  : this.defaultSetting.chart.height;
	},
};
</script>