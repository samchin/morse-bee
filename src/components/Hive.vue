<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { useMainStore } from "../store";
import { shuffle } from "../utils";
import { useI18n } from "vue-i18n";
import en from "../locales/en.json";
import { GAP } from "element-plus";

const { t } = useI18n({
  inheritLocale: true,
  messages: {
    en,
  },
});

// `defineProps` is a compiler macro and no longer needs to be imported.
defineProps({
  ZIndex: Number,
});
const store = useMainStore();

const otherLetters = ref(
  store.availableLetters
    .split("")
    .filter((l: string) => l !== store.middleLetter)
);
let userGuess = ref("");

const onKeyPress = (e: KeyboardEvent) => {
  const pressedKey = e.key.toLowerCase();
  if (pressedKey === "enter")
    return submitGuess({ $t: t, guess: userGuess.value });
  if (["backspace", "delete"].includes(pressedKey)) {
    userGuess.value = userGuess.value.slice(0, -1);
    return false;
  }
  if (pressedKey.length === 1 && store.availableLetters.includes(pressedKey)) {
    // userGuess.value += pressedKey; -- commented out to disable keyboard event for the hive
    return true;
  }
};

const submitGuess = ({ $t, guess }: { $t: Function; guess: string }) => {
  userGuess.value = "";
  store.submitGuess({ $t, guess });
};

onMounted(() => {
  window.addEventListener("keyup", onKeyPress);
});
onUnmounted(() => {
  window.removeEventListener("keyup", onKeyPress);
});

const playHiveSound = (letter: any) => {
  const audio = document.getElementById("hiveAudio") as HTMLAudioElement;
  const dict: Record<string, string> = {
    a: "https://upload.wikimedia.org/wikipedia/commons/f/f3/A_morse_code.ogg",
    b: "https://upload.wikimedia.org/wikipedia/commons/b/b1/B_morse_code.ogg",
    c: "https://upload.wikimedia.org/wikipedia/commons/2/25/C_morse_code.ogg",
    d: "https://upload.wikimedia.org/wikipedia/commons/9/92/D_morse_code.ogg",
    e: "https://upload.wikimedia.org/wikipedia/commons/e/e7/E_morse_code.ogg",
    f: "https://upload.wikimedia.org/wikipedia/commons/6/63/F_morse_code.ogg",
    g: "https://upload.wikimedia.org/wikipedia/commons/7/72/G_morse_code.ogg",
    h: "https://upload.wikimedia.org/wikipedia/commons/9/93/H_morse_code.ogg",
    i: "https://upload.wikimedia.org/wikipedia/commons/d/d9/I_morse_code.ogg",
    j: "https://upload.wikimedia.org/wikipedia/commons/9/9e/J_morse_code.ogg",
    k: "https://upload.wikimedia.org/wikipedia/commons/6/6a/K_morse_code.ogg",
    l: "https://upload.wikimedia.org/wikipedia/commons/a/a8/L_morse_code.ogg",
    m: "https://upload.wikimedia.org/wikipedia/commons/9/97/M_morse_code.ogg",
    n: "https://upload.wikimedia.org/wikipedia/commons/5/5a/N_morse_code.ogg",
    o: "https://upload.wikimedia.org/wikipedia/commons/4/41/O_morse_code.ogg",
    p: "https://upload.wikimedia.org/wikipedia/commons/c/c6/P_morse_code.ogg",
    q: "https://upload.wikimedia.org/wikipedia/commons/f/f0/Q_morse_code.ogg",
    r: "https://upload.wikimedia.org/wikipedia/commons/e/ea/R_morse_code.ogg",
    s: "https://upload.wikimedia.org/wikipedia/commons/d/d8/S_morse_code.ogg",
    t: "https://upload.wikimedia.org/wikipedia/commons/b/ba/T_morse_code.ogg",
    u: "https://upload.wikimedia.org/wikipedia/commons/3/34/U_morse_code.ogg",
    v: "https://upload.wikimedia.org/wikipedia/commons/3/37/V_morse_code.ogg",
    w: "https://upload.wikimedia.org/wikipedia/commons/6/68/W_morse_code.ogg",
    x: "https://upload.wikimedia.org/wikipedia/commons/b/be/X_morse_code.ogg",
    y: "https://upload.wikimedia.org/wikipedia/commons/5/5d/Y_morse_code.ogg",
    z: "https://upload.wikimedia.org/wikipedia/commons/7/7a/Z_morse_code.ogg",
  };
  var cover = document.getElementById("cover");
  console.log(letter);
  audio.src = dict[letter];
  if (audio) {
    if (cover) {
      audio.play();
      cover.style.display = "block";
    }
  }
  audio.onended = function () {
    if (cover) {
      cover.style.display = "none";
    }
  };
};

