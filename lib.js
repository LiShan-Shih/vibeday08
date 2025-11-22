// --- LocalStorage 讀取 ---
window.onload = function () {
    const savedName = localStorage.getItem("dogName");
    const savedDate = localStorage.getItem("birthDate");
    const history = JSON.parse(localStorage.getItem("history")) || [];

    if (savedName) document.getElementById("dogName").value = savedName;
    if (savedDate) document.getElementById("birthDate").value = savedDate;

    renderHistory(history);
};

// --- 主功能：換算 ---
document.getElementById("convertBtn").addEventListener("click", function () {
    const dogName = document.getElementById("dogName").value.trim();
    const birthDate = document.getElementById("birthDate").value;

    if (!dogName || !birthDate) {
        alert("請輸入完整資訊！");
        return;
    }

    // 記錄到 localStorage（自動帶入）
    localStorage.setItem("dogName", dogName);
    localStorage.setItem("birthDate", birthDate);

    const ageData = calcAge(birthDate);

    const result = `
        <p><strong>${dogName}</strong> 實際年齡為 <strong>${ageData.years} 歲 ${ageData.months} 個月</strong></p>
        <p>換算成人類年齡：約 <strong>${ageData.humanAge} 歲</strong></p>
    `;
    document.getElementById("result").innerHTML = result;

    // 加入歷史紀錄
    saveHistory(dogName, birthDate, ageData.humanAge);
});

// --- 年齡計算 ---
function calcAge(birthDateString) {
    const birth = new Date(birthDateString);
    const today = new Date();

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();

    if (months < 0) {
        years--;
        months += 12;
    }

    // 狗狗年紀換算粗略公式
    const humanAge = (years === 0)
        ? (months * 1.2).toFixed(1)
        : (15 + (years - 1) * 4 + months * 0.3).toFixed(1);

    return { years, months, humanAge };
}

// --- 儲存歷史（最多 5 筆） ---
function saveHistory(name, birth, humanAge) {
    let history = JSON.parse(localStorage.getItem("history")) || [];

    history.unshift({
        name,
        birth,
        humanAge,
        time: new Date().toLocaleString()
    });

    if (history.length > 5) history.pop();

    localStorage.setItem("history", JSON.stringify(history));

    renderHistory(history);
}

// --- 渲染歷史紀錄 ---
function renderHistory(history) {
    const list = document.getElementById("historyList");
    list.innerHTML = "";

    history.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.time}：${item.name}（出生：${item.birth}） → 人類年齡：約 ${item.humanAge} 歲`;
        list.appendChild(li);
    });
}
