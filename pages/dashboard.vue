<template>
	<div class="evolve-page">
		<PageHeaderBar
			:menuid="EvolveMenu_Id"
			:pageurl="pageURL"
			:mastercode="helpMasterCode"
			:optionheader="false"
			:keywordslist="keywords"
		/>
		 
		<client-only>
		
			<div id="sc-page-content" class="evolve-page-body">
				<!-- Dashboard Start  -->
				<div data-uk-grid="" data-uk-sortable="" class=" sc-velocity-animation uk-child-width-1-5@xl uk-child-width-1-3@l uk-child-width-1-2@s uk-grid uk-grid-match uk-sortable uk-grid-medium responsive-height" style="min-height: 150px;">
					<div style="user-select: none;" class="uk-first-column">
						<div class="uk-card sc-widget uk-flex">
							<div class="uk-width-1-4 md-bg-blue-800 uk-flex-middle uk-flex uk-flex-center">
								<i class="mdi mdi-memory md-color-white sc-icon-24"></i>
							</div> <div class="uk-flex-1">
								<div class="uk-card-body center-title">
									<h3 class="uk-card-title">
										Memory usage
									</h3> <div class="sc-progress uk-margin-small-top">
										<div class="sc-progress-bar md-bg-green-400" style="width: 30%;"></div>
									</div>
								</div>
							</div> <!---->
						</div>
					</div><div style="user-select: none;" class="">
						<div class="uk-card sc-widget uk-flex">
							<div class="uk-width-1-4 md-bg-blue-800 uk-flex-middle uk-flex uk-flex-center">
								<i class="mdi mdi-account-card-details md-color-white sc-icon-24"></i>
							</div> <div class="uk-flex-1">
								<div class="uk-card-body center-title">
									<h3 class="uk-card-title">
										New Customers
									</h3> <div class="uk-text-meta">
										5
									</div>
								</div>
							</div> <!---->
						</div>
					</div><div style="user-select: none;" class="">
						<div class="uk-card sc-widget uk-flex">
							<div class="uk-width-1-4 md-bg-blue-800 uk-flex-middle uk-flex uk-flex-center">
								<i class="mdi mdi-truck md-color-white sc-icon-24"></i>
							</div> <div class="uk-flex-1">
								<div class="uk-card-body center-title">
									<h3 class="uk-card-title">
										Today's Invoice
									</h3> <div class="uk-text-meta">
										40
									</div>
								</div>
							</div> <!---->
						</div>
					</div>


					<div style="user-select: none;" class="">
						<div class="uk-card sc-widget uk-flex">
							<div class="uk-width-1-4 md-bg-blue-800 uk-flex-middle uk-flex uk-flex-center">
								<i class="mdi mdi-shield-account md-color-white sc-widget-addon"></i>
							</div> <div class="uk-flex-1">
								<div class="uk-card-body center-title">
									<h3 class="uk-card-title">
										8
									</h3> <div class="uk-text-meta">
										Approval Pending
									</div>
								</div>
							</div> <!---->
						</div>
					</div>
					<div style="user-select: none;" class="">
						<div class="uk-card sc-widget uk-flex">
							<div class="uk-width-1-4 md-bg-blue-800 uk-flex-middle uk-flex uk-flex-center">
								<i class="mdi mdi-server md-color-white sc-widget-addon"></i>
							</div> <div class="uk-flex-1">
								<div class="uk-card-body center-title">
									<h3 class="uk-card-title">
										88.95%
									</h3> <div class="uk-text-meta">
										Machine Efficiency 
									</div>
								</div>
							</div> <!---->
						</div>
					</div>
				</div>

				<div class=" uk-margin-small-top uk-child-width-1-4@xl uk-child-width-1-2@s uk-grid uk-grid-medium" data-uk-grid>
					<div>
						<div class="sc-widget uk-card uk-box-shadow-small">
							<div class="sc-widget-content custom-padding">
								<div class="uk-flex uk-flex-middle">
									<div class="uk-flex-1">
										<h3 class="uk-card-title">
											New Customers
										</h3>
										<div class="uk-text-meta">
											Apr - Mar 2023
										</div>
									</div>
									<div>
										<span class="sc-widget-addon md-color-green-600">
											+20%
										</span>
									</div>
								</div>
							</div>
							<!-- <ChartJsLine chart-id="widgetsChartsA" :data="widgetsChartsA" :options="widgetChart.options" class="sc-chart sc-chart-widget"></ChartJsLine> -->
						</div>
					</div>
					<div>
						<div class="sc-widget uk-card uk-box-shadow-small">
							<div class="sc-widget-content custom-padding">
								<div class="uk-flex uk-flex-middle">
									<div class="uk-flex-1">
										<h3 class="uk-card-title">
											Item Stocks
										</h3>
										<div class="uk-text-meta">
											Last 7 days
										</div>
									</div>
									<div>
										<span class="sc-widget-addon md-color-blue-grey-600">
											<i class="mdi mdi-comment-text-multiple-outline"></i>
										</span>
									</div>
								</div>
							</div>
							<!-- <ChartJsLine chart-id="widgetsChartsB" :data="widgetsChartsB" :options="widgetChart.options" class="sc-chart sc-chart-widget"></ChartJsLine> -->
						</div>
					</div>
					<div>
						<div class="sc-widget uk-card uk-box-shadow-small uk-margin-small-top">
							<div class="sc-widget-content custom-padding">
								<div class="uk-flex uk-flex-middle">
									<div class="uk-flex-1">
										<h3 class="uk-card-title ">
											Sale
										</h3>
										<div class="uk-text-meta">
											04.2022 - 03.2023
										</div>
									</div>
									<div>
										<span class="sc-widget-addon md-color-red-600">
											+ ₹ 88,05,141.00
										</span>
									</div>
								</div>
							</div>
							<!-- <ChartJsLine chart-id="widgetsChartsC" :data="widgetsChartsC" :options="widgetChart.options" class="sc-chart sc-chart-widget"></ChartJsLine> -->
						</div>
					</div>
					<div>
						<div class="sc-widget uk-card uk-box-shadow-small uk-margin-small-top"> 
							<div class="sc-widget-content custom-padding">
								<div class="uk-flex uk-flex-middle">
									<div class="uk-flex-1">
										<h3 class="uk-card-title center-progess">
											Orders
										</h3>
										<div class="uk-text-meta">
											02.2022 - 07.2022
										</div>
									</div>
									<div>
										<span class="sc-widget-addon md-color-blue-grey-600">
											<i class="mdi mdi-cart"></i>
										</span>
									</div>
								</div>
							</div>
							<!-- <ChartJsLine chart-id="widgetsChartsD" :data="widgetsChartsD" :options="widgetChart.options" class="sc-chart sc-chart-widget"></ChartJsLine> -->
						</div>
					</div>
				</div>


				<!-- Dashboad End -->
				<!-- <chartroot :component="component" :setting="settingData" /> -->
			</div>
		</client-only>
	</div>
