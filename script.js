const questions = [
  { subject: "국어", q: "국어를 어떻게 공부하나요?" },
  { subject: "국어", q: "국어 시험칠 때 어떻게 하나요?" },
  { subject: "국어", q: "국어 수업받을 때 기분은?" },
  { subject: "수학", q: "수학을 어떻게 공부하나요?" },
  { subject: "수학", q: "수학 시험칠 때 어떻게 하나요?" },
  { subject: "수학", q: "수학 수업받을 때 기분은?" },
  { subject: "영어", q: "영어를 어떻게 공부하나요?" },
  { subject: "영어", q: "영어 시험칠 때 어떻게 하나요?" },
  { subject: "영어", q: "영어 수업받을 때 기분은?" },
  { subject: "사회", q: "사회를 어떻게 공부하나요?" },
  { subject: "사회", q: "사회 시험칠 때 어떻게 하나요?" },
  { subject: "사회", q: "사회 수업받을 때 기분은?" },
  { subject: "과학", q: "과학을 어떻게 공부하나요?" },
  { subject: "과학", q: "과학 시험칠 때 어떻게 하나요?" },
  { subject: "과학", q: "과학 수업받을 때 기분은?" },
  { subject: "음악", q: "음악을 어떻게 공부하나요?" },
  { subject: "음악", q: "음악 시험칠 때 어떻게 하나요?" },
  { subject: "음악", q: "음악 수업받을 때 기분은?" },
  { subject: "미술", q: "미술을 어떻게 공부하나요?" },
  { subject: "미술", q: "미술 시험칠 때 어떻게 하나요?" },
  { subject: "미술", q: "미술 수업받을 때 기분은?" },
  { subject: "도덕", q: "도덕을 어떻게 공부하나요?" },
  { subject: "도덕", q: "도덕 시험칠 때 어떻게 하나요?" },
  { subject: "도덕", q: "도덕 수업받을 때 기분은?" },
  { subject: "체육", q: "체육을 어떻게 공부하나요?" },
  { subject: "체육", q: "체육 시험칠 때 어떻게 하나요?" },
  { subject: "체육", q: "체육 수업받을 때 기분은?" },
  { subject: "실과", q: "실과를 어떻게 공부하나요?" },
  { subject: "실과", q: "실과 시험칠 때 어떻게 하나요?" },
  { subject: "실과", q: "실과 수업받을 때 기분은?" }
];

const options = [
  "A. 문제집으로 연습한다",
  "B. 인강을 듣는다",
  "C. 잔머리를 굴린다",
  "D. 공부를 안 한다"
];

const bonusQuestions = [
  "환경이 바뀌면 잘 적응하나요?",
  "새로운 공부법을 시도하나요?",
  "공부가 지루하다고 자주 느끼나요?"
];

const bonusTypes = {
  c: "Chill - 다른 환경이나 과목에 잘 적응하는 스타일",
  e: "Explorer - 새로운 시도와 방식을 좋아하는 스타일",
  b: "Bored - 쉽게 지루해하고 새로운 자극이 필요한 스타일"
};

const typeDescriptions = {
  "CIMD": "꾸준하고 규칙적인 스타일. 기본에 충실하며, 평범한 방법으로 안정적 공부를 선호.",
  "CIMC": "기본을 지키면서 창의성도 발휘하는 스타일. 필요할 때는 새로운 방법도 시도함.",
  "CIDM": "기본기 부족하지만, 문제풀이로 빠르게 보완하는 스타일. 실전 감각이 좋음.",
  "CIDC": "창의적 접근을 좋아하지만 기초가 약한 타입. 독특한 공부법을 만듦.",
  "CIMB": "평소엔 규칙적이지만 쉽게 지루해함. 흥미를 붙이면 몰입도가 높음.",
  "CIBC": "아이디어가 넘치고 즉흥적으로 움직이는 타입. 종종 산만할 수 있음.",
  "CDIM": "지적이고 논리적이지만 현실성이 부족할 수 있음. 완성도를 추구.",
  "CDIC": "새로운 것을 시도하며 논리와 창의를 동시에 활용하는 타입.",
  "DICM": "즉흥적이지만 결과는 잘 내는 타입. 시험 한방을 노리는 스타일.",
  "DICC": "창의적이지만 준비가 약해 즉흥적으로 승부 보는 경우 많음.",
  "DIMC": "실용적이며 필요한 것만 골라 공부하는 타입. 효율적이지만 깊이가 부족할 수 있음.",
  "DIMD": "딱 필요한 만큼만 공부하는 타입. 매우 실용적이고 실전 중심.",
  "DCIM": "창의적이지만 대충대충 넘어가는 타입. 자유롭게 공부함.",
  "DCIC": "흥미 위주로 공부하며 몰입과 이탈이 반복되는 타입.",
  "DICB": "새로운 것을 잘 받아들이지만 쉽게 싫증을 내는 타입.",
  "DICD": "즉흥적이고 감정에 따라 공부가 왔다갔다하는 타입."
};

function createQuiz() {
  const quizForm = document.getElementById('questions');
  questions.forEach((item, idx) => {
    const div = document.createElement('div');
    div.innerHTML = `<h3>${idx+1}. ${item.q}</h3>` +
      options.map((opt, i) => `<label><input type="radio" name="q${idx}" value="${opt[0]}"> ${opt}</label><br>`).join('');
    quizForm.appendChild(div);
  });

  // 보너스 질문
  bonusQuestions.forEach((item, idx) => {
    const div = document.createElement('div');
    div.innerHTML = `<h3>보너스 ${idx+1}. ${item}</h3>
      <label><input type="radio" name="b${idx}" value="yes"> 예</label><br>
      <label><input type="radio" name="b${idx}" value="no"> 아니오</label><br>`;
    quizForm.appendChild(div);
  });
}

function calculateResult() {
  const form = new FormData(document.getElementById('quizForm'));
  let counts = {C:0, D:0, I:0, B:0, M:0};
  for (let [key, value] of form.entries()) {
    if (key.startsWith('q')) {
      counts[value]++;
    }
  }

  const first = counts['C'] >= counts['D'] ? 'C' : 'D';
  const second = counts['I'] >= counts['B'] ? 'I' : 'B';
  const third = counts['M'] >= counts['C'] ? 'M' : 'C';
  const fourth = counts['D'] >= counts['B'] ? 'D' : 'C';
  
  const resultType = first + second + third + fourth;

  document.getElementById('result').innerHTML = `당신의 공부 유형은: <b>${resultType}</b>`;
  document.getElementById('typeDescription').innerHTML = `<h3>유형 설명:</h3><p>${typeDescriptions[resultType] || '설명 준비중'}</p>`;

  // 보너스
  let bonusScore = {c:0, e:0, b:0};
  bonusQuestions.forEach((_, idx) => {
    const val = form.get(`b${idx}`);
    if (val === 'yes') {
      if (idx === 0) bonusScore.c++;
      if (idx === 1) bonusScore.e++;
      if (idx === 2) bonusScore.b++;
    }
  });

  let bonusResult = Object.keys(bonusScore).reduce((a, b) => bonusScore[a] >= bonusScore[b] ? a : b);

  document.getElementById('bonusDescription').innerHTML = `<h3>보너스 유형:</h3><p>${bonusResult} - ${bonusTypes[bonusResult]}</p>`;
}

document.getElementById('quizForm').addEventListener('submit', function(e){
  e.preventDefault();
  calculateResult();
});

createQuiz();
