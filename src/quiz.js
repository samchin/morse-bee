import allAnswers from "../data/allAnswers.json";

function preloadSounds() {
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

  for (const letter in dict) {
    const audio = new Audio();
    audio.src = dict[letter];
    audio.load();
  }
}

// Call the preloadSounds function during initialization
preloadSounds();

// fetch today's 7 hive letters
function getHiveLetters() {
  const hives = document.querySelectorAll(".cell-letter");
  const letters = [];
  hives.forEach((letter) => {
    letters.push(letter.textContent);
  });
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
        // console.log(answer.answers.length);
        for (const a of answer.answers) {
          // only quiz the user on words with 4 or less letters
          if (a.length <= 4) {
            answerWords.push(a);
          }
        }
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

  if (audio) {
    audio.src = dict[letter];

    // only play if all sounds are loaded and the last sound has ended
    return new Promise((resolve) => {
      audio.addEventListener("canplaythrough", function onCanPlayThrough() {
        audio.removeEventListener("canplaythrough", onCanPlayThrough);
        audio.play();
        console.log("now playing: " + letter);
      });

      audio.addEventListener("ended", function onEnded() {
        audio.removeEventListener("ended", onEnded);
        resolve();
      });
    });
  }
}

function playWordMorse(words) {
  const playButton = document.getElementById("playQuiz");
  const stopButton = document.getElementById("stopQuiz");
  const pauseButton = document.getElementById("pauseQuiz");
  const continueButton = document.getElementById("continueQuiz");
  let currentIndex = 0;
  let isPlaying = false;
  let isPaused = false;

  async function playNextLetter() {
    if (currentIndex < words.length && isPlaying) {
      const word = words[currentIndex];
      console.log("curr word: " + word);

      for (const letter of word) {
        await playHiveSound(letter);

        if (!isPlaying) {
          // Stop if the stop button was pressed during playback
          currentIndex = words.length;
          break;
        }

        if (isPaused) {
          // Pause if the pause button was pressed during playback
          await new Promise((resolve) => {
            // when paused, set up eventlister for the continue button
            continueButton.addEventListener(
              "click",
              function onContinueClick() {
                // remove continue eventlistener when continue is clicked once
                continueButton.removeEventListener("click", onContinueClick);
                resolve();
              },
              { once: true }
            );
          });
        }
      }
      // 2 seconds gap between each word. no gap between each letter of the word
      await new Promise((resolve) => setTimeout(resolve, 2000));

      currentIndex++;
      playNextLetter();
    }
  }

  var modal = document.getElementById("quizModal");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = "none";
  };

  // event listener of the buttons
  playButton.addEventListener("click", () => {
    currentIndex = 0; // Reset currentIndex when starting the quiz again
    isPlaying = true;
    modal.style.display = "block";
    setTimeout(() => {
      playNextLetter(); // Start playing quiz after 5 seconds
    }, 5000);
  });

  stopButton.addEventListener("click", () => {
    isPlaying = false;
    currentIndex = words.length;
    isPaused = false; // Reset isPaused when stopping the quiz
  });

  pauseButton.addEventListener("click", () => {
    isPaused = true;
  });

  continueButton.addEventListener("click", () => {
    isPaused = false;
  });
}

const letters = getHiveLetters();
console.log("letters: " + letters);

let morseAnswer = "";

getWords(letters)
  .then((words) => {
    words = words.flat();
    morseAnswer = words.join(" ");
    console.log("possible answers: " + words);
    // console.log(morseAnswer);
    playWordMorse(words);
  })
  .catch((error) => {
    console.error(error);
  });

function showAnswers(userAnswer) {
  var textarea = document.getElementById("userAnswer");
  var ans = document.createElement("div");
  ans.id = "corAns"; //correct answer
  ans.style.cssText =
    'width:90%; padding-left: 3%; font-family:"Space Mono",monospace; font-style: normal; text-align: left; font-size: 13px';
  var temp = "";
  for (var i = 0; i < morseAnswer.length; i++) {
    temp += morseAnswer[i] + " ";
    if (i + (1 % 16) == 0) {
      temp += "\n";
    }
  }
  var correctAns = "\n\nCorrect Answer:\n\n" + temp; // Assuming morseAnswer has been defined and is also a string
  ans.innerHTML = correctAns;
  var marked = ""; // Variable to store the colored text
  var wrong_count = 0;

  // Compare each character of userAnswer with morseAnswer
  for (var i = 0; i < userAnswer.length && i < morseAnswer.length; i++) {
    // If characters match, add them normally
    if (userAnswer[i] === morseAnswer[i]) {
      marked += " " + userAnswer[i];
    } else {
      // If characters do not match, wrap them in a span with red color
      // coloredText += '<span style="color: red">' + userAnswer[i] + '</span>';
      marked += "[" + userAnswer[i] + "]";
      wrong_count++;
    }
  }

  document.querySelector("#quizModal").appendChild(ans);

  textarea.value = marked;
}

var checkQuiz = document.getElementById("checkQuiz");

checkQuiz.onclick = function () {
  var userQuizAnswer = document.getElementById("userAnswer").value;
  showAnswers(userQuizAnswer);
};
