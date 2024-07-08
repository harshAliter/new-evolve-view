<template>
	<div class="evolve-page-header">
		<div class="evolve-page-header-icons">
			<a
				class="sc-actions-icon mdi mdi-refresh md-color-light-green-600"
				style="border-right:1px solid #b5b7b9"
				@click="onRefresh()"
			></a>
			<a href="javascript:void(0)" class="sc-actions-icon mdi mdi-fullscreen mdi-fullscreen" @click="toggleScreenMode()"></a>
		</div>
		<div v-if="menuid && optionheader ==false" class="evolve-page-header-icons">
			<a href="javascript:void(0)" data-uk-tooltip="title: Favourite; pos: right" class="sc-actions-icon mdi mdi-star md-color-yellow-600" @click="useStore()['addToFavouriteClick'](menuid)"></a>
		</div>
		<div v-if="favouriteonly" class="evolve-page-header-icons">
			<a href="javascript:void(0)" data-uk-tooltip="title: Favourite; pos: right" class="sc-actions-icon mdi mdi-star md-color-yellow-600" @click="useStore()['addToFavouriteClick'](menuid)"></a>
		</div>
		<div class="evolve-page-header-icons evolve-float-right">
			<a
				href="javascript:void(0)"
				class="sc-actions-icon mdi mdi-close-box md-color-red-600"
				@click="useStore()['removeOneTab'](pageurl);onCloseBtnClick(pageurl)"
			></a>
		</div>

		<div class="evolve-page-header-icons evolve-float-right">
			<button 
				v-for="bt in buttons"
				:key="bt.code"
				class="sc-button sc-button-mini header-button-evolve"
				type="button"
				@click="onClickBtn(bt.code)"
			>
				{{ bt.lable }}
			</button>
		</div>

		<div class="evolve-page-header-icons evolve-float-right">
			<a
				v-if="optionheader ==false"
				id="downloadCsv"
				href="javascript:void(0)"
				class="sc-actions-icon mdi mdi-file-excel md-color-indigo-600"
				@click="downloadCsv()"
			></a>
			<a
				v-if="optionheader ==false"
				href="javascript:void(0)"
				class="sc-actions-icon mdi mdi-file-pdf-box md-color-red-600"
				@click="downloadPdf()"
			></a>
			<client-only v-if="mastercode != '' ">
				<a
				
					href="javascript:void(0)"
					class="sc-actions-icon mdi mdi-help-box md-color-indigo-600"
					@click="onClickHelp(mastercode)"
				></a>
			</client-only>
		</div>

		<div :id="'helpTrigar'+menuid" data-uk-modal class="uk-modal page-header-model">
			<div class="uk-modal-dialog">
				<button type="button" data-uk-close="" class="uk-modal-close-default uk-icon uk-close"></button>
				<div class="uk-modal-body ">
					<h3>
						PAGECODE : <b>{{ mastercode }}</b>
					</h3>
					<ul data-uk-tab class="uk-tab">
						<li class="uk-active">
							<a href="javascript:void(0)">
								Help For Fields
							</a>
						</li>
						<li>
							<a href="javascript:void(0)">
								Help 
							</a>
						</li>
					</ul>
					<ul class="uk-switcher  uk-overflow-auto" style="height: 400px ">
						<li class="uk-active"> 
							<table class="uk-table uk-table-striped">
								<tr>
									<th>Field</th>
									<th>Value</th>
								</tr>
								<tr v-for="(hl,key,index) in helpkeywordsList" :key="index">
									<td>{{ key }} : </td>
									<td> {{ hl.val }} </td>
								</tr>
							</table>
							<!-- <div v-for="(hl,key,index) in keywordslist" :key="index">
								 
								<div v-if="key != 'PageHelp'" class="uk-modal-body" style="overflow-wrap: anywhere;">
									<h4>
										* {{ key }}
									</h4>
									
									<p style="margin-top : -5px;margin-left: 33px;">
										{{ hl.val }}
									</p>
								</div>
							</div> -->
						</li> 
						<li>
							<div v-for="(hl,key,index) in keywordslist" :key="index">
								<div v-if="key == 'PageHelp'" class="uk-modal-body" style="overflow-wrap: anywhere;">
									<p style="margin-top: -5px;">
										{{ hl.val }}
									</p>
								</div>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

