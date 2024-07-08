
export default {
	data () {
		return {
			cursor: 'forward',
			startingId: "",
			endingId: "",
			firstId: "",
			lastId: "",
			isNextDisabled: false,
		}

	},

	methods: {
		async paginateClick (page = "first", cursor = false, isCountReq) {
			let toFetchAgain = true
			this.cursor = cursor || this.cursor
			this.currentPage = (page === 'last') ? Math.ceil(this.noOfRecord / this.displayRecord) : ['refresh', 'first'].includes(page) ? 1 : page === 'count' ? this.currentPage : page;
			try {
				if (page == 'last') {
					if (this.lastId) this.startFrom = this.lastId
					else this.isLastPage = true;
				} else if (page == 'count') {
					if (!this.noOfRecord) this.isCountRecords = true;
					else toFetchAgain = false
				} else if (page == 'refresh') {
					this.startFrom = this.lastId = this.firstId = ''
					this.noOfRecord = 0
					if (isCountReq) this.isCountRecords = true;
				} else if (page === 'first') {
					this.startFrom = this.firstId
					this.cursor = 'first'
				} else {
					this.startFrom = cursor === 'forward' ? this.endingId : this.startingId
					this.isLastPage = false;
				}

				if (toFetchAgain) this[this["listFnName"]](false);

			} catch (error) {
				console.log("Error : paginateClick>>>>", error.message);
			}
		},


		async onDisplayRecordChange (displayRecord, isCountMode = false) {
			try {
				if (isCountMode) {
					this.isCountRecords = true;
				}
				this.startFrom = 0;
				this.currentPage = 1;
				this.displayRecord = parseInt(displayRecord);
				this.isLastPage = false
				this[this["listFnName"]]();
			} catch (error) {
				this.$store.dispatch('evolveNotification', {
					code: 111,
					type: 2,
					var: [`${error.message}`]
				});
			}
		},

		/* cases to disable the next page buttons in pagination */
		checkIfNextDisabled (records) {
			
			if (records.length < this.displayRecord || this.isLastPage || ((this.startFrom && this.lastId) && this.lastId === this.startingId)) {
				this.currentPage = this.currentPage > 1 ? records.length === 0 ? this.currentPage - 1 : this.currentPage : 1;
				return true;
			} else if (this.noOfRecord && this.noOfRecord === records) {
				return true;
			}
			else {
				return false
			}
		}

	},

}