<template>
	<div class="uk-grid uk-grid-margin uk-first-column uk-width-1-1@m uk-grid-small">
		<div v-for="(amend , i) in amendmentDataArr" :key="i" class="uk-width-1-2@m">
			<ul class="uk-accordion-outline uk-margin-top" data-uk-accordion>
				<li>
					<h3 class="uk-accordion-title">
						Revision No.{{ amendmentDataArr.length - i }}
					</h3>
					<div class="uk-accordion-content">
						<table class="uk-table uk-table-striped">
							<thead>
								<tr>
									<th>Label</th>
									<th>Before</th>
									<th>After</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="([label , val] , j) in Object.entries(amend.EvolveAmendmentField)" :key="j">
									<td>{{ label }}</td>
									<td>{{ val.oldData }}</td>
									<td>{{ val.newData }}</td>
								</tr>
							</tbody>
						</table>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>


<script>
export default {
	name: "AmendmentHistory",
	components: {},
	props: {
		primaryId : {
			type: String,
			default: null
		},
		table: {
			type: String,
			default: null
		}
	},
	data () {
		return {
			amendmentDataArr : []
		}
	},
	created: async function () {
		await this.onClickAmendmentTable();
	},
	methods: {
		onClickAmendmentTable : async function (){
			try {
				if (this.primaryId && this.table) {
					// this.loaderShow();
					let datas = await this.$axios
						.$post("/api/v3/evolve/amendment/amendmentHistory", {primaryId:this.primaryId, table : this.table})
						.catch((e) => {
							console.error("Error Come In Catch", e.message);
							this.$store.dispatch('evolveNotification', {code: 117});
						});
					if (datas.statusCode === 200) {
						this.amendmentDataArr = datas.result;
					}
					// this.loaderHide();
				}else{
					this.amendmentDataArr = [];
				}
			} catch (error) {
				this.loaderHide();
				console.error("Error while on ClickAmendmentTable>>>", error.message);
			}
		}
	}
}
</script>