import Flatpickr from "flatpickr";
import '@/assets/scss/plugins/flatpickr.scss';
import 'flatpickr/dist/flatpickr.min.css';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('flatpickr', {
    mounted(el, binding) {
      const input = el.querySelector('input');
      const target = input || el;
      target._flatpickr = new Flatpickr(target, binding.value);
    },
    unmounted(el) {
      const input = el.querySelector('input');
      const target = input || el;
      if (target._flatpickr) {
        target._flatpickr.destroy();
        target._flatpickr = null;
      }
    },
  });
});
