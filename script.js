// script.js

const subjects = [
  "국어", "수학", "영어", "사회", "과학",
  "음악", "미술", "도덕", "체육", "실과"
];

const questionsPerSubject = [
  { key: "study", text: "을(를) 어떻게 공부하나요?", options: ["문제집풀기", "인강듣기", "암기하기", "공부안함"] },
  { key: "exam", text: " 시험을 볼 때는 어떻게 하나요?", options: ["문제풀이", "기출문제 풀기", "복습하기", "벼락치기"] },
  { key: "mood", text: " 수업을 받을 때 어떤 기분인가요?", options: ["항상 집중하는 편", "가끔 졸음", "재미있다", "지루하다"] }
];

const bonusQuestions = [
  {
    id: "bonus1",
    question: "공부할 때 집중이 잘 되나요?",
    options: ["매우 그렇다", "조금 그렇다", "보통이다", "전혀 아니다"]
  },
  {
    id: "bonus2",
    question: "시험 전날 긴장을 하나요?",
    options: ["매우 그렇다", "조금 그렇다", "보통이다", "전혀 아니다"]
  }
];

const quizForm = document.getElementById("quizForm");

subjects.forEach(subject => {
  const fieldset = document.createElement("fieldset");
  const legend = document.createElement("legend");
  legend.innerText = subject;
  fieldset.appendChild(legend);

  questionsPerSubject.forEach((q, idx) => {
    const qId = `${subject}-${q.key}`;
    const p = document.createElement("p");
    p.innerText = `${subject}${q.text}`;
    fieldset.appendChild(p);

    q.options.forEach((opt, i) => {
      const label = document.createElement("label");
      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = qId;
      radio.value = String.fromCharCode("a".charCodeAt(0) + i); // a, b, c, d
      label.appendChild(radio);
      label.append(` ${opt}`);
      fieldset.appendChild(label);
    });
  });

  quizForm.appendChild(fieldset);
});

const bonusBox = document.createElement("fieldset");
const bonusLegend = document.createElement("legend");
bonusLegend.innerText = "보너스 질문";
bonusBox.appendChild(bonusLegend);

bonusQuestions.forEach(bq => {
  const p = document.createElement("p");
  p.innerText = bq.question;
  bonusBox.appendChild(p);

  bq.options.forEach((opt, i) => {
    const label = document.createElement("label");
    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = bq.id;
    radio.value = i;
    label.appendChild(radio);
    label.append(` ${opt}`);
    bonusBox.appendChild(label);
  });
});

quizForm.appendChild(bonusBox);

function submitQuiz() {
  let studyScore = 0, examScore = 0, moodScore = 0;
  let totalSubjects = 0;
  for (let subject of subjects) {
    const study = document.querySelector(`input[name="${subject}-study"]:checked`);
    const exam = document.querySelector(`input[name="${subject}-exam"]:checked`);
    const mood = document.querySelector(`input[name="${subject}-mood"]:checked`);
    if (!study || !exam || !mood) {
      alert("모든 질문에 답해주세요!");
      return;
    }
    studyScore += study.value.charCodeAt(0) - "a".charCodeAt(0);
    examScore += exam.value.charCodeAt(0) - "a".charCodeAt(0);
    moodScore += mood.value.charCodeAt(0) - "a".charCodeAt(0);
    totalSubjects++;
  }

  // 평균으로 분류
  const studyType = ["a", "b", "c", "d"][Math.round(studyScore / totalSubjects)];
  const examType = ["e", "f", "g", "h"][Math.round(examScore / totalSubjects)];
  const moodType = ["i", "j", "k", "l"][Math.round(moodScore / totalSubjects)];

  // 보너스
  let bonusType = "";
  for (let bq of bonusQuestions) {
    const val = document.querySelector(`input[name="${bq.id}"]:checked`);
    if (!val) {
      alert("보너스 질문도 체크해 주세요!");
      return;
    }
    bonusType += val.value;
  }
  const finalType = `${studyType}${examType}${moodType}-${bonusType}`;

  document.getElementById("result").innerHTML = `
    당신의 유형: <strong>${finalType.toUpperCase()}</strong><br><br>
    <div style="font-size: 1.1em;">
      <strong>${studyType}</strong>: 공부 스타일 — ${studyDesc(studyType)}<br>
      <strong>${examType}</strong>: 시험 전략 — ${examDesc(examType)}<br>
      <strong>${moodType}</strong>: 수업 분위기 — ${moodDesc(moodType)}<br>
      <strong>보너스</strong>: ${bonusDesc(bonusType)}
    </div>
  `;
}

function studyDesc(t) {
  return {
    a: "문제집 위주로 푸는 스타일",
    b: "인강을 많이 듣는 스타일",
    c: "암기에 집중하는 스타일",
    d: "공부는 거의 안 함"
  }[t];
}

function examDesc(t) {
  return {
    e: "문제풀이 위주",
    f: "기출문제를 반복",
    g: "복습 중심",
    h: "벼락치기 마스터"
  }[t];
}

function moodDesc(t) {
  return {
    i: "항상 집중해서 듣는 편",
    j: "가끔 졸기도 함",
    k: "재밌어서 즐겁게 듣는 편",
    l: "지루해서 집중이 안 됨"
  }[t];
}

function bonusDesc(bt) {
  return `보너스 유형 코드 (${bt})`;
}

