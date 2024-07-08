<template>
<client-only>
	<div class="evolve-page" v-if="!hide">
		<div class="evolve-page">
			<PageHeaderBar 
				:menuid="EvolveMenu_Id"
				:pageurl="pageURL" 
				:optionheader="true"
				:mastercode="helpMasterCode"
				:keywordslist="keywords"
			/>

			<div id="sc-page-content ">
				<div id="nav-mdi" class="uk-card">
					<div class="uk-card-body min-height-back">
						<div class="uk-child-width-1-1@m uk-grid" data-uk-grid>
							<div>
								<div class="uk-overflow-auto">
									<div class="uk-grid" data-uk-grid>
										<div class="uk-width-1-2@m">
											<div class="uk-grid" data-uk-grid>
												<div class="uk-width-1-2@m">
													<label for="table lable" class="evolve-input-lable" :data-uk-tooltip="keywords.key.ttps">{{ keywords.key.val }} </label>
												</div>
												<div class="uk-width-1-2@m">
													<ScInput
														v-model="v$.genCodeCode.$model"
														mode="outline"
														name="genCodeCode"
														:error-class="v$.genCodeCode.$error"
														:validator="v$.genCodeCode"
														placeholder="Key"
														:disabled="isDsable"
														:data-uk-tooltip="keywords.key.ttps"
													></ScInput>
												</div>
											</div>
										</div>
										<div class="uk-width-1-2@m"></div>

										<div class="uk-width-1-2@m">
											<div class="uk-grid" data-uk-grid>
												<div class="uk-width-1-2@m">
													<label for="table lable" class="evolve-input-lable" :data-uk-tooltip="keywords.value.ttps">{{ keywords.value.val }} </label>
												</div>
												<div class="uk-width-1-2@m">
													<ScInput
														v-model="genCodeValue"
														mode="outline"
														name="genCodeValue"
														:disabled="isDsable"
														placeholder="Value"
														:data-uk-tooltip="keywords.value.ttps"
													></ScInput>
												</div>
											</div>
										</div>

										<div class="uk-width-1-2@m"></div>

										<div class="uk-width-1-2@m">
											<div class="uk-grid" data-uk-grid>
												<div class="uk-width-1-2@m">
													<label for="table lable" class="evolve-input-lable" :data-uk-tooltip="keywords.desc.ttps">{{ keywords.desc.val }} </label>
												</div>
												<div class="uk-width-1-2@m">
													<ScInput
														v-model="genCodeDesc"
														mode="outline"
														name="genCodeDesc"
														placeholder="Desc"
														:data-uk-tooltip="keywords.desc.ttps"
													></ScInput>
												</div>
											</div>
										</div>
										<div class="uk-width-1-2@m"></div>

										<div class="uk-width-1-2@m">
											<div class="uk-grid" data-uk-grid>
												<div class="uk-width-1-2@m">
													<label
														for="table lable"
														class="evolve-input-lable"
														:data-uk-tooltip="keywords.is_active.ttps"
													>{{ keywords.is_active.val }}
													</label>
												</div>
												<div class="uk-width-1-2@m">
													<PrettyCheck v-model="isActive"
														class="p-switch"
														name="isActive"
														:data-uk-tooltip="keywords.is_active.ttps"
													>
													</PrettyCheck>
												</div>
											</div>
										</div>

										<div class="uk-width-3-5@m uk-first-column uk-margin-left">
											<div class="uk-flex uk-flex-center">
												<button
													class="sc-button header-button-evolve"
													type="button"
													:data-uk-tooltip="keywords.save.ttps"
													@click="checkCreateOrEditgenCode($event)"
												>
													{{ keywords.save.val }}
												</button>
												<button
													class="sc-button header-button-evolve sc-button-flat-danger uk-modal-close"
													type="button"
													:data-uk-tooltip="keywords.cancel.ttps"
													@click="useStore['removeOneTab'](pageURL)"
												>
													{{ keywords.cancel.val }}
												</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</client-only>
</template>
<style>
.uk-position-top-right {
  top: 24px;
}
.icons_selections {
  height: 200px !important;
  overflow: auto;
}
</style>
<script>
const rows = "";
// import { validationMixin } from "vuelidate";
// import { required } from "vuelidate/lib/validators";
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators'
import ScInput from "~/components/Input";
import PageHeaderBar from "~/components/cust/PageHeaderBar";
import PrettyCheck from "~/components/cust/PrettyCheck";

