const questions = [
  { subject: "국어", questions: ["국어를 어떻게 공부하나요?", "국어 시험을 볼 때 어떻게 하나요?", "국어 수업을 받을 때 어떤 기분인가요?"] },
  { subject: "수학", questions: ["수학을 어떻게 공부하나요?", "수학 시험을 볼 때 어떻게 하나요?", "수학 수업을 받을 때 어떤 기분인가요?"] },
  { subject: "영어", questions: ["영어를 어떻게 공부하나요?", "영어 시험을 볼 때 어떻게 하나요?", "영어 수업을 받을 때 어떤 기분인가요?"] },
  { subject: "사회", questions: ["사회를 어떻게 공부하나요?", "사회 시험을 볼 때 어떻게 하나요?", "사회 수업을 받을 때 어떤 기분인가요?"] },
  { subject: "과학", questions: ["과학을 어떻게 공부하나요?", "과학 시험을 볼 때 어떻게 하나요?", "과학 수업을 받을 때 어떤 기분인가요?"] },
  { subject: "음악", questions: ["음악을 어떻게 공부하나요?", "음악 시험을 볼 때 어떻게 하나요?", "음악 수업을 받을 때 어떤 기분인가요?"] },
  { subject: "미술", questions: ["미술을 어떻게 공부하나요?", "미술 시험을 볼 때 어떻게 하나요?", "미술 수업을 받을 때 어떤 기분인가요?"] },
  { subject: "도덕", questions: ["도덕을 어떻게 공부하나요?", "도덕 시험을 볼 때 어떻게 하나요?", "도덕 수업을 받을 때 어떤 기분인가요?"] },
  { subject: "체육", questions: ["체육을 어떻게 공부하나요?", "체육 시험을 볼 때 어떻게 하나요?", "체육 수업을 받을 때 어떤 기분인가요?"] },
  { subject: "실과", questions: ["실과를 어떻게 공부하나요?", "실과 시험을 볼 때 어떻게 하나요?", "실과 수업을 받을 때 어떤 기분인가요?"] }
];

const choices = ["A", "B", "C", "D"];

const bonusQuestions = [
  "새로운 환경에서 공부하는 게 좋은가요?",
  "공부할 때 모르는 걸 탐험하는 게 재미있나요?",
  "공부할 때 가끔 지루함을 느끼나요?"
];

function createQuiz() {
  const quizForm = document.getElementById('quizForm');
  questions.forEach((qGroup, index) => {
    qGroup.questions.forEach((q, idx) => {
      const div = document.createElement('div');
      div.classList.add('question');
      div.innerHTML = `<strong>${q}</strong><br>` +
        choices.map(choice => `
          <label>
            <input type="radio" name="q${index}_${idx}" value="${choice}" required> ${choice}
          </label>
        `).join('<br>');
      quizForm.appendChild(div);
    });
  });

  const bonusDiv = document.getElementById('bonusQuestions');
  bonusQuestions.forEach((bq, idx) => {
    const div = document.createElement('div');
    div.classList.add('question');
    div.innerHTML = `<strong>${bq}</strong><br>` +
      `<label><input type="radio" name="bonus${idx}" value="yes" required> 네</label><br>` +
      `<label><input type="radio" name="bonus${idx}" value="no" required> 아니요</label><br>`;
    bonusDiv.appendChild(div);
  });
}

function submitQuiz() {
  let type = '';
  for (let i = 0; i < questions.length; i++) {
    for (let j = 0; j < 3; j++) {
      const answer = document.querySelector(`input[name="q${i}_${j}"]:checked`);
      if (answer) {
        if (j === 0) type += answer.value;
        else if (j === 1) type += answer.value;
        else if (j === 2) type += answer.value;
      }
    }
  }

  type = type.substring(0, 3);

  let bonusType = '';
  let yesCount = 0;
  for (let i = 0; i < bonusQuestions.length; i++) {
    const answer = document.querySelector(`input[name="bonus${i}"]:checked`);
    if (answer && answer.value === 'yes') {
      yesCount++;
    }
  }

  if (yesCount >= 2) bonusType = "-e";
  else if (yesCount === 1) bonusType = "-c";
  else bonusType = "-b";

  const resultText = `
    <h2>당신의 유형은: ${type}${bonusType}</h2>
    <p><strong>${type}</strong> 유형 설명: ${typeDescriptions[type] || "아직 설명이 없습니다."}</p>
    <p><strong>${bonusType.toUpperCase().replace('-', '')}</strong> 보너스 유형 설명: ${bonusDescriptions[bonusType] || "없음"}</p>
  `;

  document.getElementById('result').innerHTML = resultText;
}

const typeDescriptions = {
  "AAA": "완전 기본형, 안정적이나 유연성 부족",
  "AAB": "문제 해결에 집중하는 현실주의자",
  "AAC": "감정이입이 뛰어난 감성가",
  "AAD": "창의력 넘치는 자유형",
  "ABA": "기본은 하되 종종 모험하는 스타일",
  "ABB": "엄청난 현실 감각",
  "ABC": "감성 + 논리 혼합형",
  "ABD": "창의적 문제해결사",
  "ACA": "감성 우선형",
  "ACB": "냉철하고 정확한 스타일",
  "ACC": "부드러운 리더형",
  "ACD": "유쾌한 탐험가",
  "ADA": "엉뚱하지만 본질은 챙김",
  "ADB": "실용적이고 체계적인 전략가",
  "ADC": "아이디어 뱅크",
  "ADD": "혼자서 신세계 개척하는 타입"
};

const bonusDescriptions = {
  "-c": "Chill - 다른 과목과 환경에 잘 적응하는 스타일",
  "-e": "Explorer - 새로운 것을 탐험하는 것을 좋아하는 스타일",
  "-b": "Bored - 쉽게 지루해하는 스타일"
};

createQuiz();

