<template>
	<div class="uk-grid" data-uk-grid>
		<div class="uk-width-1-2@m">
			<div class="uk-grid" data-uk-grid>
				<div class="uk-width-1-2@m">
					<label
						for="table lable"
						class="evolve-input-lable"
						data-uk-tooltip="Invoice"
					>	Invoice Number:
					</label>
				</div>
				<div class="uk-width-1-2@m">
					<FieldSearch :key="reinit"
						v-model="docScanNo"
						placeholder="Select Invoice Number"
						:searchobject="invoiceSearchObject"
						@rowClick="onChangeInvoiceNumber"
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
	name: 'INVOICE',
	components: {
		// ScInput,
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
			invoiceSearchObject : {
				"table" : 'EvolveInvoice',
				"value_field" : 'EvolveInvoice_Number',
				"display_field" : 'EvolveInvoice_Number',
				"value":"",
				"disable":false,
			},
			reinit:0,
		}
	
	},
	created: async function () {
		if(this.docScanNo!="" && this.docScanNo!=null && this.docScanNo!=undefined){
			this.invoiceSearchObject.value = this.docScanNo;
			this.reinit+=1;
		}
	},
	methods: {

		dataSubmit: async function () {
			this.invoiceSearchObject.value = this.docScanNo;
			this.reinit += 1;
			let response = {docScanNo:this.docScanNo, index:this.dataIndex, docInputNo:""};
			this.$emit('dataSubmit', response);
		},
		onChangeInvoiceNumber: async function (data) {
			if(data){
				this.dataSubmit()
			}else{
				this.dataSubmit()
			}
			
		},
	}
		
}
</script>
