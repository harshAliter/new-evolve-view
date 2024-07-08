<template>
	<div class="evolve-page">
		<PageHeaderBar :menuid="EvolveMenu_Id"
			:pageurl="pageURL"
			:buttons="buttonsList"
			:mastercode="helpMasterCode"
			:keywordslist="keywords"
			:optionheader="false"
			@onRefresh="paginateClick('refresh')"
			@downloadPdf="downloadPdf()"
			@downloadCsv="downloadCsv()"
			@onClickBtn="onClickBtn"
		/>
		<div id="sc-page-content" class="evolve-page-body">
			<div class="uk-child-width-1-1@m uk-grid" data-uk-grid>
				<div class="evolve_table_list">
					<DaynamicSearch v-model="filterArray"
						name="Serch Page"
						:list="fieldList"
						@filerClick="filterClicked+=1"
					/>
					<client-only>
						<div class="responsive-table">
							<table id="evolvePoRecieve" class="uk-table uk-table-striped" :class="loading?'loading' +((poRecieveList.length==0) ?' no-data':''):'no-loading'+((poRecieveList.length==0) ?' no-data':'')">
								<thead>
									<tr>
										<th :data-uk-tooltip="keywords.invoice_number.ttps">
											{{ keywords.invoice_number.val }}
										</th>
										<th :data-uk-tooltip="keywords.invoice_value.ttps">
											{{ keywords.invoice_value.val }}
										</th>
										<!-- <th :data-uk-tooltip="keywords.doa_status.ttps">
											{{ keywords.doa_status.val }}
										</th> -->
										<th :data-uk-tooltip="keywords.supplier_name.ttps">
											{{ keywords.supplier_name.val }}
										</th>
										<th :data-uk-tooltip="keywords.supplier_code.ttps">
											{{ keywords.supplier_code.val }}
										</th>
										<th :data-uk-tooltip="keywords.gate_number.ttps">
											{{ keywords.gate_number.val }}
										</th>
										<th :data-uk-tooltip="keywords.gateEntry_number.ttps">
											{{ keywords.gateEntry_number.val }}
										</th>
										<th :data-uk-tooltip="keywords.gate_userName.ttps">
											{{ keywords.gate_userName.val }}
										</th>
										<th :data-uk-tooltip="keywords.gate_updatedDate.ttps">
											{{ keywords.gate_updatedDate.val }}
										</th>

										<th :data-uk-tooltip="keywords.doa_status.ttps">
											{{ keywords.doa_status.val }}
										</th>
										<th :data-uk-tooltip="keywords.process_status.ttps">
											{{ keywords.process_status.val }}
										</th>
										<th :data-uk-tooltip="keywords.poreceive_message.ttps">
											{{ keywords.poreceive_message.val }}
										</th>
										<!-- <th :data-uk-tooltip="keywords.grn_status.ttps">
											{{ keywords.grn_status.val }}
										</th> -->
											
										<th :data-uk-tooltip="keywords.grn_details.ttps">
											{{ keywords.grn_details.val }}
										</th>
										<th :data-uk-tooltip="keywords.action.ttps" class="last-sticky-th">
											{{ keywords.action.val }}
										</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="(hl, index) in poRecieveList" :key="index">
										<td>{{ hl.EvolvePoRecieve_InvoiceNumber }}</td>
										<td>{{ hl.EvolvePoRecieve_InvoiceValue }}</td>
										<!-- <td>{{ hl.EvolvePoRecieve_DOAStatus ? hl.EvolvePoRecieve_DOAStatus : '' }}</td> -->
										<td>{{ hl.EvolveSupplier_Name }}</td>
										<td>{{ hl.EvolveSupplier_Code }}</td>
										<td>{{ hl.EvolveGate_Number }}</td>
										<td>{{ hl.EvolveGateEntry_Number }}</td>
										<td>{{ hl.userName }}</td>
										<td>{{ hl.updatedAt }}</td>
										<td>{{ hl.EvolvePoRecieve_DOAStatus }}</td>
										<td>
											
											<span v-if="hl.EvolvePoRecieve_ProcessStatus=='SAVED'" class="uk-label">{{ hl.EvolvePoRecieve_ProcessStatus }}</span>
											<span v-if="hl.EvolvePoRecieve_ProcessStatus=='SHIPERINPROGRESS' || hl.EvolvePoRecieve_ProcessStatus=='GRNINPROGRESS'" class="uk-label uk-label-warning">{{ hl.EvolvePoRecieve_ProcessStatus }}</span>
											<span v-if="hl.EvolvePoRecieve_ProcessStatus=='SHIPERCREATED'" class="uk-label uk-label-primary">{{ hl.EvolvePoRecieve_ProcessStatus }}</span>
											<span v-if="hl.EvolvePoRecieve_ProcessStatus=='DELETEINPROGRESS'" class="uk-label uk-label-danger">{{ hl.EvolvePoRecieve_ProcessStatus }}</span>
											<span v-if="hl.EvolvePoRecieve_ProcessStatus=='GRNCONFIRMED'" class="uk-label uk-label-success">{{ hl.EvolvePoRecieve_ProcessStatus }}</span>
										</td>
										<td>
											<button :data-uk-tooltip="keywords.poreceive_message.ttps"
												class="sc-button sc-button-mini"
												@click="showPoReceiveMessage(index)"
											>
												<i class="mdi mdi-eye-circle"></i>
											</button>
										</td>
										<!-- <td>
											<span :class="hl.EvolvePoRecieve_Status ? 'uk-label uk-label-success' : 'uk-label uk-label-primary'">{{ hl.EvolvePoRecieve_Status ? 'COMPLETED' : 'PENDING' }}</span>
										</td> -->
										
										<td>
											<button :data-uk-tooltip="keywords.edit.ttps"
												class="sc-button sc-button-primary sc-button-mini"
												@click="getGrnNumberDetails(index)"
											>
												<i class="mdi mdi-eye-circle"></i>
											</button>
										</td>
										<td class="uk-flex last-sticky-td">
											<button :data-uk-tooltip="keywords.edit.ttps"
												class="sc-button sc-button-primary sc-button-mini"
												@click="getGrnDetails(index)"
											>
												<span>{{ keywords.details.val }}</span>
											</button>
											<button :data-uk-tooltip="keywords.edit.ttps"
												class="sc-button sc-button-primary sc-button-mini"
												@click="getTransporterDetails(index)"
											>
												<span>{{ keywords.transporter.val }}</span>
											</button>
											<button :data-uk-tooltip="keywords.edit.ttps"
												class="sc-button sc-button-primary sc-button-mini"
												@click="getTaxesDetails(index, false)"
											>
												<span>{{ keywords.taxes.val }}</span>
											</button>
											<button
												v-if="hl.EvolvePoRecieve_WorkOrderDetails!= undefined ? hl.EvolvePoRecieve_WorkOrderDetails.length>0 ? true : false : false" 
												:data-uk-tooltip="keywords.edit.ttps"
												class="sc-button sc-button-primary sc-button-mini"
												:disabled="hl.EvolvePoRecieve_ProcessStatus=='SHIPERINPROGRESS' || hl.EvolvePoRecieve_ProcessStatus=='GRNINPROGRESS' || hl.EvolvePoRecieve_ProcessStatus=='DELETEINPROGRESS'"
												@click="getWoDetails(index)"
											>
												<span>workorder data </span>
											</button>
											
											<button
												v-if="!hl.EvolvePoRecieve_Status" 
												:data-uk-tooltip="keywords.edit.ttps"
												class="sc-button sc-button-primary sc-button-mini"
												:disabled="hl.EvolvePoRecieve_ProcessStatus=='SHIPERINPROGRESS' || hl.EvolvePoRecieve_ProcessStatus=='GRNINPROGRESS' || hl.EvolvePoRecieve_ProcessStatus=='DELETEINPROGRESS'"
												@click="onCreateOrEditPoRecieve(hl._id, false)"
											>
												<i class="mdi mdi-square-edit-outline"></i>
											</button>
											<button
												:data-uk-tooltip="keywords.show.ttps"
												class="sc-button sc-button-primary waves-effect sc-button-mini waves-button waves-light"
												@click="onCreateOrEditPoRecieve(hl._id, true)"
											>
												<i class="mdi mdi-eye-circle"></i>
											</button>
											<button v-if="!hl.EvolvePoRecieve_Status && hl.EvolvePoRecieve_ProcessStatus == 'SAVED' && hl.EvolvePoRecieve_DOAStatus != 'A'"
												class="sc-button sc-button-primary sc-button-mini waves-effect sc-button-mini waves-button waves-light"
												:data-uk-tooltip="keywords.submit.ttps"
												:disabled="hl.EvolvePoRecieve_DOAStatus != 'U'"
												@click="submitReqToDoa(hl)"
											>
												Submit
											</button>
											<button
												v-if="hl.EvolvePoRecieve_DOAStatus != 'U'"
												:data-uk-tooltip="keywords.approval_history.ttps"
												class="sc-button sc-button-success waves-effect sc-button-mini waves-button waves-light"
												@click="onShowPurchaseOderRecieve(hl._id, 'EvolvePoRecieve')"
											>
												<i class="mdi mdi-account-check"></i>
											</button>
											<button
												v-if="hl.EvolvePoRecieve_ProcessStatus=='SAVED' && hl.EvolvePoRecieve_DOAStatus == 'A'"
												:data-uk-tooltip="keywords.perform_shipper.val"
												
												class="sc-button sc-button-primary sc-button-mini waves-effect sc-button-mini waves-button waves-light"
												:disabled="hl.EvolvePoRecieve_ProcessStatus=='SHIPERINPROGRESS' || hl.EvolvePoRecieve_ProcessStatus=='GRNINPROGRESS' || hl.EvolvePoRecieve_ProcessStatus=='DELETEINPROGRESS'"
												@click="performShipper(hl , index)"
											>
												<i class="mdi mdi-alpha-p-circle"></i>
											</button>
											<button
												v-if="!hl.EvolvePoRecieve_Status && hl.EvolvePoRecieve_ProcessStatus == 'SHIPERCREATED' && hl.EvolvePoRecieve_DOAStatus == 'A'" 
												class="sc-button sc-button-success sc-button-mini"
												:disabled="hl.EvolvePoRecieve_ProcessStatus=='SHIPERINPROGRESS' || hl.EvolvePoRecieve_ProcessStatus=='GRNINPROGRESS' || hl.EvolvePoRecieve_ProcessStatus=='DELETEINPROGRESS'"
												@click="woChallanDetail(index)"
											>
												submit To Grn
											</button>
											<button
												v-if="false"
												:data-uk-tooltip="keywords.edit.ttps"
												class="sc-button sc-button-success sc-button-mini"
												@click="grnPdfDownload(hl)"
											>
												<i class="mdi mdi-printer"></i>
											</button>
											<button
												v-if="hl.EvolvePoRecieve_Status && hl.EvolvePoRecieve_GrnNumber=='' || hl.EvolvePoRecieve_GrnNumber==null" 
												class="sc-button sc-button-success sc-button-mini"
												@click="generateGrn(hl)"
											>
												Generate Grn
											</button>
											<button
												v-if="hl.EvolvePoRecieve_Status == false" 
												class="sc-button sc-button-danger sc-button-mini"
												:disabled="hl.EvolvePoRecieve_ProcessStatus=='SHIPERINPROGRESS' || hl.EvolvePoRecieve_ProcessStatus=='GRNINPROGRESS' || hl.EvolvePoRecieve_ProcessStatus=='DELETEINPROGRESS'"
												@click="deletePoRecieve(hl)"
											>
												<i class="mdi mdi-delete"></i>
											</button>
										</td>
									</tr>
								</tbody>
							</table>
						</div>

						<div>
							<Pagination
								:loading="loading"
								:filter-clicked="filterClicked"
								:current-page="currentPage"
								:is-next-disabled="isNextDisabled"
								:result-length="poRecieveList.length"
								:total-records="noOfRecord"
								@updatePage="paginateClick"
								@displayRecord="onDisplayRecordChange"
							></Pagination>
						</div>

						 
						<client-only>
							<EvolvePDF :reqdata="pdfData"></EvolvePDF>
						</client-only>
					</client-only>
				</div>
			</div>
		</div>
		<div id="GRN-DETAILS" class="uk-modal">
			<div class="uk-modal-dialog" style="width:100%">
				<button class="uk-modal-close-default" type="button" data-uk-close></button>				
				<div class="uk-modal-body">
					<div class="uk-child-width-1-1@m uk-grid" data-uk-grid>
						<table class="uk-table uk-table-striped">
							<thead>
								<tr> 
									<th>{{ keywords.po_number.val }} </th>
									<th>{{ keywords.line_number.val }} </th>
									<th>{{ keywords.item_code.val }}</th>
									<th>{{ keywords.item_desc.val }}</th>
									<th>{{ keywords.location.val }}</th>
									<th>{{ keywords.lot_no.val }}</th>
									<th>{{ keywords.ref_no.val }}</th>
									<th>{{ keywords.comments.val }}</th>
									<th>{{ keywords.uom.val }}</th>
									<th>{{ keywords.qty.val }}</th>
									<th>{{ keywords.stock_qty.val }}</th>
									<th>{{ keywords.stock_uom.val }}</th>
									<th>{{ keywords.action.val }}</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(v,index1) in grnDetails" :key="index1">
									<td>{{ v.EvolvePO_Number }} </td>
									<td>{{ v.EvolvePODetails_Line }} </td>
									<td>{{ v.EvolveItem_Code }}</td>
									<td>{{ v.EvolveItem_Desc }}</td>
									<td>{{ v.EvolveLocation_Code }}</td>
									<td>{{ v.EvolvePoRecieve_LotNo }}</td>
									<td>{{ v.EvolvePoRecieve_RefNo }}</td>
									<td>{{ v.EvolvePoRecieve_Comments }}</td>
									<td>{{ v.EvolvePoRecieve_Uom }}</td>
									<td>{{ v.EvolvePoRecieve_Qty }}</td>
									<td>{{ v.EvolvePoRecieve_StockQty }}</td>
									<td>{{ v.EvolvePoRecieve_StockUom }}</td>
									<button
										class="sc-button sc-button-success sc-button-mini"
										@click="printSingleItem(index1)"
									>
										<i class="mdi mdi-printer"></i>
									</button>
								</tr>
							</tbody>
						</table>	
					</div>
				</div>
				<div class="uk-modal-footer uk-text-right">
				</div>
			</div>
		</div>

		<div id="TRANSPORT-DETAILS" class="uk-modal">
			<div class="uk-modal-dialog" style="width:100%">
				<form class="sc-padding">
					<button class="uk-modal-close-default" type="button" data-uk-close></button>				
					<div class="uk-modal-body">
						<div class="uk-child-width-1-1@m uk-grid" data-uk-grid>
							<table class="uk-table uk-table-striped">
								<thead>
									<tr>
										<th>{{ keywords.ship_date.val }}</th>
										<th>{{ keywords.ship_via.val }}</th>
										<th>{{ keywords.fob.val }}</th>
										<th>{{ keywords.trans_mode.val }}</th>
										<th>{{ keywords.vehicle_ref.val }}</th>
										<th>{{ keywords.voyage.val }}</th>
										<th>{{ keywords.origin.val }}</th>
										<th>{{ keywords.port_depart.val }}</th>
										<th>{{ keywords.port_arrive.val }}</th>
										<th>{{ keywords.remarks.val }}</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>{{ transportDetailObj.EvolvePoRecieve_ShipDate }}</td>
										<td>{{ transportDetailObj.EvolvePoRecieve_ShipVia }}</td>
										<td>{{ transportDetailObj.EvolvePoRecieve_Fob }}</td>
										<td>{{ transportDetailObj.EvolvePoRecieve_TransMode }}</td>
										<td>{{ transportDetailObj.EvolvePoRecieve_VehicleRef }}</td>
										<td>{{ transportDetailObj.EvolvePoRecieve_Voyage }}</td>
										<td>{{ transportDetailObj.EvolvePoRecieve_Origin }}</td>
										<td>{{ transportDetailObj.EvolvePoRecieve_PortDepart }}</td>
										<td>{{ transportDetailObj.EvolvePoRecieve_PortArrive }}</td>
										<td>{{ transportDetailObj.EvolvePoRecieve_Remarks }}</td>
									</tr>
								</tbody>
							</table>	
						</div>
					</div>
					<div class="uk-modal-footer uk-text-right">
					</div>
				</form>
			</div>
		</div>

		<div id="TAXES-DETAILS" class="uk-modal">
			<div class="uk-modal-dialog" style="width:80%">
				<button class="uk-modal-close-default" type="button" data-uk-close></button>
				<div class="uk-modal-header">
				</div>				
				<div class="uk-modal-body">
					<h4 class="uk-text-center tax-head-tittle">
						Total Tax Details
					</h4>
					<div class="uk-child-width-1-1@m uk-grid" data-uk-grid>
						<table class="uk-table uk-table-striped">
							<thead>
								<tr>
									<th>{{ keywords.tax_type.val }}</th>
									<th>{{ keywords.tax_total.val }}</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(v,index4) in taxesDetailsTypeArr" :key="index4">
									<td>{{ v.taxtype }}</td>
									<td>{{ v.taxtotal }}</td>
								</tr>
							</tbody>
						</table>	
					</div>
					<h4 class="uk-text-center tax-head-tittle">
						Po Wise Tax Details
					</h4>
					<div class="uk-child-width-1-1@m uk-grid" data-uk-grid>
						<table class="uk-table uk-table-striped">
							<thead>
								<tr>
									<th>{{ keywords.po_number.val }}</th>
									<th>{{ keywords.tax_type.val }}</th>
									<th>{{ keywords.tax_total.val }}</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(v,index4) in taxesDetailsPoArr" :key="index4">
									<td>{{ v.taxnbr }}</td>
									<td>{{ v.taxtype }}</td>
									<td>{{ v.taxtotal }}</td>
								</tr>
							</tbody>
						</table>	
					</div>
					<h4 class="uk-text-center tax-head-tittle">
						Po-Line Wise Tax Details
					</h4>
					<div class="uk-child-width-1-1@m uk-grid" data-uk-grid>
						<table class="uk-table uk-table-striped">
							<thead>
								<tr>
									<th>{{ keywords.tax_type.val }}</th>
									<th>{{ keywords.po_number.val }}</th>
									<th>{{ keywords.po_line.val }}</th>
									<th>{{ keywords.unit_cost.val }}</th>
									<th>{{ keywords.qty.val }}</th>
									<th>{{ keywords.total.val }}</th>
									<th>{{ keywords.tax_total.val }}</th>
									<th>{{ keywords.tax_rate.val }}</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(v,index4) in taxesDetailsArr" :key="index4">
									<td>{{ v.taxtype }}</td>
									<td>{{ v.taxnbr }}</td>
									<td>{{ v.taxline }}</td>
									<td>{{ v.unitCost }}</td>
									<td>{{ v.qty }}</td>
									<td>{{ v.total }}</td>
									<td>{{ v.taxtotal }}</td>
									<td>{{ v.taxrate }}</td>
								</tr>
							</tbody>
						</table>	
					</div>
				</div>
					
				<div class="uk-modal-footer uk-text-right">
					<p v-if="isSubmitToGrn" style="float: left;background-color: rgb(255 221 123);">
						{{ message }}  
					</p>
					<button
						v-if="isSubmitToGrn" 
						class="sc-button sc-button-success sc-button-primary"
						@click="submitReqToGrn()"
					>
						Confirm
					</button>
				</div>
			</div>
		</div>

		<div id="QTY-TO-ISSUE" class="uk-modal">
			<div class="uk-modal-dialog" style="width:100%">
				<button class="uk-modal-close-default" type="button" data-uk-close></button>				
				<div class="uk-modal-body">
					<div class="uk-child-width-1-1@m uk-grid" data-uk-grid>
						<table class="uk-table uk-table-striped">
							<thead>
								<tr>
									<th>{{ keywords.workorder_no.val }}</th>
									<th>{{ keywords.supplier_name.val }}</th>
									<th>{{ keywords.supplier_code.val }}</th>
									<th>{{ keywords.item_code.val }}</th>
									<th>{{ keywords.item_desc.val }}</th>
									<th>{{ keywords.qty.val }}</th>
									<th>{{ keywords.action.val }}</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(v,index3) in woDetails" :key="index3">
									<td>{{ v.EvolveWorkOrder_OrderNo }}</td>
									<td>{{ supplierName }}</td>
									<td>{{ v.EvolveSupplier_Code }}</td>
									<td>{{ v.EvolveItem_Code }}</td>
									<td>{{ v.EvolveItem_Desc }}</td>
									<td>
										<ScInput
											v-model="v.qty"
											mode="outline"
											type="number"
											:disabled="isGrnGenerated || isItcRequired"
										>
										</ScInput>
									</td>
									<td>
										<button
											v-if="v.isSub==undefined || v.isSub==false"
											class="sc-button sc-button-primary sc-button-mini"
											:disabled="isGrnGenerated"
											@click="getWoBomItemSubItem(index3)"
										>
											<i class="mdi mdi-shuffle-variant"></i>
										</button>
										<button
											v-else
											class="sc-button sc-button-danger sc-button-mini"
											@click="deleteWoSubItem(index3)"
										>
											<i class="mdi mdi-delete"></i>
										</button>
									</td>
								</tr>
							</tbody>
						</table>	
					</div>
				</div>
				<div class="uk-modal-footer uk-text-right">
					<button
						class="sc-button sc-button-success sc-button-primary"
						:disabled="isGrnGenerated"
						@click="saveWoDetails"
					>
						Confirm
					</button>
				</div>
			</div>
		</div>

		<div id="GRN-NUMBER-DETAILS" class="uk-modal">
			<div class="uk-modal-dialog" style="width:100%">
				<button class="uk-modal-close-default" type="button" data-uk-close></button>				
				<div class="uk-modal-body">
					<div class="uk-child-width-1-1@m uk-grid" data-uk-grid>
						<table class="uk-table uk-table-striped">
							<thead>
								<tr>
									<th>{{ keywords.po_number.val }}</th>
									<th>{{ keywords.receiver_number.val }}</th>
									<th>Voucher Number</th>
									<th>Registration Number</th>
									<th>Print</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(v,index4) in grnNumberDetailsArr" :key="index4">
									<td>{{ v.poNbr }}</td>
									<td>{{ v.ReceiverNumber }}</td>
									<td>{{ v.invoiceVoucher }}</td>
									<td>{{ v.invoiceRegistrationNumber }}</td>
									<td>
										<button
											class="sc-button sc-button-success waves-effect sc-button-mini waves-button waves-light"
											data-uk-tooltip="Grn Print"
											@click="generatePDF(v)"
										>
											<i class="mdi mdi-printer"></i>
										</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
										<button
											:disabled="!v.invoiceRegistrationNumber"
											class="sc-button sc-button-success waves-effect sc-button-mini waves-button waves-light"
											data-uk-tooltip="Voucher Print"
											@click="getVoucherPdf(v)"
										>
											<i class="mdi mdi-script-text-outline" style="color:white;"></i>
										</button>
									</td>
								</tr>
							</tbody>
						</table>	
					</div>
				</div>
				<div class="uk-modal-footer uk-text-right">
					<button 
						:data-uk-tooltip="keywords.cancel.ttps"
						class="sc-button sc-button-flat sc-button-flat-danger uk-modal-close"
						type="button"
					>
						{{ keywords.cancel.val }}
					</button>
				</div>
			</div>
		</div>

		<div id="substituteItem" class="uk-modal" uk-modal="stack: true">
			<div class="uk-modal-dialog" style="width:100%">
				<button class="uk-modal-close-default" type="button" data-uk-close></button>				
				<div class="uk-modal-body">
					<div class="uk-child-width-1-1@m uk-grid" data-uk-grid>
						<table class="uk-table uk-table-striped">
							<thead>
								<tr>
									<th></th>
									<th>{{ keywords.item_code.val }}</th>
									<th>{{ keywords.item_desc.val }}</th>
									<th>Qty Per</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(vs,index5) in substituteItem" :key="index5">
									<td>
										<!-- <PrettyCheck
											v-model="vs.isPicked"
											class="p-switch"
											name="aa"
										>
										</PrettyCheck> -->
									</td>
									<td>{{ vs.EvolveItem_Code }}</td>
									<td>{{ vs.EvolveItem_Desc }}</td>
									<td>{{ vs.EvolveSubstituteItem_QtyPer }}</td>
								</tr>
							</tbody>
						</table>	
					</div>
				</div>
				<div class="uk-modal-footer uk-text-right">
					<button 
						:data-uk-tooltip="keywords.save.ttps"
						class="sc-button header-button-evolve uk-modal-close"
						type="button"
						@click="saveSubstituteItem()"
					>
						{{ keywords.save.val }}
					</button>
				</div>
			</div>
		</div>

		<div :id="'CHALLAN-DETAIL' + uniqId" class="uk-modal">
			<div class="uk-modal-dialog" style="width:100%">
				<button class="uk-modal-close-default" type="button" data-uk-close></button>				
				<div class="uk-modal-body">
					<div class="uk-child-width-1-1@m uk-grid" data-uk-grid>
						<table class="uk-table uk-table-striped">
							<thead>
								<tr>
									<th>{{ keywords.workorder_no.val }}</th>
									<th>{{ keywords.item_code.val }}</th>
									<th>{{ keywords.item_desc.val }}</th>
									<th>{{ keywords.qty.val }}</th>
									<th>{{ keywords.challan_rec_qty.val }}</th>
									<th>{{ keywords.rem_qty.val }}</th>
									<th>{{ keywords.action.val }}</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(v1,index6) in challnDetails" :key="index6">
									<td>{{ v1.EvolveWorkOrder_OrderNo }}</td>
									<td>{{ v1.EvolveItem_Code }}</td>
									<td>{{ v1.EvolveItem_Desc }}</td>
									<td>{{ v1.qty }}</td>
									<td>{{ v1.challanRecQty }}</td>
									<td>{{ remQty(v1) }}</td>
									<td>
										<button
											class="sc-button sc-button-primary sc-button-mini"
											@click="getItemChallanDetails(v1 , index6)"
										>
											Challan Detail
										</button>
									</td>
								</tr>
							</tbody>
						</table>	
					</div>
				</div>
				<div class="uk-modal-footer uk-text-right">
					<button
						class="sc-button sc-button-success sc-button-primary"
						@click="saveChallnDetail"
					>
						Confirm
					</button>
				</div>
			</div>
		</div>

		<div :id="'ITEM-CHALLAN-DETAILS' + uniqId" class="uk-modal" uk-modal="stack: true">
			<div class="uk-modal-dialog" style="width:100%;height:100%">
				<button class="uk-modal-close-default" type="button" data-uk-close></button>				
				<div class="uk-modal-body">
					<div class="uk-child-width-1-1@m uk-grid responsive-table" data-uk-grid>
						<table class="uk-table uk-table-striped">
							<thead>
								<tr>
									<th></th>
									<th>{{ keywords.challan_no.val }}</th>
									<th>{{ keywords.item_code.val }}</th>
									<th>{{ keywords.item_desc.val }}</th>
									<th>{{ keywords.challan_type.val }}</th>
									<th>{{ keywords.qty_ship.val }}</th>
									<th>{{ keywords.qty_balance.val }}</th>
									<th>{{ keywords.qty_consume.val }}</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(vs1,index8) in itemChallanDetails" :key="index8">
									<td>
										<!-- <PrettyCheck
											v-model="vs1.isPicked"
											class="p-switch"
											name="aa"
										>
										</PrettyCheck> -->
									</td>
									<td>{{ vs1.EvolveChallan_No }}</td>
									<td>{{ vs1.EvolveItem_Code }}</td>
									<td>{{ vs1.EvolveItem_Desc }}</td>
									<td>{{ vs1.EvolveChallanReport_Type }}</td>
									<td>{{ vs1.EvolveChallanReport_QtyShip }}</td>
									<td>{{ vs1.EvolveChallanReport_QtyBalance }}</td>
									<td>
										<ScInput
											v-model="vs1.qtyConsume"
											:disabled="!vs1.isPicked"
											type="number"
											placeholder="Qty Consume"
											@input="vs1.qtyConsume = Math.abs(vs1.qtyConsume);vs1.qtyConsume = validateChallanQty(vs1,vs1.qtyConsume)"
										>
										</ScInput>
									</td>
								</tr>
							</tbody>
						</table>	
					</div>
				</div>
				<div class="uk-modal-footer uk-text-right">
					<button 
						:data-uk-tooltip="keywords.save.ttps"
						class="sc-button header-button-evolve uk-modal-close"
						type="button"
						@click="saveItemChallan()"
					>
						{{ keywords.save.val }}
					</button>
				</div>
			</div>
		</div>
		<!-- MESSAGE model Start-->

		<div :id="'MESSAGE' + uniqId" data-uk-modal class="uk-modal" uk-modal="stack: true">
			<div class="uk-modal-dialog">
				<button class="uk-modal-close-default" type="button" data-uk-close></button>				
				<div class="uk-modal-header">
					<h3 class="uk-modal-title uk-heading-line uk-text-center">
						<span>{{ keywords.poreceive_message.val }}</span>
					</h3>
				</div>
				<div class="uk-modal-body">
					{{ pORecieveMessage }}
				</div>
				<div class="uk-modal-footer uk-text-right">
					<button 
						data-uk-tooltip="Ticket Create"
						class="sc-button sc-button-primary"
						type="button"
						@click="saveTicketData"
					>
						Ticket Create
					</button>
				</div>
			</div>
		</div>

		<!-- MESSAGE model  End -->
	</div>
