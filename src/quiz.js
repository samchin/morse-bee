import allAnswers from "../data/allAnswers.json";

// fetch today's 7 hive letters
function getHiveLetters() {
  const hives = document.querySelectorAll(".cell-letter");
  const letters = [];
  hives.forEach((letter) => {
    letters.push(letter.textContent);
  });
  // console.log(letters.sort());
  return letters.sort();
}

// fetch the possible words the 7 letters can make from allAnswers.json
function getWords(letters) {
  return new Promise((resolve, reject) => {
    if (!allAnswers) {
      reject("allAnswers is undefined");
    }

    letters = letters.join("");
    const answerWords = [];

    allAnswers.forEach((answer) => {
      if (answer.availableLetters === letters) {
        answerWords.push(answer.answers);
      }
    });

    resolve(answerWords);
  });
}

function playHiveSound(letter) {
  const audio = document.getElementById("hiveAudio");
  const dict = {
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
  console.log("this char: " + letter);

  // make a promise that looks for ended

  if (audio) {
    audio.src = dict[letter];
    if (cover) {
      audio.play();
      console.log("playing");
      cover.style.display = "block";
    }
    audio.onended = function () {
      if (cover) {
        cover.style.display = "none";
      }
    };
  }
}

// still playing all letters at once (thus crash) but at least it is playing on button click
function playWordMorse(words) {
  words.flat().forEach((word) => {
    word.split("").forEach((letter) => {
      // button added in Hive.vue
      const playButton = document.getElementById("playQuiz");
      console.log("in play morse word: " + letter);
      playButton.addEventListener("click", function () {
        console.log("now playing: " + letter);
        playHiveSound(letter);
      });
      // playHiveSound(letter)
    });
  });
}

const letters = getHiveLetters();
console.log("letters: " + letters);

getWords(letters)
  .then((words) => {
    words = words.flat().slice(0, 2);
    console.log("possible answers: " + words);
    playWordMorse(words);
  })
  .catch((error) => {
    console.error(error);
  });

// try smaller word lists
// promise or delay in playsound
