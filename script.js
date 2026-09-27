const questions = [
  {
    question: "Apa yang digunakan untuk membuat struktur halaman web?",
    answers: [
      { text: "HTML", correct: true },
      { text: "CSS", correct: false },
      { text: "JavaScript", correct: false },
      { text: "SQL", correct: false }
    ]
  },
  {
    question: "Bahasa yang digunakan untuk mengatur tampilan halaman web adalah...",
    answers: [
      { text: "HTML", correct: false },
      { text: "CSS", correct: true },
      { text: "Java", correct: false },
      { text: "PHP", correct: false }
    ]
  },
  {
    question: "Apa fungsi utama JavaScript pada halaman web?",
    answers: [
      { text: "Membuat database", correct: false },
      { text: "Mengatur server", correct: false },
      { text: "Menambahkan interaksi", correct: true },
      { text: "Mengubah file menjadi PDF", correct: false }
    ]
  },
  {
    question: "Manakah yang merupakan tipe data JavaScript?",
    answers: [
      { text: "String", correct: true },
      { text: "Browser", correct: false },
      { text: "Website", correct: false },
      { text: "Server", correct: false }
    ]
  },
  {
    question: "Method JavaScript yang digunakan untuk menampilkan pesan di console adalah...",
    answers: [
      { text: "console.log()", correct: true },
      { text: "print()", correct: false },
      { text: "show()", correct: false },
      { text: "display()", correct: false }
    ]
  }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answers");
const nextButton = document.getElementById("next-btn");
const feedbackElement = document.getElementById("feedback");
const questionNumber = document.getElementById("question-number");
const progressBar = document.getElementById("progress-bar");
const quizContainer = document.getElementById("quiz-container");
const resultContainer = document.getElementById("result");
const scoreElement = document.getElementById("score");
const highScoreElement = document.getElementById("high-score");
const restartButton = document.getElementById("restart-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;

  quizContainer.classList.remove("hidden");
  resultContainer.classList.add("hidden");

  showQuestion();
}

function showQuestion() {
  resetState();

  const currentQuestion = questions[currentQuestionIndex];

  questionNumber.textContent =
    `Pertanyaan ${currentQuestionIndex + 1} dari ${questions.length}`;

  questionElement.textContent = currentQuestion.question;

  const progress =
    ((currentQuestionIndex + 1) / questions.length) * 100;

  progressBar.style.width = `${progress}%`;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");

    button.textContent = answer.text;
    button.classList.add("answer");
    button.type = "button";

    if (answer.correct) {
      button.dataset.correct = "true";
    }

    button.addEventListener("click", selectAnswer);

    answerButtons.appendChild(button);
  });
}

function resetState() {
  nextButton.style.display = "none";
  feedbackElement.textContent = "";

  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(event) {
  const selectedButton = event.currentTarget;
  const isCorrect = selectedButton.dataset.correct === "true";

  if (isCorrect) {
    selectedButton.classList.add("correct");
    feedbackElement.textContent = "✓ Jawaban benar!";
    score++;
  } else {
    selectedButton.classList.add("wrong");
    feedbackElement.textContent = "✗ Jawaban salah.";
  }

  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }

    button.disabled = true;
  });

  nextButton.style.display = "inline-block";
}

function showResult() {
  quizContainer.classList.add("hidden");
  resultContainer.classList.remove("hidden");

  scoreElement.textContent = `${score} / ${questions.length}`;

  const oldHighScore =
    Number(localStorage.getItem("quizHighScore")) || 0;

  if (score > oldHighScore) {
    localStorage.setItem("quizHighScore", score);
  }

  const highScore =
    Number(localStorage.getItem("quizHighScore")) || score;

  highScoreElement.textContent =
    `Skor tertinggi: ${highScore} / ${questions.length}`;
}

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
});

restartButton.addEventListener("click", startQuiz);

startQuiz();