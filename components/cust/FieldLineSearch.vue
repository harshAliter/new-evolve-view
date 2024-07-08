<template>
	<div>
		<div class="">
			<!-- extra-classes="uk-form-small" -->
			<ScInput v-model="inoutData"
				:extra-classes="(searchobject.disable != undefined) ? ((searchobject.disable == false) ? 'uk-form-small' : 'uk-form-small disable_field_search') : 'uk-form-small'"
				mode="outline"
				:placeholder="placeholder"
				:read-only="true"
				:error-class="errorclass"
				@click="searchBtnClick()"
			>
				<a v-if="!isDataSelected"
					class="uk-form-icon uk-form-icon-flip"
					data-uk-icon="icon: search"
					:style="(searchobject.disable != undefined) ? ((searchobject.disable == false) ? 'pointer-events: initial;' : 'pointer-events: none') : 'pointer-events: initial'"
					@click="searchBtnClick()"
				>
				</a>
				<a v-if="isDataSelected"
					class="uk-form-icon uk-form-icon-flip"
					data-uk-icon="icon: close"
					:style="(searchobject.disable != undefined) ? ((searchobject.disable == false) ? 'pointer-events: initial;' : 'pointer-events: none') : 'pointer-events: initial'"
					@click="removeBtnClick()"
				>
				</a>
			</ScInput>

			<div :id="'field-search' + searchobject.table + modalName"
				class="uk-modal"
				data-uk-modal
				uk-modal="stack: true"
			>
				<div class="uk-modal-dialog">
					<button class="uk-modal-close-default" type="button" data-uk-close @click="clearData()"></button>
					<div class="uk-modal-header">
						<table class="uk-table uk-table-small uk-table-middle  ">
							<tbody>
								<tr v-for="(item, index) in filterData" :key="item.id" class="sc-form-section">
									<td class="uk-width-1-3">
										<select id="mySelect"
											v-model="item.field"
											:name="'col' + index"
											class="uk-select uk-form-small"
											@change="getCollectionName(index)"
										>
											<option value="" disabled selected>
												Select Field
											</option>
											<option v-for="field in headList"
												:key="field.searchKey"
												:value="field.disp==undefined ? field.searchKey : field.disp"
											>
												{{ field.lable }}
											</option>
										</select>
									</td>
									<td>
										<select v-model="item.operator" class="uk-select uk-form-small">
											<option value="" disabled selected>
												Select Key
											</option>
											<option v-for="opr in opreters" :key="opr.key" :value="opr.key">
												{{ opr.value }}
											</option>
										</select>
									</td>
									<td>
										<!-- <ScInput
											v-model="item.value"
											extra-classes="uk-form-small"
											mode="outline"
											placeholder="Value"
										></ScInput> -->
										<input v-model="item.value"
											type="text"
											placeholder="Value"
											class="uk-input sc-vue-input sc-input-outline uk-form-small"
										>
									</td>

									<td class="uk-table-middle uk-text-center">
										<a v-if="filterData.length === index + 1"
											href="javascript:void(0)"
											class="
                    sc-button
                    sc-button-icon
                    sc-button-outline
                    sc-button-outline-square
                    sc-button-outline-primary
					sc-button-min
                  "
											@click="addFilterData($event)"
										>
											<i class="mdi mdi-plus"></i>
										</a>
										<a v-if="filterData.length !== index + 1"
											href="javascript:void(0)"
											class="
                    sc-button
                    sc-button-icon
                    sc-button-outline
                    sc-button-outline-square
                    sc-button-outline-danger
					sc-button-min
                  "
											@click="removeFilerData($event, item.id)"
										>
											<i class="mdi mdi-trash-can-outline"></i>
										</a>
									</td>
								</tr>
								<tr>
									<td colspan="2"></td>
									<td>
										<button class="sc-button sc-button-mini"
											:data-uk-tooltip="keywords.FILTER.ttps"
											@click="searchData($event)"
										>
											{{ keywords.FILTER.val }}
										</button>
										<button class="sc-button sc-button-mini sc-button-outline-danger"
											:data-uk-tooltip="keywords.CLEAR.ttps"
											@click="clearData($event)"
										>
											{{ keywords.CLEAR.val }}
										</button>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div class="uk-modal-body" style="overflow: scroll;">
						<div class="responsive-table" style="min-height: 305px;">
							<table class="uk-table uk-table-small uk-table-middle uk-table-divider" :class="loading?'loading':'no-loading'">
								<thead>
									<tr>
										<th v-for="(hd) in headList" :key="hd.searchKey" class="sc-form-section">
											{{ hd.lable }}
										</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="(dobj, index) in dataList"
										:key="index"
										class="sc-form-section"
										@click="rowClick(dobj)"
									>
										<td v-for="(hd) in headList" :key="hd.searchKey" class="sc-form-section">
											<span v-if="hd.searchKey != '_id'">
												<!-- {{ dobj[hd.key] }} -->
												{{ dobj[hd.searchKey] }}
											</span>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
						<div class="paginate paginate_modal" style="bottom: 0px;">
							<Paginate :page-count="pageCount"
								:click-handler="paginateClick"
								:prev-text="'<<'"
								:next-text="'>>'"
								:value="currentPage"
								:container-class="'evolve_paginate'"
							></Paginate>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
 <style>
 .paginate_modal {
 	background: transparent;
 	/* bottom: 33px !important; */
 	/* height: 10px; */
 	width: 94%;
 }
 
 .disable_field_search {
 	background: rgba(0, 0, 0, 0.06);
 	pointer-events: none;
 }
 </style>
