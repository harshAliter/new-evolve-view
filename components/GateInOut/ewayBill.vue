<template>
	<div class="uk-grid" data-uk-grid>
		<div class="uk-width-1-3@m">
			<div class="uk-grid" data-uk-grid>
				<div class="uk-width-1-2@m">
					EwayBill Number : 
				</div>
				<div class="uk-width-1-2@m">
					<ScInput
						v-model="docScanNo"
						mode="outline"
						name="docScanNo"
						placeholder="EwayBill Number"
						@blur="dataSubmit()"
					></ScInput>
				</div>
			</div>
		</div>
		<div class="uk-width-1-3@m">
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
		<div class="uk-width-1-3@m">
			<div class="uk-grid" data-uk-grid>
				<div class="uk-width-1-3@m"></div>
			
				<div class="uk-width-1-2@m">
					<button
						:disabled="islinedata"
						class="sc-button sc-button-primary sc-button-mini waves-effect sc-button-mini waves-button waves-light"
						@click="getprevueData()"
					>
						<i class="mdi mdi-newspaper"></i>
					</button>
				</div>
			</div>
		</div>
		
		<div id="FormatDataModalEwayBill"
			ref="m"
			class="uk-modal"
			data-uk-modal
			bg-close="false"
		>
			<div class="uk-modal-dialog">
				<form class="sc-padding">
					<button class="uk-modal-close-default" type="button" data-uk-close></button>
					<div class="uk-modal-header">
						<h2 class="uk-modal-title">
							Line Details
						</h2>
					</div>
					<div class="uk-modal-body">
						<div>
							{{ linedata }}
						</div>
						<div class="uk-modal-footer uk-text-right">
							<button class="sc-button sc-button-flat sc-button-flat-danger uk-modal-close" type="button">
								cancel
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>
<script>
import ScInput from "~/components/Input";
export default {
	name: 'EwayBill',
	components: {
		ScInput,
		
	},
	props: {
		docScanNo:{
			type:String,
			default:""
		},
		linedata:{
			type:Object,
			default:() => {}
		},
		dataIndex:{
			type: Number,
			default: -1
		},
		islinedata:{
			type:Boolean,
			default: true
		},
		docInputNo:{
			type:String,
			default:""
		}
	},

	computed: {
		
	},
	beforeDestroy: async function () {
		$("#FormatDataModalEwayBill").remove();
	},
	methods: {
		dataSubmit: async function () {
			
			this.linedata = {"name":"Harsh Nagar"};
			this.islinedata = false;
			let eWayBillDataResponse = {docInputNo:this.docInputNo, docScanNo:this.docScanNo, index:this.dataIndex};
			this.$emit('dataSubmit', eWayBillDataResponse);
		},
		
		getprevueData: async function (){
			UIkit.modal("#FormatDataModalEwayBill").show();
		}
	}
}
</script>

