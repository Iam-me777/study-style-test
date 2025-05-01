const typeNames = {
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

document.getElementById("quizForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const scores = {};
  for (const t in typeNames) {
    scores[t] = 0;
  }

  // 기본 질문 카운트
  const radios = document.querySelectorAll('input[type="radio"]:checked');
  radios.forEach(radio => {
    const val = radio.value;
    if (val.length === 1 && typeNames[val]) {
      scores[val]++;
    }
  });

  // 보너스 분석
  const bonus = ["-c", "-e", "-b"];
  const bonusScores = { "-c": 0, "-e": 0, "-b": 0 };

  radios.forEach(radio => {
    if (bonus.includes(radio.value)) {
      bonusScores[radio.value]++;
    }
  });

  const getMaxKey = (group) => {
    return group.reduce((max, key) => scores[key] > scores[max] ? key : max, group[0]);
  };

  const main1 = getMaxKey(["a", "b", "c", "d"]);
  const main2 = getMaxKey(["e", "f", "g", "h"]);
  const main3 = getMaxKey(["i", "j", "k", "l"]);

  const bonusType = Object.keys(bonusScores).reduce((max, key) => bonusScores[key] > bonusScores[max] ? key : max, "-c");

  const fullType = `${main1}${main2}${main3}${bonusType}`;

  const resultText = `당신의 공부유형은 🎯 <strong>${fullType}</strong>형입니다!`;

  const desc = [
    typeNames[main1],
    typeNames[main2],
    typeNames[main3]
  ].join(", ");

  document.getElementById("result").innerHTML = resultText;
  document.getElementById("description").innerText = `당신은 ${desc} 입니다.`;
});

