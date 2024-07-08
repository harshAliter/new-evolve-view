<template>
	<div>
		<div class="md-bg-grey-100">
			<div class="responsive-table" style="max-height: 115px;">
				<table
					id="sc-js-dynamic-fields-education"
					class="uk-table uk-table-small uk-table-middle uk-table-divider"
				>
					<thead>
						<tr>
							<!-- <th></th> -->
							<th
								class="uk-text-nowrap"
								:data-uk-tooltip="keywords.FIELDS.ttps"
							>
								{{ keywords.FIELDS.val }}
							</th>
							<th
								class="uk-text-nowrap"
								:data-uk-tooltip="keywords.OPERATOR_DESC.ttps"
							>
								{{ keywords.OPERATOR_DESC.val }}
							</th>
							<th class="uk-text-nowrap" :data-uk-tooltip="keywords.VALUE.ttps">
								{{ keywords.VALUE.val }}
							</th>
							<th
								class="uk-text-nowrap"
								:data-uk-tooltip="keywords.OPTIONS.ttps"
							>
								{{ keywords.OPTIONS.val }}
							</th>
							<th class="uk-text-nowrap">
								<a
									id="filtercomp"
									href="javascript:void(0)"
									class="sc-button header-button-evolve daynamic-search-table-btn"
									:data-uk-tooltip="keywords.FILTER.ttps"
									@click="searchData($event)"
								>
									{{ keywords.FILTER.val }} </a>&nbsp;&nbsp;<a
									href="javascript:void(0)"
									class="sc-button sc-button-danger header-button-evolve daynamic-search-table-btn"
									:data-uk-tooltip="keywords.CLEAR.ttps"
									@click="clearData($event)"
								>
									{{ keywords.CLEAR.val }}
								</a>
							</th>
						</tr>
					</thead>
					<tbody>
						<tr
							v-for="(item, index) in filterData"
							:key="item.id"
							class="sc-form-section"
						>
							<!-- <td>{{ index + 1 }}.</td> -->
							<td class="uk-width-1-3">
								<select :id="selectId"
									v-model="item.field"
									:name="'col'+index"
									class="uk-select uk-form-small mobile-width"
									@change="getCollectionName(index)"
								>
									<option value="" disabled selected>
										Select Field
									</option> 
									<option
										v-for="field in list"
										:key="field.key"
										:value="field.key"
										selected
									>
										{{ field.value }} 
									</option> 
								</select>
							</td>
							<td>
								<select v-model="item.operator" class="uk-select uk-form-small mobile-width" @change="onChangeOperator()">
									<option value="" disabled selected>
										Select Key
									</option>
									<option
										v-for="opr in opreters"
										:key="opr.key"
										:value="opr.key"
									>
										{{ opr.value }}
									</option>
								</select>
							</td>
							<td v-if="item.operator!='da' && item.operator!='dr' && item.operator!='drt' && item.type!='fs'">
								<ScInput
									v-model="item.value"
									extra-classes="uk-form-small"
									mode="outline"
									placeholder="Value"
									class="input-height"
									@enter="searchData"
								></ScInput>
							</td>
							<td v-if="item.type=='fs'">
								<FieldSearch 
									:key="keyReload"
									v-model="item.value"	
									placeholder="Select Feild"
									:searchobject="item.daynemicSearchObj"
								/>
							</td>
							<td v-if="item.operator=='da' && item.operator!='dr' && item.operator!='drt' && item.type!='fs'">
								<ScInput
									v-model="item.value"
									v-flatpickr="{
										altInput: false,
										dateFormat: 'd-m-Y',
										allowInput: false,
									}"
									mode="outline"
									name="retireLife"
									placeholder="Select Date"
								>
								</ScInput>
							</td>
							<td v-if="item.operator=='dr' && item.operator!='da' && item.operator!='drt' && item.type!='fs'">
								<DateRangePicker
									:key="reInit"
									:config="{
										format: 'DD-MM-YYYY',
										autoClose: false,
										time: { enabled: false },
									}"
								>
									<ScInput
										:id="'dateRange'+index"
										v-model="item.value"
									></ScInput>
								</DateRangePicker>
							</td>
							<td v-if="item.operator=='drt' && item.operator!='da' && item.operator!='dr' && item.type!='fs'">
								<!-- <DateRangePicker
									:key="reInit"
									:config="{
										format: 'DD-MM-YYYY HH:mm',
										autoClose: false,
										time: { enabled: true },
									}"
								>
									<ScInput
										:id="'dateRange1'+index"
										v-model="item.value"
									></ScInput>
								</DateRangePicker> -->
								<div class="uk-width-1-1">
									<div class="uk-grid uk-margin-remove" data-uk-grid>
										<div class="uk-width-1-2@m">
											<ScInput 
												:key="reloadFromDate"
												v-model="item.startDate"
												v-flatpickr="{ 'dateFormat': 'd-m-Y H:i', 'enableTime': true,'time_24hr': true }"
												placeholder="From Date"
												mode="outline"
											></ScInput>
										</div>
										<div class="uk-width-1-2@m">
											<ScInput 
												:key="reloadFromDate"
												v-model="item.endDate"
												v-flatpickr="{ 'dateFormat': 'd-m-Y H:i', 'enableTime': true,'time_24hr': true }"
												placeholder="To Date"
												mode="outline"
											></ScInput>
										</div>
									</div>
								</div>
							</td>
			


							<td class="uk-table-middle uk-text-center uk-flex">
								<a
									v-if="filterData.length === index + 1"
									href="javascript:void(0)"
									class="
                    sc-button
                    sc-button-icon
                    sc-button-outline
                    sc-button-outline-square
                    sc-button-outline-primary
                  "
									style="height: 23px !important;"
									@click="addFilterData($event)"
								>
									<i class="mdi mdi-plus add_filter"></i>
								</a>
								<a
									v-if="filterData.length === index + 1 && filterData.length > 1"
									href="javascript:void(0)"
									class="
                    sc-button
                    sc-button-icon
                    sc-button-outline
                    sc-button-outline-square
                    sc-button-outline-danger
                  "
									style="height: 23px !important;"
									@click="removeFilerData($event, item.id)"
								>
									<i class="mdi mdi-trash-can-outline add_filter"></i>
								</a>
								<a
									v-if="filterData.length !== index + 1"
									href="javascript:void(0)"
									class="
                    sc-button
                    sc-button-icon
                    sc-button-outline
                    sc-button-outline-square
                    sc-button-outline-danger
                  "
									style="height: 23px !important;"
									@click="removeFilerData($event, item.id)"
								>
									<i class="mdi mdi-trash-can-outline add_filter"></i>
								</a>
							</td>
							<td></td>
						</tr>
						<!-- <tr>
							<td colspan="3"></td>
							<td>
								<a
									href="javascript:void(0)"
									class="sc-button header-button-evolve"
									:data-uk-tooltip="keywords.FILTER.ttps"
									@click="searchData($event)"
								>
									{{ keywords.FILTER.val }} </a>&nbsp;&nbsp;<a
									href="javascript:void(0)"
									class="sc-button sc-button-danger header-button-evolve"
									:data-uk-tooltip="keywords.CLEAR.ttps"
									@click="clearData($event)"
								>
									{{ keywords.CLEAR.val }}
								</a>
							</td>
							<td></td>
						</tr> -->
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>
<style scoped>
.daynamic-search-table-btn {
    /* height: 22px; */
	height: 18px;
    /* padding: 2px 16px; */
	padding: 0px 16px;
    /* line-height: 21px !important;
	 */
	 line-height:19px !important;
	font-size: 11px !important;
    /* margin: 0px 2px !important; */
	margin: 0px 2px !important;
}

