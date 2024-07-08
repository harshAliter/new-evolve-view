// plugins/eventBus.js
import { TinyEmitter } from 'tiny-emitter';

const emitter = new TinyEmitter();

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('eventBus', {
    $on: (...args) => emitter.on(...args),
    $once: (...args) => emitter.once(...args),
    $off: (...args) => emitter.off(...args),
    $emit: (...args) => emitter.emit(...args),
  });
});
