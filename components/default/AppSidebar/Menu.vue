<template>
	<nav id="hm" class="menu">
		
		<div v-for="(item, itemIndex) in list" :key="item.id" class="menu-item " :data-menu-item-index="itemIndex">
			
			<div :class="{ 'menu-item-content': true, 'active': null,'hm-item':true }"
				aria-label="menu-item"
				:data-menu-item-url="item.page"
				:data-menu-item-id="item.id"
				:data-active="isActive(item.page)"
				:style="(activeapp.code == 'NOCODE' ? 'display: block;' : (activeapp.code == item.code ? 'display: block;' : 'display: none;'))"
				@click="toggleSubmenu(item.id, item.EvolveMenu_Id, item)"
			>
				<i :class="item.icon" :title="item.title" aria-label="menu-item"></i>
				<span :style="(collapsed != undefined && collapsed != 0) ? 'display:none; ' : ''"
					class="label"
					aria-label="menu-item"
				>{{ item.title }}</span>

				<div v-if="(item.submenu.length > 0)"
					:style="(collapsed != undefined && collapsed != 0) ? 'display:none; ' : ''"
					class="dropdown-toggler"
					:data-menu-item-id="item.id"
					aria-label="submenu-trigger"
				>
					<app-icon-button aria-label="submenu-trigger"
						icon="expand_more"
						size="small"
						:data-menu-item-id="item.id"
					/>
				</div>
			</div>

			<div :style="(collapsed != undefined && collapsed != 0) ? 'display: none;' : ''"
				class="menu-item menu-sub-item"
				aria-level="1"
				:data-submenu-id="item.id"
				:class="(selectedAppCode == 0 ? '' : (selectedAppCode == item.code ? 'collapsed' : ''))"
			>
				<template v-for="(submenuitem, submenuitemIndex) in item.submenu" :key="submenuitemIndex">
					<div
						class="menu-item-content menu-sub-item-content"
						aria-label="menu-item"	
						:data-menu-item-index="submenuitemIndex"
						:data-menu-item-id="submenuitem.id"
						@click="handleClick(submenuitem.title, submenuitem.page, submenuitem.EvolveMenu_Id)"
					>
						<i :class="submenuitem.icon" aria-label="menu-item"></i>
						<span class="label" aria-label="menu-item">{{ submenuitem.title }}</span>

						<div v-if="Array.isArray(submenuitem.submenu) && submenuitem.submenu.length > 0"
							class="dropdown-toggler"
							:data-menu-item-id="submenuitem.id"
							aria-label="submenu-trigger"
							@click="toggleSubmenu(submenuitem.id, submenuitem.EvolveMenu_Id)"
						>
							<app-icon-button aria-label="submenu-trigger"
								icon="expand_more"
								size="small"
								:data-menu-item-id="submenuitem.id"
							/>
						</div>
					</div>

					<div v-if="submenuitem.submenu"
						:key="submenuitemIndex + 'menu'"
						class="menu-item menu-sub-item"
						aria-level="2"
						:data-submenu-id="submenuitem.id"
					>
						<div v-for="(submenuitem1, submenuitem1Index) in submenuitem.submenu"
							:key="submenuitem1.id"
							class="menu-item-content menu-sub-item-content"
							aria-label="menu-item"
							:data-menu-item-id="submenuitem1.id"
							:data-menu-item-index="submenuitem1Index"
							@click="handleClick(submenuitem1.title, submenuitem1.page, submenuitem1.EvolveMenu_Id)"
						>
							<i :class="submenuitem1.icon" aria-label="menu-item"></i>
							<span class="submenu-label" aria-label="menu-item">{{ submenuitem1.title }}</span>
						</div>
					</div>
				</template>
			</div>
		</div>
	</nav>
</template>

<script>
export default {
	name: 'AppSidebarMenu',

	props: {
		list: {
			type: Array,
			default: function () {
				return []
			}
		},
		collapsed: {
			type: Boolean,
			default: false
		},
		activeapp: {
			type: Object,
			default: () => ({})
		},
	},
	data () {
		return {
			selectedAppCode: 0,
			dataWidth: 0,
		}
	},
	mounted () {
		// this.$eventBus.$on('onAppClick', (data) =>{
		// 	console.log("onAppClick Changed.....", data)

		// 	this.selectedAppCode = data.CODE;





		// });
	},
	created: async function (){
		if (process.browser) {
			this.dataWidth = await window.innerWidth;
			window.addEventListener('resize', this.onResize);
		}
		
	},

	methods: {
		isActive (val) {
				if (process.client) {
					const path = this.$route.path;
				return (path === val) == false ? null : true;
			}
			return undefined;
		},
		handleClick (title, url, id) {

			if(!url.startsWith("#")){

				useStore().addNewTab ({
					title, url,
					params: {
						EvolveMenu_Id: id,
						pageTitle : title
					}
				});

				/**  Start : EvolveV3TA */
				// let params = {
				// 	EvolveMenu_Id: id
				// };
				// if(url.includes('?ID=')){
				// 	let pID = url.split('?ID=')[1];
				//  	params =  {
				// 		EvolveMenu_Id: id,
				// 		ID : pID
				// 	};					 
				// }
				// this.$store.dispatch('addNewTab', {
				// 	title, url,
				// 	params:params
				// });
				/**  Start : EvolveV3TAB  */
			}
		},
		onResize () {
			this.dataWidth = window.innerWidth
		},
		toggleSubmenu (id, EvolveMenu_Id, item) {

			if (typeof item === 'object') {
				const isQuery = item._isQuery;

				if (isQuery) {
					const title = item.title;
					const url = item.page;

					this.handleClick(title, url, EvolveMenu_Id);
				}
			}
			 
			const togglerElement = document.querySelector(`.dropdown-toggler[data-menu-item-id='${id}']`);
			const submenuElement = document.querySelector(`[data-submenu-id='${id}']`);


			if (togglerElement) {
				togglerElement.classList.toggle('rotate');
			}
			if (submenuElement) {
				submenuElement.classList.toggle('collapsed');
			}
		}
	},

}
</script>

