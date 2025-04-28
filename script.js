document.getElementById('quiz-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const form = e.target;
  const answered = [...form.querySelectorAll('input[type="radio"]:checked')];
  const totalSubjectQs = 10 * 3; // 30문항
  const envQs = ['environment1', 'environment2'];

  // 답 체크
  const numSubjectAnswered = answered.filter(r => !envQs.includes(r.name)).length;
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

  // 4글자 MBTI-스타일 코드 결정
  let userType = '';
  if (totalScore >= 100)       userType = 'CIMD';
  else if (totalScore >= 80)   userType = 'BEXD';
  else if (totalScore >= 60)   userType = 'AIMC';
  else                         userType = 'AEXD';

  // 보너스 특성 집계
  const counts = { c:0, e:0, b:0 };
  answered
    .filter(r => envQs.includes(r.name))
    .forEach(r => counts[r.value]++);
  let bonusKey = Object.keys(counts).reduce((a,b) => counts[a]>=counts[b]?a:b);
  const bonusDescMap = {
    c: 'Chill - 다른 공부 환경에 잘 적응',
    e: 'Explorer - 호기심 많고 새로운 것에 도전',
    b: 'Bored - 가끔 지루하지만 집중'
  };

  // 유형 설명
  const typeDescriptions = {
    CIMD: 'Consistent·Immersive·Mixed·Driven: 꾸준함+몰입+혼합+추진력 갖춘 괴물형',
    BEXD: 'Balanced·Explorer·eXpressive·Driven: 균형형 탐험가, 표현력+추진력',
    AIMC: 'Adaptive·Immersive·Mixed·Consistent: 적응형 몰입+혼합+꾸준형',
    AEXD: 'Adaptive·Expressive·eXplorer·Driven: 적응형 표현가+탐험가+추진력형',
  };

  // 결과 출력
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = `
    <h2>당신의 공부 스타일은: ${userType}형</h2>
    <p>${typeDescriptions[userType]}</p>
    <p>${bonusDescMap[bonusKey]}</p>
  `;
});