export default {
	head () {
		return {
			title: "Evolve - " + this.$route.name,
		};
	},
	layout: "eDefaultV2",
	components: {
		ScInput,
		PrettyCheck,
		PageHeaderBar
	},

    setup () {
		return { v$: useVuelidate() }
	},

	props: {
		params: {
			type: Object,
			default: () => {}
		}
	},
    	validations: {	
		genCodeCode: {
			required,
		},
		isActive: {
			required
		}
	},
	data () {
		return {
			EvolveMenu_Id :this.$route.query.EvolveMenu_Id,
			userId: useStore().user.EvolveUser_ID,
			token: useStore().user.EvolveToken,
			baseURL: this.$config.public.baseURL,
			pageURL : '/mdm/abc/options/',
			

			helpMasterCode : 'GENCODEOPTION',
			keywords: {
				save :	{
					val: "Save",
					ttps: "",
				},
				cancel :	{
					val: "Cancel",
					ttps: "",
				},
				key :	{
					val: "Key",
					ttps: "",
				},
				value :	{
					val: "Value",
					ttps: "",
				},
				desc :	{
					val: "Desc",
					ttps: "",
				},
				is_active:{
					val: "Is Active",
					ttps: "",
				}
				
			},

			isDsable : false,
			genCodeDesc : "",
			genCodeValue : '', 
			genCodeCode : "",
			isActive: true,
			genCodeId : this.$route.query.genCodeId,
            hide: false,
		};
	},
	computed: {},
	watch: {
		mdIconsSearch (val) {
			this.mdIcons.forEach((icon) => {
				if (val !== "" && val.length > 2) {
					icon.visible = icon.name.toLowerCase().includes(val.toLowerCase());
				} else {
					icon.visible = true;
				}
			});
		},
	},
	mounted () {
		this.$eventBus.$on(this.helpMasterCode, (data) => {
			let thisObj = this;
			Object.keys(this.keywords).forEach(function (key) {
                if (data) {
                    data.forEach(function (obj) {
					if (obj[key] != undefined) {
						thisObj.keywords[key].val = obj[key].tran; // Translated
						thisObj.keywords[key].ttps = obj[key].ttps; // Tooltips
					}
				});
                }
				
			});
		});
		this.$eventBus.$on('onChangeLanguage', () =>{
			useStore().loadPageData({
				masterCode: this.helpMasterCode, // Master code
				keywords: this.keywords,
			});          
		});

		this.$eventBus.$on('onCloseTabCalled', (url) =>{
			
			if(this.pageURL == url){
				this.hide = true;
			} 
		});
	},

	created: async function () {
		
		try {
			useStore().loadPageData({
				masterCode: this.helpMasterCode, 
				keywords: this.keywords,
			});
		
			if(this.genCodeId != "" && this.genCodeId != undefined) {
				this.isDsable = true
				this.getSinglegenCodeList({
					"operation" : "LS",
					"_id" : this.genCodeId
				})
			}
		} catch (error) {
			console.log("Error in "+this.helpMasterCode+" :", error.message);
			useStore().evolveNotification({
				code: 111, 
				type: 2 
			});
		}
	},


	methods: {
		// Evolve defult functions





		onClickBtn : async function (code) {
			try {
				this[code]()
				 
			} catch (error) {
				 
			}
		},
		// Evolve defult functions end
		checkCreateOrEditgenCode: async function (e) {
			try {
				let error = false;
				e.preventDefault();
				this.v$.$touch();
				if (this.v$.$invalid) {
					useStore().evolveNotification({code : 107, pos : "BL", type : 2, time : 1000  });

					error = true;
				} else {
					if (error == false) {
						let genCodeRes ;
						if (this.genCodeId == "" || this.genCodeId == null || this.genCodeId == undefined) {
							let genCodeDetails = {
								EvolveGenCode_Desc: this.genCodeDesc,
								EvolveGenCode_Code: this.genCodeCode,
								EvolveGenCode_Value: this.genCodeValue,
								EvolveGenCode_IsActive: this.isActive
							};
							genCodeRes = await this.$axios
								.$post("/api/v3/Mdm/genCode/genCodeHandler", {"operation" : "A",
									"genCodeData" :genCodeDetails})
								.catch((e) => {
									useStore().evolveNotification({code: 117, type: 2});
								});
					
						} else {
						
							let genCodeDetails = {
								EvolveGenCode_Desc: this.genCodeDesc,
								EvolveGenCode_Code: this.genCodeCode,
								EvolveGenCode_value: this.genCodeValue,
								EvolveGenCode_IsActive: this.isActive
							};

							let condition = {
								_id : this.genCodeId
							}

							let objBody = {
								"operation" : "M",
								"genCodeData" : genCodeDetails,
								"condition" : condition
							}
							genCodeRes = await this.$axios
								.$post("/api/v3/Mdm/genCode/genCodeHandler", objBody)
								.catch((e) => {
									useStore().evolveNotification({code: 117, type: 2});
								});
						}

						if (genCodeRes) {
							if (genCodeRes.statusCode == 200) {
								useStore().evolveNotification( genCodeRes.message);
								this.v$.$reset()
								this.genCodeDesc = "";
								this.genCodeCode = "";
								this.genCodeValue = "";
								// this.$destroy() ;
								useStore().removeOneTab( this.pageURL);
							} else {
								useStore().evolveNotification( genCodeRes.message);
							}
						}else{
							useStore().evolveNotification( genCodeRes.message);
						}
					}
				}
			} catch (error) {
				console.log('Error Come in Catch : ', error.message);
				useStore().evolveNotification({code: 111, type: 2});
			}
		},

		getSinglegenCodeList: async function (data) {
			try {
				let getSingleGenCode = await this.$axios
					.$post("/api/v3/Mdm/genCode/genCodeHandler", data)
					.catch((e) => {
						useStore().evolveNotification({code: 117, type: 2});
					});
				if(getSingleGenCode) {
					if(getSingleGenCode.statusCode == 200) {
						this.genCodeDesc = getSingleGenCode.result.EvolveGenCode_Desc;
						this.genCodeCode = getSingleGenCode.result.EvolveGenCode_Code;
						this.genCodeValue = getSingleGenCode.result.EvolveGenCode_Value;
						this.isActive = getSingleGenCode.result.EvolveGenCode_IsActive
					}else {
						useStore().evolveNotification( getSingleGenCode.message);
					}
				}
			} catch (error) {
				console.log('Error Come in Catch : ', error.message);
				useStore().evolveNotification({code: 111, type: 2});
			}
		}
	},
};
</script>
<style lang="scss">
@import "assets/scss/plugins/datatables";
@import "pretty-checkbox/src/pretty-checkbox.scss";
</style>