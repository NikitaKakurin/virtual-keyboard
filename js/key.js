import createOneElement from './commonFunctions.js';

class Key {
  constructor(options) {
    this.options = options;
    this.lang = 'en';
  }

  initKey() {
    this.container = createOneElement('div', this.options.class);
    this.container.dataset.code = this.options.code;
    this.isOptionalKey = !this.container.classList.contains('key');
    this.setContent(this.container);
  }

  setContent(element) {
    const TARGET = element;
    if (this.isOptionalKey) {
      TARGET.textContent = this.options.main;
      return;
    }
    if (this.options[this.lang].additional !== undefined) {
      this.additional = createOneElement('div', ['key__additional'], this.options[this.lang].additional);
      TARGET.append(this.additional);
    }
    this.main = createOneElement('div', ['key__main'], this.options[this.lang].main);
    TARGET.append(this.main);
  }

  changeLang(lang) {
    if (this.isOptionalKey) {
      return;
    }
    this.lang = lang;
    this.container.innerHTML = '';
    if (this.options[lang].additional !== undefined) {
      this.additional = createOneElement('div', ['key__additional'], this.options[lang].additional);
      this.container.append(this.additional);
    } else {
      this.additional = undefined;
    }

    this.main = createOneElement('div', ['key__main'], this.options[lang].main);
    this.container.append(this.main);
  }

  replaceMain() {
    this.additional.classList.toggle('main');
    this.main.classList.toggle('additional');
    return false;
  }

  contentToggleCase() {
    this.container.classList.toggle('capitalize');
    return false;
  }

  push() {
    if (this.container.classList.contains('key-optional')
    || this.container.classList.contains('key-arrow')) {
      this.container.classList.add('key-optional-push');
      return;
    }
    this.container.classList.add('key-push');
  }

  up() {
    if (this.container.classList.contains('key-optional')
    || this.container.classList.contains('key-arrow')) {
      this.container.classList.remove('key-optional-push');
      return;
    }
    this.container.classList.remove('key-push');
  }

  getKey() {
    return this.container;
  }
}

export default Key;
