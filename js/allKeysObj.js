const ALL_KEYS_OBJ = {
  Backquote: {
    class: ['key'],
    en: {
      main: '`',
      additional: '~',
    },
    ru: {
      main: 'ё',
    },
  },
  Digit1: {
    class: ['key'],
    en: {
      main: '1',
      additional: '!',
    },
    ru: {
      main: '1',
      additional: '!',
    },
  },
  Digit2: {
    class: ['key'],
    en: {
      main: '2',
      additional: '@',
    },
    ru: {
      main: '2',
      additional: '"',
    },
  },
  Digit3: {
    class: ['key'],
    en: {
      main: '3',
      additional: '#',
    },
    ru: {
      main: '3',
      additional: '№',
    },
  },
  Digit4: {
    class: ['key'],
    en: {
      main: '4',
      additional: '$',
    },
    ru: {
      main: '4',
      additional: ';',
    },
  },
  Digit5: {
    class: ['key'],
    en: {
      main: '5',
      additional: '%',
    },
    ru: {
      main: '5',
      additional: '%',
    },
  },
  Digit6: {
    class: ['key'],
    en: {
      main: '6',
      additional: '^',
    },
    ru: {
      main: '6',
      additional: ':',
    },
  },
  Digit7: {
    class: ['key'],
    en: {
      main: '7',
      additional: '&',
    },
    ru: {
      main: '7',
      additional: '?',
    },
  },
  Digit8: {
    class: ['key'],
    en: {
      main: '8',
      additional: '*',
    },
    ru: {
      main: '8',
      additional: '*',
    },
  },
  Digit9: {
    class: ['key'],
    en: {
      main: '9',
      additional: '(',
    },
    ru: {
      main: '9',
      additional: '(',
    },
  },
  Digit0: {
    class: ['key'],
    en: {
      main: '0',
      additional: ')',
    },
    ru: {
      main: '0',
      additional: ')',
    },
  },
  Minus: {
    class: ['key'],
    en: {
      main: '-',
      additional: '_',
    },
    ru: {
      main: '-',
      additional: '_',
    },
  },
  Equal: {
    class: ['key'],
    en: {
      main: '=',
      additional: '+',
    },
    ru: {
      main: '=',
      additional: '+',
    },
  },
  Backspace: {
    class: ['key-optional', 'key-XX'],
    main: 'Backspace',
  },
  Tab: {
    class: ['key-optional', 'key-L'],
    main: 'Tab',
  },
  KeyQ: {
    class: ['key'],
    en: {
      main: 'q',
    },
    ru: {
      main: 'й',
    },
  },
  KeyW: {
    class: ['key'],
    en: {
      main: 'w',
    },
    ru: {
      main: 'ц',
    },
  },
  KeyE: {
    class: ['key'],
    en: {
      main: 'e',
    },
    ru: {
      main: 'у',
    },
  },
  KeyR: {
    class: ['key'],
    en: {
      main: 'r',
    },
    ru: {
      main: 'к',
    },
  },
  KeyT: {
    class: ['key'],
    en: {
      main: 't',
    },
    ru: {
      main: 'е',
    },
  },
  KeyY: {
    class: ['key'],
    en: {
      main: 'y',
    },
    ru: {
      main: 'н',
    },
  },
  KeyU: {
    class: ['key'],
    en: {
      main: 'u',
    },
    ru: {
      main: 'г',
    },
  },
  KeyI: {
    class: ['key'],
    en: {
      main: 'i',
    },
    ru: {
      main: 'ш',
    },
  },
  KeyO: {
    class: ['key'],
    en: {
      main: 'o',
    },
    ru: {
      main: 'щ',
    },
  },
  KeyP: {
    class: ['key'],
    en: {
      main: 'p',
    },
    ru: {
      main: 'x',
    },
  },
  BracketLeft: {
    class: ['key'],
    en: {
      main: '[',
      additional: '{',
    },
    ru: {
      main: 'з',
    },
  },
  BracketRight: {
    class: ['key'],
    en: {
      main: ']',
      additional: '}',
    },
    ru: {
      main: 'ъ',
    },
  },
  Delete: {
    class: ['key-optional', 'key-L'],
    main: 'Del',

  },
  CapsLock: {
    class: ['key-optional', 'key-XL'],
    main: 'Caps Lock',
  },
  KeyA: {
    class: ['key'],
    en: {
      main: 'a',
    },
    ru: {
      main: 'ф',
    },
  },
  KeyS: {
    class: ['key'],
    en: {
      main: 's',
    },
    ru: {
      main: 'ы',
    },
  },
  KeyD: {
    class: ['key'],
    en: {
      main: 'd',
    },
    ru: {
      main: 'в',
    },
  },
  KeyF: {
    class: ['key'],
    en: {
      main: 'f',
    },
    ru: {
      main: 'а',
    },
  },
  KeyG: {
    class: ['key'],
    en: {
      main: 'g',
    },
    ru: {
      main: 'п',
    },
  },
  KeyH: {
    class: ['key'],
    en: {
      main: 'h',
    },
    ru: {
      main: 'р',
    },
  },
  KeyJ: {
    class: ['key'],
    en: {
      main: 'j',
    },
    ru: {
      main: 'о',
    },
  },
  KeyK: {
    class: ['key'],
    en: {
      main: 'k',
    },
    ru: {
      main: 'л',
    },
  },
  KeyL: {
    class: ['key'],
    en: {
      main: 'l',
    },
    ru: {
      main: 'д',
    },
  },
  Semicolon: {
    class: ['key'],
    en: {
      main: ';',
      additional: ':',
    },
    ru: {
      main: 'ж',
    },
  },
  Quote: {
    class: ['key'],
    en: {
      main: "'",
      additional: '"',
    },
    ru: {
      main: 'э',
    },
  },
  Backslash: {
    class: ['key'],
    en: {
      main: '\\',
      additional: '|',
    },
    ru: {
      main: '\\',
      additional: '/',
    },
  },
  Enter: {
    class: ['key-optional', 'key-XL'],
    main: 'Enter',
  },
  ShiftLeft: {
    class: ['key-optional', 'key-XL'],
    main: 'Shift',
  },
  KeyZ: {
    class: ['key'],
    en: {
      main: 'z',
    },
    ru: {
      main: 'я',
    },
  },
  KeyX: {
    class: ['key'],
    en: {
      main: 'x',
    },
    ru: {
      main: 'ч',
    },
  },
  KeyC: {
    class: ['key'],
    en: {
      main: 'c',
    },
    ru: {
      main: 'с',
    },
  },
  KeyV: {
    class: ['key'],
    en: {
      main: 'v',
    },
    ru: {
      main: 'м',
    },
  },
  KeyB: {
    class: ['key'],
    en: {
      main: 'b',
    },
    ru: {
      main: 'и',
    },
  },
  KeyN: {
    class: ['key'],
    en: {
      main: 'n',
    },
    ru: {
      main: 'т',
    },
  },
  KeyM: {
    class: ['key'],
    en: {
      main: 'm',
    },
    ru: {
      main: 'ь',
    },
  },
  Comma: {
    class: ['key'],
    en: {
      main: ',',
      additional: '<',
    },
    ru: {
      main: 'б',
    },
  },
  Period: {
    class: ['key'],
    en: {
      main: '.',
      additional: '>',
    },
    ru: {
      main: 'ю',
    },
  },
  Slash: {
    class: ['key'],
    en: {
      main: '/',
      additional: '?',
    },
    ru: {
      main: '.',
      additional: ',',
    },
  },
  ArrowUp: {
    class: ['key-arrow', 'key-S'],
    main: '▲',
  },
  ShiftRight: {
    class: ['key-optional', 'key-XX'],
    main: 'Shift',
  },
  ControlLeft: {
    class: ['key-optional', 'key-M'],
    main: 'Ctrl',
  },
  MetaLeft: {
    class: ['key-optional', 'key-M'],
    main: 'Win',
  },
  AltLeft: {
    class: ['key-optional', 'key-M'],
    main: 'Alt',
  },
  Space: {
    class: ['key-space'],
    main: ' ',
  },
  AltRight: {
    class: ['key-optional', 'key-M'],
    main: 'Alt',
  },
  ArrowLeft: {
    class: ['key-arrow', 'key-S'],
    main: '◄',
  },
  ArrowDown: {
    class: ['key-arrow', 'key-S'],
    main: '▼',
  },
  ArrowRight: {
    class: ['key-arrow', 'key-S'],
    main: '►',
  },
  ControlRight: {
    class: ['key-optional', 'key-M'],
    main: 'Ctrl',
  },
};

export default ALL_KEYS_OBJ;
