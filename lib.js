document.getElementById('convertBtn').addEventListener('click', function() {
  const dogName = document.getElementById('dogName').value.trim();
  const birthDateStr = document.getElementById('birthDate').value;

  if (!dogName || !birthDateStr) {
    alert('請填寫愛犬名字與出生日期');
    return;
  }

  const birthDate = new Date(birthDateStr);
  const now = new Date();

  if (birthDate > now) {
    alert('出生日期不能晚於今天');
    return;
  }

  // 計算實際年齡（精確至年、小數點兩位）
  const diffMs = now - birthDate;
  const diffYears = diffMs / (365.25 * 24 * 60 * 60 * 1000);
  const actualAge = diffYears.toFixed(2);

  // 換算為「人類年齡」- 這裡根據參考文獻：第一年 ≈15年，第二年 ≈9年，之後每年≈5年
  let humanYears;
  if (diffYears < 1) {
    humanYears = (diffYears * 15).toFixed(2);
  } else if (diffYears < 2) {
    humanYears = (15 + (diffYears - 1) * 9).toFixed(2);
  } else {
    humanYears = (15 + 9 + (diffYears - 2) * 5).toFixed(2);
  }

  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = `
    <p>🐶 ${dogName} 的實際年齡：約 <strong>${actualAge}</strong> 歲</p>
    <p>👤 相當於人類年齡：約 <strong>${humanYears}</strong> 歲</p>
  `;
});