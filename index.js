import Keyboard from './js/keyboard.js';
import createOneElement from './js/commonFunctions.js';

const KEYBOARD = new Keyboard();
KEYBOARD.lang = localStorage.getItem('lang') || 'en';
KEYBOARD.initKeyboard();
const CONTAINER = createOneElement('div', 'container');
const RULES = createOneElement('div', 'rules');
const SYSTEM_INFO = createOneElement('div', 'rules__system');
const CHANGE_LANG_KEYS = createOneElement('div', 'rules__lang');
SYSTEM_INFO.innerText = 'Клавиатура создана в операционной системе Windows';
CHANGE_LANG_KEYS.innerText = 'Для переключения языка комбинация: ctrl + alt';
RULES.append(SYSTEM_INFO, CHANGE_LANG_KEYS);
CONTAINER.append(KEYBOARD.getKeyboard(), RULES);
document.body.append(CONTAINER);
let mouseDownTarget = null;

function handleKeyDown(event) {
  let keyCode;
  if (event.type === 'keydown') {
    keyCode = event.code;
  } else if (event.type === 'mousedown') {
    const keyContainer = event.target.closest('[data-code]');
    if (!keyContainer) {
      return;
    }
    keyCode = keyContainer.dataset.code;
    mouseDownTarget = keyCode;
  }

  event.preventDefault();

  if (keyCode === 'ShiftLeft' || keyCode === 'ShiftRight') {
    KEYBOARD.handlePushShift();
  }

  if (keyCode === 'CapsLock') {
    KEYBOARD.handlePushCapsLock();
    if (KEYBOARD.isCapsLockPush) {
      KEYBOARD.handleKeyDown(keyCode);
    } else {
      KEYBOARD.handleKeyUp(keyCode);
    }
    return;
  }

  if (keyCode === 'ControlLeft' || keyCode === 'ControlRight') {
    KEYBOARD.handlePushCtrl();
  }
  if (keyCode === 'AltLeft' || keyCode === 'AltRight') {
    KEYBOARD.handlePushAlt();
  }
  KEYBOARD.handleKeyDown(keyCode);
  KEYBOARD.print(keyCode);
}

function handleKeyUp(event) {
  let keyCode;

  if (event.type === 'keyup') {
    keyCode = event.code;
  } else if (event.type === 'mouseup') {
    if (!mouseDownTarget) {
      return;
    }
    keyCode = mouseDownTarget;
  }

  event.preventDefault();
  if (keyCode === 'ShiftLeft' || keyCode === 'ShiftRight') {
    KEYBOARD.handleUpShift();
  }

  if (keyCode === 'CapsLock') {
    KEYBOARD.handleUpCapsLock();
    return;
  }

  if (keyCode === 'ControlLeft' || keyCode === 'ControlRight') {
    KEYBOARD.handleUpCtrl();
  }

  if (keyCode === 'AltLeft' || keyCode === 'AltRight') {
    KEYBOARD.handleUpAlt();
  }

  KEYBOARD.handleKeyUp(keyCode);
}

function saveLang(event) {
  event.preventDefault();
  localStorage.setItem('lang', KEYBOARD.lang);
}

document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);
document.addEventListener('mousedown', handleKeyDown);
document.addEventListener('mouseup', handleKeyUp);
window.addEventListener('beforeunload', saveLang);
