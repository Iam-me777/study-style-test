document.getElementById("quizForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const formData = new FormData(this);
  const answerCounts = {
    a: 0, b: 0, c: 0, d: 0,
    e: 0, f: 0, g: 0, h: 0,
    i: 0, j: 0, k: 0, l: 0
  };

  const bonusCounts = {
    c: 0, e: 0, b: 0
  };

  for (let [key, value] of formData.entries()) {
    if (value in answerCounts) {
      answerCounts[value]++;
    } else if (["-c", "-e", "-b"].includes(value)) {
      bonusCounts[value[1]]++;
    }
  }

  // 각 파트에서 가장 많이 선택된 항목 고르기
  function getMaxLetter(range) {
    let maxLetter = null;
    let maxCount = -1;
    for (let letter of range) {
      if (answerCounts[letter] > maxCount) {
        maxCount = answerCounts[letter];
        maxLetter = letter;
      }
    }
    return maxLetter;
  }

  const studyType = getMaxLetter(["a", "b", "c", "d"]);
  const testType = getMaxLetter(["e", "f", "g", "h"]);
  const moodType = getMaxLetter(["i", "j", "k", "l"]);

  let bonusType = "-c"; // default
  let maxBonus = -1;
  for (let key in bonusCounts) {
    if (bonusCounts[key] > maxBonus) {
      maxBonus = bonusCounts[key];
      bonusType = `-${key}`;
    }
  }

  const finalType = `${studyType}${testType}${moodType}${bonusType}`;

  const typeDescriptions = {
    a: "행동파 실천형",
    b: "영상탐색형",
    c: "암기중심형",
    d: "자유방임형",
    e: "계획적 연습형",
    f: "기출분석형",
    g: "복습중심형",
    h: "벼락치기형",
    i: "집중참여형",
    j: "산만지루형",
    k: "흥미참여형",
    l: "무관심형"
  };

  const bonusDescriptions = {
    "-c": "Chill: 새로운 환경에도 잘 적응하는 편이에요.",
    "-e": "Explorer: 다양한 공부 환경을 탐색하고 싶어해요.",
    "-b": "Bored: 현재 공부 환경이 지루하다고 느낄 수 있어요."
  };

  const resultText = `당신의 공부유형은 🎯 ${finalType}형입니다!`;
  const detailText = `당신은 ${typeDescriptions[studyType]}, ${typeDescriptions[testType]}, ${typeDescriptions[moodType]} 유형이에요.\n\n${bonusDescriptions[bonusType]}`;

  document.getElementById("result").textContent = resultText;
  document.getElementById("description").textContent = detailText;
});
