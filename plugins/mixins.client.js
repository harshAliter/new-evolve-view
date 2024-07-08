import AppLogo from "~/assets/logo/logo.png";
import jQuery from "~/plugins/jquery.client";

export default defineNuxtPlugin((nuxtApp) => {
	if (import.meta.client) {
        window.$ = jQuery;
    }
	nuxtApp.vueApp.mixin({
		methods: {
			loaderShow (css, container, ratio, color) {
				var $spinner = $('.overly');
				if ($spinner.length) {
					$spinner.remove();
				}
				var $body = $('body');
				var _container = container || $body;
				var spinner = css ? '<div class="loader"></div>' : '<div class="' + (color || 'loader') + '"><span> </span> <span> </span> <img src="'+ AppLogo +'"> </div>';
				var fixed = (_container === $body) ? ' fixed' : '';
				$(_container).append('<div style="" class="overly"  >' + spinner + '</div>');
			},
			loaderHide () {
				// var $spinner = $('.sc-spinner-overlay');
				var $spinner = $('.overly');
				// $spinner.removeClass('enter');
				$spinner.remove();
				// $spinner.css({ "text-align": "", "z-index": "", "position": "", "width": "", "height": '', "top": "", "left": "", "padding-top": "", "font-size": "", "right": "", "bottom": "", "background-color": "", "cursor": "" });
				setTimeout(function () {
				}, 300)
			}
		}
	});
})
