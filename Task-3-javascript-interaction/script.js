const orderForm = document.getElementById("orderForm");
const summaryCard = document.getElementById("summaryCard");

const fullNameInput = document.getElementById("fullName");
const phoneInput = document.getElementById("phone");
const mealInput = document.getElementById("meal");
const addressInput = document.getElementById("address");

const nameError = document.getElementById("nameError");
const phoneError = document.getElementById("phoneError");
const mealError = document.getElementById("mealError");
const addressError = document.getElementById("addressError");

function clearErrors() {
    nameError.textContent = "";
    phoneError.textContent = "";
    mealError.textContent = "";
    addressError.textContent = "";
}

function validateForm() {
    let isValid = true;
    const phonePattern = /^[0-9]{10}$/;

    clearErrors();

    if (fullNameInput.value.trim() === "") {
        nameError.textContent = "Please enter your full name.";
        isValid = false;
    }

    if (!phonePattern.test(phoneInput.value.trim())) {
        phoneError.textContent = "Please enter a valid 10-digit phone number.";
        isValid = false;
    }

    if (mealInput.value === "") {
        mealError.textContent = "Please select a meal.";
        isValid = false;
    }

    if (addressInput.value.trim() === "") {
        addressError.textContent = "Please enter your delivery address.";
        isValid = false;
    }

    return isValid;
}

function updateSummary(name, phone, meal, address) {
    summaryCard.classList.remove("empty-state");
    summaryCard.innerHTML = `
        <h3>Order Placed Successfully</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Meal:</strong> ${meal}</p>
        <p><strong>Address:</strong> ${address}</p>
    `;
}

orderForm.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!validateForm()) {
        return;
    }

    const name = fullNameInput.value.trim();
    const phone = phoneInput.value.trim();
    const meal = mealInput.value;
    const address = addressInput.value.trim();

    updateSummary(name, phone, meal, address);
    orderForm.reset();
});
