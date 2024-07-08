<template>
	<div class="uk-grid" data-uk-grid>
		<div class="uk-width-1-2@m">
			<div class="uk-grid" data-uk-grid>
				<div class="uk-width-1-2@m">
					<label
						for="table lable"
						class="evolve-input-lable"
						data-uk-tooltip="Challan Number"
					>	SubCon :
					</label>
				</div>
				<div class="uk-width-1-2@m">
					<FieldSearch :key="reinit"
						v-model="docScanNo"
						placeholder="Select SubCon"
						:searchobject="compCodeSearchObject"
						@rowClick="onChangeSubCon"
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
	name: 'SUBCON',
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
		supid:{
			type:String,
			default:""
		},
	},
	data:function (){
		return{
			compCodeSearchObject : {
				"table" : 'EvolveSubConShipment',
				"value_field" : 'EvolveSubConShipment_Number',
				"display_field" : 'EvolveSubConShipment_Number',
				"value":"",
				"disable":false,
			},
			reinit:0,
			supplier_ID:null
		}
	
	},
	created: async function () {
		if(this.docScanNo!="" && this.docScanNo!=null && this.docScanNo!=undefined){
			this.compCodeSearchObject.value = this.docScanNo;
			this.reinit+=1;
		}
	},
	methods: {

		dataSubmit: async function () {
			this.compCodeSearchObject.value = this.docScanNo;
			this.reinit += 1;
			let response = {docScanNo:this.docScanNo, index:this.dataIndex, supplier_ID:this.supplier_ID, docInputNo:this.docScanNo};
			this.$emit('dataSubmit', response);
		},
		onChangeSubCon: async function (data) {
			if(data){
				this.supplier_ID = data.EvolveSupplier_ID;
				this.dataSubmit()
			}else{
				this.supplier_ID = '';
				this.dataSubmit()
			}
			
		},
	}
		
}
</script>
