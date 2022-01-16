const ifscForm = document.getElementById("ifscForm");
const ifscTextField = document.getElementById("ifscTextField");

ifscForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const ifscCode = ifscTextField.value;

  if (ifscCode.length === 0) return;
});
