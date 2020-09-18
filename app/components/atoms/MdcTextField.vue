<template>
  <div class="mdc-text-field mdc-text-field--outlined text-field">
    <input
      :id="idName"
      class="mdc-text-field__input"
      type="text"
      :name="name"
      :maxlength="maxlength > 0 ? maxlength : ''"
      @input="handleInput(idName)"
    />
    <div class="mdc-notched-outline">
      <div class="mdc-notched-outline__leading"></div>
      <div class="mdc-notched-outline__notch">
        <label :for="idName" class="mdc-floating-label">{{
          placeholder
        }}</label>
      </div>
      <div class="mdc-notched-outline__trailing"></div>
    </div>
  </div>
</template>

<script>
import { MDCTextField } from '@material/textfield';

export default {
  props: {
    name: {
      type: String,
      required: true,
      default: '',
    },
    id: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    maxlength: {
      type: Number,
      default: 0,
    },
    handleInput: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      idName: '',
    };
  },
  created() {
    if (this.id !== '') {
      this.idName = this.id;
    } else {
      this.idName = this.name;
    }
  },
  mounted() {
    MDCTextField.attachTo(document.querySelector('.mdc-text-field'));
  },
};
</script>
