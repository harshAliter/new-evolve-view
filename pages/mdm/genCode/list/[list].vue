<template> 
	<div class="evolve-page">
		<PageHeaderBar 
			:menuid="EvolveMenu_Id"
			:pageurl="pageURL" 
			:buttons="buttonsList"
			:mastercode="helpMasterCode"
			:keywordslist="keywords"
			:optionheader="false"
			@onRefresh="getAllgenCodeList(true)"
			@downloadPdf="downloadPdf()"
			@downloadCsv="downloadCsv()"
			@onClickBtn="onClickBtn"
		/>
		<input
			id="uploadFile"
			ref="uploadFile"
			:key="reInitialize"
			style="display:none;"
			dispay="none"
			type="file"
			accept=".csv"
			class="uk-input"
			multiple
			@change="onSelectFile()"
		>
		<client-only>
			<div id="sc-page-content" class="evolve-page-body">
				<div class="uk-child-width-1-1@m uk-grid" data-uk-grid>
					<div class="evolve_table_list">
						<DaynamicSearch v-model="filterArray" name="Serch Page" :list="fieldList" @filerClick="getAllgenCodeList(true)" />
						<client-only>
							<div class="responsive-table"> 
								<table id="EvolveGenCode" class="uk-table uk-table-striped" :class="loading?'loading' +((genCodeList.length==0) ?' no-data':''):'no-loading'+((genCodeList.length==0) ?' no-data':'')">
									<thead>
										<tr>
											<th :data-uk-tooltip="keywords.key.ttps">
												{{ keywords.key.val }}
											</th>
											<th :data-uk-tooltip="keywords.value.ttps">
												{{ keywords.value.val }}
											</th>
											<th :data-uk-tooltip="keywords.desc.ttps">
												{{ keywords.desc.val }}
											</th>

											<th :data-uk-tooltip="keywords.action.ttps">
												{{ keywords.action.val }}
											</th>
										</tr>
									</thead>
									<tbody>
										<tr v-for="(li,index) in genCodeList" :key="index">
											<td>{{ li.EvolveGenCode_Code }}</td>
											<td>{{ li.EvolveGenCode_Value }}</td>
											<td>{{ li.EvolveGenCode_Desc }}</td>
										
											<td>
												<button
													:data-uk-tooltip="keywords.Edit.ttps"
													class="sc-button sc-button-primary waves-effect sc-button-mini waves-button waves-light"
													@click="onCreateOrEditGenCode(li._id)"
												>
													<i class="mdi mdi-square-edit-outline"></i>
												</button>
											<!-- <button
												:data-uk-tooltip="keywords.Delete.ttps"
												class="sc-button sc-button-danger waves-effect sc-button-mini waves-button waves-light"
												@click="onClickDeleteGenCode(li)"
											>
												<i class="mdi mdi-delete"></i>
											</button> -->
											</td>
										</tr>
									</tbody>
								</table>
								
								<div class="uk-grid fixed-footer">
									<div class="uk-width-1-2@m uk-width-auto">
										<select v-model="displayRecord" @change="onDisplayRecordChange($event)">
											<option v-for="dr in displayRow" :key="dr" :value="dr">
												{{ dr }}
											</option>
										</select>
									</div>
									<div class="uk-width-1-2@m uk-width-expand">
										<div class="paginate">
											<Paginate
												:page-count="pageCount"
												:click-handler="paginateClick"
												:prev-text="'<<'"
												:next-text="'>>'"
												:value="currentPage"
												:container-class="'evolve_paginate'"
											></Paginate>
										</div>
									</div>
								</div>
							
								<client-only>
									<EvolvePDF :reqdata="pdfData"></EvolvePDF>
								</client-only>
							</div>
						</client-only>
						<client-only>
							<table id="sampleGenCodeDownload" class="uk-table uk-table-striped" style="display: none;">
								<thead>
									<tr>
										<th>operation</th>
										<th>EvolveGenCode_Code</th>
										<th>EvolveGenCode_Value</th>
										<th>EvolveGenCode_Desc</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>A/M/R</td>
										<td>EA</td>
										<td>Each</td>
										<td>EA unit of measure</td>
									</tr>
								</tbody>
							</table>
						</client-only>
					</div>
				</div>
			</div>
		</client-only>
	</div>
</template>
<style scoped>
.uk-position-top-right {
  top: 24px;
}
.icons_selections {
  height: 200px !important;
  overflow: auto;
}
.paginate{
    position: inherit !important;
}

#EvolveGenCode tbody td {
    white-space: nowrap;
    padding: 4px 0px 5px 3px;
}
</style>
<script>
definePageMeta({
  layout: 'default'
})
import { useVuelidate } from '@vuelidate/core';
import Paginate from "vuejs-paginate-next";
import aliterImg from "@/assets/img/aliter_logo.png"

