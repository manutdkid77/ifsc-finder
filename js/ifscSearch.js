const ifscForm = document.getElementById("ifscForm");
const ifscTextField = document.getElementById("ifscTextField");
const bankNameField = document.getElementById("bankNameField");
const branchNameField = document.getElementById("branchNameField");
const centreField = document.getElementById("centreField");
const stateField = document.getElementById("stateField");
const cityField = document.getElementById("cityField");
const districtField = document.getElementById("districtField");
const addressField = document.getElementById("addressField");
const contactField = document.getElementById("contactField");
const bankCodeField = document.getElementById("bankCodeField");
const rtgsField = document.getElementById("rtgsField");
const upiField = document.getElementById("upiField");
const neftField = document.getElementById("neftField");
const impsField = document.getElementById("impsField");
const micrField = document.getElementById("micrField");
const swiftField = document.getElementById("swiftField");
const bankLogo = document.getElementById("bankLogo");

ifscForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const ifscCode = ifscTextField.value;

  if (ifscCode.length === 0) return;

  getIfscCodeDetails(ifscCode);
});

function getIfscCodeDetails(ifscCode) {
  fetch(`https://ifsc.razorpay.com/${ifscCode}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(
          `Request failed with StatusCode: ${response.status} and StatusText: ${response.statusText} at ${getIfscCodeDetails.name}`
        );
      }
    })
    .then((data) => {
      console.log(data);

      bankNameField.innerHTML = data.BANK;
      branchNameField.innerHTML = data.BRANCH;
      centreField.innerHTML = data.CENTRE;
      stateField.innerHTML = data.STATE;
      cityField.innerHTML = data.CITY;
      districtField.innerHTML = data.DISTRICT;
      addressField.innerHTML = data.ADDRESS;
      contactField.innerHTML = data.CONTACT;
      bankCodeField.innerHTML = data.BANKCODE;
      rtgsField.innerHTML = humanizeBoolean(data.RTGS);
      upiField.innerHTML = humanizeBoolean(data.UPI);
      neftField.innerHTML = humanizeBoolean(data.NEFT);
      impsField.innerHTML = humanizeBoolean(data.IMPS);
      micrField.innerHTML = humanizeBoolean(data.MICR);
      swiftField.innerHTML = humanizeBoolean(data.SWIFT);

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
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(
          `Request failed with StatusCode: ${response.status} and StatusText: ${response.statusText} at ${getBankLogo.name}`
        );
      }
    })
    .then((data) => {
      if (data && data.length > 0) {
        bankLogo.src = data[0].logo;
      }
    })
    .catch((err) => {
      console.error(err);
    });
}

function humanizeBoolean(value) {
  return value ? "Yes" : "No";
}
