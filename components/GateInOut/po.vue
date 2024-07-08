<template>
	<div class="uk-grid" data-uk-grid>
		<div class="uk-width-1-2@m">
			<div class="uk-grid" data-uk-grid>
				<div class="uk-width-1-2@m">
					<label
						for="table lable"
						class="evolve-input-lable"
						data-uk-tooltip="Purchase Order"
					> Purchase Order :
					</label>
				</div>
				<div v-if="ispoline" class="uk-width-1-2@m">
					<FieldLineSearch
						v-model="$v.docScanNo.$model"		
						:searchobject="poLineSearchObj"
						placeholder="Select Po Line"
						@rowClick="onChangePoLine($event)"
					/>
				</div>
				<div v-else class="uk-width-1-2@m">
					<FieldSearch :key="reinit"
						v-model="$v.docScanNo.$model"
						placeholder="Select Po"
						:searchobject="compCodeSearchObject"
						:errorclass="$v.docScanNo.$error"
						custom="/api/v3/eGateControl/GateInOut/getCustomPO"
						@rowClick="onChangePo($event)"
						@change="onChangePo($event, true)"
					/>
				</div>
			</div>
		</div>
    
		<div class="uk-width-1-2@m">
			<div class="uk-grid" data-uk-grid>
				<div class="uk-width-1-2@m">
					<label
						for="table lable"
						class="evolve-input-lable"
						data-uk-tooltip="Purchase Order"
					> Invoice No :
					</label>
				</div>
				<div class="uk-width-1-2@m">
					<ScInput
					
						v-model="docInputNo"
						mode="outline"
						name="docInputNo"
						placeholder="Invoice No"
						:disabled="isinvdisable"
						@blur="dataSubmit()"
					></ScInput>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import ScInput from "~/components/Input";
