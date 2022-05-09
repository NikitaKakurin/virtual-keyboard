import ALL_KEYS_OBJ from './allKeysObj.js';
import createOneElement from './commonFunctions.js';
import Key from './key.js';

class Keyboard {
  constructor() {
    this.keyboardContainer = createOneElement('div', 'keyboard__container');
    this.textareaContainer = createOneElement('div', 'keyboard__blank');
    this.textarea = createOneElement('textarea', 'keyboard__textarea');
    this.textareaWrapper = createOneElement('div', 'keyboard__textarea_wrapper');
    this.lang = 'en';
    this.textarea.id = 'blank';
    this.textarea.name = 'blank';
    this.textarea.value = '';
    this.textareaWrapper.append(this.textarea);
    this.textareaContainer.append(this.textareaWrapper);
    this.keyboardContainer.append(this.textareaContainer);
    this.copyBuffer = '';
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

    this.keysSingle.forEach((key) => {
      key.contentToggleCase();
    });
    if (this.isCapsLockPush) {
      this.isCapsLockPush = false;
    } else {
      this.isCapsLockPush = true;
    }
    this.isCapsLockUp = false;
    return false;
  }

  handleUpCapsLock() {
    this.isCapsLockUp = true;
  }

  handlePushShift() {
    if (this.isShiftPush) {
      return;
    }
    this.changeKeyByShift();
    this.isShiftPush = true;
  }

  handleUpShift() {
    this.isShiftPush = false;
    this.changeKeyByShift();
  }

  changeKeyByShift() {
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
      const ROW = createOneElement('div', 'keyboard__row');
      this.rows.push(ROW);
    }
    this.keyboard.append(...this.rows);
  }

  insertKeys() {
    const VALUES = Object.values(this.keysObj);
    const LIMIT = VALUES.length;

    for (let index = 0; index < LIMIT; index += 1) {
      if (index < 14) {
        this.rows[0].append(VALUES[index].getKey());
      } else if (index < 28) {
        this.rows[1].append(VALUES[index].getKey());
      } else if (index < 42) {
        this.rows[2].append(VALUES[index].getKey());
      } else if (index < 55) {
        this.rows[3].append(VALUES[index].getKey());
      } else {
        this.rows[4].append(VALUES[index].getKey());
      }
    }
  }

  print(keyCode) {
    this.textarea.focus();
    const SELECTED_START = this.textarea.selectionStart;
    const SELECTED_END = this.textarea.selectionEnd;
    const FIRST_PART_TEXT = this.textarea.value.slice(0, SELECTED_START);
    const SECOND_PART_TEXT = this.textarea.value.slice(SELECTED_END);
    const SELECTED_PART_TEXT = this.textarea.value.slice(SELECTED_START, SELECTED_END);
    const KEY = this.keysObj[keyCode];
    let letter;

    const setCaret = (step) => {
      let start = SELECTED_START + step;
      if (start < 0) {
        start = 0;
      } else if (start > this.textarea.value.length) {
        start = this.textarea.value.length;
      }

      this.textarea.selectionStart = start;
      this.textarea.selectionEnd = start;
    };

    if (keyCode === 'Delete') {
      if (SELECTED_PART_TEXT.length !== 0) {
        this.textarea.value = `${FIRST_PART_TEXT}${SECOND_PART_TEXT}`;
      } else {
        this.textarea.value = `${FIRST_PART_TEXT}${SECOND_PART_TEXT.slice(1)}`;
      }

      setCaret(0);
      return false;
    }

    if (keyCode === 'Backspace') {
      if (SELECTED_PART_TEXT.length !== 0) {
        this.textarea.value = `${FIRST_PART_TEXT}${SECOND_PART_TEXT}`;
        setCaret(0);
      } else {
        this.textarea.value = `${FIRST_PART_TEXT.slice(0, -1)}${SECOND_PART_TEXT}`;
        setCaret(-1);
      }

      return false;
    }

    if (keyCode === 'Space') {
      this.textarea.value = `${FIRST_PART_TEXT} ${SECOND_PART_TEXT}`;
      setCaret(1);
      return false;
    }

    if (keyCode === 'Tab') {
      this.textarea.value = `${FIRST_PART_TEXT}\t${SECOND_PART_TEXT}`;
      setCaret(1);
      return false;
    }

    if (keyCode === 'Enter') {
      this.textarea.value = `${FIRST_PART_TEXT}\n${SECOND_PART_TEXT}`;
      setCaret(1);
      return false;
    }

    if (KEY.container.classList.contains('key-optional')) {
      return false;
    }

    if (keyCode === 'KeyA' && this.isCtrlPush) {
      this.textarea.selectionStart = 0;
      this.textarea.selectionEnd = this.textarea.value.length;
      return false;
    }

    if (keyCode === 'KeyC' && this.isCtrlPush) {
      navigator.clipboard.writeText(SELECTED_PART_TEXT).then(() => {
        this.copyBuffer = SELECTED_PART_TEXT;
      }, () => {
        this.copyBuffer = SELECTED_PART_TEXT;
      });
      return false;
    }

    if (keyCode === 'KeyX' && this.isCtrlPush) {
      navigator.clipboard.writeText(SELECTED_PART_TEXT).then(() => {
        this.textarea.value = `${FIRST_PART_TEXT}${SECOND_PART_TEXT}`;
        this.copyBuffer = SELECTED_PART_TEXT;
        setCaret(0);
      }, () => {
        this.copyBuffer = SELECTED_PART_TEXT;
        this.textarea.value = `${FIRST_PART_TEXT}${SECOND_PART_TEXT}`;
        setCaret(0);
      });

      return false;
    }

    if (keyCode === 'KeyV' && this.isCtrlPush) {
      navigator.clipboard.readText(SELECTED_PART_TEXT).then((text) => {
        this.textarea.value = `${FIRST_PART_TEXT}${text}${SECOND_PART_TEXT}`;
        setCaret(text.length);
      }, () => {
        this.textarea.value = `${FIRST_PART_TEXT}${this.copyBuffer}${SECOND_PART_TEXT}`;
        setCaret(this.copyBuffer.length);
      });

      return false;
    }

    if (KEY.container.classList.contains('key-arrow')) {
      this.textarea.value = `${FIRST_PART_TEXT}${KEY.container.textContent}${SECOND_PART_TEXT}`;
      setCaret(1);
      return false;
    }

    if (KEY.additional === undefined) {
      if (KEY.container.classList.contains('capitalize')) {
        letter = KEY.main.textContent.toUpperCase();
      } else {
        letter = KEY.main.textContent;
      }
      this.textarea.value = `${FIRST_PART_TEXT}${letter}${SECOND_PART_TEXT}`;
      setCaret(1);
      return false;
    }

    if (KEY.main.classList.contains('additional')) {
      letter = KEY.additional.textContent;
    } else {
      letter = KEY.main.textContent;
    }
    this.textarea.value = `${FIRST_PART_TEXT}${letter}${SECOND_PART_TEXT}`;
    setCaret(1);
    return false;
  }

  getKeyboard() {
    return this.keyboardContainer;
  }
}

export default Keyboard;
