document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("quiz-form");
  const resultDiv = document.getElementById("result");
  const bonusResultDiv = document.getElementById("bonus-result");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    let score = 0;
    const subjects = ["korean", "math", "english", "social", "science", "music", "PE", "art", "ethics", "practical"];
    
    const userAnswers = {
      korean: '',
      math: '',
      english: '',
      social: '',
      science: '',
      music: '',
      PE: '',
      art: '',
      ethics: '',
      practical: ''
    };

    // 과목별 질문 체크
    subjects.forEach(subject => {
      const selectedOption = document.querySelector(`input[name="${subject}"]:checked`);
      if (selectedOption) {
        userAnswers[subject] = selectedOption.value;
        score += ['a', 'b', 'c', 'd'].indexOf(selectedOption.value) + 1; // 점수 계산
      }
    });

    let userType = "";
    if (score >= 90) {
      userType = "CIMD"; // 예시 유형
    } else if (score >= 60) {
      userType = "BEXD";
    } else {
      userType = "AEXC";
    }

    resultDiv.textContent = `당신의 공부 스타일은: ${userType}`;

    // 보너스 특성 체크
    const environment = document.querySelector('input[name="environment"]:checked').value;
    let bonusType = "";
    
    if (environment === "chill") {
      bonusType = "C (Chill) - 다른 공부 환경에 잘 적응";
    } else if (environment === "explorer") {
      bonusType = "E (Explorer) - 호기심 많고 새로운 것에 도전";
    } else if (environment === "bored") {
      bonusType = "B (Bored) - 지루하지만 일에 집중";
    }

    bonusResultDiv.textContent = `보너스 특성: ${bonusType}`;
  });
});