</template>
<style scoped>
/** CSS for table only */
.paginate{
	position: inherit !important;;
}
.responsive-table table thead tr th {
    z-index: 1;
}
#evolvePoRecieve tbody td {
	 white-space: nowrap;
	 padding: 4px 0px 5px 3px;
}

.tax-head-tittle {
    font-weight: 700;
    font-family: unset;
}

</style>
<script>

import paginateMixins from "~/mixins/paginateMixins";
import { scHelpers } from "~/assets/js/utils";
const { uniqueID } = scHelpers;

export default {
	
	head () {
		return {
			title: "Evolve - " + this.$route.name,
		};
	},
	components: {
		PageHeaderBar: process.client ? defineAsyncComponent(() =>import("~/components/cust/PageHeaderBar")) : null,
		DaynamicSearch: process.client ?defineAsyncComponent(() => import("~/components/cust/DaynamicSearch")) : null,
		Pagination: process.client ? defineAsyncComponent(() => import("~/components/cust/SeekPagination") ): null,
		EvolvePDF: process.client
			? defineAsyncComponent(() => import("~/components/jspdf/evolvePDF"))
			: null,
		// PrettyCheck: process.client ? defineAsyncComponent(() => import("pretty-checkbox-vue/check")): null,
		ScInput: process.client ? defineAsyncComponent(() => import("~/components/Input")): null,
		
	},

	mixins: [paginateMixins],
	props: {
		params: {
			type: Object,
			default: () => { }
		}
	},
	
	data () {
		return {
			// toFixedCount:this.$auth.$state.user.EvolveToFixedConfig,
			EvolveMenu_Id: this.$route.query.EvolveMenu_Id,
			pageURL: '/eWms/purchaseOrderRecieve/list/',
			userId: useStore().user.EvolveUser_ID,
			token: useStore().user.EvolveToken,
			baseURL:  this.$config.public.baseURL,
			uniqId:uniqueID(),
			
			keywords: {
		
				invoice_number: {
					val: "Invoice Number",
					ttps: "",
				},
				invoice_value:{
					val: "Invoice Value",
					ttps: "",
				},
				workorder_no:{
					val: "WorkOrder No.",
					ttps: "",
				},
				supplier_name: {
					val: "Supplier Name",
					ttps: "",
				},
				supplier_code:{
					val: "Supplier Code",
					ttps: "",
				},
				gate_userName:{
					val: "User",
					ttps: "",
				},
				gate_number: {
					val: "Gate Number",
					ttps: "",
				},
				gateEntry_number: {
					val: "Gate Entry Number",
					ttps: "",
				},
				grn_status: {
					val: "Grn Status",
					ttps: "",
				},
				po_number:{
					val: "Po Number",
					ttps: "",
				},
				line_number :{
					val: "Line Number",
					ttps: "",
				},

				receiver_number:{
					val: "Receiver Number",
					ttps: "",
				},
				po_line:{
					val: "Po Line",
					ttps: "",
				},
				
				item_code:{
					val: "Item Code",
					ttps: "",
				},
				item_desc:{
					val: "Item Desc",
					ttps: "",
				},
				grn_details: {
					val: "Grn Details",
					ttps: "",
				},
				location:{
					val: "Location",
					ttps: "",
				},
				lot_no:{
					val: "Lot Number",
					ttps: "",
				},
				
				ref_no:{
					val: "Ref No",
					ttps: "",
				},
				comments:{
					val: "Comments",
					ttps: "",
				},
				qty:{
					val: "Qty",
					ttps: "",
				},
				stock_qty:{
					val: "Stock Qty",
					ttps: "",
				},
				uom:{
					val: "Uom",
					ttps: "",
				},
				stock_uom:{
					val: "stock Uom",
					ttps: "",
				},
				details: {
					val: "Details",
					ttps: "",
				},
				taxes: {
					val: "Taxes",
					ttps: "",
				},
				transporter:{
					val: "Transporter",
					ttps: "",
				},
				ship_date:{
					val: "Ship Date",
					ttps: "",
				},
				ship_via:{
					val: "Ship Via",
					ttps: "",
				},
				fob:{
					val: "FOB",
					ttps: "",
				},
				trans_mode:{
					val: "Trans Mode",
					ttps: "",
				},
				vehicle_ref:{
					val: "Vehicle Ref",
					ttps: "",
				},
				voyage:{
					val: "Voyage",
					ttps: "",
				},
				origin:{
					val: "Origin",
					ttps: "",
				},
				port_depart:{
					val: "Port Depart",
					ttps: "",
				},
				port_arrive:{
					val: "Port Arrive",
					ttps: "",
				},
				remarks:{
					val: "Remarks",
					ttps: "",
				},
			
				tax_total:{
					val: "Tax Total",
					ttps: "",
				},
				tax_rate:{
					val: "Tax Rate",
					ttps: "",
				},
				unit_cost:{
					val: "Unit Cost",
					ttps: "",
				},
				total:{
					val: "Total",
					ttps: "",
				},
				tax_type:{
					val: "Tax Type",
					ttps: "",
				},
				tax_base:{
					val: "Tax Base",
					ttps: "",
				},
				action: {
					val: "Action",
					ttps: "",
				},
				edit: {
					val: "Edit",
					ttps: "",
				},
				delete: {
					val: "Delete",
					ttps: "",
				},
				cancel: {
					val: "Cancel",
					ttps: "",
				},
				show_help: {
					val: "Show Help",
					ttps: "",
				},
				tooltip: {
					val: "Tool Tip",
					ttps: "",
				},
				supplier_code:{
					val: "Supplier Code",
					ttps: "",
				},
				gate_updatedDate:{
					val: "Date",
					ttps: "",
				},
				challan_no:{
					val: "Challan No.",
					ttps: "",
				},
				challan_type:{
					val: "Challan Type",
					ttps: "",
				},
				qty_ship:{
					val: "Qty Ship",
					ttps: "",
				},
				qty_consume:{
					val: "Qty Consume",
					ttps: "",
				},
				qty_return:{
					val: "Qty Return",
					ttps: "",
				},
				qty_scrap:{
					val: "Qty Scrap",
					ttps: "",
				},
				qty_balance:{
					val: "Qty Balance",
					ttps: "",
				},
				challan_rec_qty:{
					val: "Challan Rec Qty",
					ttps: "",
				},
				save: {
					val: "Save",
					ttps: "",
				},
				approval_history: {
					val: "Approval History",
					ttps: "Approval History",
				},
				submit: {
					val: "Submit",
					ttps: "Submit",
				},
				doa_status: {
					val: "DOA Status",
					ttps: "DOA Status",
				},
				perform_shipper: {
					val: "Perform Shipper",
					ttps: "Perform Shipper",
				},
				process_status:{
					val: "Status",
					ttps: "Status",
				},
				doa_status:{
					val: "DOA",
					ttps: "DOA",
				},
				poreceive_message:{
					val: "Message",
					ttps: "Message",
				},
				show:{
					val: "Show",
					ttps: "Show",
				},
				rem_qty: {
					val: "Rem Qty",
					ttps: "",
				}
			},
			isGrnGenerated :false,
			isSubmitToGrn:false,
			grnData: null,
			message:"",
			helpMasterCode: "PORECIEVELIST",
			/** Start : EvolveDataTable */
			search: "", // For making dynamic search
			currentPage: 1,
			pageCount: 0,
			displayRecord: 10,
			noOfRecord: 0,
			startFrom: '',
			isLastPage : false,
			isCountRecords : false,
			filterClicked : 0,
			pdfData: {},
			csvExportColums: [0, 1, 2, 3, 4, 5, 6, 7, 8],
			pdfExportColums: [0, 1, 2, 3, 4, 5, 6, 7, 8],
			/** End : EvolveDataTable */
			poRecieveList: [],
			poRecieveLineList: [],
			showHelpMsg: '',

			reInitialize: 0,
			grnDetails:[],
			woDetails:[],
			grnNumberDetailsArr:[],
			receivingId : null,
			transportDetailObj:{},
			taxesDetailsArr : [],
			taxesDetailsTypeArr : [],
			taxesDetailsPoArr : [],
			loading : true,

			currentPoIndex: 0,
			fieldList: [
				{
					value: "Invoice Number",
					key: "EvolvePoRecieve_InvoiceNumber",
					collectionName: "EvolvePoRecieve",
				},
				{
					value: "Gate Number",
					key: "EvolveGate_ID.EvolveGate_Number",
					collectionName: "EvolveGate",
				},
				{
					value: "Gate Entry Number",
					key: "EvolveGateEntry_Number",
					collectionName: "EvolvePoRecieve",
				},
				{
					value: "Supplier Code",
					key: "EvolveSupplier_ID.EvolveSupplier_Code",
					collectionName: "EvolveSupplier",
				},
				{
					value: "Supplier Name",
					key: "EvolveSupplier_ID.EvolveSupplier_Name",
					collectionName: "EvolveSupplier",
				},
				{
					value: "User",
					key: "createdUser.EvolveUser_Name",
					collectionName: "EvolvePoRecieve",
				},
				{
					value: "Date",
					key: "updatedAt",
					collectionName: "EvolvePoRecieve",
				},
				{
					value: "Grn Detail",
					key: "EvolvePoRecieve_GrnNumber.ReceiverNumber",
					collectionName: "EvolvePoRecieve",
				},
				{
					value: "PO Number",
					key: "EvolvePoRecieveDetails.EvolvePO_ID.EvolvePO_Number",
					collectionName: "EvolvePoRecieve",
				},
			
			],

			filterArray: [],
			buttonsList: [
				{
					lable: 'Create Po Recieve',
					code: 'onCreateOrEditPoRecieve'
				},
				
			],
			substituteItem: [],
			poRecLine:0,
			woLine:0,
			challnDetails:[],
			itemChallanDetails:[],
			challanConsumeArr:[],
			currentChallanDetailIndex:0,
			poLineIndex:0,
			pORecieveMessage: '',
			isItcRequired:false,
			listFnName:"getPoRecieveList",
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
		console.log('------------------------------------------------------')
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

		this.$eventBus.$on("onOptionClose", async (helpMasterCode) => {
			if (helpMasterCode == this.helpMasterCode) {
				await this.getPoRecieveList();
			}
		});

		this.$eventBus.$on('onCloseTabCalled', (url) =>{
			if(this.pageURL == url){
				this.destroy();
			} 
		});

	},

	created: async function () {

		try {
			console.log("this:::::::::::" , this);
			useStore().loadPageData({
				masterCode: this.helpMasterCode, // Master code
				keywords: this.keywords,
			});
			await this.getPoRecieveList();			
		} catch (error) {
			console.error("Error in "+this.helpMasterCode+" :", error.message);
			useStore().evolveNotification({
				code: 111, 
				type: 2 
			});
		}
	},

	// beforeUnmount () {
	// 	$("#GRN-DETAILS").remove();
	// 	$("#TAXES-DETAILS").remove();
	// 	$("#TRANSPORT-DETAILS").remove();
	// 	$("#GRN-NUMBER-DETAILS").remove();
	// 	$("#QTY-TO-ISSUE").remove();
	// 	$("#substituteItem").remove();
	// 	$("#CHALLAN-DETAIL" + this.uniqId).remove();
	// 	$("#ITEM-CHALLAN-DETAILS" + this.uniqId).remove();
	// 	$("#MESSAGE" + this.uniqId).remove();
	// }, 

	methods: {

		async downloadPdf () {
			try {
				let header = [];
				let data = [];
				let img = require("~/assets/img/aliter_logo.png");
				// let html = document.getElementById("evolvePoRecieve").outerHTML;
				let rows = document.querySelectorAll("#evolvePoRecieve tr");
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
						title: "Evolve Po Receive",
						tableData: {
							header: header,
							data: data,
						},
						fileName: "evolvePoRecieve",
					},
				};
			} catch (error) {
				useStore().evolveNotification( { code: 111, type: 2, var: [`${error.message}`] });
			}
		},

		async downloadCsv () {
			try {
				let filename = "evolvePoRecieve";
				let csv = [];
				let rows = document.querySelectorAll("#evolvePoRecieve tr");
				for (let i = 0; i < rows.length; i++) {
					let row = [],
						cols = rows[i].querySelectorAll("td, th");
					for (let j = 0; j < cols.length; j++) {
						if (this.pdfExportColums.indexOf(j) != -1) {
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
				useStore().evolveNotification( { code: 111, type: 2, var: [`${error.message}`] });
			}


		},

		async getPoRecieveList (search) {
			try {
				if (search) {
					this.currentPage = 1;
					this.startFrom = 0;
				}
				this.loading = true;
				let list = await this.$axios
					.$post("/api/v3/evolve/purchaseOrderRecieve/poRecieveHandler", {
						"operation": "L",
						"dispalyRecord": parseInt(this.displayRecord),
						"filterArray": this.filterArray,
						"isLastPage" : this.isLastPage,
						"isCountRecords" : this.isCountRecords,
						"startFrom": this.startFrom,
        				"cursor" : this.cursor
					})
					.catch((e) => {
						this.loading = false;
						console.error("Error Come In Catch", e.message);
						useStore().evolveNotification( { code: 117, type: 2 });
					});


				if (list && list.statusCode === 200) { 		
					let {noOfRecord, currentPage,  records, startingId, endingId} = list.result;
					this.noOfRecord =  (this.isCountRecords || this.isLastPage) ? noOfRecord :  this.noOfRecord;
					this.currentPage = (this.isLastPage && currentPage )? currentPage : this.currentPage;
				
					if(!this.startFrom && records.length && !this.firstId) this.firstId = records[0]._id
					if(this.isLastPage && !this.lastId) this.lastId = records[0]._id
									
					this.startingId = startingId
					this.endingId = endingId
				
					this.isNextDisabled = this.checkIfNextDisabled(records) //from paginate mixins
					this.poRecieveList = ((records.length != 0 && this.currentPage > 1) || this.currentPage == 1) ? records : this.poRecieveList;
					this.isCountRecords = this.isLastPage = false;
				}
				this.loading = false; 
			} catch (error) {
				this.loading = false;
				console.error('Error Come in Catch getPoRecieveList : ', error.message);
				useStore().evolveNotification( { code: 111, type: 2 });
			}



		},

		async getGrnDetails (index){
			try {
				this.currentPoIndex = index;
				this.grnDetails = []
				this.loaderShow();
				 
				let list = await this.$axios
					.$post("/api/v3/evolve/purchaseOrderRecieve/poRecieveHandler", {operation:"SLD", "_id": this.poRecieveList[index]._id})
					.catch((e) => { 
						console.error("Error Come In Catch", e.message);
						this.loaderHide();
						useStore().evolveNotification( { code: 117, type: 2 });
					});
					
				if (list) {
					if (list.statusCode == 200) {
						this.grnDetails = list.result;
					}
					else {
						useStore().evolveNotification( list.message);
					}
					this.loaderHide();
				}
				
				UIkit.modal("#GRN-DETAILS").show();
			} catch (error) {
				this.loaderHide();
				console.error("Error Come In Catch", error.message);
				useStore().evolveNotification( { code: 111, type: 2, var: [`${error.message}`] });
			}
			
		},

		getTransporterDetails (index){
			this.transportDetailObj = this.poRecieveList[index].EvolvePoRecieve_TransDetails;
			UIkit.modal("#TRANSPORT-DETAILS").show();
			
		},

		async woChallanDetail (index){
			try {
				if (this.poRecieveList[index].EvolvePoRecieve_WorkOrderDetails.length > 0) {
					
					this.poLineIndex = index;
					this.challanConsumeArr = [];
					this.challnDetails = [];

					this.loaderShow();
				 
					let list = await this.$axios
						.$post("/api/v3/evolve/purchaseOrderRecieve/poRecieveHandler", {operation:"SLWD", "_id": this.poRecieveList[index]._id})
						.catch((e) => { 
							console.error("Error Come In Catch", e.message);
							this.loaderHide();
							useStore().evolveNotification( { code: 117, type: 2 });
						});
					
					if (list) {
						if (list.statusCode == 200) {
							let result = list.result.woDetails;
							this.isItcRequired = list.result?.isItcReq;
							for (let i = 0; i < result.length; i++) {
								const element = result[i];
								if (element.qty > 0) {
									this.challnDetails.push({...element, EvolveSupplier_Code : this.poRecieveList[index].EvolveSupplier_Code, EvolveInvoice_No : this.poRecieveList[index].EvolvePoRecieve_InvoiceNumber, challanRecQty : 0});
									
								}
							
							}
							for (let j = 0; j < this.challnDetails.length; j++) {
								const element = this.challnDetails[j];
								await this.getItemChallanDetails(element, j, true);
								await this.saveItemChallan(j);
							}
							UIkit.modal("#CHALLAN-DETAIL" + this.uniqId).show();
						}
						else {
							
							useStore().evolveNotification( list.message);
						}
					}
					this.loaderHide();
				}else{
					this.getTaxesDetails(index, true)
				}

			} catch (error) {
				this.loaderHide();
				console.error("Error Come In Catch", error.message);
				useStore().evolveNotification( { code: 111, type: 2, var: [`${error.message}`] });
			}
			
		},

		getTaxesDetails (index, isSubmitToGrn){
			try {
				this.isSubmitToGrn = isSubmitToGrn;
				this.taxesDetailsArr = this.poRecieveList[index].EvolvePoRecieve_TaxDetails == null ? [] : this.poRecieveList[index].EvolvePoRecieve_TaxDetails;
				this.taxesDetailsTypeArr = this.poRecieveList[index].EvolvePoRecieve_TaxDetailsByType;
				this.taxesDetailsPoArr = this.poRecieveList[index].EvolvePoRecieve_TaxDetailsByPo;
				this.message = ""
				for (let i = 0; i < this.taxesDetailsArr.length; i++) {
					this.taxesDetailsArr[i].taxrate = parseFloat((parseFloat(this.taxesDetailsArr[i].taxtotal) * 100) / parseFloat( this.
						taxesDetailsArr[i].total)).toFixed(this.toFixedCount)
				}
				if (isSubmitToGrn) {
					if (this.poRecieveList[index].EvolvePoRecieve_WorkOrderDetails==undefined || this.poRecieveList[index].EvolvePoRecieve_WorkOrderDetails.length == 0) {
						this.challanConsumeArr = [];
						this.challnDetails = [];
					};
					
					this.grnData = {...this.poRecieveList[index], "challnConsumeDetails" : this.challanConsumeArr};
					if (this.grnData.EvolveGateEntry_Number!="" && this.grnData.isInvValueMatch == false) {
						this.message =`Warning : Gate Entry Invoice Value(${this.grnData.EvolveGateEntry_InvoiceValue}) and PO Receiving Invoice Value(${this.grnData.EvolvePoRecieve_InvoiceValue}) Not Match`
					}else{
						this.message = ""
					};
				}else{
					this.grnData = null;
				}
				
				UIkit.modal("#TAXES-DETAILS").show();
			} catch (error) {
				
				useStore().evolveNotification( { code: 111, type: 2, var: [`${error.message}`] });
			}
			
		},

		getGrnNumberDetails (index){
			try {
				this.receivingId = null;
				this.grnNumberDetailsArr = this.poRecieveList[index].EvolvePoRecieve_GrnNumber;
				this.receivingId = this.poRecieveList[index]._id;
				UIkit.modal("#GRN-NUMBER-DETAILS").show();
			} catch (error) {
				
				useStore().evolveNotification( { code: 111, type: 2, var: [`${error.message}`] });
			}
			
		},

		async getWoDetails (index){
			try {
				this.isGrnGenerated = this.poRecieveList[index].EvolvePoRecieve_Status
				this.supplierName = this.poRecieveList[index].EvolveSupplier_Name;
				this.poRecLine = index;
				// this.woDetails = this.poRecieveList[index].EvolvePoRecieve_WorkOrderDetails;

				this.loaderShow();
				 
				let list = await this.$axios
					.$post("/api/v3/evolve/purchaseOrderRecieve/poRecieveHandler", {operation:"SLWD", "_id": this.poRecieveList[index]._id})
					.catch((e) => { 
						console.error("Error Come In Catch", e.message);
						this.loaderHide();
						useStore().evolveNotification( { code: 117, type: 2 });
					});
					
				if (list) {
					if (list.statusCode == 200) {
						this.woDetails = list.result.woDetails;
						this.isItcRequired = list.result?.isItcReq;
					}
					else {
						useStore().evolveNotification( list.message);
					}
				}
				this.loaderHide();
				
				UIkit.modal("#QTY-TO-ISSUE").show();
			} catch (error) {
				console.error("Error Come In Catch getWoDetails", error.message);
				this.loaderHide();
				useStore().evolveNotification( { code: 111, type: 2, var: [`${error.message}`] });
			}
			
		},

		onCreateOrEditPoRecieve: async function (porecieveId, detailMode) {
			try {
				
				useStore().addNewTab({
					title: detailMode == false || detailMode == undefined ? porecieveId == '' || porecieveId == null || porecieveId == undefined ? 'Po recieve Create' : 'Po Recieve Update' : "Po Recieve View",
					url: '~/eWms/PurchaseOrderRecieve/options/',
					params: {
						primaryId: porecieveId,
						detailMode: detailMode,
					}
				});
			} catch (error) {
				console.error("Error Come In catch", error.message);
				useStore().evolveNotification( { code: 111, type: 2, var: [`${error.message}`] });
			}

		},

		submitReqToGrn: async function (){
			try {
				if (this.grnData && this.isSubmitToGrn) {
					this.loaderShow();
				 
					let list = await this.$axios
						.$post("/api/v3/evolve/purchaseOrderRecieve/submitReqToGrn", this.grnData)
						.catch((e) => { 
							console.error("Error Come In Catch", e.message);
							this.loaderHide();
							useStore().evolveNotification( { code: 117, type: 2 });
						});
					
					if (list) {
						if (list.statusCode == 200) {
							UIkit.modal("#TAXES-DETAILS").hide();
							this.isSubmitToGrn = false;
							this.grnData = null;
							this.message = "";
							this.challanConsumeArr = [];
							this.challnDetails = [];
							await this.getPoRecieveList()
							useStore().evolveNotification( list.message);
							this.loaderHide();
						} else {
							useStore().evolveNotification( list.message);
							this.loaderHide();
						}
					
					}else{
						this.loaderHide();
					}
				}else{
					this.loaderHide();
				}
			} catch (error) {
				this.loaderHide();
				console.error('Error Come in Catch :', error.message);
				useStore().evolveNotification( { code: 111, type: 2 });
			}
		},

		grnPdfDownload: async function (data){
			try {

				let list = await this.$axios
					.$post("/api/v3/evolve/purchaseOrderRecieve/poRecieveHandler", {
						"operation": "GRNPDF",
						"data":data
					})
					.catch((e) => {
						console.error("Error Come In Catch", e.message);
						useStore().evolveNotification( { code: 117, type: 2 });
					});
				
				if (list) {
					if (list.statusCode == 200) {
						await this.getPoRecieveList();
						useStore().evolveNotification( list.message);
					} else {
						useStore().evolveNotification( list.message);
					}
				}
				
			} catch (error) {
				console.error('Error Come in Catch :', error.message);
				useStore().evolveNotification( { code: 111, type: 2 });
			}
		},

		printSingleItem: async function (index){
			try{
				let arr = [];
				let data = this.grnDetails[index];
				let printerdata = this.poRecieveList[this.currentPoIndex].printerData;
				console.log("this.poRecieveList[this.currentPoIndex]", printerdata);

				if (printerdata.EvolvePrinter_ID!=undefined) {
					arr.push({
						EvolveItem_Code:data.itemType.EvolveItem_Code,
						EvolveItem_Desc:data.itemType.EvolveItem_Desc,
						EvolvePoRecieve_StockUom:data.EvolvePoRecieve_StockUom,
						EvolvePoRecieve_StockQty:data.EvolvePoRecieve_StockQty,
						EvolveSupplier_Code:data.EvolveSupplier_Code,
						EvolveSupplier_Name:data.EvolveSupplier_Name,
						EvolvePoRecieve_GrnNumber:data.EvolvePoRecieve_GrnNumber,
						EvolvePoRecieve_Date:this.poRecieveList[this.currentPoIndex].createdAt,
						Location_Code:data.EvolveLocation_Code,
						LotNumber:data.EvolvePoRecieve_LotNo,
						RefNumber:data.EvolvePoRecieve_RefNo,
						EvolvePrintLabel_ID:printerdata.EvolveDefaultLabel_ID,
						EvolvePrinter_Code:printerdata.EvolvePrinter_ID.EvolvePrinter_Code,
					});
					let printerLabel = await this.$axios
						.$post("/api/v3/evolve/purchaseOrderRecieve/printLabel", {printerData:arr})
						.catch((e) => {
							console.error("Error Come In Catch", e.message);
							useStore().evolveNotification( {code: 117});
						});
					if (printerLabel) {
						if (printerLabel.statusCode == 200) {
							useStore().evolveNotification({code: printerLabel.messageCode});
						}else{
							useStore().evolveNotification({code: printerLabel.messageCode});
						}
					}
				} else {
					useStore().evolveNotification({code: 211});
				}
			} catch (error) {
				console.error("Error Come In Catch>>>>>>>", error.message);
				useStore().evolveNotification({code: 111, type: 2, var: [`${error.message}`]});
			}
		},

		async generateGrn (datas) {
			try {
				let isSubmit = false;
				let message = "<p>Are You Sure Want To Generate Grn </p>";
				if (datas.EvolveGateEntry_Number!="" && datas.isInvValueMatch == false) {
					message+="<p> Warning :  Invoice Value Not Match</p>"
				}
				$(this).prop("disabled", true);
				await UIkit.modal.confirm(message).then(
					function () {
						isSubmit = true;
					},
					function () {
						$(this).prop("disabled", false);
					
					}
				);
				if (isSubmit) {
					this.loaderShow();
					let data = await this.$axios
						.$post("/api/v3/evolve/purchaseOrderRecieve/poRecieveHandler", {
							"operation": "GRNGEN",
							"grndata":datas
						})
						.catch((e) => {
							this.loaderHide();
							console.error("Error Come In Catch", e.message);
							useStore().evolveNotification( { code: 117, type: 2 });
						});
					
					if (data.statusCode == 200) {
						await this.getPoRecieveList();
						this.loaderHide();
					}
					useStore().evolveNotification( data.message);
					this.loaderHide();
				}
			} catch (error) {
				this.loaderHide();
				console.error('Error Come in Catch : ', error.message);
				useStore().evolveNotification( { code: 111, type: 2 });
			}
		},

		generatePDF: async function (data) {
			try {
				this.loaderShow();
				let generatePDF = await this.$axios.$post("/api/v3/evolve/purchaseOrderRecieve/poRecieveHandler", {
					"operation": "GPDF",
					"value": data.ReceiverNumber,
					"reqType": 'RC',
					"grnData":data
				}).catch((e) => {useStore().evolveNotification({ code: 117, type: 2 });
				});
				if (generatePDF) {
					if (generatePDF.statusCode == 200) {
						window.open(generatePDF.result, "_blank");
					} else {
						useStore().evolveNotification(generatePDF.message);
					}
				}
				this.loaderHide();
			} catch (error) {
				this.loaderHide();
				console.error('Error In Generate Pdf :' + this.helpMasterCode + " :" + error.message)
				useStore().evolveNotification({ code: 111, type: 2 });
			}
		},

		generatePdfPath: async function (filePath){
			try {
				window.open(filePath, "_blank");
			} catch (error) {
				console.error('Error In Open Pdf Path :' + this.helpMasterCode + " :" + error.message)
				useStore().evolveNotification({ code: 111, type: 2 });
			}
		},

		onClickBtn: async function (code) {
			try {
				this[code]()

			} catch (error) {

			}
		},

		getWoBomItemSubItem:async function (index){
			try {
				this.woLine = index;
				let getWoBomItemSubDetail = await this.$axios
					.$post("/api/v3/evolve/purchaseOrderRecieve/getWoBomItemSubDetail", {
						EvolveParentItem_Code:this.woDetails[index].EvolveWorkOrder_ID.EvolveItem_ID.EvolveItem_Code,
						EvolveItem_Code:this.woDetails[index].EvolveItem_Code,
					})
					.catch(() => {
						useStore().evolveNotification({
							code: 117,
							type: 2,
						});
					});
				if (getWoBomItemSubDetail.statusCode == 200) {
					this.substituteItem = getWoBomItemSubDetail.records;
					UIkit.modal("#substituteItem").show();
				}else{
					useStore().evolveNotification({code: getWoBomItemSubDetail.messageCode, var:getWoBomItemSubDetail.var});
				}
					
			} catch (error) {
				console.error("Error Come In Catch>>>>>>> getWoBomItemSubItem", error.message);
				useStore().evolveNotification({
					code: 111,
					type: 2,
					var: [`${error.message}`],
				});
			}
		},

		saveSubstituteItem:async function (){
			try {
				let dataArr = this.substituteItem.filter((item) => item.isPicked == true);
				for (let i = 0; i < dataArr.length; i++) {
					const element = dataArr[i];
					console.log("element", element);
					let obj = {...this.woDetails[this.woLine]};
					obj.EvolveBom_Uom = element.EvolveSubstituteItem_Item.EvolveUom_ID.EvolveUom_Uom;
					obj.EvolveItem_Code = element.EvolveSubstituteItem_ItemCode;
					obj.EvolveItem_Desc = element.EvolveSubstituteItem_Item.EvolveItem_Desc1 + "-" + element.EvolveSubstituteItem_Item.EvolveItem_Desc2;
					obj.EvolveItem_ID = element.EvolveSubstituteItem_Item;
					obj.qty = obj.EvolvePoRecieve_StockQty * element.EvolveSubstituteItem_QtyPer;
					obj.isSub = true;

					let findIndex = this.woDetails.findIndex((item) => item.EvolveItem_Code == element.EvolveSubstituteItem_ItemCode && item.EvolveWorkOrder_ID.EvolveItem_ID.EvolveItem_Code == element.EvolveParentItem_Code);
					if (findIndex == -1) {
						this.woDetails.push(obj);
					}

				}
			} catch (error) {
				console.error("Error Come In Catch>>>>>>> saveSubstituteItem", error.message);
				useStore().evolveNotification({code: 111, type: 2});
			}
		},

		deleteWoSubItem:async function (index){
			try {
				this.woDetails.splice(index, 1);
			} catch (error) {
				console.error("Error Come In Catch>>>>>>> deleteWoSubItem", error.message);
				useStore().evolveNotification({code: 111, type: 2});
			}
		},

		saveWoDetails : async function (){
			try {
				this.loaderShow();
				let updatepoRecWoDetails = await this.$axios
					.$post("/api/v3/evolve/purchaseOrderRecieve/updatepoRecWoDetails", {
						condition:{_id:this.poRecieveList[this.poRecLine]._id},
						bodyData:{EvolvePoRecieve_WorkOrderDetails:this.woDetails},
					})
					.catch(() => {
						useStore().evolveNotification({
							code: 117,
							type: 2,
						});
					});
				if (updatepoRecWoDetails.statusCode == 200) {
					this.substituteItem = updatepoRecWoDetails.records;
					UIkit.modal("#QTY-TO-ISSUE").hide();
				}
				this.loaderHide();
			} catch (error) {
				this.loaderHide();
				console.error("Error Come In Catch>>>>>>> saveWoDetails", error.message);
				useStore().evolveNotification({code: 111, type: 2});
			}
		},

		deletePoRecieve : async function (data){
			try {

				let Deletes = false
				await UIkit.modal.confirm("Are You Sure Want To Delete..!").then(
					function () {
						Deletes = true;
					},
					function () {
						$(this).prop("disabled", false);
					}
				);

				if( Deletes == true){
					this.loaderShow()

					let deletePoRecieve = await this.$axios
						.$post("/api/v3/evolve/purchaseOrderRecieve/poRecieveHandler", {
							"operation": "R",
							porecieveData : data,

						})
						.catch((e) => {
							this.loaderHide()
							console.error("Error Come In Catch", e.message);
							useStore().evolveNotification( { code: 117, type: 2 });
						});

					if(deletePoRecieve.statusCode == 200){
						useStore().evolveNotification(deletePoRecieve.message)
						this.getPoRecieveList();		
					}else{
						useStore().evolveNotification(deletePoRecieve.message)
					}
				}
				

				this.loaderHide()

			} catch (error) {
				this.loaderHide()
				console.error("Error Come In Catch>>>>>>> delete PO recieve", error.message);
				useStore().evolveNotification({
					code: 111,
					type: 2,
					var: [`${error.message}`],
				});
			}
		},

		getItemChallanDetails: async function (data, index, isAuto = false){
			try {
				if (!isAuto) {
					this.loaderShow();
					this.currentChallanDetailIndex = index;
					// this.challnDetails[index].challanRecQty = 0;
	
					let getItemChallanDetails = await this.$axios
						.$post("/api/v3/evolve/purchaseOrderRecieve/getItemChallanDetails", data)
						.catch(() => {
							useStore().evolveNotification({
								code: 117,
								type: 2,
							});
						});
					if (getItemChallanDetails.statusCode == 200) {
						this.itemChallanDetails = getItemChallanDetails.result;
						UIkit.modal("#ITEM-CHALLAN-DETAILS" + this.uniqId).show();
					}
					this.loaderHide();
				}else{
					let getItemChallanDetails = await this.$axios
						.$post("/api/v3/evolve/purchaseOrderRecieve/getItemChallanDetails", data)
						.catch(() => {
							useStore().evolveNotification({
								code: 117,
								type: 2,
							});
						});
					if (getItemChallanDetails.statusCode == 200) {
						this.itemChallanDetails = getItemChallanDetails.result;
					}
				}

			} catch (error) {
				console.error("Error Come In Catch>>>>>>> getItemChallanDetails", error.message);
				useStore().evolveNotification({code: 111, type: 2});
			}
		},

		saveItemChallan : async function (challanDetInd = this.currentChallanDetailIndex){
			try {
				let totalQty = 0;
				let selectedChallan = this.itemChallanDetails.filter((item) => item.isPicked == true);
				for (let index = 0; index < selectedChallan.length; index++) {
					let element = selectedChallan[index];
					element.totalQty = parseFloat(element.qtyConsume) + parseFloat(element.qtyReturn) + parseFloat(element.qtyScrap);
					totalQty += element.totalQty;

					if (totalQty > this.challnDetails[challanDetInd].qty && this.isItcRequired) {
						useStore().evolveNotification( {code : 'Do Not Enter More Than Required Quantity', type : 2});
						break
					}else{
						this.challnDetails[challanDetInd].challanRecQty = totalQty;
						let findIndex = this.challanConsumeArr.findIndex((item) => item._id.toString() == element._id.toString());
						if(findIndex == -1){
							this.challanConsumeArr.push({...element, reqQty:this.challnDetails[challanDetInd].qty, EvolveWorkOrder_ID : this.challnDetails[challanDetInd].EvolveWorkOrder_ID, EvolveInvoice_No : this.challnDetails[challanDetInd].EvolveInvoice_No});
						}else{
							this.challanConsumeArr[findIndex] = {...element, reqQty:this.challnDetails[challanDetInd].qty, EvolveWorkOrder_ID : this.challnDetails[challanDetInd].EvolveWorkOrder_ID, EvolveInvoice_No : this.challnDetails[challanDetInd].EvolveInvoice_No};
						}
					}
					
				}
			
			} catch (error) {
				console.error("Error Come In Catch>>>>>>> saveItemChallan", error.message);
				useStore().evolveNotification({code: 111, type: 2});
			}
		},

		saveChallnDetail : async function (){
			try {
				let findData = this.challanConsumeArr.find((data)=> data.totalQty < data.reqQty);
				if (findData && this.isItcRequired) {
					useStore().evolveNotification( {code : "Please Add Sufficient Quantity In Challan For Item", type : 2});
					return
				}
				UIkit.modal("#CHALLAN-DETAIL" + this.uniqId).hide();
				this.getTaxesDetails(this.poLineIndex, true)
			} catch (error) {
				console.error("Error Come In Catch>>>>>>> saveChallnDetail", error.message);
				useStore().evolveNotification({code: 111, type: 2});
			}
		},

		validateChallanQty : function (data, qty){
			try {
				let totalQty = parseFloat(data.qtyConsume);
				if (totalQty > parseFloat(data.EvolveChallanReport_QtyBalance)) {
					useStore().evolveNotification({code: "Please Enter Less Or Equal Balance Qty", type: 2});
					return 0;
				}
				return qty;
			} catch (error) {
				console.error("Error Come In Catch>>>>>>> validateChallanQty", error.message);
				useStore().evolveNotification({code: 111, type: 2, time:1000});
			}
		},

		submitReqToDoa: async function (data) {
			try {
				let isSubmit = false;
				$(this).prop("disabled", true);
				await UIkit.modal
					.confirm(`Are You Sure Want To Submit To DOA`)
					.then(
						function () {
							isSubmit = true;
						},
						function () {
							$(this).prop("disabled", false);
						}
					);
				if (isSubmit == true) {
					this.loaderShow();
					let response = await this.$axios
						.$post("/api/v3/evolve/purchaseOrderRecieve/poRecieveHandler", {
							operation: "DOASB",
							poReceiveId: data._id,
						})
						.catch((e) => {
							this.loaderHide();
							console.error("Error Came In  Axios Catch submitReqToDoa : ", e.message);
							useStore().evolveNotification({
								code: 117,
								type: 2,
							});
						});
					if (response) {
						if (response.statusCode == 200) {
							console.log("response(list-PORecieve)---->", response);
							this.loaderHide();
							this.getPoRecieveList();
							useStore().evolveNotification(response.message);
						} else {
							this.loaderHide();
							useStore().evolveNotification(response.message);
						}
					}
				}
			} catch (error) {
				this.loaderHide();
				console.error("Error Came In Catch submitReqToDoa : " + error.message);
				useStore().evolveNotification({ code: 111, type: 2 });
			}
		},

		onShowPurchaseOderRecieve: async function (prApprovalHisID, Approvedfor) {
			try {
				useStore().addNewTab({
					title: "Purchase Order Recieve History",
					url: "~/eDoa/approvalHistory/view/",
					params: {
						prApprovalHisID: prApprovalHisID,
						Approvedfor: Approvedfor,
					},
				});
			} catch (error) {
				console.log("Error Come in Catch onShowPurchaseOderRecieve : ", error.message);
				useStore().evolveNotification({ code: 111, type: 2 });
			}
		},

		performShipper: async function (data, index){
			try {
				let isSubmit = false;
				$(this).prop("disabled", true);
				await UIkit.modal.confirm(`Are You Sure Want To Perform Shiper`).then(function () {
					isSubmit = true 
				}, function () {
					$(this).prop("disabled", false);
				});
				if (isSubmit == true) {
					this.loaderShow();
					let response = await this.$axios
						.$post("/api/v3/evolve/purchaseOrderRecieve/poRecieveHandler", {
							operation: "S",
							_id: data._id,
						})
						.catch((e) => {
							this.loaderHide();
							console.error("Error Came In  Axios Catch performShipper : ", e.message);
							useStore().evolveNotification({code: 117, type: 2});
						});
					if (response) {
						if (response.statusCode == 200) {
							this.loaderHide();
							this.getPoRecieveList();
							useStore().evolveNotification(response.message);
						} else {
							this.loaderHide();
							useStore().evolveNotification(response.message);
						}
					}
				}
			} catch (error) {
				this.loaderHide();
				console.error("Error Came In Catch : performShipper ", error.message);
				useStore().evolveNotification( {code: 111, type: 2});
			}
		},

		showPoReceiveMessage: async function (index){
			try {
				if (this.poRecieveList[index].EvolvePoRecieve_Message) {	
					this.pORecieveMessage = this.poRecieveList[index].EvolvePoRecieve_Message;
					UIkit.modal("#MESSAGE" + this.uniqId).show();
				}
			} catch (error) {
				console.error("Error Came in Catch: showPoReceiveMessage "+ error.message);
				useStore().evolveNotification( { code: 111, type: 2, var: [`${error.message}`] });
			}
		},

		async getVoucherPdf (data){
			try {
				if (data.voucherFilePath) {
					window.open(this.baseURL + data.voucherFilePath.split("./OUTBOUNDFILE/")[1], "_blank");
				} else {
					this.loaderShow();
					let list = await this.$axios
						.$post("/api/v3/evolve/purchaseOrderRecieve/getVoucherPrint", {receivingId : this.receivingId, ...data})
						.catch((e) => { 
							console.error("Error Come In Catch getVoucherPdf", e.message);
							this.loaderHide();
							useStore().evolveNotification( { code: 117, type: 2 });
						});
					if (list) {
						if (list.statusCode == 200) {
							window.open(this.$axios.defaults.baseURL + list.result);
						} else {
							useStore().evolveNotification( list.message);
						}
						this.loaderHide();
					}
				}
			} catch (error) {
				this.loaderHide();
				console.error("Error Come In Catch getVoucherPdf", error.message);
				useStore().evolveNotification( { code: 111, type: 2, var: [`${error.message}`] });
			}
			
		},

		remQty (data){
			try {
				return parseFloat(data.qty) - parseFloat(data.challanRecQty);
			} catch (error) {
				console.error("Error Come In Catch remQty", error.message);
			}
			
		},
		saveTicketData () {
			try {
				useStore().evolveTicketGenrate({
					message:this.pORecieveMessage 
				});
				
			} catch (error) {
			  console.error('Error While Generate Ticket', error.message);
				useStore().evolveNotification({
					code: 111,
					type: 2,
					var: [`${error.message}`],
				});
			}
		}, 

		destroy: function () {
			$("#GRN-DETAILS").remove();
			$("#TAXES-DETAILS").remove();
			$("#TRANSPORT-DETAILS").remove();
			$("#GRN-NUMBER-DETAILS").remove();
			$("#QTY-TO-ISSUE").remove();
			$("#substituteItem").remove();
			$("#CHALLAN-DETAIL" + this.uniqId).remove();
			$("#ITEM-CHALLAN-DETAILS" + this.uniqId).remove();
			$("#MESSAGE" + this.uniqId).remove();
		},
	},
	
};
</script>