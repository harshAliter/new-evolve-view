<template>

	<app-modal 
		title="Choose Language" 
		width="650px" 
		height="490px"
		:backlayer="false"
		@close="handleCloseModal"
		@blur="handleCloseModal"
		@escape="handleCloseModal"
	>

		<div v-if="languages.length > 0" class="language-list">
			<a 
				v-for="language in languages" 
				:key="language.key" 
				:data-language-key="language.key"
				class="language"
				@click="languageClick(language)"
			>

				<app-lazy-image 
					:src="language.EvolveLanguage_Directory" 
					:alt="language.EvolveLanguage_Title"
					width="34px"
					height="34px"
				/>  
				<p class="label" :style="(userLanguage_ID == language.EvolveLanguage_ID) ? '    font-weight: bold;' : ''">{{ language.EvolveLanguage_Title }}</p>
			</a>
		</div>
		<div v-else>
			<app-process-result 
				icon="translate"
				title="No languages"
				message="Only uses default language"
				height="400px"
			/>
		</div>
	</app-modal> 
</template>

<script>
export default {
	name: 'AppHeaderTranslateContext',

	props: {
		languages: {
			type: Array,
			default: function () {
				return [];
			}
		}
	},
    data () {
		return {
			userLanguage_ID : useStore().user.EvolveLanguage_ID
		 
		}
	},
	methods: {
		handleCloseModal ($event) { 
			this.$emit('close', $event);
		},
		emits: ['close'],
	 
		languageClick: async function (data) {
			// this.$auth.$storage.setLocalStorage(
			// 	"EvolveLanguage_ID",
			// 	EvolveLanguage_ID,
			// 	true
			// );
			// this.$auth.$storage.setLocalStorage(
			// 	"EvolveLanguage_Code",
			// 	EvolveLanguage_Code,
			// 	true
			// );
			// this.$auth.$storage.setLocalStorage(
			// 	"EvolveLanguage_Title",
			// 	EvolveLanguage_Title,
			// 	true
			// );
			let changeUserLang =await this.$axios.$post('/api/v1/evolve/changeUserLang', { liD: data.EvolveLanguage_ID }).catch(e => { 
			});
			console.log("changeUserLang>>>", changeUserLang);
			// this.selectedLanguage.EvolveLanguage_Title = EvolveLanguage_Title;
			//window.location.reload()
			this.$eventBus.$emit("onChangeLanguage", data);
			this.userLanguage_ID = data.EvolveLanguage_ID;
		},

	},
}
</script>

<style lang="scss" scoped>
@import "../index.scss";

.language-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    height: inherit;
    z-index: 600;

    .language {
        display: flex;
        align-items: center;
        height: 25px;
        margin: 4px;
        padding: 12px;
        border-radius: 8px;
        transition: background-color 50ms linear;

        .label {
            margin-left: 12px;
        }

        &:hover {
            background-color: $bg-1;
        }
    }
}

@include use-dark {
    .language-list {
        .language {
            .label {
                color: $fr-dark-2;
            }

            &:hover {
                background-color: $bg-dark-3;
            }
        }
    }
}
</style>