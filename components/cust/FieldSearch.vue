<template>
	<div>
		<div class="">
			<!-- extra-classes="uk-form-small" -->
			<ScInput :id="activeid"
				v-model="inoutData"
				:extra-classes="(searchobject.disable != undefined) ? ((searchobject.disable == false) ? 'uk-form-small' : 'uk-form-small disable_field_search') : 'uk-form-small'"
				mode="outline"
				class="choise-list"
				:placeholder="placeholder"
				:read-only="readonly"
				:error-class="errorclass"
				:multiple="true"
				:disabled="searchobject.disable"	
				@focus="onFocus"
				@click="searchBtnClick()"
				@enter="(readonly == false)? onRowClickEnter(inoutData): ''"
				@blur="(readonly == false)? rowClickOnBlur(): ''"
			>
				<a v-if="!isDataSelected"
					:name="activeid"
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
					<button class="uk-modal-close-default" type="button" data-uk-close @click="modalClose()"></button>
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
												:value="field.searchKey"
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
											@keyup.enter="filterClicked+=1"
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
										<button 
											:id="'field-search' + searchobject.table + modalName+'filter'"
											class="sc-button sc-button-mini"
											:data-uk-tooltip="keywords.FILTER.ttps"
											@click="filterClicked+=1"
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
					<div class="uk-modal-body">
						<div class="responsive-table" style="min-height: 305px;">
							<table class="uk-table uk-table-small uk-table-middle uk-table-divider" :class="loading?'loading':'no-loading'">
								<thead>
									<tr>
										<th v-for="(hd) in headList" :key="hd.key" class="sc-form-section">
											{{ hd.lable }}
										</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="(dobj, index) in dataList"
										:key="index"
										:class="rowClickClass"
										:style="(multiValueList.findIndex((vsd)=> vsd._id == dobj._id))!= -1 ? 'background-color:#78ffb4' : ''"
										@click="rowClick(dobj , index);"
									>
										<td v-for="(hd) in headList" :key="hd.key" class="sc-form-section">
											<span v-if="(hd.key != '_id' && hd.inputtype != 'DATE')">
												<!-- {{ dobj[hd.key] }} -->
												{{ (hd.refField == 0 ? dobj[hd.key] : valiatdata(dobj ,hd.key , hd.refField)) }}
											</span>
											<span v-if="(hd.key != '_id' && hd.inputtype == 'DATE')">
												<!-- {{ dobj[hd.key] }} -->
												{{ ConvertingDateFormat((hd.refField == 0 ? dobj[hd.key] : dobj[hd.key][hd.refField])) }}
											</span>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
						<div v-if="multiple == true" class="uk-flex uk-flex-right" style="margin-bottom: 12px;">
							<button
								class="sc-button sc-button-primary uk-modal-close"
								type="button"
								:data-uk-tooltip="keywords.select.ttps"
								@click="onClickMultipleSelect()"
							>
								{{ keywords.select.val }}
							</button>
						</div>
						<div>
							<Pagination
								:loading="loading"
								class="fieldsearch-pagination"
								:filter-clicked="filterClicked"
								:current-page="currentPage"
								:is-next-disabled="isLastPage"
								:start-from="startFrom"
								:result-length="dataList.length"
								:total-records="noOfRecords"
								@updatePage="paginateClick"
								@displayRecord="onDisplayRecordChange"
							></Pagination>
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
 tr.sc-form-section:hover {
    background: #edededbd !important;
}
 </style>
<script>
import { scHelpers } from "~/assets/js/utils";

