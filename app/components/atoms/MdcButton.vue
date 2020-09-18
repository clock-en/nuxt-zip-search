<template>
  <component
    :is="tagName"
    :type="tagName === 'button' ? type : ''"
    :to="tagName === 'nuxt-link' ? to : ''"
    class="mdc-button"
    :class="isVariant ? `mdc-button--${variant}` : ''"
    :disabled="disabled"
  >
    <span class="mdc-button__ripple"></span>
    検索
  </component>
</template>

<script>
export default {
  props: {
    variant: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'button',
    },
    to: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      tagName: 'button',
      isVariant: false,
    };
  },
  created() {
    if (this.to !== '') {
      this.tagName = 'nuxt-link';
    }
    if (this.variant !== '') {
      this.isVariant = true;
    }
  },
};
</script>
