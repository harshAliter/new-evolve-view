<template>
	<div class="sc-progress sc-progress-large sc-progress-main">
		<div class="sc-progress-bar md-bg-red-400 sc-progress-width" :style="'width :'+per+'%'">
		</div>
		<div class="empty-space">
		</div>
	</div>
</template>
<style>
    .sc-progress-main{
        margin: 0 60px 0px 8px;
    }
    .empty-space{
        padding-left: 15px;
    }
	.sc-progress-width{
		height: 14px;
		text-align: center;
		line-height: 25px;
	}
</style>
<script>
export default {
	name: 'ProgressBar',
	props: {
		per: {
			type: Number,
			default: 0,
		},
		count: {
			type: Number,
			default: 0,
		},
	},
	computed: {
		
	}
}
</script>
