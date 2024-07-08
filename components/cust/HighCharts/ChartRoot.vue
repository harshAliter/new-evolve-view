<template>
	<div>
		<div class="">
			<!-- Char t root <br> -->
			<!-- {{ setting }} -->
			<!-- <br> -->
			<!-- {{ "~/components/cust/HighCharts/"+component }} -->
			<ChartBodyLine
				v-if="component == 'LINEDATETIME'"
				:setting="setting"
				:dataset="dataset"
			/>
			<ChartBodyBar
				v-if="component == 'BARCHART'"
				:setting="setting"
				:dataset="dataset"
			/>
			<ChartBodyPie
				v-if="component == 'PIECHART'"
				:setting="setting"
				:dataset="dataset"
			/>
			<ChartBodyLCP
				v-if="component == 'LCPCHART'"
				:setting="setting"
				:dataset="dataset"
			/>
		</div>
	</div>
</template>
<script>
export default {
	name: "ChartRoot",
	components: {
		ChartBodyLine: process.client
			? () => import("~/components/cust/HighCharts/LineChart")
			: null,
		ChartBodyBar: process.client
			? () => import("~/components/cust/HighCharts/ColumnChart")
			: null,
		ChartBodyPie: process.client
			? () => import("~/components/cust/HighCharts/PieChart")
			: null,
		ChartBodyLCP: process.client
			? () => import("~/components/cust/HighCharts/LCP_Chart")
			: null,
	},
	props: {
		component: {
			type: String,
			default: null,
		},
		setting: {
			type: Object,
			default: null,
		},
		dataset: {
			type: Object,
			default: null,
		},
	},
	data: () => ({}),
	watch: {},
	created: async function () {
		// console.log("setting??????????????", this.setting);
		// console.log("dataset dataset", this.dataset);
		// console.log(">>>>>>", this.component);
	},
};
</script>