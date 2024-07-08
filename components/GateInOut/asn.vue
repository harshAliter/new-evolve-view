<template>
	<div class="uk-grid" data-uk-grid>
		<div class="uk-width-1-2@m">
			<div class="uk-grid" data-uk-grid>
				<div class="uk-width-1-2@m">
					<label
						for="table lable"
						class="evolve-input-lable"
						data-uk-tooltip="ASN Number"
					> ASN Number :
					</label>
				</div>
				<div class="uk-width-1-2@m">
					<FieldSearch
						v-model="$v.docScanNo.$model"		
						:searchobject="asnSearchObj"
						placeholder="Select Asn Number"
						@rowClick="onChangeAsn($event, true)"
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
						data-uk-tooltip="Supplier Invoice Number"
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
						@blur="onChangeAsninvoice($event, true)"
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
	name: 'Asn',
	components: {
		ScInput,
		FieldSearch: process.client ? () => import("~/components/cust/FieldSearch") : null,
	},
	mixins: [validationMixin],
	props: {
		dataIndex: {
			type: Number,
			default: -1
		},
		docScanNo: {
			type: String,
			default: ""
		},
		docInputNo: {
			type: String,
			default: ""
		},
		asnNumber: {
			type: String,
			default: ''
		},
		supid: {
			type: String,
			default: ""
		},
		isinvdisable: {
			type: Boolean,
			default: false
		},
	},
	data: function () {
		return {
			asnSearchObj: {
				"table": 'EvolveAsn',
				"value_field": '_id',
				"display_field": 'EvolveAsn_No',
				"value": "",
				"disable": false,
				defultCondction: [
					{
						id: uniqueID(),
						field: "EvolveUnit_ID",
						operator: "in",
						value: this.$store.state.auth.user.EvolveUnit_ID,
						collectionName: "EvolveAsn",
					},
					{
						id: uniqueID(),
						field: "EvolveAsn_Status",
						operator: "in",
						value: "INTRANSIST",
						collectionName : "EvolveAsn",
					}],
			},
			reinit: 0,
			invoiceDetail : null,
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
		// if (this.supid != "" && this.supid != null && this.supid != undefined) {
		// 	this.asnSearchObj.defultCondction[0] = {
		// 		id: uniqueID(),
		// 		field: "EvolveSupplier_ID",
		// 		operator: "in",
		// 		value: this.supid,
		// 		collectionName : "EvolveSupplier",
		// 	}
		// }

		if(this.docScanNo != "" && this.docScanNo != null && this.docScanNo != undefined){
			this.asnSearchObj.value = this.docScanNo;
		}

		this.reinit += 1;
	},
	methods: {
		dataSubmit: async function (isChange = false) {	
			this.asnSearchObj.value = this.docScanNo;
			this.reinit += 1;
			let response = {
				docInputNo: this.docInputNo, 
				docScanNo: this.docScanNo, 
				index: this.dataIndex, 
				supplier_ID: this.supplier_ID,  
				asnNumber: this.asnNumber,
				invoiceDetail : this.invoiceDetail,
				isChange: isChange
			};
			this.$emit('dataSubmit', response);
		},

		onChangeAsn: async function (data, isChange = false) {
			if(data){
				this.supplier_ID = data.EvolveSupplier_ID;
				this.asnNumber = data.EvolveAsn_No;
				this.docInputNo = data.EvolveAsn_InvoiceNo;
				this.invoiceDetail = data.EvolveInvoiceDetail
				this.dataSubmit(isChange);
			}else{
				this.supplier_ID = '';
				this.asnNumber = '';
				this.docInputNo = '';
				this.invoiceDetail = null;
				this.dataSubmit(isChange)
			}		
		},
		onChangeAsninvoice: async function (isChange = false) {
			this.dataSubmit(isChange);		
		},
	}
}
</script>
