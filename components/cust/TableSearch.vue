<template>
	<div>
		<DaynamicSearch v-model="filterArray" name="Serch Page" :list="fieldList" @filerClick="onFilterClick()" />
		<div class="md-bg-grey-100 sc-padding">
			<div class="uk-overflow-auto">
				<table
					id="sc-js-dynamic-fields-education"
					class="uk-table uk-table-small uk-table-middle uk-table-divider"
				>
					<thead>
						<tr>
							<th>code</th>
							<th>name</th>
						</tr>
					</thead>
					<tbody>
						<tr
							v-for="(item) in dataList"
							:key="item.code"
							class="sc-form-section"
						>
							<td @click="onRowClick(item.code)">
								{{ item.code }}.
							</td>
							<td>{{ item.name }}.</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script> 
export default {
	name: "TableSearch",
	components: { 
		DaynamicSearch: process.client ? () => import("~/components/cust/DaynamicSearch") : null,
	},
	props: {
		name: {
			type: String,
			default: null,
		},
		list: {
			type: Array,
			default: () => [],
		},
	},
	data: () => ({
		keywords: {
			FIELDS: {
				val: "Table Fields",
				ttps: "",
			} 
		},
		filterArray: [],
		fieldList: [
			{
				value:"Company Code",
				key: "EvolveCompany_Code",
			},
			{
				value:"Company LocalisationCode",
				key: "EvolveCompany_LocalisationCode",
			},
			{
				value:"Company Description",
				key: "EvolveCompany_Description",
			},
			{	
				value:"Company MachineIp ",
				key:"EvolveCompany_MachineIp"
			}	
		],
		dataList: [{
			code: "code001",
			name : "abc"
		},
		{
			code: "code002",
			name : "abc"
		},
		{
			code: "code003",
			name : "abc"
		}] 
		  
	}),
	created: async function () {
		this.$store.dispatch("loadPageData", {
			masterCode: this.$options.name, // Master code
			keywords: this.keywords,
		});
	},
	mounted () {
		this.$eventBus.$on(this.$options.name, (data) => {
			let thisObj = this;
			Object.keys(this.keywords).forEach(function (key) {
				data.forEach(function (obj) {
					if (obj[key] != undefined) {
						thisObj.keywords[key].val = obj[key].tran; // Translated
						thisObj.keywords[key].ttps = obj[key].ttps; // Tooltips
					}
				});
			});
		});
	},
	methods: {
		onRowClick (code) {
			console.log("code>>>>", code);
			this.$emit('rowClick', code);
		},
		onFilterClick (code) {
			console.log("onFilterClick>>>>", code);
			// this.$emit('rowClick', code);
		},
	}
};
</script>
