<template>
	<div class="uk-grid" data-uk-grid>
		<div class="uk-width-1-2@m">
			<div class="uk-grid" data-uk-grid>
				<div class="uk-width-1-2@m">
					<label
						for="table lable"
						class="evolve-input-lable"
						data-uk-tooltip="Purchase Order"
					> DO Number :
					</label>
				</div>
		
				<div class="uk-width-1-2@m">
					<FieldSearch :key="reinit"
						v-model="$v.docScanNo.$model"
						placeholder="Select Do"
						:searchobject="compCodeSearchObject"
						:errorclass="$v.docScanNo.$error"
						@rowClick="onChangeDo"
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
	name: 'Do',
	components: {
		ScInput,
		FieldSearch: process.client ? () => import("~/components/cust/FieldSearch") : null,
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
		isinvdisable:{
			type:Boolean,
			default:false
		},
	},
	data:function (){
		return{
			compCodeSearchObject : {
				"table" : 'EvolveDOTransition',
				"value_field" : 'EvolveDO_Number',
				"display_field" : 'EvolveDO_Number',
				"value":"",
				"disable":false,
				"defultCondction":[
					{
						id: uniqueID(),
						field: "EvolveDO_ShipTo",
						operator: "in",	
						value: this.$auth.$state.user.EvolveUnit_ID,
						collectionName : "EvolveDO",
					},
					{
						id: uniqueID(),
						field: "EvolveDOTransition_Status",
						operator: "in",
						value: "INTRANSIT",
						collectionName : "EvolveDOTransition",
					}, 
					
				 ]
				// ]
			},
			
			reinit:0,
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
		if(this.docScanNo!="" && this.docScanNo!=null && this.docScanNo!=undefined){
			this.compCodeSearchObject.value = this.docScanNo;
			// this.compCodeSearchObject.disable = true;
			this.reinit+=1;
		}
		
	},
	methods: {
		dataSubmit: async function () {
			this.compCodeSearchObject.value = this.docScanNo;
			let response = {docInputNo:this.docInputNo, docScanNo:this.docScanNo, index:this.dataIndex};
			this.$emit('dataSubmit', response);
			this.reinit += 1;
		},

		onChangeDo: async function (data) {  
			// this.compCodeSearchObject.value = this.docScanNo
			this.dataSubmit()
		},
	}
		
}
</script>