const displayMorse = (letter: any) => {
  const dict: Record<string, string> = {
    a: "._",
    b: "_...",
    c: "_._.",
    d: "_..",
    e: ".",
    f: ".._.",
    g: "_ _.",
    h: "....",
    i: "..",
    j: "._ _ _",
    k: "_._",
    l: "._..",
    m: "_ _",
    n: "_ .",
    o: "_ _ _",
    p: "._ _.",
    q: "_ _._",
    r: "._.",
    s: "...",
    t: "_",
    u: ".._",
    v: "..._",
    w: "._ _",
    x: "_.._",
    y: "_._ _",
    z: "_ _..",
  };
  const morse = dict[letter];
  console.log(morse);
  return morse.concat(" ", " ");
};
</script>

<template>
  <button id="playQuiz">Play Quiz</button>
  <button id="stopQuiz">Stop Quiz</button>
  <button id="pauseQuiz">Pause Quiz</button>
  <button id="continueQuiz">Continue Quiz</button>
  <button id="checkQuiz">Check Quiz</button>

  <!-- popup modal when play quiz is clicked -->
  <div id="quizModal" class="modal">
    <div class="quizModal-content">
      <p>
        Please press 'space' when you hear a pause between two groups of Morse
        Code.
        <br /><br />
        You will hear some 4 letter words in Morse Code.
      </p>
      <span class="close">&times;</span>
    </div>
    <textarea id="userAnswer"></textarea>
  </div>

  <div class="sb-controls" style="`z-index: ${ZIndex}`">
    <div class="user-guess">
      <strong
        v-for="(letter, index) in userGuess"
        :class="{ 'middle-letter': letter === store.middleLetter }"
        :key="`user-guess-${index}`">
        {{ letter }}
      </strong>
    </div>

    <div class="user-guess-morse">
      <strong
        v-for="(letter, index) in userGuess"
        :class="{ 'middle-letter': letter === store.middleLetter }"
        :key="`user-guess-${index}`">
        {{ displayMorse(letter) }}
      </strong>
    </div>

    <div class="hive">
      <div id="cover"></div>
      <svg
        class="hive-cell center"
        @click="
          playHiveSound(store.middleLetter);
          userGuess += store.middleLetter;
        "
        viewBox="0 0 120 104">
        <polygon
          class="cell-fill"
          points="0,52 30,0 90,0 120,52 90,104 30,104"
          :stroke="store.getColor"
          stroke-width="7.5" />
        <text class="cell-letter" x="50%" y="50%" dy="10.75%">
          {{ store.middleLetter }}
        </text>
        <text class="cell-morse" x="50%" y="65%" dy="10.75%">
          {{ displayMorse(store.middleLetter) }}
        </text>
      </svg>
      <svg
        v-for="(letter, index) in otherLetters"
        :key="index"
        @click="
          playHiveSound(letter);
          userGuess += letter;
        "
        class="hive-cell outer"
        viewBox="0 0 120 104">
        <polygon
          class="cell-fill"
          points="0,52 30,0 90,0 120,52 90,104 30,104"
          :stroke="store.getColor"
          stroke-width="7.5" />
        <text class="cell-letter" x="50%" y="50%" dy="10.75%">
          {{ letter }}
        </text>
        <text class="cell-morse" x="50%" y="65%" dy="10.75%">
          {{ displayMorse(letter) }}
        </text>
      </svg>
    </div>

    <div class="hive-actions">
      <button
        class="hive-action hive-action__delete sb-touch-button"
        style="margin-left: 0; min-width: 5.5em"
        @click="userGuess = userGuess.slice(0, -1)">
        {{ $t("Delete") }}
      </button>
      <button
        class="hive-action hive-action__shuffle sb-touch-button"
        @click="otherLetters = shuffle(otherLetters, Math.random())"></button>
      <button
        class="hive-action hive-action__submit sb-touch-button"
        style="min-width: 5.5em"
        @click="submitGuess({ $t, guess: userGuess })">
        {{ $t("Enter") }}
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../assets/styles/_variables";

