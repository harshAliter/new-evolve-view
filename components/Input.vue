<template>
  <div
    class="sc-input-wrapper"
    :class="{
      'sc-input-wrapper-outline': mode === 'outline',
      'sc-input-wrapper-disabled': disabled,
      'sc-input-wrapper-danger': errorClass,
      'sc-input-wrapper-success': successClass,
      'sc-input-filled': value !== '' || state === 'fixed' || inputFocused,
      'sc-input-focus': inputFocused,
    }"
  >
    <slot name="icon"></slot>
    <slot></slot>
    <input
      :id="id"
      ref="input"
      :name="name"
      :tabindex="tabindex"
      :placeholder="placeholder"
      :type="type"
      :value="modelValue"
      :class="[
        'uk-input',
        'sc-vue-input',
        modeClass,
        inputErrorClass,
        inputSuccessClass,
        extraClasses,
      ]"
      :disabled="disabled"
      :readonly="readOnly"
      :maxlength="parseInt(maxLength)"
      autocomplete="off"
      @focus="focusChange($event)"
      @keyup.enter="onClickEnter($event)"
      @blur="inputBlur"
      @change="change"
      @input="updateModel($event)"
      @keyup="keyUp"
    />
    <span v-if="mode !== 'outline'" class="sc-input-bar"></span>
    <slot name="help-inline"></slot>
    <br />
  </div>
</template>
<script>
import $ from "jquery";
export default {
  name: "ScInput",
  props: {
    id: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      default: null,
    },
    tabindex: {
      type: String,
      default: "0",
    },
    type: {
      type: String,
      default: "text",
    },
    value: {
      type: [String, Number],
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    readOnly: {
      type: Boolean,
      default: false,
    },
    mode: {
      type: String,
      default: "",
    },
    state: {
      type: String,
      default: "",
    },
    extraClasses: {
      type: String,
      default: "",
    },
    successClass: {
      type: Boolean,
      default: false,
    },
    errorClass: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: null,
    },
    ukTooltip: {
      type: Object,
      default: null,
    },
    focus: {
      type: Function,
      default: () => {},
    },
    blur: {
      type: Function,
      default: () => {},
    },
    change: {
      type: Function,
      default: () => {},
    },
    keyUp: {
      type: Function,
      default: () => {},
    },
    validator: {
      type: Object,
      default: null,
    },
    maxLength: {
      type: String,
      default: null,
    },
    modelValue: {
      type: [String, Number],
      default: "",
    },
  },
  data() {
    return {
      inputFocused: false,
    };
  },
  emits: ["update:modelValue", "click", "focus", "blur", "enter"],
  computed: {
    modeClass() {
      return this.$props.mode === "outline" ? "sc-input-outline" : "";
    },
    inputErrorClass() {
      return this.$props.errorClass ? "uk-form-danger" : "";
    },
    inputSuccessClass() {
      return this.$props.successClass ? "uk-form-success" : "";
    },
  },
  mounted() {
    try {
      var self = this;
      var $input = $(this.$refs.input);
      if (this.ukTooltip) {
        UIkit.tooltip($input, self.ukTooltip);
      }
      $input
        .on("change", function () {
          self.updateInput();
        })
        .on("focus", function () {
          self.inputFocused = true;
        });
    } catch (error) {
      console.error("Error While Mounted ScImput", error.message);
    }
  },
  methods: {
    updateInput() {
      var $input = $(this.$refs.input);
      // clear wrapper classes
      $input
        .closest(".uk-input-group")
        .removeClass("uk-input-group-danger uk-input-group-success");
      $input
        .closest(".sc-input-wrapper")
        .removeClass("sc-input-wrapper-danger sc-input-wrapper-success");

      if ($input.hasClass("uk-form-danger")) {
        if ($input.closest(".uk-input-group").length) {
          $input.closest(".uk-input-group").addClass("sc-input-group-danger");
        }
        $input.closest(".sc-input-wrapper").addClass("sc-input-wrapper-danger");
      }
      if ($input.hasClass("uk-form-success")) {
        if ($input.closest(".uk-input-group").length) {
          $input.closest(".uk-input-group").addClass("sc-input-group-success");
        }
        $input
          .closest(".sc-input-wrapper")
          .addClass("sc-input-wrapper-success");
      }
    },
    updateModel(e) {
      this.$emit("update:modelValue", e.target.value);
    },
    focusChange(e) {
      this.$emit("focus", e.target.value);
    },
    onClickEnter(e) {
      this.$emit("enter", e.target.value);
    },
    inputBlur() {
      this.inputFocused = false;
      this.$emit("blur");
      if (this.validator) {
        this.validator.$touch();
      }
    },
  },
};
</script>
