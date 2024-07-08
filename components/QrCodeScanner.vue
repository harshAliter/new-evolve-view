<template>
	<div>
		<div :id="'qrModal'+uniqueId" class="uk-modal-full" uk-modal="stack: true" data-uk-modal>
			<div class="uk-modal-dialog">
				<button class="uk-modal-close-full uk-close-large" type="button" data-uk-close @click="reload()"></button>

				<div class="uk-modal-body">
					<div :id="'qrScannerModal'+uniqueId">
						<qrcode-stream v-if="!destroyed" class="qr-scanner" @init="onInit" @decode="onDecode" />
					</div>
				</div>
			</div>
		</div>
		<div class="uk-text-center">
			<button class=" sc-button sc-button-primary waves-button waves-light sc-button-small" @click="onScan">
				<i class="mdi mdi-qrcode-scan"></i>
			</button>
		</div>
	</div>
</template>
<style scoped>
.qr-scanner {
    width: 93vw;
    height: 85vh;
    padding-bottom: 10px;
    border-radius: 15px;
}
</style>
<script>
import { scHelpers } from "~/assets/js/utils";
const { uniqueID } = scHelpers;

export default {
	components: {
      

	},

	data () {
		return {
			reloadCam: 0,
			destroyed: true,
			uniqueId: uniqueID()

		}
	},

	beforeDestroy () {
		$("#qrModal"+this.uniqueId).remove();
	},
	layout: "home",
	methods: {
		onDecode (e) {
			this.$emit("input", e);
			this.reload();

		},

		async onScan () {
			try {
				UIkit.modal("#qrModal"+this.uniqueId).show();

				await this.enableCam();
			} catch (error) {

			}
		},
		// onclick : function async (){
		// 	UIkit.modal.confirm("Are You Sure Want To Delete..!")
		// },
		async onInit (promise) {
			try {
				await promise
			} catch (error) {
				console.error(error)
			} finally {

			}
		},

		async reload () {
			this.destroyed = true
			await this.$nextTick()
			// this.destroyed = false
			UIkit.modal("#qrModal"+this.uniqueId).hide();
		},

		async enableCam () {
			this.destroyed = true
			await this.$nextTick()
			this.destroyed = false
		}


	}
}
</script>