.user-guess {
  text-transform: uppercase;
  margin-bottom: 10px;
  height: 35px;
  font-weight: 700;
  font-size: 25px;
  .middle-letter {
    color: $bl-yellow;
  }
}

.user-guess-morse {
  .middle-letter {
    color: $bl-yellow;
  }
}

.sb-controls {
  /* put entire hive behind correctGuesses when table is expanded */
  max-width: 290px;
  position: absolute;
  top: 65%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 1;
  transition: opacity 150ms 200ms ease;
}
.hive {
  position: relative;
  width: 100%;
  padding-bottom: 100%;
}
.hive-cell {
  position: absolute;
  top: calc(100% / 3);
  left: 30%;
  width: 40%;
  height: calc(100% / 3);
}
.hive-cell .cell-fill {
  cursor: pointer;
  fill: $bl-grey;
  transition: all 100ms;
}
.hive .cell-letter {
  font-weight: 700;
  font-size: 30px;
  text-anchor: middle;
  text-transform: uppercase;
  pointer-events: none;
}

.hive .cell-morse {
  font-weight: 600;
  font-size: 25px;
  text-anchor: middle;
  pointer-events: none;
}

.hive-cell:first-child .cell-fill {
  cursor: pointer;
  fill: $bl-yellow;
  transition: all 100ms;
}
.hive-cell:nth-child(2) {
  transform: translate(0, 0);
}
.hive-cell:nth-child(2) .cell-fill {
  cursor: pointer;
  fill: $bl-yellow;
  transition: all 100ms;
}

.hive-cell:nth-child(3) {
  transform: translate(-75%, -50%);
}
.hive-cell:nth-child(4) {
  transform: translate(0, -100%);
}
.hive-cell:nth-child(5) {
  transform: translate(75%, -50%);
}
.hive-cell:nth-child(6) {
  transform: translate(75%, 50%);
}
.hive-cell:nth-child(7) {
  transform: translate(0, 100%);
}
.hive-cell:nth-child(8) {
  transform: translate(-75%, 50%);
}
.hive-actions {
  margin-top: 1em;
  text-align: center;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: nowrap;
}
.hive-actions button {
  transition: all 0.2s ease;
}
.hive-actions button:active {
  box-shadow: 0 5px $bl-grey;
  transform: translateY(4px);
}
polygon.cell-fill:active {
  transform: scale(0.9);
}
polygon.cell-fill {
  transition: all 1s;
  transform-origin: 50% 50%;
}
.hive-action {
  padding: 15px;
  flex: 1;
  background-color: #fff;
  font-size: 18px;
  margin: 0 12px;
  color: #333;
  border: 1px solid #ccc;
  border-radius: 40px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  cursor: pointer;
}
.hive-action__shuffle {
  background: url(../assets/shuffle.svg) center no-repeat;
  background-color: #fff;
  background-size: auto;
  background-size: 60%;
  height: 50px;
  min-width: 50px;
}
html.dark {
  .hive-action,
  .hive-action__shuffle {
    background-color: $bl-grey;
  }
  .user-guess {
    color: $bl-grey;
  }
}

#cover {
  display: none;
  position: absolute;
  background-color: white;
  padding: 0 0;
  width: 100%;
  height: 100%;
  top: 0%;
  z-index: 999;
  opacity: 0.5;
}

@media only screen and (max-height: 650px) {
  .sb-controls {
    top: max(65%, 420px);
  }
  .hive-cell {
    top: 30%;
    left: 33%;
    width: 33%;
    height: 28%;
  }
  .hive-actions {
    margin-top: 0;
  }
}

@media (orientation: landscape) {
  .sb-controls {
    top: max(65%, 500px);
  }
  .hive-actions {
    padding-bottom: 2rem;
  }
}

/* The Modal (background) */
.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 20%;
  top: 40%;
  width: 60%;
  height: 60%;
  border: black solid 0.2em;
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(255, 255, 255); /* Fallback color */
  background-color: rgb(255, 255, 255); /* Black w/ opacity */
}

/* Modal Content/Box */
.quizModal-content {
  background-color: #fefefe;
  // margin: 15% auto; /* 15% from the top and centered */
  // padding: 20px;
  // border: 1px solid #888;
  // width: 80%; /* Could be more or less, depending on screen size */
}

#userAnswer {
  margin-top: 10%;
  width: 90%;
  height: 50%;
}

/* The Close Button */
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>
