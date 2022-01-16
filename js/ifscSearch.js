const ifscForm = document.getElementById("ifscForm");
const ifscTextField = document.getElementById("ifscTextField");

ifscForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const ifscCode = ifscTextField.value;

  if (ifscCode.length === 0) return;

  getIfscCodeDetails(ifscCode);
});

function getIfscCodeDetails(ifscCode) {
  fetch(`https://ifsc.razorpay.com/${ifscCode}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      getBankLogo(data.BANK);
    })
    .catch((err) => {
      console.error(err);
    });
}

function getBankLogo(bankName) {
  fetch(
    `https://autocomplete.clearbit.com/v1/companies/suggest?query=${bankName}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.error(err);
    });
}
