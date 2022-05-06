import ALL_KEYS_OBJ from './allKeysObj.js';
import createOneElement from './commonFunctions.js';
import Key from './key.js';

class Keyboard {
  constructor() {
    this.keyboardContainer = createOneElement('div', 'keyboard__container');
    this.textareaContainer = createOneElement('div', 'keyboard__blank');
    this.textarea = createOneElement('textarea', 'keyboard__textarea');
    this.textarea.id = 'blank';
    this.textarea.name = 'blank';
    this.textarea.value = '';
    this.textareaContainer.append(this.textarea);
    this.keyboardContainer.append(this.textareaContainer);
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
    this.lang = 'en';
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
        key.contentLowerCase();
      });
      this.isCapsLockPush = false;
    } else {
      this.keysSingle.forEach((key) => {
        key.contentUpperCase();
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
      this.keysObj[KEY] = new Key(VALUE);
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
    const KEY = this.keysObj[keyCode];

    if (keyCode === 'Space') {
      this.textarea.value += ' ';
      return false;
    }

    if (keyCode === 'Enter') {
      this.textarea.value += '\n';
      return false;
    }

    if (KEY.container.classList.contains('key-optional')) {
      return false;
    }

    if (KEY.additional === undefined) {
      if (KEY.container.classList.contains('capitalize')) {
        this.textarea.value += KEY.main.textContent.toUpperCase();
      } else {
        this.textarea.value += KEY.main.textContent;
      }
      return false;
    }

    if (KEY.main.classList.contains('additional')) {
      this.textarea.value += KEY.additional.textContent;
    } else {
      this.textarea.value += KEY.main.textContent;
    }
  }

  getKeyboard() {
    return this.keyboardContainer;
  }
}

export default Keyboard;