export default {
	head () {
		return {
			title: "Evolve - " + this.$route.name,
		};
	},
      setup () {
    
    return { v$: useVuelidate()  };
  },
  
	components: {
		Paginate,
		PageHeaderBar: process.client  ? defineAsyncComponent(() => import('~/components/cust/PageHeaderBar.vue')) :  null,
		DaynamicSearch: process.client ? defineAsyncComponent(()=> import("~/components/cust/DaynamicSearch")) : null,
		EvolvePDF: process.client
			? defineAsyncComponent(()=>  import("~/components/jspdf/evolvePDF"))
			: null,
	},

	props: {
		params: {
			type: Object,
			default: () => {}
		}
	},
	layout: "default",
	data () {
		return {
			// EvolveMenu_Id :this.$route.query.EvolveMenu_Id,
			EvolveMenu_Id :this?.$route?.query?.EvolveMenu_Id,
			pageURL : '/mdm/abc/list',
			userId: useStore().user.EvolveUser_ID,
			token: useStore().user.EvolveToken,
			baseURL: this.$config.public.baseURL,
			
			
			helpMasterCode : 'GENCODELIST',
			keywords: {
				create :	{
					val: "Create Gen Code",
					ttps: "",
				},
				
				search_here :	{
					val: "Search Here",
					ttps: "",
				},
				upload :	{
					val: "upload Gen Code",
					ttps: "",
				},
				desc :	{
					val: "Description",
					ttps: "",
				},
				key :	{
					val: "key",
					ttps: "",
				},
				value :	{
					val: "Value",
					ttps: "",
				},
				
				
				action :	{
					val: "Action",
					ttps: "",
				},
				
				
				Edit :{
					val: "Edit",
					ttps: "",
				},
				Delete :{
					val: "Delete",
					ttps: "",
				}
			},

			/** Start : EvolveDataTable */
			search: "", // For making dynamic search
			currentPage: 1,
			pageCount: 0,
			reInitialize : 0,
			displayRecord: 10,
			noOfRecord: 0,
			startFrom: 0,
			displayRow: [10, 25, 50, 100, 200],
			pdfData: {},
			csvExportColums: [0, 1, 2],
			pdfExportColums: [0, 1, 2],
			/** End : EvolveDataTable */

			genCodeList : [],
			 fieldList: [
				{
					value: "Key",
					key: "EvolveGenCode_Code",
					collectionName : "EvolveGenCode",
				},
				{
					value: "value",
					key: "EvolveGenCode_Value",
					collectionName : "EvolveGenCode",
				},
				{
					value: "Description",
					key: "EvolveGenCode_Desc",
					collectionName : "EvolveGenCode",
				},
			],
			filterArray: [],
			buttonsList : [
				{
					lable : 'Create Gen Code',
					code : 'onCreateOrEditGenCode'
				},
				{
					lable : 'Sample Download',
					code : 'downloadSampleFile'
				},
				{
					lable : 'upload Gen Code',
					code : 'onFileUpload'
				},
			],
			loading : true


			
		};
	},
	computed: {},
	watch: {
		mdIconsSearch (val) {
			this.mdIcons.forEach((icon) => {
				if (val !== "" && val.length > 2) {
					icon.visible = icon.name.toLowerCase().includes(val.toLowerCase());
				} else {
					icon.visible = true;
				}
			});
		},
	},
	mounted () {
		this.$eventBus.$on(this.helpMasterCode, (data) => {
			let thisObj = this;
			Object.keys(this.keywords).forEach(function (key) {
                if (data) {
                    data.forEach(function (obj) {
					if (obj[key] != undefined) {
						thisObj.keywords[key].val = obj[key].tran; // Translated
						thisObj.keywords[key].ttps = obj[key].ttps; // Tooltips
					}
				});
                }
				
			});
		});
		this.$eventBus.$on('onChangeLanguage', () =>{
			useStore().loadPageData({
				masterCode: this.helpMasterCode, // Master code
				keywords: this.keywords,
			});          
		});
		this.$eventBus.$on('onCloseTabCalled', (url) =>{
			if(this.pageURL == url){
			} 
		});
	},
	created: async function () {
		
		try {
            console.log("this.$route:" , this.$route);
			useStore().loadPageData({
				masterCode: this.helpMasterCode, 
				keywords: this.keywords,
			});
			await this.getAllgenCodeList();
		} catch (error) {
			console.log("Error in "+this.helpMasterCode+" :", error.message);
			this.$store.dispatch("evolveNotification", {
				code: 111, 
				type: 2 
			});
		}
	},
	validations: {
		
	},

	methods: {
		// Evolve defult functions


	 
		
		onClickBtn : async function (code) {
			try {
				this[code]()
				 
			} catch (error) {
				 
			}
		},
		// Evolve defult functions end
		/* Datatable Methods -- Start */
		async onDisplayRecordChange (displayRecord) {
			try {
				this.startFrom = parseInt(
					this.currentPage * this.displayRecord - this.displayRecord
				);
				this.getAllgenCodeList();
			} catch (error) {
				console.log('Error Come in Catch : ', error.message);
				useStore().evolveNotification({code: 111, type: 2});
			}
		},
		async paginateClick (pageNum) {
			try {
				this.currentPage = pageNum;
				this.startFrom = parseInt(
					pageNum * this.displayRecord - this.displayRecord
				);
				this.getAllgenCodeList();
			} catch (error) {
				console.log('Error Come in Catch : ', error.message);
				useStore().evolveNotification({code: 111, type: 2});
			}
			
		},

		async downloadPdf () {
			try {
				let header = [];
				let data = [];
				let img = aliterImg;
				// let html = document.getElementById("EvolveGenCode").outerHTML;
				let rows = document.querySelectorAll("#EvolveGenCode tr");
				for (let i = 0; i < rows.length; i++) {
					let row = [],
						cols = rows[i].querySelectorAll("td, th");
					for (let j = 0; j < cols.length; j++) {
						if (this.pdfExportColums.indexOf(j) != -1) {
							if (i == 0) {
								header.push(cols[j].innerText);
							} else {
								row.push(cols[j].innerText);
							}
						}
					}
					if (i != 0) {
						data.push(row);
					}
				}
				this.pdfData = {
					code: "pdfDemo",
					logo: img,
					printData: {
						title: "Evolve Uom Master",
						tableData: {
							header: header,
							data: data,
						},
						fileName: "EvolveGenCode",
					},
				};
			} catch (error) {
				console.log('Error Come in Catch : ', error.message);
				useStore().evolveNotification({code: 111, type: 2});
			}
		},

		async downloadCsv () {
			try {
				let filename = "EvolveGenCode";
				let csv = [];
				// let html = document.getElementById("evolveMenuMaster").outerHTML;
				let rows = document.querySelectorAll("#EvolveGenCode tr");
				for (let i = 0; i < rows.length; i++) {
					let row = [],
						cols = rows[i].querySelectorAll("td, th");
					for (let j = 0; j < cols.length; j++) {
						if (this.csvExportColums.indexOf(j) != -1) {
							let rowData = cols[j].innerText;
							rowData = rowData.split(",").join(" ");
							row.push(rowData);
						}
					}
					csv.push(row);
				}

				let csvContent = csv.map((e) => e.join(",")).join("\n");
				let csvFile;
				let downloadLink;
				// CSV FILE
				csvFile = new Blob([csvContent], { type: "text/csv" });
				// Download link
				downloadLink = document.createElement("a");
				// File name
				downloadLink.download = filename + ".csv";
				// We have to create a link to the file
				downloadLink.href = window.URL.createObjectURL(csvFile);
				// Make sure that the link is not displayed
				downloadLink.style.display = "none";
				// Add the link to your DOM
				document.body.appendChild(downloadLink);
				// Lanzamos
				downloadLink.click();
			} catch (error) {
				console.log('Error Come in Catch : ', error.message);
				useStore().evolveNotification({code: 111, type: 2});
			}

			
		},

		/* Datatable Methods -- End */
		async getAllgenCodeList (search) {
			try {
				this.loading = true
				if (search) {
					this.currentPage = 1
					this.startFrom = parseInt(
						1 * this.displayRecord - this.displayRecord
					);
				}
				let list = await this.$axios
					.$post("/api/v3/Mdm/genCode/genCodeHandler", {
						"operation" : "L",
						"startFrom" : parseInt(this.startFrom),
						"dispalyRecord" : parseInt(this.displayRecord),
						"filterArray" : this.filterArray
					})
					.catch((e) => {
						this.loading = false
						useStore().evolveNotification({code: 117, type: 2});
					});

				
				if (list) {
					if (list.statusCode == 200) {
						this.genCodeList = list.result.records;
						if (list.result.noOfRecord > 0) {
							this.pageCount = Math.ceil(
								list.result.noOfRecord / this.displayRecord
							);
						} else {
							this.pageCount = 0;
						}
					} else {
						useStore().evolveNotification(list.message);
					}
				}
				this.loading = false
			} catch (error) {
				this.loading = false
				console.log('Error Come in Catch getAllgenCodeList: ', error.message);
				useStore().evolveNotification({code: 111, type: 2});
			}


			
		},

		onInputSearch () {
			try {
				this.currentPage = 1;
				this.getAllgenCodeList();
				this.paginateClick(1);
			} catch (error) {
				console.log('Error Come in Catch : ', error.message);
				useStore().evolveNotification({code: 111, type: 2});
			}
		},

		onCreateOrEditGenCode: async function (genCodeId) {


			try {
				// this.$eventBus.$emit("onCloseTabCalled", '/mdm/abc/options');
			
				// this.$store.dispatch('removeOneTab', '/evolve/menus/options')
				useStore().addNewTab({
					title: genCodeId == '' || genCodeId == null || genCodeId == undefined ? 'Gen Code Create'  :  'Gen Code Update', 
					url: '~/mdm/abc/options/',
					params: {
						genCodeId: genCodeId,
					}
				});
			} catch (error) {
				console.log('Error Come in Catch : ', error.message);
				useStore().evolveNotification({code: 111, type: 2});
			}
			
		},



		onSelectFile: async function () {
			try {
				let fileData = this.$refs.uploadFile.files[0];
				if (fileData != "" && fileData != undefined) {
					this.loaderShow();
					let formData = new FormData();
					formData.append("fileData", fileData);
					// formData.append("pathToUpload", "../evolve_io_server/EDI/IN/" + fileData.name);
					let config = { headers: { "Content-Type": "multipart/form-data" } };

					let fileUpload = await this.$axios
						.$post("/api/v3/Mdm/genCode/genCodeUploadHandler", formData, config)
						.catch((e) => {
							useStore().evolveNotification({code: 117, type: 2});
						});
					if (fileUpload) {
						if (fileUpload.statusCode == 200) {
							let fileUrl = this.baseURL + 'BULKLOADFILES/' + fileUpload.result
							window.open(fileUrl)
							this.getAllgenCodeList();
							this.reInitialize += 1;
							useStore().evolveNotification(fileUpload.message);
						} else {
							useStore().evolveNotification(fileUpload.message);
						}
					}
					this.loaderHide();
				}
			} catch (error) {
				console.log('Error Come in Catch : ', error.message);
				useStore().evolveNotification({code: 111, type: 2});
			}

			
		},

		onFileUpload: async function () {
			document.getElementById("uploadFile").click(); //do something}
		},

		downloadSampleFile: async function () {
			try {
				let filename = "sampleEvolveGenCode";
				let csv = [];
				// let html = document.getElementById("evolveMenuMaster").outerHTML;
				let rows = document.querySelectorAll("#sampleGenCodeDownload tr");
				for (let i = 0; i < rows.length; i++) {
					let row = [],
						cols = rows[i].querySelectorAll("td, th");
					let exportColumn = [0, 1, 2, 3]
					for (let j = 0; j < cols.length; j++) {
						if (exportColumn.indexOf(j) != -1) {
							let rowData = cols[j].innerText;
							rowData = rowData.split(",").join(" ");
							row.push(rowData);
						}
					}
					csv.push(row);
				}

				let csvContent = csv.map((e) => e.join(",")).join("\n");
				let csvFile;
				let downloadLink;
				// CSV FILE
				csvFile = new Blob([csvContent], { type: "text/csv" });
				// Download link
				downloadLink = document.createElement("a");
				// File name
				downloadLink.download = filename + ".csv";
				// We have to create a link to the file
				downloadLink.href = window.URL.createObjectURL(csvFile);
				// Make sure that the link is not displayed
				downloadLink.style.display = "none";
				// Add the link to your DOM
				document.body.appendChild(downloadLink);
				// Lanzamos
				downloadLink.click();
			} catch (error) {
				console.log('Error Come in Catch : ', error.message);
				useStore().evolveNotification({code: 111, type: 2});
			}
		},

		onClickDeleteGenCode : async function (data){
			try {
				let Deletes = false;
				$(this).prop("disabled", true);
				await UIkit.modal.confirm("Are You Sure Want To Delete..!").then(
					function () {
						Deletes = true;
					},
					function () {
						$(this).prop("disabled", false);
					}
				);
				if (Deletes == true) {
					let deleteGenCode = await this.$axios
						.$post("/api/v3/Mdm/genCode/genCodeHandler", {
							"operation" : "R",
							"_id" : data._id,
							"EvolveGenCode_Code" : data.EvolveGenCode_Code
						})
						.catch((e) => {
							useStore().evolveNotification({code: 117, type: 2});
						});

				
					if (deleteGenCode) {
						if (deleteGenCode.statusCode == 200) {
							this.getAllgenCodeList()
							useStore().evolveNotification(deleteGenCode.message);
						}else{
							useStore().evolveNotification(deleteGenCode.message);
						}
					}
				}					
			} catch (error) {
				console.log('Error Come in Catch : ', error.message);
				useStore().evolveNotification({code: 111, type: 2});
			}
		},

	},
};
</script>
<style lang="scss">
@import "assets/scss/plugins/datatables";
@import "pretty-checkbox/src/pretty-checkbox.scss";
</style>