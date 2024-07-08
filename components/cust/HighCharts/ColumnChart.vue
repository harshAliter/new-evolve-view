<template>
	<div class="uk-card uk-card-default">
		<highcharts ref="chart" :options="defaultSetting"></highcharts>
	</div>
</template>

<script>
export default {
	name: "COLUMNCHART",

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
				credits: {
					enabled: false,
				},
				legend: {
					layout: 'vertical',
					align: 'right',
					verticalAlign: 'middle'
				},

				chart: {
					type: "column",
					zoomType: "xy",
					backgroundColor: "#ffffff",
					height:'463px'
				},
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
				xAxis: {
				
					title: {
						text: "",
					},
					
				},
				// xAxis: {

				// },

				plotOptions: {
					column: {
						pointPadding: 0.2,
						borderWidth: 0,
					},
				},
				series: [],
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
	  this.defaultSetting.legend.verticalAlign = this.setting.legend_verticalAlign  != "" ? this.setting.legend_verticalAlign : "center"
	  this.defaultSetting.chart.backgroundColor = this.setting.background_color  != "" ? this.setting.background_color : "#ffffff";
	    this.defaultSetting.chart.height = (this.setting.chart_height != undefined) ? this.setting.chart_height  : this.defaultSetting.chart.height;
	},
};
</script>