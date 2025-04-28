const quizForm = document.getElementById("quizForm");
const submitBtn = document.getElementById("submitBtn");
const resultDiv = document.getElementById("result");

// 과목 리스트
const subjects = ["국어", "수학", "영어", "사회", "과학", "음악", "미술", "도덕", "체육", "실과"];

// 질문 리스트
const questions = [];

subjects.forEach(subject => {
    questions.push(
        `${subject}을(를) 어떻게 공부하나요?`,
        `${subject} 시험을 볼때 어떻게 하나요?`,
        `${subject} 수업 들을 때 어떤 기분인가요?`
    );
});

// 보너스 질문
const bonusQuestions = [
    "새로운 환경에서도 공부가 잘 되나요?",
    "공부할 때 모험적인 방법을 시도해보나요?",
    "공부하다가 지루함을 자주 느끼나요?"
];

// 답변 항목
const options = [
    { text: "A", value: "A" },
    { text: "B", value: "B" },
    { text: "C", value: "C" },
    { text: "D", value: "D" }
];

// 문제 생성
questions.forEach((q, idx) => {
    const questionDiv = document.createElement("div");
    questionDiv.innerHTML = `<p>${idx + 1}. ${q}</p>`;
    options.forEach(opt => {
        questionDiv.innerHTML += `
            <label>
                <input type="radio" name="q${idx}" value="${opt.value}" required> ${opt.text}
            </label>
        `;
    });
    quizForm.appendChild(questionDiv);
});

// 보너스 질문 추가
bonusQuestions.forEach((q, idx) => {
    const questionDiv = document.createElement("div");
    questionDiv.innerHTML = `<p>보너스 ${idx + 1}. ${q}</p>`;
    options.forEach(opt => {
        questionDiv.innerHTML += `
            <label>
                <input type="radio" name="bonus${idx}" value="${opt.value}" required> ${opt.text}
            </label>
        `;
    });
    quizForm.appendChild(questionDiv);
});

// 4자리 유형 해석
const typeDescriptions = {
    "CI": "차분하고 문제해결에 강한 타입",
    "CE": "창의적이고 모험을 좋아하는 타입",
    "BI": "조용하고 깊게 공부하는 타입",
    "BE": "적극적이고 다양한 방법을 시도하는 타입",
    "MI": "분석적이고 체계적인 타입",
    "ME": "유연하고 융통성 있는 타입",
    "DI": "단순하고 직관적인 타입",
    "DE": "도전적이고 경쟁심 강한 타입",
    "CC": "집중력이 뛰어난 타입",
    "BC": "지루함을 참지 못하는 타입",
    "MC": "계획적이고 신중한 타입",
    "DC": "즉흥적이고 감에 의존하는 타입",
    "CB": "꾸준히 노력하는 타입",
    "BB": "금방 싫증내는 타입",
    "MB": "빠른 이해와 흥미를 추구하는 타입",
    "DB": "즉각적이고 충동적인 타입"
};

// 보너스 타입 해석
const bonusDescriptions = {
    "c": "Chill (환경에 잘 적응함)",
    "e": "Explorer (새로운 방법을 시도함)",
    "b": "Bored (쉽게 지루함을 느낌)"
};

// 결과 계산
submitBtn.addEventListener("click", () => {
    const formData = new FormData(quizForm);
    let counts = { C: 0, B: 0, M: 0, D: 0, I: 0, E: 0 };
    let bonusCounts = { c: 0, e: 0, b: 0 };

    for (let [key, value] of formData.entries()) {
        if (key.startsWith("bonus")) {
            if (value === "A") bonusCounts.c++;
            if (value === "B") bonusCounts.e++;
            if (value === "C" || value === "D") bonusCounts.b++;
        } else {
            if (value === "A") counts.C++;
            if (value === "B") counts.B++;
            if (value === "C") counts.M++;
            if (value === "D") counts.D++;
        }
    }

    // 메인 타입 계산
    const first = counts.C >= counts.B ? "C" : "B";
    const second = counts.M >= counts.D ? "M" : "D";
    const third = counts.I >= counts.E ? "I" : "E";
    const fourth = counts.C >= counts.M ? "C" : "B";

    const mainType = first + third;
    const subType = second + fourth;

    const finalType = mainType + subType;

    // 보너스 타입 계산
    let bonusType = "";
    if (bonusCounts.c >= bonusCounts.e && bonusCounts.c >= bonusCounts.b) bonusType = "-c";
    else if (bonusCounts.e >= bonusCounts.c && bonusCounts.e >= bonusCounts.b) bonusType = "-e";
    else bonusType = "-b";

    // 결과 보여주기
    resultDiv.classList.remove("hidden");
    resultDiv.innerHTML = `
        <h2>당신의 유형: ${finalType}${bonusType}</h2>
        <p><strong>${finalType} 설명:</strong> ${typeDescriptions[finalType] || "설명이 없습니다."}</p>
        <p><strong>보너스(${bonusType}):</strong> ${bonusDescriptions[bonusType.replace("-", "")]}</p>
    `;
});
