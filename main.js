'use strict';

{
  const words = [
    [ /* index[i] */
      'FF', /* index[i][num] */
      'DD',
      'SS',
      'AA',
      // 'JJ',
      // 'KK',
      // 'LL',
      // 'RR',
      // 'EE',
      // 'WW',
      // 'QQ',
      // 'UU',
      // 'II',
      // 'OO',
      // 'PP',
      // 'MM',
      // 'VV',
      // 'CC',
      // 'XX',
      // 'ZZ',
      // 'GG',
      // 'TT',
      // 'BB',
      // 'YY',
      // 'HH',
      // 'NN',
    ],
    [ /* index[i] */
      'RED', /* index[i][num] */
      'ORANGE',
      // 'YELLOW',
      // 'GREEN',
      // 'BLUE',
      // 'NAVY',
      // 'PURPLE',
    ],
    [ /* index[i] */
      'SUPER SUMMER', /* index[i][num] */
      // 'TAKE A PICTURE',
      // 'STEP AND A STEP',
      // 'MAKE YOU HAPPY',
    ],
    [ /* index[i] */
      'MAKO', /* index[i][num] */
      'RIO',
      'MAYA',
      // 'RIKU',
      // 'AYAKA',
      // 'MAYUKA',
      // 'RIMA',
      // 'MIIHI',
      // 'NINA',
    ],
  ];
  const hints = [
    'Tは左手の人差し指だよ',
    'Rは左手の人差し指だよ',
    'Eは左手の中指だよ',
    'Wは左手の薬指だよ',
    'Qは左手の小指だよ',
    'Gは左手の人差し指だよ',
    'Fは左手の人差し指だよ',
    'Dは左手の中指だよ',
    'Sは左手の薬指だよ',
    'Aは左手の小指だよ',
    'Bは左手の人差し指だよ',
    'Vは左手の人差し指だよ',
    'Cは左手の中指だよ',
    'Xは左手の薬指だよ',
    'Zは左手の小指だよ',
    'Yは右手の人差し指だよ',
    'Uは右手の人差し指だよ',
    'Iは右手の中指だよ',
    'Oは右手の薬指だよ',
    'Pは右手の小指だよ',
    'Hは右手の人差し指だよ',
    'Jは右手の人差し指だよ',
    'Kは右手の中指だよ',
    'Lは右手の薬指だよ',
    'Nは右手の人差し指だよ',
    'Mは右手の人差し指だよ',
  ];

  const keys = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '0',
    '-',
    '^',
    '¥',
    '×',
    '→',
    'Q',
    'W',
    'E',
    'R',
    'T',
    'Y',
    'U',
    'I',
    'O',
    'P',
    '@',
    '[',
    ']',
    'con',
    'A',
    'S',
    'D',
    'F',
    'G',
    'H',
    'J',
    'K',
    'L',
    ';',
    ':',
    '(',
    ')',
    'Z',
    'X',
    'C',
    'V',
    'B',
    'N',
    'M',
    ',',
    '.',
    '/',
    '↑',
  ];

  let word;
  let hint;
  let key;
  let keyIndex;
  let lastKey;
  let lastKeyIndex;
  let i;
  let num = 0;
  let loc = 0;
  let startTime;
  let hintBtn = false;
  let demoBtn = false;
  let colorBtn = false;
  let titleBtn = false;
  let memberBtn = false;
  let musicBtn = false;

  const hint_area = document.querySelector('.hint_area');
  const word_area = document.querySelector('.word_area');
  const game_area = document.querySelector('.game_area');
  const overlay = document.querySelector('.overlay');
  const demo = document.querySelector('.demo');
  const game = document.querySelector('.game');
  const hint_a = document.querySelector('.hint');
  const bgmNiziu = document.getElementById('bgmNiziu');
  const btnMusic = document.querySelector('.music');
 
  function createKeyboard() {
    keys.forEach(keyLi => {
      const li = document.createElement('li');
      li.textContent = keyLi;
      const ul = document.querySelector('.keys');
      ul.appendChild(li);
    });
  }
  createKeyboard();
  const keyLi = document.querySelectorAll('.keys li');

  function setWord() {
    if (demoBtn) {
      i = 0;
      word = words[i][num];
      word_area.textContent = word;
    } else if (colorBtn) {
      i = 1;
      word = words[i][num];
      word_area.textContent = word;
    } else if (titleBtn) {
      i = 2;
      word = words[i][num];
      word_area.textContent = word;
    } else if (memberBtn) {
      i = 3;
      word = words[i][num];
      word_area.textContent = word;
    }
  }

  function btnDemo() {
    demo.addEventListener('click', () => {
      demoBtn = true;
      setWord();
      demo.classList.add('pointNone');
    });
  }
  btnDemo();

  function getKey() {
    if (word === undefined) {
      return;
    }
    key = word.substring(loc, loc + 1);
    keyIndex = keys.indexOf(key);
  }

  function setHint() {
    if (num === words[i].length) {
      hint_area.textContent = '';
    } else {
      let currentChar = word.substring(loc, loc + 1);
      hint = hints.filter(function (value) {
        return value.includes(currentChar);
      });
      hint_area.textContent = hint;
    }
  }

  function btnHint() {
    hint_a.addEventListener('click', () => {
      if (!demoBtn && !colorBtn && !titleBtn && !memberBtn) {
        hint_a.classList.add('pointNone');
        return;
      } else {
        setHint();
        // hint_area.classList.toggle('show');
        hintBtn = !hintBtn;
        getKey();
        if (hintBtn) {
          keyLi[keyIndex].classList.add('current');
          hint_area.classList.add('show');
          // setHint();
        } else {
          keyLi[keyIndex].classList.remove('current');
          hint_area.classList.remove('show');
        }
      }
      console.log(hintBtn);
    });
  }

  function btnGame() {
    function a() {
      setWord();
      game_area.classList.add('hidden');
      overlay.classList.remove('show');
      demo.classList.add('pointNone');
      game.classList.add('pointNone');
      startTime = Date.now();
    }
    game.addEventListener('click', () => {
      game_area.classList.remove('hidden');
      overlay.classList.add('show');
    });

    document.querySelector('.color').addEventListener('click', () => {
      colorBtn = true;
      a();
    });
    document.querySelector('.title').addEventListener('click', () => {
      titleBtn = true;
      a();
    });
    document.querySelector('.member').addEventListener('click', () => {
      memberBtn = true;
      a();
    });
    btnHint();
  }
  btnGame();


  function keydown() {
    loc++;
    word_area.textContent = '_'.repeat(loc) + word.substring(loc);
  }

  function firstKeyClass() {
    if (!hintBtn) {
      return;
    }
    getKey();
    keyLi[keyIndex].classList.add('current');
  }
  firstKeyClass();

  function classCurrent() {
    if (!hintBtn) {
      return;
    }

    getKey();
    keyLi[keyIndex].classList.add('current');

    lastKeyIndex = keys.indexOf(lastKey);
    keyLi[lastKeyIndex].classList.remove('current');

    if (key === lastKey) {
      keyLi[lastKeyIndex].classList.add('current');
    } else {
      keyLi[lastKeyIndex].classList.remove('current');
    }
  }

  document.addEventListener('keydown', e => {
    if (e.key !== word[loc]) {
      return;
    }
    keydown();
    setHint();

    if (loc === word.length) {
      num++;
      setWord();
      loc = 0;
      setHint();
    }

    lastKey = e.key;
    classCurrent();

    if (num === words[i].length) {
      let elapsedTime = ((Date.now() - startTime) / 1000).toFixed(2);

      if (demoBtn) {
        word_area.textContent = '繰り返し練習して指の位置を覚えよう！';
        // return;
      } else if(colorBtn) {
        if (elapsedTime < 30.00) {
          word_area.textContent = `すごいね！${elapsedTime}秒だよ！星1個ゲット！`;
        } else {
          word_area.textContent = `${elapsedTime}秒だよ！この調子で頑張ろう！`;
        }
      } else if(titleBtn) {
        if (elapsedTime < 50.00) {
          word_area.textContent = `すごいね！${elapsedTime}秒だよ！星1個ゲット！`;
        } else {
          word_area.textContent = `${elapsedTime}秒だよ！この調子で頑張ろう！`;
        }
      } else if(memberBtn) {
        if (elapsedTime < 15.00) {
          word_area.textContent = `すごいね！${elapsedTime}秒だよ！星1個ゲット！`;
        } else {
          word_area.textContent = `${elapsedTime}秒だよ！この調子で頑張ろう！`;
        }
      }
      demo.classList.remove('pointNone');
      game.classList.remove('pointNone');
      hint_a.classList.remove('pointNone');
      num = 0;
      demoBtn = false;
      colorBtn = false;
      titleBtn = false;
      memberBtn = false;
      hintBtn = false;
      // hint_area.textContent = '';
      keyLi[lastKeyIndex].classList.remove('current');
    }
  });

  // 音楽の再生処理
  const audioElement = document.querySelector('audio');
  const a = [
    "music/01 - Make you happy.mp3",
    "music/01 - Poppin' Shakin'.mp3",
    "music/01 - Step and a step.mp3",
  ];


  btnMusic.addEventListener('click', () => {
    musicBtn = !musicBtn
    if (musicBtn) {
      bgmNiziu.src = a[Math.floor(Math.random() * a.length)];
      bgmNiziu.play();
      btnMusic.innerHTML = '<i class="far fa-pause-circle"></i>';
    } else {
      bgmNiziu.pause();
      btnMusic.innerHTML = '<i class="fas fa-music"></i>';
    }
  });
}
