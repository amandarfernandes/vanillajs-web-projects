//form elements
const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

//set classes on elements after form submission and validation
function showError(formItem, message){
    const formControl = formItem.parentElement;
    formControl.className = "form-control error";
    const small = formControl.querySelector('small');
    small.innerText = message;
}

function showSuccess(formItem) {
    const formControl =formItem.parentElement;
    formControl.className = "form-control success";
}

//returns form element name in title case
function getFieldName(element) {
    return element.id.charAt(0).toUpperCase()+element.id.slice(1);
}

//check for valid email
function checkEmail(email){
    const re =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (re.test(String(email.value.trim()).toLowerCase())) {
        showSuccess(email);
    } else {
        showError(email, "Email is invalid.")
    }
}

//check required form element has value
function checkRequired(elementArray) {
    elementArray.forEach(element =>{
        if (element.value.trim() === '') {
            showError(element, `${getFieldName(element)} is required.`)
        } else {
            showSuccess(element);
        }
    });
}

//check elements that have length limits
function checkLength(element,minLength,maxLength) {
    if (element.value.length < minLength || element.value.length > maxLength) {
        showError(element, `${getFieldName(element)} should be between ${minLength} & ${maxLength} characters.`);
    } else {
        showSuccess(element);
    }

}

function checkPasswordsMatch(p1,p2) {
    if (p1.value !== p2.value) {
        showError(p2, "Passwords do not match");
    } else {
        showSuccess(p2);
    }
}

function formSubmitted(e){
    e.preventDefault();
    checkRequired([username,email,password,password2]);
    checkLength(username,5,15);
    checkLength(password, 6, 20);
    checkEmail(email);
    checkPasswordsMatch(password,password2);
}

form.addEventListener("submit",formSubmitted);


