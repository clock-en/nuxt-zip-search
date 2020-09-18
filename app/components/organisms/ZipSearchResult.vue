<template>
  <div id="zip-search-result" class="zip-search-result">
    <h2 class="mdc-typography--headline3">住所検索結果</h2>
    <p>郵便番号を入力し、検索ボタンをクリックしてください。</p>
    <div v-if="isSubmited">
      <div v-if="data.message !== null" class="form-error-message">
        {{ data.message }}
      </div>
      <div
        v-if="!data.results || data.results.length === 0"
        class="form-error-message"
      >
        該当する住所が見つかりませんでした。
      </div>
      <template v-if="data.results && data.results.length > 0">
        <div class="mdc-typography--headline5">
          {{ data.results.length }}件の住所が見つかりました。
        </div>
        <ul class="mdc-list" role="radiogroup">
          <li
            v-for="(item, index) in data.results"
            :key="`${item.zipcode}-${index}`"
            class="mdc-list-item"
            role="radio"
            aria-checked="false"
          >
            <label class="label-container">
              <span class="mdc-list-item__ripple"></span>
              <span class="mdc-list-item__graphic">
                <span class="mdc-radio">
                  <input
                    :id="`address-${item.zipcode}-${index}`"
                    class="mdc-radio__native-control"
                    type="radio"
                    name="address"
                    :value="item.address1 + item.address2 + item.address3"
                  />
                  <span class="mdc-radio__background">
                    <span class="mdc-radio__outer-circle"></span>
                    <span class="mdc-radio__inner-circle"></span>
                  </span>
                </span>
              </span>
              <span class="mdc-list-item__text"
                >{{ item.address1 }}{{ item.address2 }}{{ item.address3 }}</span
              >
            </label>
          </li>
        </ul>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
    isSubmited: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss">
.zip-search-result > *:first-child {
  margin-top: 0 !important;
}
.zip-search-result > *:last-child {
  margin-bottom: 0 !important;
}
.label-container {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
}
</style>
