<template>
	<div>
		<slot></slot>
	</div>
</template>
<style>
	.sc-vue-input{
		height: 30px !important;
    border-radius: 5px !important;

	}
</style>
<script>

import "@/assets/scss/plugins/daterangepicker.scss";
import "@/assets/js/vendor/date-range-picker/src/jquery.daterangepicker";

export default {
	props: {
		config: {
			type: Object,
			default: () => {}
		}
	},
	mounted () {
		let _config = {
			separator: '~',
			customArrowPrevSymbol: '<i class="mdi mdi-chevron-left md-color-white"></i>',
			customArrowNextSymbol: '<i class="mdi mdi-chevron-right md-color-white"></i>',
			startOfWeek: 'monday',
			customOpenAnimation (cb) {
				$(this).css({'transform': 'translateY(-20px)'}).fadeIn(280, cb).css({'transform': 'translateY(0)'});
			},
			customCloseAnimation (cb) {
				$(this).fadeOut(140, cb).css({'transform': 'translateY(-20px)'});
			}
		};
		const config = $.extend(_config, this.config);

		const input = this.$el.children[0].querySelector('input');
		$(input ? input : this.$el.children).dateRangePicker(config);

		const $dpWrapper = $('.date-picker-wrapper');
		// style range input
		$dpWrapper.find('input[type="range"]').addClass('uk-range');
		// remove &nbsp; in shortcuts
		const $shortcuts  = $dpWrapper.find('.footer > .shortcuts');
		if($shortcuts.length)  {
			// $shortcuts.html().replace(/&nbsp;/g, '');
		}
	}
}
</script>
