<template>
	<div class="uk-grid" data-uk-grid>
		<div class="uk-width-1-2@m">
			<div class="uk-grid" data-uk-grid>
				<div class="uk-width-1-2@m">
					<label
						for="table lable"
						class="evolve-input-lable"
						data-uk-tooltip="Invoice"
					>	EwayBill Number:
					</label>
				</div>
				<div class="uk-width-1-2@m">
					<FieldSearch :key="reinitEwayBill"
						v-model="docScanNo"
						placeholder="Select EwayBill Number"
						:searchobject="ewayBillSearchObject"
						:custompayload="{ 'EvolveInvoice_EwayBillNumber': docScanNo }"
						custom="/api/v3/eGateControl/GateInOut/getCustomEwayBill"
						@rowClick="onChangeEwayBill"
					/>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { scHelpers } from "~/assets/js/utils";
const { uniqueID } = scHelpers;
export default {
	name: 'EWAYBILLNO',
	components: {
		FieldSearch: process.client ? () => import("~/components/cust/FieldSearch") : null,
	},
	props: {
		dataIndex:{
			type: Number,
			default: -1
		},
		
		docScanNo:{
			type:String,
			default:""
		},
	},
	data:function (){
		return{
			ewayBillSearchObject : {
				"table" : 'EvolveInvoice',
				"value_field" : 'EvolveInvoice_EwayBillNumber',
				"display_field" : 'EvolveInvoice_EwayBillNumber',
				"value":"",
				"disable":false,
				defultCondction: [
					{
						id: uniqueID(),
						field: "EvolveInvoiceGSPDetails.EvolveInvoice_EwayBillNumber",
						operator: "ne",
						value: "ISBLANK",
						collectionName: "EvolveInvoice",
					},
				]
			},
			reinitEwayBill: 0,
		}
	
	},
	created: async function () {
		if(this.docScanNo!="" && this.docScanNo!=null && this.docScanNo!=undefined){
			this.ewayBillSearchObject.value = this.docScanNo;
			this.reinitEwayBill+=1;
		}
	},
	methods: {

		dataSubmit: async function () {
			try {
				this.ewayBillSearchObject.value = this.docScanNo;
				// this.reinitEwayBill += 1;
				let response = {docScanNo:this.ewayBillSearchObject.value, index:this.dataIndex, docInputNo:""};
				this.$emit('dataSubmit', response);
			} catch (error) {
				consoel.error('Error In dataSubmit', error.message)
			}
			
		},

		onChangeEwayBill: async function (data) {
			try {
				this.dataSubmit()
			} catch (error) {
				consoel.error('Error In onChangeEwayBill', error.message)
			}
			
		},
	}
		
}
</script>
