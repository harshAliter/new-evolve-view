<template>
  <span
    class="vue-toggles"
    :style="bgStyle"
    role="switch"
    tabindex="0"
    :aria-checked="isChecked"
    :aria-readonly="disabled"
    @keyup.enter.prevent="toggle"
    @keyup.space.prevent="toggle"
    @click="toggle"
  >
    <span aria-hidden="true" :style="dotStyle" class="vue-toggles__dot">
    </span>
  </span>
</template>

<script>
  export default {
    props: {
      modelValue: {
        type: Boolean,
        default: false,
      },
      value: {
        type: Boolean,
        default: undefined,
      },
      width: {
        type: Number,
        default: 40,
      },
      height: {
        type: Number,
        default: 20,
      },
      dotColor: {
        type: String,
        default: "#ffffff",
      },
      uncheckedBg: {
        type: String,
        default: "lightgray",
      },
      checkedBg: {
        type: String,
        default: "#5a87c5",
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      reverse: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        isChecked: this.value !== undefined ? this.value : this.modelValue,
      }
    },
    computed: {
      bgStyle() {
        return {
          width: `${this.width}px`,
          height: `${this.height}px`,
          background: this.isChecked ? this.checkedBg : this.uncheckedBg,
          opacity: this.disabled ? "0.5" : "1",
          cursor: this.disabled ? "not-allowed" : "pointer",
        }
      },
      dotStyle() {
        const marginValue = this.isChecked
          ? this.reverse
            ? "5px"
            : `${this.width - (this.height - 3)}px`
          : this.reverse
          ? `${this.width - (this.height - 3)}px`
          : "5px"
        return {
          background: this.dotColor,
          width: `${this.height - 8}px`,
          height: `${this.height - 8}px`,
          minWidth: `${this.height - 8}px`,
          minHeight: `${this.height - 8}px`,
          marginLeft: marginValue,
          transition: "margin ease 0.2s",
        }
      },
      textStyle() {
        return {
          color:
            this.isChecked && !this.disabled
              ? this.checkedTextColor
              : this.uncheckedTextColor,
          right: this.isChecked ? `${this.height - 3}px` : "auto",
          left: this.isChecked ? "auto" : `${this.height - 3}px`,
        }
      },
    },
    methods: {
      toggle() {
        if (!this.disabled) {
          this.isChecked = !this.isChecked
          this.$emit("update:modelValue", this.isChecked)
          this.$emit("change", this.isChecked)
        }
      },
    },
    watch: {
      value(newValue) {
        this.isChecked = newValue !== undefined ? newValue : this.modelValue
      },
      modelValue(newValue) {
        this.isChecked = newValue !== undefined ? newValue : this.value
      },
    },
  }
</script>

<style>
  .vue-toggles {
    display: flex;
    align-items: center;
    border-radius: 9999px;
    overflow: hidden;
    transition: background-color ease 0.2s, width ease 0.2s, height ease 0.2s;
  }

  .vue-toggles__dot {
    position: relative;
    display: flex;
    align-items: center;
    border-radius: 9999px;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    transition: margin ease 0.2s;
  }


  @media (prefers-reduced-motion) {
    .vue-toggles,
    .vue-toggles *,
    .vue-toggles *::before,
    .vue-toggles *::after {
      animation: none !important;
      transition: none !important;
      transition-duration: none !important;
    }
  }
</style>