<script>
import { scHelpers } from "~/assets/js/utils";
import Paginate from "vuejs-paginate-next";
const { uniqueID } = scHelpers;
export default {
	name: "FieldLineSearch",
	components: {
		ScInput: process.client ? defineAsyncComponent(() => import("~/components/Input")) : null,
		Paginate
	},
	props: {
		placeholder: {
			type: String,
			default: null,
		},
		searchobject: {
			type: Object,
			default: () => { },
		},
		errorclass: {
			type: Boolean,
			default: false
		},
	},
	data: () => ({
		inoutData: "",
		isDataSelected: false,
		headList: [],
		dataList: [],
		list: [],
		modalName: 0,
		keywords: {
			FIELDS: {
				val: "Table Fields",
				ttps: "",
			},
			OPERATOR: {
				val: "operator",
				ttps: "",
			},
			VALUE: {
				val: "value",
				ttps: "",
			},
			OPTIONS: {
				val: "options",
				ttps: "",
			},
			COLLECTIONNAME: {
				val: "Collection Name",
				ttps: "",
			},
			FILTER: {
				val: "Filter",
				ttps: "",
			},
			CLEAR: {
				val: "Clear",
				ttps: "",
			},
		},
		filterData: [
			{
				id: uniqueID(),
				field: "",
				operator: "",
				value: "",
				collectionName: "",
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
				key: "gt",
				value: "Greater Than",
			},
			{
				key: "lt",
				value: "Less Than",
			},
		],

		/** Start : EvolveDataTable */
		search: "", // For making dynamic search
		currentPage: 1,
		pageCount: 0,
		displayRecord: 10,
		noOfRecords: 0,
		startFrom: 0,
		displayRow: [10, 25, 50, 100, 200],
		pdfData: {},
		csvExportColums: [0, 1, 2, 3],
		pdfExportColums: [0, 1, 2, 3],
		// searchobj : {},
		/** End : EvolveDataTable */

		loading : true
	}),
	watch: {
		searchobject (data) {
			console.log("data #################", data);
		}
	},
	created: async function () {
		 this.modalName = Math.floor(Math.random() * 1000) + 1
		// console.log("@@@@@@@@@@@@@@@@@@@@@@", this.searchobject);
		// console.log("this.modalName>>>", this.modalName );
		// this.getTableData();
		if(this.searchobject.value != undefined && (this.searchobject.value != "" && this.searchobject.value != null)){
			console.log("this.searchobject.value", this.searchobject.value);
			this.isDataSelected = true;
		}
		await this.getSelectedFiledLineData()
	},
	mounted () {

	},
	methods: {

		async onDisplayRecordChange (displayRecord) {
			try {
				this.startFrom = parseInt(
					this.currentPage * this.displayRecord - this.displayRecord
				);
				this.getTableData();
			} catch (error) {
				this.$store.dispatch('evolveNotification', { code: 111, type: 2 });
			}
		},
		async paginateClick (pageNum) {
			try {
				this.currentPage = pageNum;
				this.startFrom = parseInt(
					pageNum * this.displayRecord - this.displayRecord
				);
				this.getTableData();
			} catch (error) {
				this.$store.dispatch('evolveNotification', { code: 111, type: 2 });
			}
		},

		searchBtnClick () {
			console.log("searchBtnClick>>>> ", this.searchobject);
			//this.getTableData();

			console.log("field-search" + this.searchobject.table + this.modalName)
			UIkit.modal("#field-search" + this.searchobject.table + this.modalName, { bgClose: false, escClose: false, modal: false, keyboard: false }).show();
			// this.$emit("input", this.filterData);
			// this.$emit("filerClick", "CLICK");
		},
		removeBtnClick () { 
			console.log("removeBtnClick");
			this.inoutData = "";
			this.$emit("input", "");
			this.$emit("rowClick", "");
			this.isDataSelected = false;
			this.clearData();
		},
		rowClick (data) {
			
			let name = "";
			let displayFieldLastIndex = this.searchobject.display_field.length - 1;
			this.searchobject.display_field.map(function (v, i){
			
				if (data[v]!=undefined) {
					name+=data[v];
					i != displayFieldLastIndex ? name+="-" : "";
				}
			})
		
			 this.inoutData = name;
			
			this.$emit("input", data[this.searchobject.value_field]);
			this.searchobject.value = data[this.searchobject.value_field] ; 
			console.log("+this.searchobject.table", "#field-search" + this.searchobject.table);
			UIkit.modal("#field-search" + this.searchobject.table + this.modalName).hide();
			this.$emit("rowClick", data);
			this.isDataSelected = true;
			this.clearData();

		},


		getSelectedFiledLineData: async function () {
			try {
				if (this.searchobject['value'] != '' && this.searchobject['value'] != null) {
					let dataObj = await this.$axios.$post("/api/v1/evolve/getSelectedFiledLineData", this.searchobject).catch((e) => {
						this.$store.dispatch('evolveNotification', { code: 117, type: 2 });
					});
					if (dataObj) {
						if (dataObj.statusCode == 200) {
							this.inoutData = dataObj.result;
							let data = {};
							data[this.searchobject['display_field']] = this.inoutData;
							this.$emit("change", dataObj.data);
						}
					}
				}
				this.getTableData();
			} catch (error) {
				console.log('Error Come in Catch : ', error.message);
			}
		},

	
		async getTableData () {
			try {
				this.loading = true;
				this.searchobject['filterArray'] = [];
				if(this.searchobject['defultCondction']){
					if (this.searchobject['defultCondction'] != '') {
						let conarray = ''
						if (typeof this.searchobject['defultCondction'] == 'object') {
							conarray = this.searchobject['defultCondction']
						}else{
							conarray = JSON.parse(this.searchobject['defultCondction'])
						}
						for (let i = 0; i < conarray.length; i++) {
							this.searchobject['filterArray'].push({
								id: uniqueID(),
								field: conarray[i].field,
								operator:  conarray[i].operator,
								value:  conarray[i].value,
								collectionName : conarray[i].collectionName,
								type:conarray[i].type
							})
						}
					
					}
				}
				if (this.filterData.length >0) {
					for (let l = 0; l < this.filterData.length; l++) {
						this.searchobject['filterArray'].push(this.filterData[l])
					}
				}
				this.searchobject['startFrom'] = parseInt(this.startFrom)
				this.searchobject['dispalyRecord'] = parseInt(this.displayRecord)
				// console.log("this.searchobject>>>>>>>>>>>>>>>>>>>>......", this.searchobject);
				let dataObj = await this.$axios.$post("/api/v1/evolve/getArrayFieldObj", this.searchobject).catch((e) => {
					this.loading = false;
					this.$store.dispatch('evolveNotification', { code: 117, type: 2 });
				});
				if (dataObj) {
					if (dataObj.statusCode == 200) {
						console.log("dataObjdataObj", dataObj.result);
						this.headList = this.searchobject['head'];
						this.dataList = dataObj.result.records;
						console.log("this.dataList", this.dataList);
						if (dataObj.result.noOfRecords > 0) {
							this.pageCount = Math.ceil(
								dataObj.result.noOfRecords / this.displayRecord
							);
						} else {
							this.pageCount = 0;
						}
					} else {
						this.$store.dispatch("evolveNotification", dataObj.message);
					}
				}
				this.loading = false;
			} catch (error) {
				this.loading = false;
				console.log('Error Come in Catch : ', error.message);
			}



		},

		addFilterData (e) {
			e.preventDefault();
			this.filterData.push({
				id: uniqueID(),
				field: "",
				operator: "",
				value: "",
				collectionName: "",
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
			this.$emit("input", this.filterData);
		},


		// removeModal: async function (e) {
		// 	$(`'field-search'+${this.searchobject.table}`).remove(); // Remove Old Model From DOM
		// },

		searchData (e) {
			this.getTableData();
			// this.$emit("input", this.filterData);
			// this.$emit("filerClick", "CLICK");
		},
		clearData (e, id) {
			var index = (this.filterData = [
				{
					id: uniqueID(),
					field: "",
					operator: "",
					value: "",
					collectionName: "",
				},
			]);
			this.getTableData()
			// this.$emit("input", this.filterData);
			this.$emit("filerClick", "CLICK");
		},

		getCollectionName: async function (index) {
			for (let i = 0; i < this.headList.length; i++) {
				if (this.filterData[index].field == this.headList[i].searchKey) {
					this.filterData[index].collectionName = this.headList[i].collectionName
				}
			}

		}

	},
};
</script>