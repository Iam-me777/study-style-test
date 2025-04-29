const quizData = [
  {
    question: "공부할 때 가장 중요한 건?",
    options: ["계획", "집중", "꾸준함", "환경"],
  },
  {
    question: "공부할 때 음악을 듣는 편인가요?",
    options: ["항상 듣는다", "가끔 듣는다", "절대 안 듣는다", "집중 안되면 듣는다"],
  },
  {
    question: "공부 스타일은?",
    options: ["혼자 조용히", "같이 스터디", "누워서 대충", "타이머 켜고 몰입"],
  },
  {
    question: "시험 전날 당신은?",
    options: ["벼락치기", "복습 위주", "이미 다 외움", "포기함"],
  }
];

window.onload = function () {
  const form = document.getElementById("quizForm");
  quizData.forEach((item, index) => {
    const fieldset = document.createElement("fieldset");
    const legend = document.createElement("legend");
    legend.textContent = item.question;
    fieldset.appendChild(legend);

    item.options.forEach((option, optIndex) => {
      const label = document.createElement("label");
      const input = document.createElement("input");
      input.type = "radio";
      input.name = "q" + index;
      input.value = option;
      label.appendChild(input);
      label.append(" " + option);
      fieldset.appendChild(label);
    });

    form.appendChild(fieldset);
  });
};

function submitQuiz() {
  const total = quizData.length;
  let score = 0;
  let answers = [];

  for (let i = 0; i < total; i++) {
    const checked = document.querySelector(`input[name="q${i}"]:checked`);
    if (checked) {
      answers.push(checked.value);
      score += checked.value.length; // 임시 점수 계산 방식 (글자 수 기준)
    } else {
      alert("모든 문항에 응답해주세요!");
      return;
    }
  }

  const result = document.getElementById("result");
  let message = "";

  if (score < 30) {
    message = "🎯 집중력 폭발형! 몰입하면 끝까지 간다!";
  } else if (score < 40) {
    message = "📚 성실한 꾸준러! 차곡차곡 쌓아가는 스타일!";
  } else if (score < 50) {
    message = "🎧 감성 집중러! 분위기 따라 몰입하는 타입!";
  } else {
    message = "🔥 계획형 전략가! 전략적 학습의 달인!";
  }

  result.textContent = message;
}

