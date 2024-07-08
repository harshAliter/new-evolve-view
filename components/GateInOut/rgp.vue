<template>
	<div class="uk-grid" data-uk-grid>
		<div class="uk-width-1-2@m">
			<div class="uk-grid" data-uk-grid>
				<div class="uk-width-1-2@m">
					<label
						for="table lable"
						class="evolve-input-lable"
						data-uk-tooltip="Challan Number"
					>	Challan Number :
					</label>
				</div>
				<div class="uk-width-1-2@m">
					<FieldSearch v-model="docScanNo" placeholder="Select Challan Number.." :searchobject="compCodeSearchObject" @rowClick="dataSubmit()" />
				</div>
			</div>
		</div>
    
		<div class="uk-width-1-2@m">
			<div class="uk-grid" data-uk-grid>
				<div class="uk-width-1-2@m">
					<label
						for="table lable"
						class="evolve-input-lable"
						data-uk-tooltip="Invoice No"
					>	Invoice No :
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
import { scHelpers } from "~/assets/js/utils";
const { uniqueID } = scHelpers;
export default {
	name: 'Po',
	components: {
		ScInput,
		FieldSearch: process.client ? () => import("~/components/cust/FieldSearch") : null,
		// Select2: process.client ? () => import("~/components/Select2") : null,
	},
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
		isinvdisable:{
			type:Boolean,
			default:false
		},

		gateList:{
			type:Array,
			default:() => []
		}
	},
	data:function (){
		return{
			compCodeSearchObject : {
				"table" : 'EvolveChallan',
				"value_field" : 'EvolveChallan_No',
				"display_field" : 'EvolveChallan_No',
				"value":"",
				"disable":false,
				defultCondction: [
					{
						id: uniqueID(),
						field: "EvolveChallan_Doc",
						operator: "in",
						value: 'RGP',
						collectionName: "EvolveChallan",
					},
					{
						id: uniqueID(),
						field: "EvolveChallan_Status",
						operator: "in",
						value: 'CONFIRMED',
						collectionName: "EvolveChallan",
					},
					{
						id: uniqueID(),
						field: "EvolveChallan_Status",
						operator: "in",
						value: 'PARTIALRECEIVED',
						collectionName: "EvolveChallan",
					},
					{
						id: uniqueID(),
						field: "EvolveUnit_ID",
						operator: "in",
						value: this.$store.state.auth.user.EvolveUnit_ID,
						collectionName: "EvolveChallan",
					},
				],
			},
			reinit:0,
		}
	
	},
	created: async function () {
		if(this.docScanNo!="" && this.docScanNo!=null && this.docScanNo!=undefined){
			this.compCodeSearchObject.value = this.docScanNo;
			// this.compCodeSearchObject.disable = true;
			this.reinit+=1;
		}
		// await this.getPurchaseOrderList();

	},
	methods: {

		dataSubmit: async function () {
			this.compCodeSearchObject.value = this.docScanNo;
			this.reinit += 1;
			let response = {docInputNo:this.docInputNo, docScanNo:this.docScanNo, index:this.dataIndex, challanNumber:this.compCodeSearchObject.value}
			console.log("response>>>>.", response)
			this.$emit('dataSubmit', response);
		},
	}
		
}
</script>
