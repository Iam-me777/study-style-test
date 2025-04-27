document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("quiz-form");
  const resultDiv = document.getElementById("result");
  const bonusResultDiv = document.getElementById("bonus-result");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    let score = 0;

    // 과목별 질문에 대한 답변 체크
    const subjects = ["math", "korean", "science", "social", "english", "practical", "art", "PE", "computer", "music", "ethics"];
    
    subjects.forEach(subject => {
      const selectedOption = document.querySelector(`input[name="${subject}"]:checked`);
      if (selectedOption) {
        score += parseInt(selectedOption.value);
      }
    });

    let userType = "";
    if (score >= 30) {
      userType = "A형"; // 예시 유형
    } else if (score >= 20) {
      userType = "B형";
    } else {
      userType = "C형";
    }

    resultDiv.textContent = `당신의 공부 스타일은: ${userType}`;

    // 보너스 특성 체크
    const environment = document.querySelector('input[name="environment"]:checked').value;
    let bonusType = "";
    
    if (environment === "chill") {
      bonusType = "C (Chill) - 다른 공부 과목이나 환경에 잘 적응";
    } else if (environment === "explorer") {
      bonusType = "E (Explorer) - 호기심이 많고 새로운 것에 도전";
    } else if (environment === "bored") {
      bonusType = "B (Bored) - 가끔은 지루함을 느끼지만, 일에 집중";
    }

    bonusResultDiv.textContent = `보너스 특성: ${bonusType}`;
  });
});