.sc-button-icon > i.add_filter:before{
    font-size: 19px !important; 
	font-weight: bolder;
}
.uk-form-small:not(textarea):not([multiple]):not([size]){
	height: 24px !important;
}


@media (max-width:768px){
	.mobile-width{
	width: -webkit-fill-available;
}
}

</style>
<script>
import ScInput from "~/components/Input";
import { scHelpers } from "~/assets/js/utils";
import confirmDatePlugin from 'flatpickr/dist/plugins/confirmDate/confirmDate';
import("~/plugins/flatpickr");

const { uniqueID } = scHelpers;
export default {
	name: "DaynamicSearch",
	components: {
		ScInput,
		DateRangePicker: process.client
			? () => import("~/components/DateRangePicker")
			: null,

		  FieldSearch: process.client ? () => import("~/components/cust/FieldSearch") : null,
	},
	props: {
		name: {
			type: String,
			default: null,
		},
		list: {
			type: Array,
			default: () => [],
		}
	},
	//  emits: ['update:modelValue' , 'focus', 'filerClick' , 'enter'],
	data: () => ({
		helpMasterCode : 'DAYNAMICSEARCH',
		reInit : 0,
		keyReload:0,
	
		keywords: {
			FIELDS: {
				val: "Table Fields",
				ttps: "Table Fields",
			},
			OPERATOR_DESC: {
				val: "Operator Desc",
				ttps: "Operator Desc",
			},
			VALUE: {
				val: "Value",
				ttps: "Value",
			},
			OPTIONS: {
				val: "Options",
				ttps: "Options",
			},
			COLLECTIONNAME: {
				val: "Collection Name",
				ttps: "Collection Name",
			},
			FILTER: {
				val: "Filter",
				ttps: "Filter",
			},
			CLEAR: {
				val: "Clear",
				ttps: "Clear",
			},
		},
		filterData: [
			{
				id: uniqueID(),
				field: "",
				operator: "",
				value: "",
				type :'',
				daynemicSearchObj:null,
				collectionName : "",
			
			},
		],

		opreters: [
			{
				key: "in",
				value: "Equals",
			},
			{
				key: "regex",
				value: "Contains",
			},
			{
				key: "ne",
				value: "Not Equals",
			},
			{
				key: "gt",
				value: "Greater Than",
			},
			{
				key: "lt",
				value: "Less Than",
			},
			{
				key: "btw",
				value: "Between",
			},
			{
				key:"da",
				value:"Date"
			},
			{
				key:'dr',
				value:"Date Range"
			},
			{
				key:'drt',
				value:"Date Range Time"
			}
		],
		selectId : 'filesd_'+ uniqueID()
	}),

	computed:{
		dpRange () {
			return {
				altInput: false,
				dateFormat: 'd-m-Y',
				allowInput: false,
				mode: "range",
				plugins: [confirmDatePlugin]
			}
		},
	},
	created: async function () {
		// this.$store.dispatch("loadPageData", {
		// 	masterCode: this.helpMasterCode, // Master code
		// 	keywords: this.keywords,
			
		// });

		// document.addEventListener('keydown', (e) => {
		// 	if (e.key == 'Enter') {
		// 		let activetab = document.getElementById('filtercomp');
		// 		if(activetab != null && activetab != undefined && activetab != ''){
		// 			activetab.click()
		// 		}
		// 	}
			
		// });
		
	},
	mounted () {
		this.$eventBus.$on(this.helpMasterCode, (data) => {
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

		this.$eventBus.$on('onChangeLanguage', () =>{
			this.$store.dispatch("loadPageData", {
				masterCode: this.helpMasterCode, // Master code
				keywords: this.keywords,
			});			 
		});


	},
	methods: {
		addFilterData (e) {
			e.preventDefault();
			this.filterData.push({
				id: uniqueID(),
				field: "",
				operator: "",
				value: "",
				type:'',
				daynemicSearchObj:null,
				collectionName : "",
				
			});  
		},
		removeFilerData (e, id) {
			e.preventDefault();
			var index = this.filterData
				.map(function (item) {
					return item.id;
				})
				.indexOf(id);
			this.filterData.splice(index, 1);
			this.$emit("update:modelValue", this.filterData);
		},

		searchData (e) {
			for (let i = 0; i < this.filterData.length; i++) {
				if (this.filterData[i].operator == 'dr') {
					this.filterData[i].value = document.getElementById("dateRange"+i).value;
				}
				if (this.filterData[i].operator == 'drt') {
					this.filterData[i].value = this.filterData[i].startDate+ "~"+this.filterData[i].endDate;
				} 


			}
			this.$emit("update:modelValue", this.filterData);
			this.$emit("filerClick", "CLICK");
		},
		clearData (e, id) { 
			var index = (this.filterData = [
				{
					id: uniqueID(),
					field: "",
					operator: "",
					value: "",
					type:'',
					daynemicSearchObj:null,
					collectionName : "",
				
				},
			]);  
			this.$emit("update:modelValue", this.filterData);
			this.$emit("filerClick", "CLICK");
		},

		getCollectionName : async function (index){
			let collIndex = ($("select[id = '"+this.selectId+"'][name='col"+index+"'"+"] option:selected").index()) -1;  

			this.filterData[index].collectionName = this.list[collIndex].collectionName 
			this.filterData[index].type =  this.list[collIndex].type 	 

			 if (this.filterData[index].type =='fs') {
				 this.filterData[index].daynemicSearchObj={...this.list[collIndex].searchobj} 
				 this.keyReload+=1
			}   
		},

		onChangeOperator : async function () {
			try {
				this.reInit += 1;
			} catch (error) {
				console.error("Error In OnChangeOperator Catch : ", error.message)
			}
		}
	},
};
</script>