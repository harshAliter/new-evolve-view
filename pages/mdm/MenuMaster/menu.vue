<template>
	<div class="evolve-page">
		<PageHeaderBar :menuid="EvolveMenu_Id" :pageurl="pageURL" :favouriteonly="true" />
		<!-- <button class="sc-button" type="button" @click="chnageValue()">
			Change Val
		</button> -->
		<div id="sc-page-content" class="evolve-page-body">
			<div data-uk-grid="" class="uk-grid">
				<div class="uk-width-1-2@m">
					<div class="menu_tree">
						<client-only>
							<FancyTree ref="treeRef" :key="menuTree" :options="treeDnD"></FancyTree>
						</client-only>
					</div>
					<div class="uk-width-1-1@m">
						<div class="uk-flex uk-flex-center uk-flex-around">
							<button class="sc-button" type="button" @click="getMenuData()">
								<i class="mdi mdi-square-edit-outline md-color-cyan-600"></i>
								Edit Menu
							</button>
							<button class="sc-button" type="button" @click="onSaveData()">
								<i class="mdi mdi-content-save-all md-color-light-green-600"></i>
								Save Menu Data to DB
							</button>
						</div>
					</div>
				</div>
				<div class="uk-width-1-2@m">
					<div data-uk-grid="" class="uk-margin-top uk-grid">
						<div class="uk-width-1-3@m  ">
							<label for="table lable" class="evolve-input-lable">Menu Title</label>
						</div> <div class="uk-width-2-3@m">
							<ScInput v-model="menuTitle" mode="outline" name="taxClassCode"></ScInput>
						</div>
					</div>
					<div data-uk-grid="" class="uk-margin-top uk-grid">
						<div class="uk-width-1-3@m  ">
							<label for="table lable" class="evolve-input-lable">Menu Icon</label>
						</div> <div class="uk-width-2-3@m">
							<ScInput v-model="menuIcon" mode="outline" name="taxClassCode"></ScInput>
						</div>
					</div>
					<div data-uk-grid="" class="uk-margin-top uk-grid">
						<div class="uk-width-1-3@m  ">
							<label for="table lable" class="evolve-input-lable">Menu Url</label>
						</div> <div class="uk-width-2-3@m">
							<ScInput v-model="menuUrl" mode="outline" name="taxClassCode"></ScInput>
						</div>
					</div>
					<div data-uk-grid="" class="uk-margin-top uk-grid">
						<div class="uk-width-1-3@m  ">
							<label for="table lable" class="evolve-input-lable">Menu Status</label>
						</div> <div class="uk-width-2-3@m"> 
							<PrettyCheck v-model="menuStatus" class="p-switch">
								Status
							</PrettyCheck>
						</div>
					</div>

					<div data-uk-grid="" class="uk-margin-top uk-grid">
						<div class="uk-width-2-5@m">
						</div> 
						<div class="uk-flex-1">
							<button class="sc-button" type="button" data-uk-tooltip="Create Menu" @click="createMenu()">
								<i class="mdi mdi-content-save-all md-color-light-green-600"></i>
							</button>
							<button class="sc-button" type="button" data-uk-tooltip="Update Menu" @click="updateMenu()">
								<i class="mdi mdi-content-save-edit md-color-cyan-600"></i>
							</button>
							<button
								class="sc-button sc-button-flat-danger uk-modal-close"
								type="button"
								data-uk-tooltip="Close Menu"
								@click="closeMenu()"
							>
								<i class="mdi mdi-close-box md-color-indigo-600"></i>
							</button>
							<button
								class="sc-button sc-button-flat-danger uk-modal-close"
								type="button"
								data-uk-tooltip="Delete Menu"
								@click="removeMenu()"
							>
								<i class="mdi mdi-delete-empty  md-color-red-600"></i>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<style>
