import ALL_KEYS_OBJ from './allKeysObj.js';
import createOneElement from './commonFunctions.js';
import Key from './key.js';

class Keyboard {
  constructor() {
    this.keyboardContainer = createOneElement('div', 'keyboard__container');
    this.textareaContainer = createOneElement('div', 'keyboard__blank');
    this.textarea = createOneElement('textarea', 'keyboard__textarea');
    this.lang = 'en';
    this.textarea.id = 'blank';
    this.textarea.name = 'blank';
    this.textarea.value = '';
    this.textareaContainer.append(this.textarea);
    this.keyboardContainer.append(this.textareaContainer);
  }

  initKeyboard() {
    this.keyboard = createOneElement('div', 'keyboard');
    this.createRows();
    this.setKeysObj();
    this.insertKeys();
    this.keyboardContainer.append(this.keyboard);
    this.isCapsLockPush = false;
    this.isCapsLockUp = true;
    this.isShiftPush = false;
    this.isCtrlPush = false;
    this.isAltPush = false;
    this.keysArray = Object.values(this.keysObj);
    this.setSingleKey();
    this.setDoubleKey();
  }

  handlePushAlt() {
    this.isAltPush = true;
    this.checkChangeLang();
  }

  handleUpAlt() {
    this.isAltPush = false;
  }

  handlePushCtrl() {
    this.isCtrlPush = true;
    this.checkChangeLang();
  }

  handleUpCtrl() {
    this.isCtrlPush = false;
  }

  checkChangeLang() {
    if (!(this.isAltPush && this.isCtrlPush)) {
      return false;
    }
    if (this.lang === 'en') {
      this.lang = 'ru';
    } else {
      this.lang = 'en';
    }

    this.changeLang();
    return false;
  }

  changeLang() {
    this.keysArray.forEach((key) => key.changeLang(this.lang));
    this.setSingleKey();
    this.setDoubleKey();
  }

  setSingleKey() {
    this.keysSingle = this.keysArray.filter(
      (key) => (key.additional === undefined) && (key.main !== undefined),
    );
  }

  setDoubleKey() {
    this.keysDouble = this.keysArray.filter((key) => key.additional !== undefined);
  }

  handlePushCapsLock() {
    if (!this.isCapsLockUp) {
      return false;
    }
    if (this.isCapsLockPush) {
      this.keysSingle.forEach((key) => {
        key.contentToggleCase();
      });
      this.isCapsLockPush = false;
    } else {
      this.keysSingle.forEach((key) => {
        key.contentToggleCase();
      });
      this.isCapsLockPush = true;
    }
    this.isCapsLockUp = false;
    return false;
  }

  handleUpCapsLock() {
    this.isCapsLockUp = true;
  }

  handlePushShift() {
    if (!this.isShiftPush) {
      this.keysSingle.forEach((key) => {
        key.contentToggleCase();
      });
      this.keysDouble.forEach((key) => {
        key.replaceMain();
      });
    }
    this.isShiftPush = true;
  }

  handleUpShift() {
    this.isShiftPush = false;
    this.keysSingle.forEach((key) => {
      key.contentToggleCase();
    });
    this.keysDouble.forEach((key) => {
      key.replaceMain();
    });
  }

  handleKeyDown(key) {
    this.keysObj[key].push();
  }

  handleKeyUp(key) {
    this.keysObj[key].up();
  }

  setKeysObj() {
    this.keysObj = {};
    const KEYS_ENTRIES = Object.entries(ALL_KEYS_OBJ);
    KEYS_ENTRIES.forEach((pairs) => {
      const [KEY, VALUE] = pairs;
      VALUE.code = KEY;
      this.keysObj[KEY] = new Key(VALUE);
      this.keysObj[KEY].lang = this.lang;
      this.keysObj[KEY].initKey();
    });
  }

  createRows() {
    this.rows = [];
    for (let index = 0; index < 5; index += 1) {
      const row = createOneElement('div', 'keyboard__row');
      this.rows.push(row);
    }
    this.keyboard.append(...this.rows);
  }

  insertKeys() {
    const values = Object.values(this.keysObj);
    const limit = values.length;

    for (let index = 0; index < limit; index += 1) {
      if (index < 14) {
        this.rows[0].append(values[index].getKey());
      } else if (index < 28) {
        this.rows[1].append(values[index].getKey());
      } else if (index < 42) {
        this.rows[2].append(values[index].getKey());
      } else if (index < 55) {
        this.rows[3].append(values[index].getKey());
      } else {
        this.rows[4].append(values[index].getKey());
      }
    }
  }

  print(keyCode) {
    const selectedStart = this.textarea.selectionStart;
    const selectedEnd = this.textarea.selectionEnd;
    const firstPartText = this.textarea.value.slice(0, selectedStart);
    const secondPartText = this.textarea.value.slice(selectedStart);
    const KEY = this.keysObj[keyCode];
    let letter;

    const setCaret = (step) => {
      let start = selectedStart + step;
      let end = selectedEnd + step;
      if (start < 0) {
        start = 0;
      } else if (start > this.textarea.value.length) {
        start = this.textarea.value.length;
      }

      if (end < 0) {
        end = 0;
      } else if (end > this.textarea.value.length) {
        end = this.textarea.value.length;
      }
      this.textarea.selectionStart = start;
      this.textarea.selectionEnd = end;
    };

    if (keyCode === 'Delete') {
      this.textarea.value = `${firstPartText}${secondPartText.slice(1)}`;
      setCaret(0);
      return false;
    }

    if (keyCode === 'Backspace') {
      this.textarea.value = `${firstPartText.slice(0, -1)}${secondPartText}`;
      setCaret(-1);
      return false;
    }

    if (keyCode === 'Space') {
      this.textarea.value = `${firstPartText} ${secondPartText}`;
      setCaret(1);
      return false;
    }

    if (keyCode === 'Tab') {
      this.textarea.value = `${firstPartText}\t${secondPartText}`;
      setCaret(1);
      return false;
    }

    if (keyCode === 'Enter') {
      this.textarea.value = `${firstPartText}\n${secondPartText}`;
      setCaret(1);
      return false;
    }

    if (KEY.container.classList.contains('key-optional')) {
      return false;
    }

    if (KEY.container.classList.contains('key-arrow')) {
      this.textarea.value = `${firstPartText}${KEY.container.textContent}${secondPartText}`;
      return false;
    }

    if (KEY.additional === undefined) {
      if (KEY.container.classList.contains('capitalize')) {
        letter = KEY.main.textContent.toUpperCase();
      } else {
        letter = KEY.main.textContent;
      }
      this.textarea.value = `${firstPartText}${letter}${secondPartText}`;
      setCaret(1);
      return false;
    }

    if (KEY.main.classList.contains('additional')) {
      letter = KEY.additional.textContent;
    } else {
      letter = KEY.main.textContent;
    }
    this.textarea.value = `${firstPartText}${letter}${secondPartText}`;
    setCaret(1);
    return false;
  }

  getKeyboard() {
    return this.keyboardContainer;
  }
}

export default Keyboard;
