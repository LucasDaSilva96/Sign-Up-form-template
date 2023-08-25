const form = document.getElementById("form");
const email = document.getElementById("email");
const country = document.getElementById("country");
const password = document.getElementById("password");
const passwordConfirm = document.getElementById("confirm-pass");
const submitButton = document.getElementById("submit-btn");

// These variables are for checking if all conditions are valid
let IS_MAIL_VALID = false;
let IS_COUNTRY_VALID = false;
let IS_PASSWORD_VALID = false;

// This is for disabling the automatic form validation in the
// Html
form.noValidate = true;

// This is for validating the form when submit
form.addEventListener("submit", validateForm);

// The validation function
function validateForm(event) {
  // Prevent default is all conditions are not valid ↓
  IS_MAIL_VALID === true &&
  IS_COUNTRY_VALID === true &&
  IS_PASSWORD_VALID === true
    ? ""
    : event.preventDefault();
  // Invalid email do the following ↓
  if (email.value === "" && IS_MAIL_VALID === false) {
    email.setCustomValidity("You need to enter your email address");
    email.reportValidity();
  } else if (email.value !== "" && IS_MAIL_VALID === false) {
    email.setCustomValidity("Invalid email address");
    email.reportValidity();
    // Invalid country do the following ↓
  } else if (country.value === "" && IS_COUNTRY_VALID === false) {
    country.setCustomValidity("You need to enter your country");
    country.reportValidity();
  } else if (country.value !== "" && IS_COUNTRY_VALID === false) {
    country.setCustomValidity("Invalid country");
    country.reportValidity();
    // Passwords don't match... do the following ↓
  } else if (password.value === "" && IS_PASSWORD_VALID === false) {
    password.classList.remove("valid");
    password.classList.add("invalid");
    passwordConfirm.classList.remove("valid");
    passwordConfirm.classList.add("invalid");
    password.setCustomValidity("Invalid password");
    password.reportValidity();
  } else if (password.value !== "" && IS_PASSWORD_VALID === false) {
    password.classList.remove("valid");
    password.classList.add("invalid");
    passwordConfirm.classList.remove("valid");
    passwordConfirm.classList.add("invalid");
    passwordConfirm.setCustomValidity("Passwords don't match");
    passwordConfirm.reportValidity();
  } else {
    email.classList.add("valid");
    country.classList.add("valid");
    password.classList.add("valid");
    passwordConfirm.classList.add("valid");
    window.alert("Welcome!");
  }
}

// This function is for validating the email
function checkMail(mail) {
  const mailElement = mail.target;
  if (mailElement.value === "" || mailElement.value === " ") {
    mailElement.classList.remove("valid");
    mailElement.classList.add("invalid");
    IS_MAIL_VALID = false;
    return false;
  }
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mailElement.value)) {
    mailElement.classList.remove("invalid");
    mailElement.classList.add("valid");
    IS_MAIL_VALID = true;
    return true;
  }
  mailElement.classList.remove("valid");
  mailElement.classList.add("invalid");
  IS_MAIL_VALID = false;
  return false;
}

// This function is for checking the input of the country
function checkCountry(country) {
  const countryElement = country.target;
  const onlyLettersRegex = /^[a-zA-Z]+$/;

  if (countryElement.value === "") {
    countryElement.classList.remove("valid");
    countryElement.classList.add("invalid");
    IS_COUNTRY_VALID = false;
    return false;
  }

  if (onlyLettersRegex.test(`${countryElement.value}`)) {
    countryElement.classList.remove("invalid");
    countryElement.classList.add("valid");
    IS_COUNTRY_VALID = true;
    return true;
  }

  countryElement.classList.remove("valid");
  countryElement.classList.add("invalid");
  IS_COUNTRY_VALID = false;
  return false;
}

// This function is for checking if the length of the password is long enough
function isLongEnough() {
  const PASSWORD = password.value;
  console.log(PASSWORD.length);
  if (PASSWORD.length < 6) {
    password.setCustomValidity("Password must be over 6 characters");
    password.reportValidity();
    password.classList.add("invalid");
    return false;
  } else if (PASSWORD.length >= 6) {
    password.classList.remove("invalid");
    password.classList.add("valid");
    password.setCustomValidity(""); // Remove custom validity message
    password.reportValidity(); // Refresh validation status
    return true;
  }
}

// This function is for comparing passwords
function checkIfPasswordsIsAMatch(PASSWORD, PASSWORD_CONFIRM) {
  return PASSWORD === PASSWORD_CONFIRM ? true : false;
}

// This function is for adding the validation styling to the passwords input
function renderPasswordValidation(isValid, isLong) {
  if (isValid === true && isLong === true) {
    IS_PASSWORD_VALID = true;
    password.classList.remove("invalid");
    password.classList.add("valid");
    passwordConfirm.classList.remove("invalid");
    passwordConfirm.classList.add("valid");
  } else {
    IS_PASSWORD_VALID = false;
    password.classList.remove("valid");
    password.classList.add("invalid");
    passwordConfirm.classList.remove("valid");
    passwordConfirm.classList.add("invalid");
  }
}

// ***************** EventListeners *****************
email.addEventListener("input", checkMail);
country.addEventListener("input", checkCountry);
passwordConfirm.addEventListener("input", function () {
  renderPasswordValidation(
    checkIfPasswordsIsAMatch(password.value, passwordConfirm.value),
    isLongEnough()
  );
});
password.addEventListener("input", isLongEnough);
