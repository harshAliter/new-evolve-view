<template>
	<div>
		<input 
			id="uploadFile"
			ref="uploadFile"
			style="display:none;"
			dispay="none"
			type="file"
			accept=".txt"
			class="uk-input"
			multiple
			@change="uploadFile()"
		>
	</div>
</template>

<script>

export default {
	name: "FileUpload",
	components: {},
	props: {
		

	},
	data: () => ({
	
	}),
	created: async function () {
	},
	mounted () {
	 
	},
	methods: {
		onRefresh (e) {
			this.$emit('onRefresh', 'CLICK');
		},
		  uploadFile: async function (){
			console.log("calleddddd>>>>>");
			this.$emit('uploadFile', this.$refs.uploadFile.files[0] );
		}


	},
};
</script>
