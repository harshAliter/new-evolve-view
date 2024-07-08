<template>
	<div class="uk-flex">
		<div v-if="pages.length>0" id="side" class="uk-block">
			<div>x: {{ currentField.x }}</div>
			<div>y: {{ currentField.y }}</div>
			<div>w: {{ currentField.width }}</div>
			<div>h: {{ currentField.height }}</div>
			<div>index: {{ currentIndex }}</div>
			<button @click="resetPdfDetails">
				Reset All
			</button>
			<button @click="savePdfDetails">
				Save All
			</button>
			<pre>
				
      {{ pages[pagesIndex].fields }}
	  
      </pre>
		</div> 
	
	
		<div
			v-for="(p,index) in pages"
			:key="index"
			class="page uk-flex-column"
			:style="{ width: p.width + 'cm', height: p.height + 'cm' }"
		>
			<VueDraggableResizable
				v-for="(rect, index1) in p.fields"
				:key="rect.index1"
				
				class="field"
				:x="rect.x"
				:y="rect.y"
				:w="rect.width"
				:h="rect.height"
				
				@activated="onActivated(index,index1);"
				@dragstop="onDragStop"
				@resizestop="onResizeStop"
			>
				<!-- <p >{{ rect.text }}</p> -->
				<span contenteditable="true" :text="rect.text" @blur="updateText($event,index,index1)">

					{{ rect.text }}
				</span>
			</VueDraggableResizable>
		</div>
	</div>
</template>

<script>
// import VueDragResize from "vue-drag-resize";
// import FreeTransform from "vue-free-transform";
import VueDraggableResizable from "vue-draggable-resizable";

export default {
	components: {
		// VueDragResize,
		// FreeTransform,
		VueDraggableResizable
	},
	props: {
		pdfdata: {
			type: Array,
			default: () => []
		},
		updatedPdfData:{
			type: Function,
			default: () => {}
		}
		
	},
	data () {
		return {
			currentField: {},
			currentIndex: null,
			pagesIndex:0,
			resetfeildsData:[],
			pages: [],
			fields: []
		};
	},
	created: async function () {
		
	},
	mounted () {
		if (this.pdfdata.length>0) {
			this.onPdfData()
		}
		
	},
	methods: {
		onActivated (index, index1) {
			this.currentIndex = index1;
			this.pagesIndex = index;
			this.currentField.x = this.pages[index].fields[this.currentIndex].x;
			this.currentField.y = this.pages[index].fields[this.currentIndex].y;
			this.currentField.width = this.pages[index].fields[this.currentIndex].width;
			this.currentField.height = this.pages[index].fields[this.currentIndex].height;
		
			
		},
		onResizeStop (x, y, width, height) {
		
			this.pages[this.pagesIndex].fields[this.currentIndex].x = x;
			this.pages[this.pagesIndex].fields[this.currentIndex].y = y;
			this.pages[this.pagesIndex].fields[this.currentIndex].width = width;
			this.pages[this.pagesIndex].fields[this.currentIndex].height = height;
			this.currentField.x = x;
			this.currentField.y = y;
			this.currentField.width = width;
			this.currentField.height = height;
		},
		onDragStop (x, y) {
		
			this.pages[this.pagesIndex].fields[this.currentIndex].x = x;
			this.pages[this.pagesIndex].fields[this.currentIndex].y = y;
			this.currentField.x = x;
			this.currentField.y = y;
		
		},
		resetPdfDetails () {
		
			// let x=100,	y= 100,	width= 200,	height= 30;
			let data = this.pages[this.pagesIndex].fields;
			for (let i = 0; i < data.length; i++) {				
				this.pages[this.pagesIndex].fields[i].x =x*i;
				this.pages[this.pagesIndex].fields[i].y =y*i;
				this.currentField.x = x*i;
				this.currentField.y = y*i

			}
		},
		savePdfDetails () {
			console.log('this.pages on save', this.pages);
			this.$emit('updatedPdfData', this.pages);
	
		},
		onPdfData:function (){
			try {
				// let x=100,	y= 100,	width= 200,	height= 30, cnt = 1;
				for (let i = 0; i < 1; i++) {
					this.pages.push({ pageNumber:i+1, width: 21, height: 29.7, fields:[] })
					// for (let j = 0; j < this.pdfdata.length; j++) {
					for (let j = 0; j < 5; j++) {
						let xx=(this.pdfdata[j].x)/30;
						let yy=(this.pdfdata[j].y)/30;
						this.pages[i].fields.push({
							id:i,
							pageNumber: i+1,
							x:  parseInt(600*xx),
							y: parseInt(900*yy),
							width:this.pdfdata[j].w,
							height:20,
							isActive: false,
							text:this.pdfdata[j].R[0].T

						})
						// ++cnt
					}
				}
				this.resetfeildsData= [...this.pages]
			} catch (error) {
				console.log("Error In Creating Page", error);
			}
		},
		updateText:function (text, index, index1){
			try {
				// this.currentField.text = text;
				this.pages[index].fields[index1].text=text.target.innerText
				console.log('text::::::::: updateText', text.target.innerText);
			} catch (error) {
				console.log("Error At Updating Text Field");
			}
		},
	
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#side { 
  overflow-y: auto;
  width:250px;

  padding: 5px;
  background-color: #eee;
  border-right: 1px solid #ccc;
}
#side div {
  border: 1px solid #ddd;
  background-color: #ffffff;
  padding: 10px;
  margin-bottom: 5px;
}
.page {
float: right;
margin:15px;
margin-bottom: 5px;
background: white;  
  box-shadow: 0 0 0.5cm rgba(0,0,0,0.5);
  position: relative;
}
.field {
  position: absolute;
  /* border: 1px solid #eee; */  
  background-color: #fe90ce;
  padding: 0%;
  margin: 0%;
  border:none;
  font-size: 12px;
}
</style>
