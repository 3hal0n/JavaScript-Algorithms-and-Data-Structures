function isPalindrome(str) {
  
  const cleanStr = str.replace(/[^a-z0-9]/gi, '').toLowerCase();
  const reversedStr = cleanStr.split('').reverse().join('');
  return cleanStr === reversedStr;
}

document.getElementById("check-btn").addEventListener("click", function () {
  const input = document.getElementById("text-input").value;
  const resultDiv = document.getElementById("result");

  if (!input.trim()) {
    alert("Please input a value");
    return;
  }

  const resultText = isPalindrome(input)
    ? `${input} is a palindrome`
    : `${input} is not a palindrome`;

  resultDiv.textContent = resultText;
});
