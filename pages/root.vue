<template>
	<evolve-module>
		<evolve-module-content>
		
		</evolve-module-content>
		<div v-if="!activeTab" id="root-default">
			<p class="root-title">
				{{ translate.welcome_eap }} <small>({{ translate.eap_version }})</small>
			</p>
			<p class="root-title-details">
				{{ translate.iot_enable_platform }}
			</p>
			{{ $config.public.baseURL }}
		</div>
	</evolve-module>
</template>

<script>
 

export default {
	name: 'EvolveAutomationPlatform',
	layout: 'default',
	data () {
		return {
			EvolveMenu_Id :this.$route.query.EvolveMenu_Id,		
			translate : {
				welcome_eap : "Welcome to Evolve Automation Platform",
				eap_version : "V3.0.0",
				iot_enable_platform : "IOT Enabled Automation Platform"
			},
		}
	},
	 computed: {
		 
		tabs(){
			return useStore().tabs;
		},
		activeTab() {
			return useStore().activeTab
		}
	},
	watch: {
		tabs (newTabs) {
		}
	},
	methods : {
		/** Default Method For All Pages : Start Here */

	}
}
</script>
<style lang="scss" scoped>
#root-default {
    background: white;
    padding: 5%;
    height: 100%;
    text-align: center;
}
 
</style>