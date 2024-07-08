<template>

	<aside 
		id="sc-sidebar-main" 
		ref="appSidebarRoot"
		:aria-collapsed="(!collapsedSidebar == false ? null : true)"
		class="sc-sidebar-info-fixed"
		:class="'development-sidebar'"
	>

		<div class="fixed-sector">
			<!-- App sidebar search -->
			<app-sidebar-search 
				v-show="collapsedSidebar" 
				@searchinput="handleMenuSearch"
			/>
		</div>
		<!-- App sidebar toggler -->
		<app-sidebar-toggler 
			:collapsed="collapsedSidebar" 
			@toggle="handleToggleState"
		/>  

		<!-- App sidebar menu -->
		
		<app-sidebar-menu 
			:list="menu" 
			:activeapp="activeApp"
			:collapsed="!collapsedSidebar"
		/>

		<!-- My Favourite -->
		<my-favourite :collapsed="!collapsedSidebar" /> 
	</aside>
</template>

<script>
/**
 * @typedef SidebarMenuItem 
 * @property {string} key - Item key
 * @property {string} icon - Icon name
 * @property {string} label - Item label
 * @property {string} url - Item url
 * @property {boolean} [active] - Active state
 */
import Menu from './Menu.vue';
import SearchBar from './SearchBar.vue';
import Toggler from './Toggler.vue';
import MyFavourite from './MyFavourite.vue';

export default {
	name: 'AppSidebar',

	components: {
		'app-sidebar-menu': Menu,
		'app-sidebar-search': SearchBar,
		'app-sidebar-toggler': Toggler,
		'my-favourite':MyFavourite
	},

	props: {
		'enableMenuSearch': {
			type: Boolean,
			default: false
		},
	},
    
	data () {
		return {
			/**
             * Menu items
             * @type {object[]}
             */
			menuitems: [],

			/**
			 * Local state of menu items
			 * @type {object[]}
			 */
			menu: [],
			linearMenu: [],

			search: '',
			index:-1,
			isAllowSearch: false,
			isVoiceSearch:false,
		}
	},

	computed: {
		
		activeAppCode () {
			return useStore().activeAppCode
		},
			collapsedSidebar () {
			return useStore().collapsedSidebar
		},
			activeApp () {
			return useStore().activeApp
		},
		
		user () {
			return useStore().user;
		},
	},

	watch: {
		search (newQuery) {
		 
			if (newQuery.length > 0) {
				 
				let filtered = this.linearMenu.filter(function (item) {
					const label = (item.title || '').toLowerCase();
					const input = newQuery.toLowerCase();
	
					if (label.indexOf(input) !== -1) {
							 return item;
					}
				});

				filtered = filtered.map(item => {
					item._isQuery = true;
					return item;
				});
				this.menu = filtered;
				this.index=-1;
			}
			else {
				this.menu = this.menuitems;
			}
			
			if (this.isVoiceSearch && this.menu.length==1) {
				let menuData = this.menu[0];
				useStore().addNewTab({
					title:menuData.title,
					url:menuData.page,
					params: {}
				});
				this.isVoice = false;
			}

		},
		activeAppCode () {
			this.search = '';
			this.getMenuList();
		},
		menuitems (newItems) {
			this.menu = newItems;
		}
	},

	created () {
		let thisl = this;
		setTimeout(() => {
			if (process.client) {
				var liSelected = null;
				let ul = document.getElementById('hm');
				var next = "";
				let clasName = "hm-item";


				document.addEventListener('keydown', (e) => {
					let elem = document.getElementById("app-sidebar-menu-search-bar");
					if (elem === document.activeElement) {
						var len = ul.getElementsByClassName(clasName).length - 1;
				
						if (event.which === 40) {
							thisl.index++;
							//down 
							if (liSelected) {
								ul.scrollBy(0, 15);
							
								removeClass(liSelected, 'selected');
								next = ul.getElementsByClassName(clasName)[thisl.index];
								if (typeof next !== undefined && thisl.index <= len) {

									liSelected = next;
								
								} else {
								
									ul.scrollBy(0, -30);
									thisl.index = 0;
									liSelected = ul.getElementsByClassName(clasName)[0];
								}
								addClass(liSelected, 'selected');
							} else {
								thisl.index = 0;

								liSelected = ul.getElementsByClassName(clasName)[thisl.index];
							
								addClass(liSelected, 'selected');
							}
						} else if (event.which === 38) {

							//up
							if (liSelected) {
								ul.scrollBy(0, -15);
								removeClass(liSelected, 'selected');
								thisl.index--;
								next = ul.getElementsByClassName(clasName)[thisl.index];
								if (typeof next !== undefined && thisl.index >= 0) {
									liSelected = next;
								} else {
									ul.scrollBy(0, 0);
									thisl.index = len;
									liSelected = ul.getElementsByClassName(clasName)[len];
								}
								addClass(liSelected, 'selected');
							} else {
								thisl.index = 0;
								liSelected = ul.getElementsByClassName(clasName)[len];
								addClass(liSelected, 'selected');
							}
						}
					}
				
				});

				document.addEventListener("click", function (e){
					if (liSelected) {
						removeClass(liSelected, 'selected');
						liSelected = null;
					}
				})

				document.addEventListener("keypress", function (e) {
					if (e.key === 'Enter') {
						if (liSelected!=null && thisl.index!=-1) {
							liSelected.firstElementChild.click();
							
						}

					}
					
				});
				
				document.addEventListener("keydown", function (e) {
					if (e.ctrlKey  == true && e.keyCode == 32) {
						
						document.getElementById("app-sidebar-menu-search-bar").focus();
					
					}
					
				});

				function removeClass (el, className) {
					if (el.classList) {
						el.classList.remove(className);
					} else {
						el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
					}
				};

				function addClass (el, className) {
					if (el.classList) {
						el.classList.add(className);
					} else {
						el.className += ' ' + className;
					}
				};
			}	
		});
		
		// this.$store.commit('collapseSidebar', true);
		useStore().toggleSidebar(!true);
		this.getMenuList();
	},


	methods: {
		/**
		 * Handling toggle state of sidebar
		 * @param {boolean} mode - Collapse mode
		 */
		handleToggleState (mode) {
			useStore().toggleSidebar(!mode);
		
		},

		expandMenu () {
			useStore().toggleSidebar(!false);
		},

		collapseMenu () {
			useStore().toggleSidebar(!true);
		},
	
		handleMenuSearch (val, isVoice) {
			if (this.enableMenuSearch) {
				this.search = val;
				this.isVoiceSearch = isVoice;
			}
		},

		createLinearArrayMenu () {
			let menu = [];
			for (let menuItem of this.menuitems) {
				if(Array.isArray(menuItem.submenu)) {
					for (let menuItemSub of menuItem.submenu) {
						if(menuItemSub.submenu != undefined && 0 < menuItemSub.submenu.length){
							for (let menuItemSubChild of menuItemSub.submenu) {
								if(menuItemSubChild.submenu != undefined && 0 < menuItemSubChild.submenu.length){
									for (let menuItemSubChildSub of menuItemSubChild.submenu) {
										if(menuItemSubChildSub.submenu != undefined &&  0 < menuItemSubChildSub.submenu.length){
											// last
										}else{
											if(menuItemSubChildSub.submenu == undefined ){
												menuItemSubChildSub.submenu = [];
											}
											menu.push(menuItemSubChildSub);
										}
									}
								}else{
									if(menuItemSubChild.submenu == undefined ){
										menuItemSubChild.submenu = [];
									}
									menu.push(menuItemSubChild);
								}
							}
						}else{
							menu.push(menuItemSub);
						}
					}
				}
 
			} 
			this.linearMenu = menu;
			useStore().menuApps(this.menuitems)
			// this.$store.dispatch('menuApps', this.menuitems);
			// return menu;
		},

		async fetchMenuList (query, code) {
			const payload = {
				EvolveApp_Code: code,
				EvolveMenu_Name: query
			};

			const response = await this
				.$axios
				.$post('/api/v1/evolve/evolveMenuList', payload)
				
			if (response.statusCode === 200) {
				this.menuitems = response.result;
				useStore().setRoleMenuArray(response.roleMenuUrlArr)
			
				this.createLinearArrayMenu();
			}
			else {
				this.notification("danger", 3000, "Error while getting menu list");
			}
		},

		async getMenuList () {
			const search = this.search, code = this.activeAppCode;
			await this.fetchMenuList(search, code);
		}
	},
}
</script>

