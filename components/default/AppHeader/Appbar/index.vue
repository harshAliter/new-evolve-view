<template>
	<div ref="contextRoot" class="nav-menu-item">
		<!-- Icon group -->

		<div class="icon-group">
			<div id="app-active-app-selector-button" tag="a" class="active-app hide-mobile">
				<i :data-app-icon="activeApp.icon" :class="activeApp.icon" style="color: #FFF;"></i>
				<!-- activeApp.EvolveApp_Name || -->
				<!-- <app-icon name="widgets" color="inherit" size="20px" />  -->

				<span class="label">{{ activeApp.title }}</span>
			</div>
			<!-- </nuxt-link> -->

			<app-icon-button id="app-app-selector-button"
				icon="apps"
				tooltip="Apps" 
				color="#5a87c5"
				:fill="viewContext"
				:active="viewContext"
				@click="handleIconAction"
			/>
		</div>


		<app-appbar-context v-if="viewContext" :apps="menuAppList" @select="handleAppSelection" />
	</div>
</template>
<style scoped>
 
#app-app-selector-button i {
   color: #5a87c5 !important;
}
a.app_list_menu i {
    color: aquamarine !important;
}
</style>
<script>
import AppbarContext from "./Context";
import SkippableContext from "~/mixins/skippable-context";

export default {
	name: "AppHeaderAppbar",

	components: {
		"app-appbar-context": AppbarContext,
	},
	mixins: [SkippableContext],

	computed: {
		activeApp() {
			return useStore().activeApp;
		},
		menuAppList() {
			return useStore().menuAppList;
		},

	},

	methods: {
		handleAppSelection () {
			// Clear menu search input
			const searchInputElement = document.getElementById(
				"app-sidebar-menu-search-bar"
			);
			if (searchInputElement instanceof Element) {
				searchInputElement.value = "";
			}

			this.hideContext();
		},
	},
};
</script>

<style lang="scss" scoped>
@import "../index.scss";

@media screen and (min-width: 767px) {
	.icon-group {
		display: flex;
		flex-direction: row;
		align-items: center;
		border-width: 1px;
		border-style: solid;
		border-color: $stroke-1;
		background-color: $bg-1;
		// height: 35px;
		// height: 32.2px;
		height: 28.2px;
		border-radius: 50px;
		margin-right: 1px;

		.active-app {
			display: flex;
			flex-direction: row;
			align-items: center;
			// height: 28px;
			// height: 26px;
			height: 23px;
			border-radius: inherit;
			margin-left: 8px;
			padding-left: 13px;
			padding-right: 16px;
			background-color: $primary;
			color: $primary-fr  !important;
			transition: background-color 120ms linear;

			@media screen and (max-width: 767px) {
				display: none;
			}

			.mdi::before {
				// font-size: 14px;
				font-size: 12.4px;
				margin-top: -2px;
			}

			.label {
				margin-left: 3px;
				// font-size: 11px;
				font-size: 9px;
				font-family: sans-serif;

				@media screen and (max-width: 1016px) {
					display: none;
				}
			}

			&:hover {
				background-color: $primary-darken;
			}
		}

		.app-icon-button {
			width: 35px !important;
			height: 35px !important;
		}
	}

	@include use-dark {
		.icon-group {
			border-color: $stroke-dark-2;
			background-color: $bg-dark-3;
		}
	}
}
</style>