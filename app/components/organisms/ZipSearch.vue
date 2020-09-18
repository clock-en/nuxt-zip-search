<template>
  <form id="zip-search" class="zip-search" @submit="handleSubmit">
    <div class="form-item-container">
      <MdcTextField
        :name="itemName"
        placeholder="郵便番号"
        :maxlength="8"
        :handle-input="handleInput"
      />
      <div class="mdc-typography--caption">※半角でご入力ください。</div>
      <div
        v-if="isInputed && results[itemName] && results[itemName] !== 'valid'"
        class="form-error-message"
      >
        {{ formModel[itemName].label
        }}{{ validation.messages[results[itemName]] }}
      </div>
    </div>
    <div class="zip-search__footer">
      <MdcButton variant="raised" type="submit" :disabled="isDisabled" />
    </div>
  </form>
</template>

<script>
import MdcTextField from '~/components/atoms/MdcTextField';
import MdcButton from '~/components/atoms/MdcButton';

import Validation from '~/assets/js/form-app/Validation';

export default {
  components: {
    MdcTextField,
    MdcButton,
  },
  props: {
    itemName: {
      type: String,
      default: 'zip',
    },
  },
  data() {
    return {
      validation: null,
      results: {},
      formId: 'zip-search',
      formModel: {
        [this.itemName]: {
          label: '郵便番号',
          rules: ['notBlank', 'isSingle', 'isZip'],
          filters: ['trim'],
        },
      },
      isInputed: false,
    };
  },
  computed: {
    /**
     * 送信ボタンの状態判定
     *
     * @returns {boolean}
     */
    isDisabled() {
      const result = Object.keys(this.results).every((id) => {
        return this.results[id] === 'valid';
      });
      return !result;
    },
  },
  mounted() {
    /* バリデーションクラスを起動し、初期化 */
    this.validation = new Validation(this.formId, this.formModel);
    this.validation.initialize();
    /* バリデーション結果オブジェクトを取得 */
    this.results = Object.assign(
      {},
      this.results,
      this.validation.fetchResults()
    );
  },
  methods: {
    /**
     * 入力項目変更時の処理
     *
     * @param {string} id
     * @returns {void}
     */
    handleInput(id) {
      this.isInputed = true;
      /* 項目の変更時に処理を実行 */
      this.validation.handleInput(id);
      /* バリデーション結果オブジェクトを取得 */
      this.results = Object.assign(
        {},
        this.results,
        this.validation.fetchResults()
      );
    },
    /**
     * 送信時の処理
     *
     * @param {string} id
     * @returns {void}
     */
    handleSubmit(e) {
      e.preventDefault();
      const zipcode = document.getElementById(this.itemName).value;
      this.$emit('submitZipcode', zipcode);
    },
  },
};
</script>

<style lang="scss">
.zip-search {
  &__footer {
    text-align: center;
    margin-top: 1em;
  }
}
</style>