<style lang="scss">
@import "./index.scss";
.selected{
	background-color: #5a7ec547;
	border-top-right-radius: 25px;
	border-bottom-right-radius: 25px;
}
.menu {
	@extend .regular-scroll;
	display: flex;
	flex-direction: column;
	overflow: auto;
	//margin-top: -17px;
	height: auto;
	max-height: 210px;

	.menu-item {
		display: flex;
		flex-direction: column;

		.menu-item-content {
			position: relative;
			display: flex;
			flex-direction: row;
			align-items: center;
			// padding-left: 12px;
			padding-left: 8px;
			padding-right: 1rem;
			// min-height: 35px;
			// min-height: 30px;
			min-height: 25px;
			margin-right: 10px;
			border-top-right-radius: 25px;
			border-bottom-right-radius: 25px;
			color: $fr-4;
			cursor: pointer;
			transition: min-width 120ms ease,
				min-height 120ms ease,
				padding 80ms ease,
				background-color 50ms linear;

			.icon,
			.mdi {
				padding-left: 2px;
				padding-right: 4px;
			}

			.icon {
				font-size: 18px;
			}

			.mdi::before {
				// font-size: 18px;
				font-family: 15px;
			}

			.label {
				// font-size: 13px;
				font-size: 10px;
				font-family: sans-serif;
			}

			.dropdown-toggler {
				position: absolute;
				padding-left: 0;
				padding-right: 0;
				right: 2px;
				top: 50%;
				transform: translateY(-50%);

				.app-icon-button {
					i.material-icons {
						display: inline;
						color: rgb(197, 197, 197) !important;
					}

					transform: rotate(0) !important;
				}

				&.rotate .app-icon-button {
					transform: rotate(180deg) !important;
				}
			}


			&[data-active] {
				background-color: $primary-lighten;
				color: $primary;
			}

			&:hover {
				background-color: $gray-200;
			}

		}

		.submenu,
		.menu-sub-item {
			display: none;
			margin-top: 0px;
			margin-bottom: 0px;
			// font-size: 12px;
			font-size: 9px;
			font-family: sans-serif;
			padding-left: 15px;
			cursor: pointer;
			text-transform: capitalize;

			&.collapsed {
				display: block;
			}

			.mdi::before {
				font-size: 14px;
			}

			.submenu-item {
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: flex-start;
				margin-left: 2rem;

				.mdi {
					padding-left: 0px;
					padding-right: 5px;
				}

				.icon {
					font-size: 20px;
				}

				.mdi::before {
					font-size: 13px;
				}

				.submenu-label {
					font-size: 14px;
					font-family: sans-serif;
					text-transform: capitalize;
				}
			}
		}
	}

	&[aria-collapsed] {
		display: none;
		align-items: center;

		.menu-sub-item {
			display: none;

			&.collapsed {
				display: none;
			}
		}


		.menu-item {
			.menu-item-content {
				border-radius: 50px;
				padding-left: 0;
				padding-right: 0;
				margin-right: 0;
				min-width: 45px;
				min-height: 20px;
				flex-direction: column;
				align-items: center;
				justify-content: center;

				.icon,
				.mdi {
					padding: 0;
				}

				.mdi::before {
					padding: 0;
					vertical-align: middle;
				}

				.label {
					display: none;
				}

				.dropdown-toggler {
					display: none;
				}
			}

			.submenu {
				display: none;
			}
		}
	}
}

@include use-dark {
	.menu {
		.menu-item {
			.menu-item-content {
				color: $fr-dark-4;

				&[data-active] {
					background-color: $bg-dark-3;
					color: $fr-dark;
				}

				&:hover {
					background-color: $bg-dark-2;
				}
			}
		}
	}
}

#sc-sidebar-main:hover .menu-item .menu-item-content .label,
#sc-sidebar-main:hover .dropdown-toggler {
	display: initial !important;
}

#sc-sidebar-main:hover .menu-item.menu-sub-item.collapsed {
	display: block !important;
}

@media (max-width:991px) {

	.menu-item .menu-item-content .label,
	.dropdown-toggler {
		display: initial !important;
	}

	.menu-item.menu-sub-item {
		opacity: 1 !important;
	}
}
</style>