const { uniqueID } = scHelpers;
export default {
	name: "FieldSearch",
	components: {
		ScInput: process.client ? defineAsyncComponent(() =>  import("~/components/Input")) : null,
		Pagination: process.client ? defineAsyncComponent(() =>  import("~/components/cust/Pagination")) : null,
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
		multiple: {
			type: Boolean,
			default: false
		},
		readonly :{
			type: Boolean,
			default: false
		},
		custom : {
			type:String,
			default:''
		},
		custompayload : {
			type:Object,
			default: () => {},
		},
		activeid: {
			type: String,
			default: "",
		},

	},
	data: () => ({
		secondFunction:false,
		inoutData: "",
		isDataSelected: false,
		headList: [],
		dataList: [],
		multiValueList:[],
		list: [],
		modalName: 0,
		valueArray : [],
		selectedArray : [],
		dispalyArray : [],
		resultCache:false,
		rowClickClass : '',
		defaultRoute:'/api/v1/evolve/fieldSearch',
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
			select : {
				val: "Select",
				ttps: "",
			}
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
				key: "ne",
				value: "Not Equals",
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

		loading : true,
		isPreviousData : null,
		isSelectSingle : false,

		filterClicked:0,
		isLastPage:false,
		isCountRecords : false,

	}),

	watch: {
		searchobject (data) {
			// console.log("data #################", data);
		},
	},

	created: async function () {
		 this.modalName = Math.floor(Math.random() * 1000) + 1
		if(this.searchobject.value != undefined && (this.searchobject.value != "" && this.searchobject.value != null)){
			this.isSelectSingle = true;
			await this.getSelectedFiledListData();
			this.isDataSelected = true;
		}
		document.addEventListener('keydown', (e) => {
			if (e.keyCode == '32') {
				let element = document.activeElement.id;
				// console.log('elem ', element);
				if(element != null && element != undefined && element != ""){
					let activetab = document.getElementsByName(element)[0].click();
					// console.log("ACTIVE :: ", activetab);
				}
			
			}
		});
		// let thisl = this;
		// document.addEventListener('keydown', (e) => {
		// 	if (e.key == 'Enter') {
		// 		let data = document.getElementById('field-search' + thisl.searchobject.table + thisl.modalName);
				

		// 		if(data){
		// 			if( data.className.includes('uk-open')){
		// 				let getElem = document.getElementById('field-search' + thisl.searchobject.table + thisl.modalName+'filter')
		// 				if(getElem != null && getElem != undefined && getElem != ''){
		// 					getElem.click()
		// 				}
		// 			}
		// 		}
				
				
		// 	}
		// });

	},
	mounted () {
		// this?.$parent?.$on(this.activeid, this.onRowClickEnter)
	},

	beforeDestroy () {
		// this?.$parent?.$off(this.activeid, this.onRowClickEnter);
	},

	methods: {

		async onDisplayRecordChange (displayRecord, isCountMode = false) {
			try {
				if(isCountMode){
					this.isCountRecords = true;
				}
				this.startFrom = 0;
				this.currentPage = 1;
				this.displayRecord = parseInt(displayRecord);
				this.isLastPage = false
				this.getTableData();
			} catch (error) {
				this.$store.dispatch('evolveNotification', {
					code: 111,
					type: 2,
					var: [`${error.message}`]
				});
			}
		},

		async paginateClick (page, isCOuntReq = false, ) {
			try {
				if(page == 'last'){
					this.isLastPage = true;
				} else if(page == 'count'){
					this.isCountRecords = true;
				}else if(page == 'refresh'){
					this.startFrom = 0;
					this.currentPage =  1;
					this.isLastPage = false;
					this.noOfRecord = 0
					if(isCOuntReq){
						this.isCountRecords = true;
					}
				}else{
					this.currentPage = page;
					this.startFrom = parseInt((page * this.displayRecord) - this.displayRecord);
					this.isLastPage = false;
				}
				this.getTableData(false);
			} catch (error) {
				this.$store.dispatch('evolveNotification', {
					code: 111,
					type: 2,
					var: [`${error.message}`]
				});
			}
		},

		async searchBtnClick () {
			if (this.resultCache==false) {
				await this.getSelectedFiledListData();
				
			}

			UIkit.modal("#field-search" + this.searchobject.table + this.modalName, { bgClose: false, escClose: true, modal: false, keyboard: false }).show();
			// console.log("field-search" + this.searchobject.table + this.modalName)
		},
		async onFocus () {
			//multiple
			if (this.multiple) {
				await this.getSelectedFiledListData();
				UIkit.modal("#field-search" + this.searchobject.table + this.modalName, { bgClose: false, escClose: true, modal: false, keyboard: false }).show();
			}
			// console.log("field-search" + this.searchobject.table + this.modalName)
		},
		

		removeBtnClick () { 
			this.inoutData = "";
			this.searchobject.value = "";
			this.$emit("update:modelValue", null);
			this.$emit("rowClick", "");
			// this.$emit("change");
			this.isDataSelected = false;
			this.clearData();
			this.dispalyArray = [];
			this.valueArray = [];
			this.selectedArray = [];
			this.multiValueList = [];
		},
		rowClick (data, index) {
			if(this.multiple == false){
				this.inoutData = data[this.searchobject.display_field];
				this.$emit("update:modelValue", data[this.searchobject.value_field]);
				this.searchobject.value = data[this.searchobject.value_field] ;
				UIkit.modal("#field-search" + this.searchobject.table + this.modalName).hide();
				this.isPreviousData = this.inoutData;
				this.$emit("rowClick", data);
				// this.$emit("change");
				this.isDataSelected = true;
				this.clearData()
			}else{
				// console.log("called Else for row click:::::::::::::::::::::::::::::::::::", data);
				// this.secondFunction = !this.secondFunction;
				let findIndex = this.multiValueList.findIndex((v)=> v._id == data._id);
				if (findIndex==-1) {
					this.multiValueList.push({...data})
				} else {
					this.multiValueList.splice(findIndex, 1);
				}
				
				this.dataList[index].isSelected = !this.dataList[index].isSelected;
				// this.dataList[index].isSelected = true
				this.dataList.push();
			}
			
		},
		

		async onRowClickEnter (data) {
			this.inoutData = data;
			this.$emit("update:modelValue", this.inoutData);
			// UIkit.modal("#field-search" + this.searchobject.table + this.modalName).hide();
			this.isDataSelected = true;
			let filterArray = [];
			let inoutData = this.inoutData;
			if (this.inoutData) {
				this.$emit("rowClick", "");
				if (this.searchobject['blur_field']) {
					filterArray = [{
						id: uniqueID(),
						field: this.searchobject['blur_field'],
						operator: "in",
						value: inoutData,
						collectionName: this.searchobject['table'],
						addOperator : true
					}];
					await this.getTableData(true, filterArray);
				}else if(this.searchobject['display_field']){
					filterArray = [{
						id: uniqueID(),
						field: this.searchobject['display_field'],
						operator: "in",
						value: inoutData,
						collectionName: this.searchobject['table'],
						addOperator : true
					}];
					await this.getTableData(true, filterArray);
				}
				if (this.dataList.length > 0) {
					this.rowClick(this.dataList[0], 0) ;
					this.isDataSelected = true;

				}else{
					this.isPreviousData = null;
					this.removeBtnClick();

				}
			}else{
				this.isPreviousData = null;
				this.isDataSelected = false;
				this.$emit("rowClick", "");
			}
		
			// let findIndex = this.dataList.findIndex(data => (data[this.searchobject['blur_field'] ? this.searchobject['blur_field'] : this.searchobject['display_field']]).toLowerCase() == (this.inoutData).toLowerCase())
		
		},

		rowClickOnBlur (){
			if(this.isPreviousData!=null && this.searchobject.value != "" && this.isSelectSingle == false){
				this.inoutData = this.isPreviousData;
			}else{
				if (this.isDataSelected == false) {
					this.inoutData = "";
				}
			}
		},

		onClickMultipleSelect : async function (){
			// this.dispalyArray = []
			// this.selectedArray = []
			console.log("this.multiValueList", this.multiValueList);
			for (let i = 0; i < this.multiValueList.length; i++) {

				let findIndex = this.valueArray.findIndex(data => data == this.multiValueList[i][this.searchobject.value_field])
				if (findIndex == -1) {
					this.dispalyArray.push(this.multiValueList[i][this.searchobject.display_field])
					this.valueArray.push(this.multiValueList[i][this.searchobject.value_field])
					this.selectedArray.push(this.multiValueList[i])
				}
			}
			console.log("valueeeee ", this.valueArray);
			this.inoutData = this.dispalyArray
			this.$emit("update:modelValue", this.valueArray);
			this.searchobject.value = this.valueArray ;
			UIkit.modal("#field-search" + this.searchobject.table + this.modalName).hide();
			this.$emit("rowClick", this.selectedArray);
			// this.$emit("change");
			this.isDataSelected = true;
			this.clearData()
		},


		getSelectedFiledListData: async function () {
			try {
				if (this.searchobject['value'] != '' && this.searchobject['value'] != null) {
					let apiPath = "/api/v1/evolve/getSelectedFiledListData";

					if(this.custom != '' && this.custom != null && this.custom != undefined){
						this.searchobject.filterArray = [
							{
								field: this.searchobject.value_field,
								operator: "in",
								value: this.searchobject.value,
								collectionName: this.searchobject.table,
							}
						];
						this.searchobject.custompayload = this.custompayload;
						apiPath = this.custom
						this.searchobject.startFrom = 0;
						this.searchobject.dispalyRecord = 1;
					}
					let dataObj = await this.$axios.$post(apiPath, this.searchobject).catch((e) => {
						this.$store.dispatch('evolveNotification', { code: 117, type: 2 });
					});
					if (dataObj) {
						if (dataObj.statusCode == 200) {
							if (!this.multiple) {
								// this.inoutData = dataObj.result[0][this.searchobject['display_field']]
								// this.isPreviousData = dataObj.result[0][this.searchobject['display_field']]
								// this.isSelectSingle = false;
								// this.$emit("update:modelValue", dataObj.result[0][this.searchobject['value_field']]);
								// this.$emit("change", dataObj.result[0]);
								let findIndex = dataObj.result.findIndex(x => x[this.searchobject.value_field].toString() == this.searchobject.value.toString())
								if (findIndex != -1) {
									this.inoutData = dataObj.result[findIndex] == undefined ? '' : dataObj.result[findIndex][this.searchobject['display_field']]
									this.isPreviousData = dataObj.result[findIndex] == undefined ? '' : dataObj.result[findIndex][this.searchobject['display_field']]
								}else{
									this.inoutData = dataObj.result[0] == undefined ? '' : dataObj.result[0][this.searchobject['display_field']]
									this.isPreviousData = dataObj.result[0] == undefined ? '' : dataObj.result[0][this.searchobject['display_field']]
								}
								// this.inoutData = dataObj.result[0] == undefined ? '' : dataObj.result[0][this.searchobject['display_field']]
								// this.isPreviousData = dataObj.result[0] == undefined ? '' : dataObj.result[0][this.searchobject['display_field']]
								this.isSelectSingle = false;
								if (dataObj.result[0]) {
									this.$emit("update:modelValue", dataObj.result[0][this.searchobject['value_field']]);
									this.$emit("change", dataObj.result[0]);	
								}else{

									this.$emit("update:modelValue", '');
									this.$emit("change", '');	
								}
								
							}else{
								this.dispalyArray = []
								this.valueArray = []
								for (let i = 0; i < dataObj.result.length; i++) {
									this.dispalyArray.push(dataObj.result[i][this.searchobject['display_field']])
									this.valueArray.push(dataObj.result[i][this.searchobject['value_field']])
								}
								this.inoutData = this.dispalyArray
								this.$emit("update:modelValue", this.valueArray);
							}
							
						}
					}
				}
				this.getTableData()
			} catch (error) {
				console.log('Error Come in Catch : ', error.message);
			}
		},

	
		async getTableData (search, filterArray = []) {
			try {
				this.loading = true;
				if (search) {
					this.currentPage = 1
					this.startFrom = parseInt(
						1 * this.displayRecord - this.displayRecord
					);
				}
				this.searchobject['filterArray'] = filterArray;
				if(this.searchobject['defultCondction']){
					if (this.searchobject['defultCondction'] != '') {
						let conarray = ''
						if (typeof this.searchobject['defultCondction'] == 'object') {
							conarray = this.searchobject['defultCondction']
						}
						else{
							conarray = JSON.parse(this.searchobject['defultCondction'])
						}
						console.log("conarrayconarray", conarray);
						for (let i = 0; i < conarray.length; i++) {
							this.searchobject['filterArray'].push({
								id: uniqueID(),
								field: conarray[i].field,
								operator:  conarray[i].operator,
								value:  conarray[i].value,
								collectionName : conarray[i].collectionName,
								addOperator : conarray[i].addOperator ? conarray[i].addOperator : undefined
							})
						}
					
					}
				}
				
				if (this.filterData.length >0) {
					for (let l = 0; l < this.filterData.length; l++) {
						this.filterData[l].addOperator = "and"
						this.searchobject['filterArray'].push(this.filterData[l])
					}
				}
				this.searchobject['startFrom'] = parseInt(this.startFrom)
				this.searchobject['dispalyRecord'] = parseInt(this.displayRecord)
				this.searchobject['isLastPage'] = this.isLastPage
				this.searchobject['isCountRecords'] = this.isCountRecords
				let apiPath = this.defaultRoute;

				if(this.custom != '' && this.custom != null && this.custom != undefined){
					this.searchobject.custompayload = this.custompayload;
					apiPath = this.custom
				}

				let dataObj = await this.$axios.$post(apiPath, this.searchobject).catch((e) => {
					this.loading = false;
					this.$store.dispatch('evolveNotification', { code: 117, type: 2 });
				});
				if (dataObj) {
					if (dataObj.statusCode == 200) {

						let {noOfRecords, currentPage, data, head} = dataObj.result;
						this.noOfRecords =  this.isCountRecords ? noOfRecords :  this.noOfRecords;
						this.currentPage = this.isLastPage ? currentPage : this.currentPage;
						this.startFrom = (this.currentPage * this.displayRecord )- this.displayRecord;
					
						if(data.length < this.displayRecord && !this.isLastPage){
							this.currentPage =  this.currentPage > 1 ? data.length == 0 ?  this.currentPage - 1 : this.currentPage : 1;
							this.startFrom = parseInt(this.currentPage * this.displayRecord )- this.displayRecord;
							this.isLastPage = true;
						}
						this.dataList = ((data.length != 0 && this.currentPage > 1) || this.currentPage == 1) ? data : this.dataList;
						this.isCountRecords = false;

						this.resultCache = true;
						this.headList = head;
					
						if (this.valueArray.length > 0) {
						
							for (let i = 0; i < this.valueArray.length; i++) {
								let findIndex = this.dataList.findIndex(data => this.searchobject['defaultValue_field'] != null && undefined && '' ? data[this.searchobject[['defaultValue_field']]]  :  data[this.searchobject['value_field']] == this.valueArray[i] )

								if (findIndex == -1) {
									this.dataList[findIndex].isSelected = true
									this.selectedArray.push(this.dataList[findIndex])
								}
							}
						}
				
					} else {
						this.$store.dispatch("evolveNotification", dataObj.message);
					}
				}
				this.loading = false;
			} catch (error) {
				this.loading = false;
				console.log('Error Come in Catch fild search : ', error.message);
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
			this.$emit("update:modelValue", this.filterData);
		},

		searchData (e) {
			this.getTableData(true);
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
			// this.getTableData()
			// this.$emit("filerClick", "CLICK");
			this.filterClicked+=1
		},

		modalClose (){

		},

		getCollectionName: async function (index) {
			for (let i = 0; i < this.headList.length; i++) {
				if (this.filterData[index].field == this.headList[i].searchKey) {
					this.filterData[index].collectionName = this.headList[i].collectionName
				}
			}

		},

		ConvertingDateFormat:  function (data) {
			
			let date = ''
			if (data== "" || data== undefined || data== null) {

				date = ""
					
			}else{
				new Date(data).getMonth() + 1 < 10 ? "0" + (new Date(data).getMonth() + 1) : new Date(data).getMonth() + 1
				date = new Date(data).getDate() + '-' + (new Date(data).getMonth() + 1 < 10 ? "0" + (new Date(data).getMonth() + 1) : new Date(data).getMonth() + 1) + '-' + new Date(data).getFullYear()
			}
			return date
				
			
		},
		
		valiatdata : function (data, fkey, fkeys){

			return data[fkey] == null ? '-' : data[fkey][fkeys]

		},	

	},
};
</script>