<style lang="scss" scoped>
@import "./index.scss";
#sc-sidebar-main{
	  &[aria-collapsed] {
		 @media screen and (max-width: 991px) {	
			display: flex;
		 }
		 @media screen and (min-width: 991px) {
			width: 65px;
		 }
        // width: 65px;
        grid-template-rows: 10px auto;
		
    }
	 &:hover {
        .toggler {
            display: initial;
        }
    }
}
#sc-sidebar-main[aria-collapsed]:hover{
	width: 175.3px !important;
    transition: width 140ms ease, background-color 70ms linear;
}
#app-sidebar {
    display: grid;
    position: relative;
    grid-template-rows: 50px auto;
    width: 300px;
	height: calc(100vh - 30px);
    transition: width 140ms ease, background-color 70ms linear;
	padding-left: 12px;
	padding-top: 3px;
 
	@media screen and (max-width: 991px) {
		position: fixed;
		// top: 50px;
		top: 0;
		bottom: 60px;
		height: auto;
		left: 1rem;
		width: 300px;
		z-index: 1000;
		border-bottom-left-radius: 12px;
      box-shadow: 4px 4px 18px $bg-4;
	}

    // &[aria-collapsed] {
	// 	 @media screen and (max-width: 991px) {
	// 		 display: none;
	// 	 }
    //     // width: 65px;
    //     grid-template-rows: 10px auto;

    // }

    &:hover {
        .toggler {
            display: initial;
        }
    }

    .fixed-sector {
       display: flex;
      flex-direction: column;
        justify-content: center;
        align-items: center;
    }
}

@include use-dark {
    #app-sidebar {
        border-color: $stroke-dark-1;
        background-color: $bg-dark-1;
        color: $fr-dark-2;
    }
}
.development-sidebar{
	top: 51px !important;
}
@media(max-width:991px){
	.development-sidebar{
	top: 60px !important;
}
}
</style>