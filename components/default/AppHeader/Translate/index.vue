<template>
	<div class="nav-menu-item">
		<!-- Icon -->
		
		<app-icon-button 
			id="app-language-select-button"
			icon="translate" 
			tooltip="Languages" 
			:fill="useActive(viewContext)"
			:active="viewContext"
			@click="showContext"
		/>

		<!-- Context -->
	
		<app-header-translate-context 
			v-if="viewContext"
			:languages="lanaguages"
			@close="hideContext"
		/>
	</div>
</template>

<script>
 
import TranslateContext from './Context';
import SkippableContext from '~/mixins/skippable-context';
import inPng from '@/assets/icons/flags/countries/in.png';

export default {
	name: 'AppHeaderTranslate',
	components: {
		'app-header-translate-context': TranslateContext
	},
	mixins: [SkippableContext],

	data () {
		return {
			selectedCountry: {
				EvolveCountry_ID: 1,
				EvolveCountry_Name: "ind",
				EvolveCountry_Flag: inPng
			},
			selectedLanguage: {
				EvolveLanguage_ID: 1,
				EvolveLanguage_Code: "en",
				EvolveLanguage_Title: "English",
			},

			countries: [
				{
					EvolveCountry_ID: 1,
					EvolveCountry_Name: "ind",
					EvolveCountry_Flag: inPng,
				},
			],
			lanaguages: [
				// {
				// 	EvolveCountry_ID: 1,
				// 	EvolveLanguage_Code: "en",
				// 	EvolveLanguage_Title: "English",
				// 	EvolveLanguage_Directory : inPng
				// } 
			],
		 
		}
	},
	computed: {
 
 
	},
	created: async function () {
		try {
		
			let lanaguages = await this.$axios
				.$post("/api/v1/evolve/languages") 
				.catch((e) => {});
			if (lanaguages) {
				let languageList = [];
				let d = await import("~/assets/icons/flags/countries/in.png");
			
				for (let i = 0; i < lanaguages?.result?.length; i++) {
					languageList.push({
						EvolveLanguage_ID: lanaguages.result[i]._id,
						EvolveCountry_ID: 1,
						EvolveLanguage_Code: lanaguages.result[i].EvolveLanguage_Code,
						EvolveLanguage_Title: lanaguages.result[i].EvolveLanguage_Description,
						EvolveLanguage_Directory: (lanaguages.result[i].EvolveLanguage_Directory != '' && lanaguages.result[i].EvolveLanguage_Directory != undefined) ? await import(`@/assets/icons/flags/countries/${lanaguages.result[i].EvolveLanguage_Directory}.png`).default : d.default,
					});
				}
				this.lanaguages = languageList;
			}
		} catch (error) {
			console.log(error);
		}
	},
	methods: {
	 
		handleUnitSwitchAction (event) {
			// Change Unit 
			console.log("######>>>>>", event.target.value);

			//this.$store.dispatch('setActiveTab', event.target.value);
		},

		useActive (data) {
			if (data === true) {
				return 'primary';
			}
			return undefined;
		}
	}
}
</script>
