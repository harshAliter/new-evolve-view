<template>
	<div class="uk-grid" data-uk-grid>
		<div class="uk-width-1-2@m">
			<div class="uk-grid" data-uk-grid>
				<div class="uk-width-1-2@m">
					Invoice No
				</div>
				<div class="uk-width-1-2@m">
					<ScInput
						v-model="docInputNo"
						mode="outline"
						name="docInputNo"
						placeholder="Invoice No"
						@blur="dataSubmit()"
					></ScInput>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import ScInput from "~/components/Input";
export default {
	name: 'Po',
	components: {
		ScInput,
		// FieldSearch: process.client ? () => import("~/components/cust/FieldSearch") : null,
		// Select2: process.client ? () => import("~/components/Select2") : null,
	},
	props: {
		dataIndex:{
			type: Number,
			default: -1
		},
		
		docInputNo:{
			type:String,
			default:""
		},

		gateList:{
			type:Array,
			default:() => []
		}
	},
	data:function (){
		return{
			compCodeSearchObject : {
				"table" : 'EvolvePO',
				"value_field" : '_id',
				"display_field" : 'EvolvePO_Number'
			}
		}
	
	},
	created: async function () {
		// await this.getPurchaseOrderList();

	},
	methods: {

		dataSubmit: async function () {
		
			let response = {docInputNo:this.docInputNo, index:this.dataIndex};
			this.$emit('dataSubmit', response);
		},
	}
		
}
</script>
