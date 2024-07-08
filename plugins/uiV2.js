
import '~/assets/scss/v2/main.scss';
import AppIconButton from '~/components/AppIconButton';
import AppPrimaryLoader from '~/components/AppPrimaryLoader';
import AppSecondaryLoader from '~/components/AppSecondaryLoader';
import ProcessResult from '~/components/AppProcessResult';
import Button from '~/components/AppButton';
import Icon from '~/components/AppIcon';
import Modal from '~/components/AppModal';
import EvolveModule from '~/components/EvolveModule';
import EvolveModuleContent from '~/components/EvolveModuleContent';
import EvolveTopActionBar from '~/components/EvolveTopActionBar';
import LazyImage from '~/components/AppLazyImage';
export default defineNuxtPlugin((nuxtApp) => {

  // Register global filter
  // nuxtApp.vueApp.config.globalProperties.$filters = {
  //   truncateString(value) {
  //     const length = 15;
  //     if (value.length <= length) {
  //       return value;
  //     }
  //     return value.substring(0, length).concat('...');
  //   },
  // };

  // Register global components
  nuxtApp.vueApp.component('app-icon', Icon);
  nuxtApp.vueApp.component('app-icon-button', AppIconButton);
  nuxtApp.vueApp.component('app-primary-loader', AppPrimaryLoader);
  nuxtApp.vueApp.component('app-secondary-loader', AppSecondaryLoader);
  nuxtApp.vueApp.component('app-process-result', ProcessResult);
  nuxtApp.vueApp.component('app-button', Button);
  nuxtApp.vueApp.component('app-modal', Modal);
  nuxtApp.vueApp.component('evolve-module', EvolveModule);
  nuxtApp.vueApp.component('evolve-module-content', EvolveModuleContent);
  nuxtApp.vueApp.component('evolve-top-action-bar', EvolveTopActionBar);
  nuxtApp.vueApp.component('app-lazy-image', LazyImage);
});