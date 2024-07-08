<template>
	<transition name="context">
		<div id="appbar" class="context custom-bg">
			<div class="context-container">
				<div class="title-bar">
					<div class="context-title">
						Evolve Apps
					</div>

					<!-- <app-secondary-loader color="light" /> -->
				</div>

				<hr>

				<app-list
					v-if="apps.length > 0" 
					:list="apps" 
				/>

				<app-process-result 
					v-else
					:wait="loadingState"
					color="light"
					icon="sentiment_dissatisfied"
					title="No apps"
					message="Can't get latest apps"
					height="200px"
				/>
			</div>
		</div>
	</transition>
</template>
<style scoped>
#appbar{
	background : #5a87c5;
}
</style>
<script>
import Apps from './Apps.vue';

export default {
	name: 'Appbar',

	components: {
		'app-list': Apps
	},
	props: {
		apps: {
			type: Array,
			default: () => [],
		}
	},
	data () {
		return {
			appList: [],
			loadingState: true
		}
	},
	created () {
		this.loadingState = false;
		// this
		// 	.getAppList()
		// 	.finally(() => {
		// 		this.loadingState = false;
		// 	});
	},
	methods: {

		/**
		 * Fetch app list from API
		 */
		async getAppList () {
			// const response = await this
			// 	.$axios
			// 	.$get('/api/v1/evolve/appMenuList')
			// 	.catch ((error) => {
			// 		alert("Problem with connecting to server!");
			// 	});

			// if (response.statusCode === 200) {
			// 	this.appList = response.result;
			// }
			// else {
			// 	alert("Error while getting Evolve Apps");
			// }
		},

		/**
		 * Handle app selection
		 * @param {MouseEvent} $event
		 */
		handleAppClick (code) {
			console.log("Apps>>>>>>>>>>>..", $event);
			this.$emit('select', $event);
		} 
	}
}
</script>
