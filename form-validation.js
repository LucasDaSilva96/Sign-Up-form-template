const form = document.getElementById("form");
const email = document.getElementById("email");
const country = document.getElementById("country");
const password = document.getElementById("password");
const passwordConfirm = document.getElementById("confirm-pass");
const submitButton = document.getElementById("submit-btn");

// This is for disabling the automatic form validation in the
// Html
form.noValidate = true;

// This is for validating the form when submit
form.addEventListener("submit", validateForm);

// The validation function
function validateForm(event) {
  event.preventDefault();
  const myForm = event.target;

  const fields = Array.from(myForm.elements);
  fields.splice(fields.length - 1, 1);
}

// This function is for validating the email
function checkMail(mail) {
  const mailElement = mail.target;
  if (mailElement.value === "" || mailElement.value === " ") {
    mailElement.setCustomValidity("You need to enter your email address");
    mailElement.reportValidity();
    mailElement.classList.remove("valid");
    mailElement.classList.add("invalid");
    return false;
  }
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mailElement.value)) {
    mailElement.classList.remove("invalid");
    mailElement.classList.add("valid");
    return true;
  }
  // mailElement.setCustomValidity("You have entered an invalid email address");
  // mailElement.reportValidity();
  mailElement.classList.remove("valid");
  mailElement.classList.add("invalid");
  return false;
}

// This function is for checking the input of the country
function checkCountry(country) {
  const countryElement = country.target;
  const onlyLettersRegex = /^[a-zA-Z]+$/;

  if (countryElement.value === "" || countryElement.value === " ") {
    countryElement.setCustomValidity("You need to enter your country");
    countryElement.reportValidity();
    countryElement.classList.remove("valid");
    countryElement.classList.add("invalid");
    return false;
  }

  if (onlyLettersRegex.test(`${countryElement.value}`)) {
    countryElement.classList.remove("invalid");
    countryElement.classList.add("valid");
    return true;
  }

  countryElement.classList.remove("valid");
  countryElement.classList.add("invalid");
  return false;
}

// ***************** EventListeners *****************
country.addEventListener("input", checkCountry);
email.addEventListener("input", checkMail);
