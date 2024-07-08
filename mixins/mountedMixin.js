export default {
	mounted () {
	
		this.$root.$on(this.helpMasterCode, (data) => {
			let thisObj = this;
			if (this.keywords) {
				Object.keys(this.keywords).forEach(function (key) {
					data.forEach(function (obj) {
						if (obj[key] != undefined) {
							thisObj.keywords[key].val = obj[key].tran; // Translated
							thisObj.keywords[key].ttps = obj[key].ttps; // Tooltips
						}
					});
				});
			}
		});
		this.$root.$on("onChangeLanguage", () => {
			this.$store.dispatch("loadPageData", {
				masterCode: this.helpMasterCode, // Master code
				keywords: this.keywords,
			});
		});

		this.$root.$on("onCloseTabCalled", (url) => {
			if (this.pageURL == url) {
			
			}
		});
	},

	beforeDestroy () {
		this.$root.$off("onCloseTabCalled");
	}
};
