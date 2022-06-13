function styleOfError(input) {
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");
}

function styleOfCorrect(input) {
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
}

function showError(feedback, text) {
    console.log(text);
    feedback.innerHTML = text;
}

function isEmpty(input, feedback, text) {
    if (input.value.trim() == "") {
        showError(feedback, text);
        return true;
    }
    return false;
}

function falsePattern(input, feedback, text, pattern) {
    let fromInput = input.value.trim();
    let testPattert = pattern.test(String(fromInput).toLowerCase());

    if (fromInput !== "" && testPattert === false) {
        showError(feedback, text);
        return true;
    }
    return false;
}

function hideInput(inputCheckbox, input) {
    if (inputCheckbox.checked) {
        input.setAttribute("readonly", true);
        input.classList.add("without-data", "is-valid");
        input.classList.remove("is-invalid");
        input.value = "";
        return true;
    } else {
        input.removeAttribute("readonly");
        input.classList.remove("without-data", "is-valid");
        return false;
    }
}

function inputZipCode(input) {
    for (let i = 0; i < input.value.trim().length; i++) {
        if (input.value.trim().length === 2) {
            input.value += "-";
        }
    }
}

function onsubmit(event) {
    event.preventDefault();
    console.log("---------");
    let form = document.querySelector("#myForm").elements;

    validName(form);
    validEmail(form);
    validPhone(form);
    validPesel(form);
    validZip(form);

    function validName(form) {
        let inputName = form.inputName;
        let nameFeedback = document.querySelector("#nameFeedback");
        let isEmptyFunc = isEmpty(inputName, nameFeedback, "Name field is required!");

        if (isEmptyFunc) {
            styleOfError(inputName);
            return false;
        }
        styleOfCorrect(inputName);
        return true;
    }

    function validEmail(form) {
        let inputEmail = form.inputEmail;
        let emailFeedback = document.querySelector("#emailFeedback");
        let patternEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        let isEmptyFunc = isEmpty(inputEmail, emailFeedback, "E-mail field is required!");
        let falsePatternFunc = falsePattern(inputEmail, emailFeedback, "Please enter a valid e-mail address!", patternEmail);

        if (isEmptyFunc || falsePatternFunc) {
            styleOfError(inputEmail);
            return false;
        }
        styleOfCorrect(inputEmail);
        return true;
    }

    function validPhone(form) {
        let inputPhone = form.inputPhone;
        let phoneFeedback = document.querySelector("#phoneFeedback");
        let patternPhone = /^(\+?\(?48\)?[\s]{1})?([0-9]{3})([\s\-]{1})([0-9]{3})([\s\-]{1})([0-9]{3})$/;

        let falsePatternFunc = falsePattern(inputPhone, phoneFeedback, "Please enter a valid phone number", patternPhone);

        if (falsePatternFunc) {
            styleOfError(inputPhone);
            return false;
        }
        styleOfCorrect(inputPhone);
        return true;
    }

    function validPesel(form) {
        let inputPesel = form.inputPesel;
        let withoutData = Array.from(inputPesel.classList).includes("without-data")
        let peselFeedback = document.querySelector("#peselFeedback");
        let patternPesel = /^([0-9]{11})$/;

        let isEmptyFunc = !withoutData ? isEmpty(inputPesel, peselFeedback, "Pesel field is required!") : false;
        let falsePatternFunc = falsePattern(inputPesel, peselFeedback, "PESEL can only have 11 numbers!", patternPesel);

        if (!withoutData && isEmptyFunc || falsePatternFunc) {
            styleOfError(inputPesel);
            return false;
        }
        styleOfCorrect(inputPesel);
        return true;
    }

    function validZip(form) {
        let inputZip = form.inputZip;
        let zipFeedback = document.querySelector("#zipFeedback");
        let patternZip = /^\d\d\-\d\d\d$/;

        let isEmptyFunc = isEmpty(inputZip, zipFeedback, "Zip Code field is required!");
        let falsePatternFunc = falsePattern(inputZip, zipFeedback, "Zip Code can only have 5 numbers!", patternZip);

        if (isEmptyFunc || falsePatternFunc) {
            styleOfError(inputZip);
            return false;
        }
        styleOfCorrect(inputZip);
        return true;
    }
}

function onReset() {
    let formFields = document.querySelector("#myForm").elements;
    formFields.inputPesel.removeAttribute("readonly");

    for (let i = 0; i < formFields.length; i++) {
        if (formFields[i].tagName == "BUTTON") {
            continue;
        }
        formFields[i].classList.remove("is-valid", "is-invalid", "without-data");
    }
}

document.querySelector("#myForm").addEventListener("submit", onsubmit);
document.querySelector("#myForm").addEventListener("reset", onReset);
document.querySelector("#checkboxPesel").addEventListener('change', () => {
    hideInput(document.querySelector("#checkboxPesel"), document.querySelector("#inputPesel"));
});
document.querySelector('#inputZip').addEventListener('input', () => {
    inputZipCode(document.querySelector('#inputZip'));
});