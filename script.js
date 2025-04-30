window.onload = () => {
  const container = document.getElementById("subjects");
  subjects.forEach(subj => {
    container.appendChild(createQuestionBlock(subj));
  });

  document.getElementById("quiz-form").addEventListener("submit", e => {
    e.preventDefault();

    const form = new FormData(e.target);
    const counts = {
      a: 0, b: 0, c: 0, d: 0, // 공부 유형
      e: 0, f: 0, g: 0, h: 0, // 시험 유형
      i: 0, j: 0, k: 0, l: 0  // 수업 태도
    };

    // 값 집계
    for (let [key, value] of form.entries()) {
      if (value in counts) counts[value]++;
    }

    // 보너스 질문
    const b1 = parseInt(form.get("bonus1"));
    const b2 = parseInt(form.get("bonus2"));
    const b3 = parseInt(form.get("bonus3"));

    let bonusCode = "";
    if (b1 <= 2) bonusCode += "-c";
    if (b2 <= 2) bonusCode += "-e";
    if (b3 <= 2) bonusCode += "-b";

    // 각 그룹별 최댓값 찾기
    const getMax = (group) =>
      group.reduce((a, b) => (counts[a] >= counts[b] ? a : b));

    const study = getMax(['a', 'b', 'c', 'd']);
    const test = getMax(['e', 'f', 'g', 'h']);
    const feel = getMax(['i', 'j', 'k', 'l']);

    const finalCode = `${study}${test}${feel}${bonusCode}`;

    const summary = `${resultMap[study]}, ${resultMap[test]}, ${resultMap[feel]}`;
    const bonusSummary = bonusCode
      ? bonusCode
          .slice(1)
          .split('-')
          .map(code => bonusMap[code])
          .join(', ')
      : "없음";

    const resultHTML = `
      🎯 <strong>당신의 공부유형은 ${study}${test}${feel}${bonusCode} 입니다.</strong><br><br>
      <u>당신은 ${summary}입니다.</u><br><br>
      보너스 성향: ${bonusSummary}
    `;

    document.getElementById("result").innerHTML = resultHTML;
  });
};