</template>
 <style scoped>
	.custom-padding{
		padding: 4px 24px !important;
	}
	h3{
		font-family: "Roboto", Arial, Helvetica, sans-serif !important;
		font-size: 16px;
	}
	.center-title{
		display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    padding: 0 17px !IMPORTANT;
	}
	.uk-grid + .uk-grid, .uk-grid > .uk-grid-margin{
		margin-top: 13px !important;
	}
	.sc-progress-bar{
		height: 4px;
		border-radius: 0px;
	}
	.mdi:before{
		font-size: 23px;
	}
	@media(max-width:767px){
		.responsive-height{
			height: 100% !important;
		}
	}
	@media(min-width:768px) and (max-width:991px){
		.responsive-height{
			height: 50% !important;
		}
	}
	@media(min-width:991px) and (max-width:1200px){
		.responsive-height{
			min-height: 200px !important;
		}
	}
</style>
<script>
// import Chart from '~/components/chartjs/defaults'
// import { uniqueID } from "~/assets/js/scutum_common";
//import ScInput from "~/components/Input";
// import { scColors } from "~/assets/js/utils";
// import ChartJsBar from "~/components/chartjs/Bar";
// import ChartJsLine from "~/components/chartjs/Line";
// import DateRangePicker from '~/components/DateRangePicker'
//import PrettyCheck from 'pretty-checkbox-vue/check';
if (process.client) {
	// var Paginate = require("vuejs-paginate");
	// require("~/plugins/flatpickr");
	// require('~/plugins/gmaps')
}

