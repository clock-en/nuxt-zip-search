/**
 * validation.js
 * @fileoverview バリデーションクラスを管理
 */

class Validation {
  constructor(formId, formModel) {
    this.form = document.getElementById(formId);
    this.messages = {
      notBlank: 'をご入力ください。',
      isSingle: 'は半角でご入力ください。',
      isZip: '形式でご入力ください。',
    };
    this.formModel = formModel;
    this.patterns = {
      alphabetsPattern: 'a-zA-Z',
      multiAlphabetsPattern: 'ａ-ｚＡ-Ｚ',
      numbersPattern: '0-9',
      multiNumbersPattern: '０-９',
      symbolsPattern:
        '"' +
        "!#\\$%&'\\(\\)\\*\\+,\\-\\.\\\\/:;<=>\\?@\\[\\]\\^_`\\{\\|\\}！＃＄％＆（）＊＋，－．／：；＜＝＞？＠［］＾＿｀｛｜｝~ 　",
    };
    this.results = {};
  }

  /**
   * バリデーションの初期化処理を実行
   *
   * @returns {void}
   */
  initialize() {
    Object.keys(this.formModel).forEach((id) => {
      this.results[id] = this.validate(id);
    });
  }

  /**
   * 入力項目変更時の処理
   *
   * @param {string} id
   * @returns {void}
   */
  handleInput(id) {
    this.results[id] = this.validate(id);
  }

  /**
   * 結果オブジェクトを取得
   *
   * @returns {void}
   */
  fetchResults() {
    return this.results;
  }

  /**
   * バリデートを実行
   *
   * @param {string} id
   * @returns {string}
   */
  validate(id) {
    const model = this.formModel[id];
    const element = document.getElementById(id);
    const value = element.value;
    let result = 'valid';
    model.rules.some((rule) => {
      if (!this[rule](value)) {
        result = rule;
        return true;
      }
    });

    return result;
  }

  /**
   * バリデーション：必須チェック
   *
   * @param {string} value
   * @returns {boolean}
   */
  notBlank(value) {
    let result = true;

    /* 値が空の場合は結果をfalseに設定 */
    if (value === '') {
      result = false;
    }
    return result;
  }

  /**
   * バリデーション：半角チェック
   *
   * @param {string} value
   * @returns {boolean}
   */
  isSingle(value) {
    let result = true;
    const alphabets = this.patterns.alphabetsPattern;
    const numbers = this.patterns.numbersPattern;
    const symbols = this.patterns.symbolsPattern;
    const pattern = new RegExp(
      '^[' + alphabets + numbers + symbols + ' 　' + ']+$'
    );

    /* 値が一致しない場合は結果をfalseに設定 */
    if (value !== '' && !value.match(pattern)) {
      result = false;
    }
    return result;
  }

  /**
   * バリデーション：郵便番号形式チェック
   *
   * @param {string} value
   * @returns {boolean}
   */
  isZip(value) {
    let result = true;
    const pattern = new RegExp('^[0-9]{3}-?[0-9]{4}$');

    /* 郵便番号形式（ハイフンは任意）に一致しない場合は結果をfalseに設定 */
    if (value !== '' && !value.match(pattern)) {
      result = false;
    }
    return result;
  }
}

export default Validation;
