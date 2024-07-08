<template>
	<div>
		<!-- <PageHeaderBar :menuid="EvolveMenu_Id"
			:pageurl="pageURL"
			:buttons="buttonsList"
			@downloadPdf="downloadFile()"
			@onClickBtn="onClickBtn"
		/> -->
		<!-- <button @click="onFileUpload">
			sewe
		</button> -->
		<input :id="id"
			ref="uploadFile"
			style="display:none;"
			dispay="none"
			type="file"
			accept=".csv"
			class="uk-input"
			multiple
			@change="uploadpdf()"
		>
	</div>
</template>

<script>
import PageHeaderBar from "~/components/cust/PageHeaderBar";
export default {
	name: "FileUpload",
	components: {
		// PageHeaderBar
	},
	props: {
		id: {
			type: String,
			default: null,
		},
		onclick: {
			type: String,
			default: ''
		}
	},
	data: () => ({
		buttonsList: [
			{
				lable: 'File Download',
				code: 'downloadFile'
			},
			{
				lable: 'File Upload',
				code: 'onFileUpload'
			},

		],
	}),
	created: async function () {

		if (this.onclick != '' && this.onclick == 'onFileUpload') {
			this.onFileUpload()
		}
	},
	mounted () {
	},

	methods: {

		uploadpdf () {

			this.$emit('uploadpdf', this.$refs.uploadFile.files[0]);
		},

		onClickBtn: async function (code) {
			try {
				this[code]()

			} catch (error) {

			}
		},


		onFileUpload: async function () {

			document.getElementById("uploadFile").click(); //do something}
		},

		async downloadFile () {
			try {
				let filename = "file";
				let fileData = [];
				let fileContent = fileData.map((e) => e.join(",")).join("\n");
				let file;
				let downloadLink;
				// CSV FILE
				file = new Blob([fileContent], { type: "text" });
				// Download link
				downloadLink = document.createElement("a");
				// File name
				downloadLink.download = filename + ".csv";
				// We have to create a link to the file
				downloadLink.href = window.URL.createObjectURL(file);
				// Make sure that the link is not displayed
				downloadLink.style.display = "none";
				// Add the link to your DOM
				document.body.appendChild(downloadLink);
				// Lanzamos
				downloadLink.click();
			} catch (error) {
				console.log("log>>>>>error", error);
				this.$store.dispatch('evolveNotification', { code: 111, type: 2, var: [error.message] });
			}

		},

	},
};
</script>
