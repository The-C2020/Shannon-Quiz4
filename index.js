let currentRound = 0;
let totalRounds = document.querySelectorAll(".quiz-container").length;
console.log(totalRounds);
let correctAnswers = 0;
let answered = false;

const allSections = document.querySelectorAll(".quiz-container");
const allNextButtons = document.querySelectorAll(".btn-next");

document.querySelectorAll(".btn-next").forEach((button) => {
  button.addEventListener("click", () => {
    getNextSection();
  });
});

document.querySelectorAll(".btn-answer").forEach((button) => {
  button.addEventListener("click", () => {
    if (!questionAnswered() || answered) return;
    button.classList.add("hidden");
    document
      .querySelector(`.sol-box-${currentRound + 1}`)
      .classList.remove("hidden");
    let allAnswers = document.querySelectorAll(`.question-${currentRound + 1}`);
    allNextButtons[currentRound].classList.remove("hidden");
    allAnswers.forEach((item) => {
      if (item.dataset.solution === "correct") {
        answered = true;
        item.parentElement.parentElement.classList.add("correct-answer");
        if (item.checked) {
          correctAnswers++;
          document
            .querySelectorAll(".solution-box__correct")
            [currentRound].classList.remove("hidden");
        } else {
          document
            .querySelectorAll(".solution-box__wrong")
            [currentRound].classList.remove("hidden");
        }
      } else {
        item.parentElement.parentElement.classList.add("wrong-answer");
      }
    });
  });
});

const getNextSection = () => {
  allSections[currentRound].classList.add("hidden");
  currentRound++;
  answered = false;
  currentRound === 3 ? (allNextButtons[3].innerHTML = "Zum Ergebnis") : "";
  currentRound === 4
    ? showEndScreen()
    : allSections[currentRound].classList.remove("hidden");
};

const showEndScreen = () => {
  document.getElementById("correct-answers").innerHTML = correctAnswers;
  document.querySelector(".result-container").classList.remove("hidden");
};

const questionAnswered = () => {
  let allAnswers = document.querySelectorAll(`.question-${currentRound + 1}`);
  for (let i = 0; i < allAnswers.length; i++) {
    if (allAnswers[i].checked) return true;
  }
  return false;
};