export default {
	name: "PageHeaderBar",
	components: {},
	props: {
		name: {
			type: String,
			default: null,
		},
		menuid: {
			type: String,
			default: "0000",
		},
		pageurl: {
			type: String,
			default: null,
		},
		buttons: {
			type: Array,
			default: () => [],
		},
		mastercode: {
			type: String,
			default: '',
		},
		keywordslist:{
			type: Object,
			default: () => {},
		},
		optionheader : {
			type : Boolean,
			default : true
		},
		favouriteonly : {
			type : Boolean,
			default : false
		},
		
	},
	data: () => ({
		keywords: {
			FIELDS: {
				val: "Table Fields",
				ttps: "",
			}
		},
		helpkeywordsList : {}
	}),
	created: async function () {
	//	this.helpkeywordsList = this.keywordslist;
	if (process.client) {
				document.addEventListener("keydown",  (event) => {
			if (event.key === "Escape" && this.enableFullscreen) {
				
				this.enableFullscreen = false;
				useStore().setFullscreen(0);
			}
		});
	}


	},
	mounted () {
	 
	},
	// beforeDestroy () {
	// 	this.toggleScreenMode(0);
	// },
	methods: {
		onRefresh (e) {
			this.$emit('onRefresh', 'CLICK');
		},
		downloadPdf (e) {
			this.$emit('downloadPdf', 'CLICK');
		},
		downloadCsv (e) {
			this.$emit('downloadCsv', 'CLICK');
		},
		onClickBtn (code) {
			console.log("code>>>>", code);
			this.$emit('onClickBtn', code);
		},
		onCloseBtnClick (code) {
			console.log("onCloseBtnClick>>>>", code);
			this.$eventBus.$emit("onCloseTabCalled", code);
			// this.$emit('onClickBtn', code);
		},
		onClickHelp : async function (helpMasterCode){
			try {
				let list = await this.$axios
					.$post("/api/v1/evolve/getFildHelp", {
						"MasterTag" : helpMasterCode 
					})
					.catch((e) => {
						useStore().evolveNotification({code: 117, type: 2});
					});
				if (list) {
					if (list.statusCode == 200) {
						for (let i = 0; i < list.result.length; i++) {
							if (list.result[i].EvovleHelp_FildName == '') {
								this.keywordslist['PageHelp'].val =  list.result[i].EvovleHelp_Help
								this.keywordslist['PageHelp'].ttps = list.result[i].EvovleHelp_Tooltip
							}else{
								for (const key in this.keywordslist) {
									if (key == list.result[i].EvovleHelp_FildName) {
										this.keywordslist[key].val =  list.result[i].EvovleHelp_Help
										this.keywordslist[key].ttps = list.result[i].EvovleHelp_Tooltip
									}
								}
							}
							
						}
						this.helpkeywordsList = this.keywordslist;
						console.log("this.keywordslist>>>>>>>>....", this.keywordslist);
						console.log("this.helpkeywordsList>>>>>>>>....", this.helpkeywordsList);
						// this.keywords = list.result;
						UIkit.modal("#helpTrigar" + this.menuid).show();
					} else {
						useStore().evolveNotification(list.message);
					}
				}
			} catch (error) {
				console.log("error>>>>>>>>>..", error.message);
				useStore().evolveNotification({code: 111, type: 2});
			}
		},
		// toggleScreenMode
		toggleScreenMode (ac) {
			if (ac == undefined) {
				const elem = document.documentElement;
				const enabledNativeFullscreen =
          document.fullscreenEnabled ||
          document.webkitFullscreenEnabled ||
          document.mozFullScreenEnabled ||
          document.msFullscreenEnabled;

				if (enabledNativeFullscreen) {
					if (!this.enableFullscreen) {
						if (elem.requestFullscreen) {
							elem.requestFullscreen();
							this.enableFullscreen = true;
						} else if (elem.webkitRequestFullscreen) {
							elem.webkitRequestFullscreen();
							this.enableFullscreen = true;
						} else if (elem.mozRequestFullScreen) {
							elem.mozRequestFullScreen();
							this.enableFullscreen = true;
						} else if (elem.msRequestFullscreen) {
							elem.msRequestFullscreen();
							this.enableFullscreen = true;
						}
						useStore().setFullscreen(1);
					} else {
						if (document.exitFullscreen) {
							document.exitFullscreen();
							this.enableFullscreen = false;
						} else if (document.webkitExitFullscreen) {
							document.webkitExitFullscreen();
							this.enableFullscreen = false;
						} else if (document.mozCancelFullScreen) {
							document.mozCancelFullScreen();
							this.enableFullscreen = false;
						} else if (document.msExitFullscreen) {
							document.msExitFullscreen();
							this.enableFullscreen = false;
						}
						useStore().setFullscreen(0);
					}
				}
			} else {
				useStore().setFullscreen(0);
			}
		},

	},
};
</script>