// import draggable from "vuedraggable";
export default {
	components: {
		PageHeaderBar: defineAsyncComponent(() => import('~/components/cust/PageHeaderBar')),
		// ChartJsLine : process.client ? () => import("~/components/chartjs/Line") : null,
		// BillboardChart: process.client
		// 	? () => import("~/components/billboard-charts/Chart")
		// 	: null,
		// ChartJsBar,
		// ChartJsLine,
		// chartroot : process.client ? () => import("~/components/cust/HighCharts/ChartRoot") : null,
		//ScInput,
		//PrettyCheck
	},

	head () {
		return {
			title: "Evolve - " + this.$route.name,
		};
	},
	props: {
		params: {
			type: Object,
			default: () => {},
		},
	},
	layout: "default",
	data () {
		return {
			pageURL : '/dashboard',
			EvolveMenu_Id: this.$route.query.EvolveMenu_Id,
			userId: useStore().user.EvolveUser_ID,
			keywords:{},
			helpMasterCode: "DASHBOARD",
			// color: (process.client) ? Chart.helpers.color : '#fff',
			widgetChart: {
				options: {
					responsive: true,
					maintainAspectRatio: false,
					layout: {
						padding: {
							top: 10
						}
					},
					title: {
						display: false
					},
					legend: {
						display: false,
					},
					tooltips: {
						enabled: false
					},
					elements: {
						line: {
							tension: 0.000001,
							borderWidth: 2
						},
						point: {
							radius: 0
						}
					},
					plugins: {
						filler: {
							propagate: false
						},
						datalabels: false
					},
					scales: {
						xAxes: [{
							display: false
						}],
						yAxes: [{
							display: false
						}]
					},
				}
			},
 			 
		};
	},
	 
	computed: {
		widgetsChartsA () {
			return {
				labels: ["January", "February", "March", "April", "May", "June"],
				datasets: [{
					backgroundColor: '#5a87c58c',
					borderColor: '#5a87c5',
					data: [120, 60, 400, 150, 390, 435],
					fill: 'start'
				}]
			}
		},
		widgetsChartsB () {
			return {
				labels: ["January", "February", "March", "April", "May", "June"],
				datasets: [{
					backgroundColor: '#5a87c58c',
					borderColor: '#5a87c5',
					data: [90, 23, 76, 234, 123, 50],
					fill: 'start'
				}]
			}
		},
		widgetsChartsC () {
			return {
				labels: ["January", "February", "March", "April", "May", "June"],
				datasets: [{
					backgroundColor: '#5a87c58c',
					borderColor: '#5a87c5',
					data: [80, 60, 234, 150, 67, 378],
					fill: 'start'
				}]
			}
		},
		widgetsChartsD () {
			return {
				labels: ["January", "February", "March", "April", "May", "June"],
				datasets: [{
					backgroundColor: '#5a87c58c',
					borderColor: '#5a87c5',
					data: [34, 20, 100, 250, 190, 5],
					fill: 'start'
				}]
			}
		},
	},


	// mounted () {},
	// beforeDestroy () {
	// },
	created: async function () {
		this.onGetData();
	},

	// beforeMount () {
		 
		 
	// },

	methods: {
		
		refreshClick: async function () { 
			try {
				 
			} catch (error) {
				console.log(error);
			} 
			 
		},
		 
		 
		onGetData: async function () {
			try {
				// let list = await this.$axios.$get("/getGraphData").catch((e) => {});
				// if (list) {
				// 	// if (list.statusCode == 200) {
				// 	// 	let graphData = list.result;
				// 	// 	console.log("graphData ::", graphData);
				// 	// 	this.settingData = {
				// 	// 		chart_title : graphData.Setting.chart_title.value
				// 	// 	}
				// 	// 	// console.log("graphData.Setting ::", graphData.Setting.chart_title.key);
				// 	//    	this.LINEDATETIME.title.text =  graphData.Setting.chart_title.value;
				// 	// 	for (let field of graphData.Graph.EvolveDeviceGraph_FieldsMapping) {
				// 	// 		 this.LINEDATETIME.series.push({
				// 	// 			name : field.title,
				// 	// 			data : graphData.chartData[field.field]							 
				// 	// 		 })
				// 	// 	} 
				// 	// 	this.keychnageEvnt = false;
				// 	// 	//this.aasa = this.LINEDATETIME;
				// 	// }
				// 	// console.log("list>>>", list);
				// }
			} catch (error) {
				console.log("error", error.message);
			}
		},
 
	},
};
</script>
 