import ALL_KEYS_OBJ from './js/allKeysObj.js';
import Keyboard from './js/keyboard.js';
import createOneElement from './js/commonFunctions.js';

const KEYBOARD = new Keyboard();
const CONTAINER = createOneElement('div', 'container');
CONTAINER.append(KEYBOARD.getKeyboard());
document.body.append(CONTAINER);

function handleKeyDown(event) {
  event.preventDefault();
  const keyCode = event.code;
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
    return false;
  }
  if (keyCode === 'ControlLeft' || keyCode === 'ControlRight') {
    KEYBOARD.handlePushCtrl();
  }
  if (keyCode === 'AltLeft' || keyCode === 'AltRight') {
    KEYBOARD.handlePushAlt();
  }
  KEYBOARD.handleKeyDown(keyCode);
  KEYBOARD.print(keyCode);
  return false;
}

function handleKeyUp(event) {
  event.preventDefault();
  const keyCode = event.code;
  if (keyCode === 'ShiftLeft' || keyCode === 'ShiftRight') {
    KEYBOARD.handleUpShift();
  }
  if (keyCode === 'CapsLock') {
    KEYBOARD.handleUpCapsLock();
    return false;
  }
  if (keyCode === 'ControlLeft' || keyCode === 'ControlRight') {
    KEYBOARD.handleUpCtrl();
  }
  if (keyCode === 'AltLeft' || keyCode === 'AltRight') {
    KEYBOARD.handleUpAlt();
  }
  KEYBOARD.handleKeyUp(keyCode);
  return false;
}

document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);
