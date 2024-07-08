<script>
require('~/plugins/highcharts');
export default {
	name: 'HighChart',
	props: {
		data: {
			type: Object,
			default: function () { return {} }
		},
		options: {
			type: Object,
			default: function () { return {} }
		}
	},
}
</script>