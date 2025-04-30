const subjects = [
  { name: "국어" },
  { name: "수학" },
  { name: "영어" },
  { name: "과학" },
  { name: "사회" },
  { name: "도덕" },
  { name: "음악" },
  { name: "미술" },
  { name: "체육" },
  { name: "실과" }
];

const studyOptions = [
  "문제집 풀기",
  "인강 듣기",
  "암기 위주 공부",
  "공부 안 함"
];

const testOptions = [
  "문제 풀이",
  "기출문제 위주",
  "복습 중심",
  "벼락치기"
];

const feelOptions = [
  "항상 집중하는 편",
  "가끔 졸음이 온다",
  "수업이 재미있다",
  "수업이 지루하다"
];

const altStudyOptions = {
  "음악": ["악기 연습", "노래 따라 부르기", "이론 암기", "안 함"],
  "미술": ["직접 그려보기", "작품 감상", "미술이론 정리", "안 함"],
  "체육": ["직접 실습", "동작 영상 보기", "룰 외우기", "안 함"]
};

const resultMap = {
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

const bonusMap = {
  c: "chill, 환경에 잘 적응함",
  e: "explorer, 새로운 환경을 좋아함",
  b: "지루함을 느낌"
};

function createQuestionBlock(subject) {
  const fieldset = document.createElement("fieldset");
  const legend = document.createElement("legend");
  legend.textContent = subject.name;
  fieldset.appendChild(legend);

  // 공부 질문
  const studyQ = document.createElement("div");
  studyQ.classList.add("question");
  studyQ.innerHTML = `<label>1. ${subject.name}을(를) 어떻게 공부하나요?</label>`;
  const studySel = document.createElement("select");
  studySel.name = `${subject.name}_study`;
  const options = altStudyOptions[subject.name] || studyOptions;
  options.forEach((opt, i) => {
    studySel.innerHTML += `<option value="${String.fromCharCode(97 + i)}">${opt}</option>`;
  });
  studyQ.appendChild(studySel);
  fieldset.appendChild(studyQ);

  // 시험 질문
  const testQ = document.createElement("div");
  testQ.classList.add("question");
  testQ.innerHTML = `<label>2. ${subject.name} 시험을 볼 때 어떻게 하나요?</label>`;
  const testSel = document.createElement("select");
  testSel.name = `${subject.name}_test`;
  testOptions.forEach((opt, i) => {
    testSel.innerHTML += `<option value="${String.fromCharCode(101 + i)}">${opt}</option>`;
  });
  testQ.appendChild(testSel);
  fieldset.appendChild(testQ);

  // 기분 질문
  const feelQ = document.createElement("div");
  feelQ.classList.add("question");
  feelQ.innerHTML = `<label>3. ${subject.name} 수업을 들을 때 어떤 기분인가요?</label>`;
  const feelSel = document.createElement("select");
  feelSel.name = `${subject.name}_feel`;
  feelOptions.forEach((opt, i) => {
    feelSel.innerHTML += `<option value="${String.fromCharCode(105 + i)}">${opt}</option>`;
  });
  feelQ.appendChild(feelSel);
  fieldset.appendChild(feelQ);

  return fieldset;
}

window.onload = () => {
  const container = document.getElementById("subjects");
  subjects.forEach(subj => {
    container.appendChild(createQuestionBlock(subj));
  });

  document.getElementById("quiz-form").addEventListener("submit", e => {
    e.preventDefault();

    const form = new FormData(e.target);
    const counts = { a: 0, b: 0, c: 0, d: 0, e: 0, f: 0, g: 0, h: 0, i: 0, j: 0, k: 0, l: 0 };
    
    // 점수 집계
    for (let [key, value] of form.entries()) {
      if (value >= 'a' && value <= 'l') counts[value]++;
    }

    // 보너스
    const b1 = parseInt(form.get("bonus1"));
    const b2 = parseInt(form.get("bonus2"));
    const b3 = parseInt(form.get("bonus3"));

    const bonusCode = (b1 <= 2 ? "-c" : "") + (b2 <= 2 ? "-e" : "") + (b3 <= 2 ? "-b" : "");

    // 최다 선택된 유형 추출
    const final = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    const studyType = final.find(([k]) => "abcd".includes(k))?.[0];
    const testType = final.find(([k]) => "efgh".includes(k))?.[0];
    const feelType = final.find(([k]) => "ijkl".includes(k))?.[0];
    const finalCode = `${studyType}${testType}${feelType}${bonusCode}`;

    const resultText = `🎯 당신의 공부유형은 <strong>${resultMap[studyType]}, ${resultMap[testType]}, ${resultMap[feelType]}</strong>형입니다!<br><br>보너스 성향: ${bonusCode || '없음'}<br>→ ${bonusCode.split('-').slice(1).map(code => bonusMap[code]).join(', ') || '특이사항 없음'}`;

    document.getElementById("result").innerHTML = resultText;
  });
};
