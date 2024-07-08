<template>
	<div class="uk-grid" data-uk-grid>
		<div class="uk-width-1-2@m">
			<div class="uk-grid" data-uk-grid>
				<div class="uk-width-1-2@m">
					<label
						for="table lable"
						class="evolve-input-lable"
						data-uk-tooltip="Customer"
					> Customer :
					</label>
				</div>
				<div class="uk-width-1-2@m">
					<FieldSearch
						v-model="$v.docScanNo.$model"		
						:searchobject="customerSearchObj"
						placeholder="Select Customer"
						@rowClick="onChangeCustomer($event, true)"
						@change="onChangeCustomer($event, true)"
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
						data-uk-tooltip="Invoice Number"
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
	name: 'Customer',
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
		isinvdisable: {
			type: Boolean,
			default: false
		},
	},
	data: function () {
		return {
			customerSearchObj: {
				"table": 'EvolveCustomer',
				"value_field": '_id',
				"display_field": 'EvolveCustomer_Code',
				"value": "",
				"disable": false,
				defultCondction: [],
			},
			reinit: 0,
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
		if(this.docScanNo != "" && this.docScanNo != null && this.docScanNo != undefined){
			this.customerSearchObj.value = this.docScanNo;
		}

		this.reinit += 1;
	},
	methods: {
		dataSubmit: async function (isChange = false) {	
			this.customerSearchObj.value = this.docScanNo;
			this.reinit += 1;
			let response = {
				docInputNo: this.docInputNo, 
				docScanNo: this.docScanNo, 
				index: this.dataIndex, 
				isChange: isChange
			};
			this.$emit('dataSubmit', response);
		},

		onChangeCustomer: async function (data, isChange = false) {

			if(data){
				this.dataSubmit(isChange);
			}else{
				this.dataSubmit(isChange)
			}		
		},
	}
}
</script>