import { validationMixin } from "vuelidate";
import { required, requiredIf } from "vuelidate/lib/validators";
import { scHelpers } from "~/assets/js/utils";
const { uniqueID } = scHelpers;
export default {
	name: 'Po',
	components: {
		ScInput,
		FieldSearch: process.client ? () => import("~/components/cust/FieldSearch") : null,
		FieldLineSearch: process.client ? () => import("~/components/cust/FieldLineSearch") : null,
		// Select2: process.client ? () => import("~/components/Select2") : null,
	},
	mixins: [validationMixin],
	props: {
		docScanNo:{
			type:String,
			default:""
		},
		dataIndex:{
			type: Number,
			default: -1
		},
		
		docInputNo:{
			type:String,
			default:""
		},
		supid:{
			type:String,
			default:""
		},
		gateList:{
			type:Array,
			default:() => []
		},
		ispoline:{
			type:Boolean,
			default:false
		},
		isinvdisable:{
			type:Boolean,
			default:false
		},
	},
	data:function (){
		return{
			compCodeSearchObject : {
				"table" : 'EvolvePO',
				"value_field" : 'EvolvePO_Number',
				"display_field" : 'EvolvePO_Number',
				"value":"",
				"disable":false,
				"defultCondction" : [{
					id: uniqueID(),
					field: "EvolvePO_Status",
					operator: "in",
					value: "R",
					collectionName : "EvolvePO",
					
				}, 
				{
					id: uniqueID(),
					field: "EvolveUnit_ID",
					operator: "in",
					value: this.$auth.$state.user.EvolveUnit_ID,
					collectionName : "EvolvePO",
				}]
			},
			poLineSearchObj : {
				"table" : 'EvolvePO',
				"arrayName":"EvolvePODetails",
				"value_field" : 'LineId',
				"display_field" : ["EvolvePO_Number", "EvolvePODetails_Line", "EvolveItem_Code", "EvolvePODetails_Type" ],
				"head" : [
					{searchKey:"EvolvePO_Number", lable:"Po Number"}, {searchKey:"EvolvePODetails_Line", lable:"Line Number"}, {searchKey:"EvolveItem_Code", lable:"Item Code"},  {searchKey:"EvolveItem_Desc", lable:"Item Desc"}, {searchKey:"EvolvePODetails_Type", lable:"PODetails Type"}, ],
				"displayLine_fields":["EvolveItem_Code", "EvolveItem_ID", "EvolveUom_ID", "EvolvePODetails_Line", "EvolveItem_Desc", "EvolveItem_Desc2", "EvolvePO_Number", "EvolvePODetails_IsMemoItem", "EvolvePODetails_NeedDate", "EvolveUom_Uom", "EvolvePODetails_Qty", "EvolvePODetails_UnitCost", "EvolvePODetails_TotalPrice", "EvolvePOTaxDetails", "EvolvePODetails_Type", "EvolveSupplier_ID"],
				"value" : '',
				
				"defultCondction" : [{
					id: uniqueID(),
					field: "EvolvePO_Status",
					operator: "in",
					value: "R",
					collectionName : "EvolvePO",
				},
				// {
				// 	id: uniqueID(),
				// 	field: "EvolveUnit_ID",
				// 	operator: "in",
				// 	value: this.$auth.$state.user.EvolveUnit_ID,
				// 	collectionName : "EvolvePO",
				// },
				]
			},
			reinit:0,
			supplier_ID:'',
			EvolvePODetails_Type:'',
		}
	
	},
	validations () {
		return {
			docScanNo: {
				required,
			}
			
		}
		
	},
	created: async function () {

		if (this.supid!="" && this.supid!=null && this.supid!=undefined && this.ispoline==false) {

		
			if (this.ispoline) {
				// this.poLineSearchObj.defultCondction[2] = {
				// 	id: uniqueID(),
				// 	field: "EvolveSupplier_ID",
				// 	operator: "in",
				// 	value: this.supid,
				// 	collectionName : "EvolvePO",
				// };
			}else{
				this.compCodeSearchObject.defultCondction[2] = {
					id: uniqueID(),
					field: "EvolveSupplier_ID",
					operator: "in",
					value: this.supid,
					collectionName : "EvolvePO",
				};
			}



		
		}

		if(this.docScanNo!="" && this.docScanNo!=null && this.docScanNo!=undefined){
			if (this.ispoline) {
				
				this.poLineSearchObj.value = this.docScanNo;
				// this.poLineSearchObj.disable = true;
			} else {
				this.compCodeSearchObject.value = this.docScanNo;
				// this.compCodeSearchObject.disable = true;
				
			}
			
		}
		this.reinit+=1;
	},
	methods: {

		// dataSubmit: async function () {
		// 	this.compCodeSearchObject.value = this.docScanNo;
		// 	let response = {docInputNo:this.docInputNo, docScanNo:this.docScanNo, index:this.dataIndex, supplier_ID:this.supplier_ID};
		// 	this.$emit('dataSubmit', response);
		// 	this.reinit += 1;
		// },

		dataSubmit: async function (isChange =false) {
			if (this.ispoline) {
				
				this.poLineSearchObj.value = this.docScanNo;
				this.reinit += 1;
				let response = {docInputNo:this.docInputNo, docScanNo:this.docScanNo, index:this.dataIndex, ponumber:this.poLineSearchObj.value, supplier_ID:this.supplier_ID, EvolvePODetails_Type:this.EvolvePODetails_Type, isChange : isChange};
				this.$emit('dataSubmit', response);
			} else {
				this.compCodeSearchObject.value = this.docScanNo;
				let response = {docInputNo:this.docInputNo, docScanNo:this.docScanNo, index:this.dataIndex, supplier_ID:this.supplier_ID, isChange : isChange};
				this.$emit('dataSubmit', response);
			}
		},
		onChangePoLine: async function (data) {
			if(data){
				this.supplier_ID = data.EvolveSupplier_ID;
				this.EvolvePODetails_Type = data.EvolvePODetails_Type;
				this.dataSubmit()
			}else{
				this.EvolvePODetails_Type = '';
				this.docScanNo = '';
				this.dataSubmit()
			}
			
		},

		onChangePo: async function (data, isChange =false) {
			console.log("data>>>>>>>>>>>>>>>>", data);
			if(data){
				this.supplier_ID = data.EvolveSupplier_ID;
				this.dataSubmit(isChange);
			}else{
				this.supplier_ID = '';
				this.dataSubmit(isChange)
			}
			
		},
	}
		
}
</script>
