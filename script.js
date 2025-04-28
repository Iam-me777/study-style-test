document.getElementById('quiz-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const form = e.target;
  const answered = [...form.querySelectorAll('input[type="radio"]:checked')];
  const totalSubjectQs = 10 * 3; // 30문항
  const envQs = ['environment1','environment2'];

  // 체크된 문항 개수 확인
  const numSubjectAnswered = answered.filter(r => !r.name.startsWith('environment')).length;
  const numEnvAnswered = answered.filter(r => envQs.includes(r.name)).length;
  if (numSubjectAnswered < totalSubjectQs || numEnvAnswered < envQs.length) {
    return alert('모든 문항과 환경 질문에 답해주세요!');
  }

  // 점수 매핑: A=4, B=3, C=2, D=1
  const scoreMap = { a:4, b:3, c:2, d:1 };
  let totalScore = 0;
  answered.forEach(r => {
    if (!envQs.includes(r.name)) totalScore += scoreMap[r.value];
  });

  // MBTI-스타일 4글자 코드 결정
  let userType = '';
  if (totalScore >= 100)       userType = 'CIMD';
  else if (totalScore >= 80)   userType = 'BEXD';
  else if (totalScore >= 60)   userType = 'AIMC';
  else                          userType = 'AEXD';

  // 보너스 특성 집계
  const envAnswers = answered
    .filter(r => envQs.includes(r.name))
    .map(r => r.value);
  const counts = { c:0, e:0, b:0 };
  envAnswers.forEach(v => counts[v]++);
  // 가장 많이 선택된 키
  let bonusKey = Object.keys(counts).reduce((a,b) => counts[a]>=counts[b]?a:b);
  const bonusDescMap = {
    c: 'Chill - 다른 공부 환경에 잘 적응',
    e: 'Explorer - 호기심 많고 새로운 것에 도전',
    b: 'Bored - 가끔 지루함을 느끼지만 집중'
  };

  // 화면에 출력
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = `
    <h2>당신의 공부 스타일은: ${userType}-${bonusKey}형</h2>
    <p>${bonusDescMap[bonusKey]}</p>
  `;
});

