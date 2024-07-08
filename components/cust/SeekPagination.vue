<template>
	<div class="uk-grid fixed-footer">
		<div class="uk-width-1-2@m uk-width-auto" style="align-content: center;">
			<select v-model="displayRecord" @change="onDisplayRecordChange($event)">
				<option v-for="dr in displayRow" :key="dr" :value="dr">
					{{ dr }}
				</option>
			</select>
		</div>
						
		<div class="uk-width-1-2@m uk-width-expand pagination">
			<button class="sc-button  sc-button-flat sc-button-flat-primary waves-effect waves-button waves-primary" :disabled="isFirstPage || loading" @click="goToFirstPage">
				<i class="mdi mdi-chevron-double-left sc-icon-24 md-color-black"></i>
			</button>

			<button class="sc-button sc-button-flat sc-button-flat-primary waves-effect waves-button waves-primary" :disabled="isFirstPage || loading" @click="goToPreviousPage">
				<i class="mdi mdi-chevron-left sc-icon-24 md-color-black"></i>
			</button>

			<button class="sc-button sc-button-flat sc-button-flat-primary waves-effect waves-button waves-primary" :disabled="isNextDisabled || loading" @click="goToNextPage">
				<i class="mdi mdi-chevron-right sc-icon-24 md-color-black"></i>
			</button>

			<button class="sc-button sc-button-flat sc-button-flat-primary waves-effect waves-button waves-primary" :disabled="isNextDisabled || loading" @click="goToLastPage">
				<i class="mdi mdi-chevron-double-right sc-icon-24 md-color-black"></i>
			</button>

			<span v-if="loading">
				loading...
			</span>
			<span v-else>
				<span v-if="isCountMode == 1 && resultLength > 0 " class="font-style-span"> {{ ((currentPage -1)*displayRecord) +1 }} - {{ ((currentPage - 1)*displayRecord )+ resultLength }} of {{ totalRecords }} </span>	
				<span v-if="resultLength == 0" class="font-style-span"> No Records </span>	
				<select v-if="isCountMode == '0' && resultLength > 0" v-model="isCountMode" class="styled-select" @change="onCalculateCount($event)">
					<option :key="0" value="0" selected>
						<span> {{ (`${((currentPage -1)*displayRecord) +1} - ${ ((currentPage -1)*displayRecord) +resultLength } of Many` ) }}</span>		
					</option>
					<option :key="1" value="1">
						<span> Count Records </span>			
					</option>
				</select>
			</span>

			<button class="sc-button sc-button-flat sc-button-flat-primary waves-effect waves-button waves-primary" @click="onRefreshPage">
				<i class="mdi mdi-sync sc-icon-22 md-color-black"></i>
			</button>
		</div>
	</div>
</template>
  
<script>
export default {
	props: {
		currentPage: {
			type: Number,
			required: true,
			default: 1
		},
		isNextDisabled: {
			type: Boolean,
			required: true,
			default: false
		},
		loading: {
			type: Boolean,
			required: false,
			default: false
		},
		resultLength: {
			type: Number,
			required: true,
			default: 0
		},
		totalRecords: {
			type: Number,
			required: false,
			default: 0
		},
		filterClicked: {
			type: Number,
			required: true,
			default: 0
		}
	
	},

	data () {
		return {
			isCountMode: '0',
			displayRecord :10,
			displayRow: [10, 25, 50, 100, 200],
		};
	},
	computed: {
		isFirstPage () {
			return this.currentPage === 1;
		}
	},

	watch: {
		filterClicked (newVal, oldVal) {
			
		  if(newVal != oldVal){
				this.isCountMode= '0'
				this.onRefreshPage();
		  }
		}
	},

	methods: {
		goToFirstPage () {
			this.$emit('updatePage', 'first', 'first');
		},
		goToPreviousPage () {
			if (this.currentPage > 1) {
				this.$emit('updatePage', this.currentPage - 1, 'backward');
			}
		},
		goToNextPage () {
			this.$emit('updatePage', this.currentPage + 1, 'forward');
		},
		goToLastPage () {
			this.$emit('updatePage', 'last', 'last');
		},
		onCalculateCount (event) {
			if(String(event.target.value) == '1'){
				this.$emit('updatePage', 'count');
			}
		},
		onRefreshPage () {
			this.$emit('updatePage', 'refresh', 'forward', (String(this.isCountMode) == '1'));
		},
		onDisplayRecordChange (event) {
			if(this.isCountMode){
				this.$emit('displayRecord', event.target.value, true);
			}else{
				this.$emit('displayRecord', event.target.value, false);
			}
			
		}
	}
};
</script>
  
  <style scoped>
  .pagination {
    display: flex;
    align-items: center;
    justify-content: right;
  }
  .styled-select {
  font-size: 13px; /* Adjust font size */
  padding: 2px; /* Add padding */
  border: 0px solid #000; /* Customize border */
  border-radius: 2px; /* Add border radius */
}

.font-style-span {
	font-size: 13px; /* Adjust font size */
	padding: 2px; /* Add padding */
	display: inline-block;
    min-width: fit-content;
}

.styled-select:hover {
  border:  1px solid #000000; /* Change border color on hover */
}

.styled-select:focus {
  outline: none; /* Remove the default outline */
}


  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  </style>