.menu_tree {
  max-height: 300px;
  overflow-y: scroll;
  padding: 20px;
}
</style>
<script>
export default {
	head () {
		return {
			title: "Evolve - " + this.$route.name,
		};
	},
	components: {
		FancyTree: process.client ? defineAsyncComponent(() => import("~/components/FancyTree")): null,
		PrettyCheck: process.client ? defineAsyncComponent(() => import("~/components/cust/PrettyCheck")): null,
		ScInput: process.client ? defineAsyncComponent(() => import("~/components/Input")): null,
		PageHeaderBar: process.client ? defineAsyncComponent(() => import("~/components/cust/PageHeaderBar")): null,
	},

	props: {
		params: {
			type: Object,
			default: () => {},
		},
	},
	layout: "eDefaultV2",
	data () {
		return {
			EvolveMenu_Id: this.$route.query.EvolveMenu_Id,
			pageURL: "/mdm/MenuMaster/menu",
			userId: useStore().user.EvolveUser_ID,
			token: useStore().user.EvolveToken,
			baseURL: this.$config.public.baseURL,
			// Language
			translate: {},
			buttonsList: [],
			treeDnD: {
				extensions: ["glyph", "dnd5"],
				debugLevel: 0,
				glyph: true,

				source: [],
				//checkbox: true,
				selectMode: 1,
				//  activate: function (event, data) {
				// 	 console.log("activate>>>>", data.node);
				// 	 console.log("activate>>>>", data.node.title);
				// 	//$("#echoActive1").text(data.node.title);
				// },
				// select: function (event, data) {
				// 	// Display list of selected nodes
				// 	// var s = data.tree.getSelectedNodes().join(", ");
				// 	// $("#echoSelection1").text(s);
				// 	console.log("selecte>>>>", data);
				// },
				click: function (event, data) {
					// We should not toggle, if target was "checkbox", because this
					// would result in double-toggle (i.e. no toggle)
					// if( $.ui.fancytree.getEventTargetType(event) === "title" ){
					// data.node.toggleSelected();
					// }
					console.log("data ::", data);
					console.log("title ::", data.node.title);
					console.log("Obj ::", data.node.data);
					 
				},
				dnd5: {
					dragStart (node, data) {
						return true;
					},
					dragDrag (node, data) {
						data.dataTransfer.dropEffect = "move";
					},
					dragEnd (node, data) {
						// console.log("node>>>", node);
						//console.log("node>>>", node.getParentList());
						//console.log("data>>>", data);
						//console.log("data>>>", data.getSource());
					},
					dragEnter (node, data) {
						data.dataTransfer.dropEffect = "move";
						return true;
					},
					dragOver (node, data) {
						data.dataTransfer.dropEffect = "move";
					},
					dragLeave (node, data) {},
					dragDrop (node, data) {
						var transfer = data.dataTransfer;
						node.debug("drop", data);
						if (data.otherNode) {
							data.otherNode.moveTo(node, data.hitMode);
						} else if (data.otherNodeData) {
							node.addChild(data.otherNodeData, data.hitMode);
						} else {
							node.addNode(
								{
									title: transfer.getData("text"),
								},
								data.hitMode
							);
						}
						node.setExpanded();
					},
				},
				activate: function (event, data) {
					console.log("activate " + data.node);
				},
			},

			menuTree: "",
			menuTitle : "",
			menuIcon : "",
			menuUrl : "",
			menuUser : useStore().user.EvolveUser_ID,
			menuStatus : true
		};
	},
	computed: {},
	watch: {},
	mounted () {},
	created: async function () {
		this.removeModal();
		await this.getMenuList();
	},
	validations: {},
	beforeMount () {},
	methods: {
		removeModal: async function (e) {
			$("#FormatDataModal").remove(); // Remove Old Model From DOM
		},
		async notification (type = "danger", timeout = 10000, message = "") {
			let config = {
				timeout: timeout,
				status: type,
			};
			UIkit.notification(message, config);
		},
		// Evolve defult functions end
		/* Datatable Methods -- Start */

		async onSaveData (code) {
			try {
				// console.log(">>>>>", this.treeDnD.source);
				// console.log("Ref22>>>>>", this.$refs.treeRef);
				console.log("###>>>>>", this.$refs.treeRef.tree.rootNode.children);
				let menuArray = [];
				if (Array.isArray(this.$refs.treeRef.tree.rootNode.children)) {
					for (let rtObj1 of this.$refs.treeRef.tree.rootNode.children) {
						let children1 = [];
						if (rtObj1.children != undefined) {
							for (let rtObj2 of rtObj1.children) {
								let children2 = [];
								if (rtObj2.children != undefined) {
									for (let rtObj3 of rtObj2.children) {
										let children3 = [];
										if (rtObj3.children != undefined) {
											for (let rtObj4 of rtObj3.children) {
												// children3.push({
												//   id: rtObj4.data.id,
												//   title: rtObj4.title,
												//   icon: rtObj4.icon,
												//   page: rtObj4.data.page,
												//   childs: [],
												//   code: rtObj4.data.code,
												//   submenu: [],
												// });

												children3.push({
													EvolveMenu_SrNo: rtObj4.data.EvolveMenu_SrNo,
													EvolveMenu_Name: rtObj4.title,
													EvolveMenu_Desc: rtObj4.data.EvolveMenu_Desc,
													EvolveMenu_Index: rtObj4.data.EvolveMenu_Index,
													EvolveMenu_Parent: rtObj4.data.EvolveMenu_Parent,
													EvolveMenu_AppId: rtObj4.data.EvolveMenu_AppId,
													EvolveMenu_Icon: rtObj4.icon,
													EvolveMenu_Url: rtObj4.data.EvolveMenu_Url,
													// "childs": [],
													EvolveMenu_IsActive: rtObj4.data.EvolveMenu_IsActive,
													EvolveMenu_IsReportPage: rtObj4.data.EvolveMenu_IsReportPage,
													EvolveUser_IframeUrl: rtObj4.data.EvolveUser_IframeUrl,
													EvolveMenuType_ID: rtObj4.data.EvolveMenuType_ID,
													EvolveMenu_IsUpdateExtData:
                            rtObj4.data.EvolveMenu_IsUpdateExtData,
													EvolveMenu_AuditEnable: rtObj4.data.EvolveMenu_AuditEnable,
													createdAt: rtObj4.data.createdAt,
													createdUser: rtObj4.data.createdUser,
													updatedAt: rtObj4.data.updatedAt,
													updatedUser: rtObj4.data.updatedUser,
													EvolveSubMenu: [],
												});
											}
										}

										// children2.push({
										//   id: rtObj3.data.id,
										//   title: rtObj3.title,
										//   icon: rtObj3.icon,
										//   page: rtObj3.data.page,
										//   childs: [],
										//   code: rtObj3.data.code,
										//   submenu: children3,
										// });

										children2.push({
											EvolveMenu_SrNo: rtObj3.data.EvolveMenu_SrNo,
											EvolveMenu_Name: rtObj3.title,
											EvolveMenu_Desc: rtObj3.data.EvolveMenu_Desc,
											EvolveMenu_Index: rtObj3.data.EvolveMenu_Index,
											EvolveMenu_Parent: rtObj3.data.EvolveMenu_Parent,
											EvolveMenu_AppId: rtObj3.data.EvolveMenu_AppId,
											EvolveMenu_Icon: rtObj3.icon,
											EvolveMenu_Url: rtObj3.data.EvolveMenu_Url,
											// "childs": [],
											EvolveMenu_IsActive: rtObj3.data.EvolveMenu_IsActive,
											EvolveMenu_IsReportPage: rtObj3.data.EvolveMenu_IsReportPage,
											EvolveUser_IframeUrl: rtObj3.data.EvolveUser_IframeUrl,
											EvolveMenuType_ID: rtObj3.data.EvolveMenuType_ID,
											EvolveMenu_IsUpdateExtData: rtObj3.data.EvolveMenu_IsUpdateExtData,
											EvolveMenu_AuditEnable: rtObj3.data.EvolveMenu_AuditEnable,
											createdAt: rtObj3.data.createdAt,
											createdUser: rtObj3.data.createdUser,
											updatedAt: rtObj3.data.updatedAt,
											updatedUser: rtObj3.data.updatedUser,
											EvolveSubMenu: children3,
										});
									}
								}
								// children1.push({
								//   id: rtObj2.data.id,
								//   title: rtObj2.title,
								//   icon: rtObj2.icon,
								//   page: rtObj2.data.page,
								//   childs: [],
								//   code: rtObj2.data.code,
								//   submenu: children2,
								// });

								children1.push({
									EvolveMenu_SrNo: rtObj2.data.EvolveMenu_SrNo,
									EvolveMenu_Name: rtObj2.title,
									EvolveMenu_Desc: rtObj2.data.EvolveMenu_Desc,
									EvolveMenu_Index: rtObj2.data.EvolveMenu_Index,
									EvolveMenu_Parent: rtObj2.data.EvolveMenu_Parent,
									EvolveMenu_AppId: rtObj2.data.EvolveMenu_AppId,
									EvolveMenu_Icon: rtObj2.icon,
									EvolveMenu_Url: rtObj2.data.EvolveMenu_Url,
									// "childs": [],
									EvolveMenu_IsActive: rtObj2.data.EvolveMenu_IsActive,
									EvolveMenu_IsReportPage: rtObj2.data.EvolveMenu_IsReportPage,
									EvolveUser_IframeUrl: rtObj2.data.EvolveUser_IframeUrl,
									EvolveMenuType_ID: rtObj2.data.EvolveMenuType_ID,
									EvolveMenu_IsUpdateExtData: rtObj2.data.EvolveMenu_IsUpdateExtData,
									EvolveMenu_AuditEnable: rtObj2.data.EvolveMenu_AuditEnable,
									createdAt: rtObj2.data.createdAt,
									createdUser: rtObj2.data.createdUser,
									updatedAt: rtObj2.data.updatedAt,
									updatedUser: rtObj2.data.updatedUser,
									EvolveSubMenu: children2,
								});
							}
						}

						menuArray.push({
							EvolveApp_Code: rtObj1.data.EvolveApp_Code,
							EvolveApp_Name: rtObj1.title,
							EvolveApp_Description: rtObj1.data.EvolveApp_Description,
							EvolveApp_Current_Version: rtObj1.data.EvolveApp_Current_Version,
							EvolveApp_Previous_Version: rtObj1.data.EvolveApp_Previous_Version,
							EvolveApp_SEQ: rtObj1.data.EvolveApp_SEQ,
							EvolveApp_Icon: rtObj1.icon,
							EvolveApp_Url: rtObj1.data.EvolveApp_Url,
							// "childs": [],
							EvolveApp_Status: rtObj1.data.EvolveApp_Status,
							createdAt: rtObj1.data.createdAt,
							createdUser: rtObj1.data.createdUser,
							updatedAt: rtObj1.data.updatedAt,
							updatedUser: rtObj1.data.updatedUser,
							EvolveMenuData: children1,
						});
					}
				}

				console.log("menuArray>>>", menuArray);

				let response = await this.$axios
					.$post("/api/v1/evolve/menuUpdates", { data: menuArray })
					.catch((e) => {});
				console.log("response...", response);
				if (response) {
					if (response.statusCode == 200) {
						useStore().evolveNotification({code: 125});
					}
					else{
						useStore().evolveNotification({code: 126});
					}
					
				}
			} catch (error) {
				console.log("Error::", error);
			}
		},

		async getMenuData () {
			try {
				// console.log(">>>>>", this.treeDnD.source);
				// console.log("Ref22>>>>>", this.$refs.treeRef);
				let node  = this.$refs.treeRef.tree.getActiveNode();
				// node.setTitle("Ankit D")
				console.log("getMenuData.....", node);
 
				this.menuTitle = node.title;
				this.menuIcon = node.icon;
				this.menuUrl = node.data.EvolveMenu_Url;
				this.menuStatus = node.data.EvolveMenu_IsActive;
			} catch (error) {
				console.log("Error getMenuData::", error);
			}
		},   

		async updateMenu () {
			try {
			 let node  = this.$refs.treeRef.tree.getActiveNode();
				// node.setTitle(this.menuTitle); 
				node.title = this.menuTitle;
				node.icon = this.menuIcon;
				node.data.EvolveMenu_IsActive = this.menuStatus;
				node.data.EvolveMenu_Url = this.menuUrl; 
				node.data.updatedUser = this.menuUser; 
				useStore().evolveNotification({code: 127});
				 
				node.render(true);

			} catch (error) {
				useStore().evolveNotification({code: 129});
				console.log("Error updateMenu::", error);
			}
		},
		async createMenu () {
			try {
			  let node  = this.$refs.treeRef.tree.getActiveNode();
				// 	node.setTitle(this.menuTitle);
				node.addChildren({
					title: this.menuTitle,
					icon : this.menuIcon,
					data :{
						"EvolveMenu_IsActive": this.menuStatus,
						"EvolveMenu_SrNo": new Date().getTime(),
						"EvolveMenu_Url": this.menuUrl,
						"updatedUser": this.menuUser,
						"createdUser": this.menuUser						 
					}
				});

				useStore().evolveNotification({code: 128});

			} catch (error) {
				useStore().evolveNotification({code: 130});
				console.log("Error createMenu::", error);
			}
		},
		async closeMenu () {
			try {
			 	this.menuTitle = "";
				this.menuIcon = "";
				this.menuUrl = "";
				this.menuUser = null;
				this.menuStatus = false;
			} catch (error) {
				console.log("Error closeMenu::", error);
			}
		},
		async removeMenu () {
			try {
				let node  = this.$refs.treeRef.tree.getActiveNode();
				node.remove();
			} catch (error) {
				console.log("Error removeMenu::", error);
			}
		},

		async getMenuList () {
			try {
				const payload = {
					EvolveApp_Code: "",
					EvolveMenu_Name: "",
				};

				let response = await this.$axios
					.$post("/api/v1/evolve/evolveAppMenuList", payload)
					.catch((e) => {});
				if (response.statusCode === 200) {
					let packages = response.result;
					//	console.log("packages###############", packages);
					let updatedMenu = this.refit_keys(packages);
					this.treeDnD.source = updatedMenu;
					console.log("Resppne###############", updatedMenu);
					this.menuTree = "loading....";
				}
			} catch (error) {
				console.log("Error>>>", error);
			}
		},
		refit_keys (o) {
			try {
				var keys_short = [
					"EvolveMenuData",
					"EvolveApp_Name",
					"EvolveApp_Icon",
					"EvolveSubMenu",
					"EvolveMenu_Name",
					"EvolveMenu_Icon",
				];
				var keys_long = ["children", "title", "icon", "children", "title", "icon"];
				var build, key, destKey, ix, value;

				// Only handle non-null objects
				if (o === null || typeof o !== "object") {
					return o;
				}

				// Handle array just by handling their contents
				if (Array.isArray(o)) {
					return o.map(this.refit_keys);
				}

				// We have a non-array object
				build = {};
				for (key in o) {
					// Get the destination key
					ix = keys_short.indexOf(key);
					destKey = ix === -1 ? key : keys_long[ix];

					// Get the value
					value = o[key];

					// If this is an object, recurse
					if (typeof value === "object") {
						value = this.refit_keys(value);
					}

					// Set it on the result using the destination key
					build[destKey] = value;
				}
				return build;
			} catch (error) {
				console.log("error>>>>", error);
			}
		},
	},
};
</script>

