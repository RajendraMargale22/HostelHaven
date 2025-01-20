const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnPopup = document.querySelector('.Login');
const iconClose = document.querySelector('.icon-close');
const loginForm = document.querySelector('.form-box.login form');
const dropdownLoginButton = document.querySelector('.dropdown_menu .Login');


const toggleBtn = document.querySelector('.toggle_btn')
const toggleBtnIcon = document.querySelector('.toggle_btn i')
const dropDownMenu = document.querySelector('.dropdown_menu')

dropDownMenu.classList.remove('open');

toggleBtn.onclick = function () {
    dropDownMenu.classList.toggle('open')
    const isopen = dropDownMenu.classList.contains('open')

    toggleBtnIcon.classList =isopen
    ? 'fa-solid fa-xmark'
    : 'fa-solid fa-bars'
}

let isHostelButtonClicked = false; //track whether the Hostel button has been clicked

// Function to open login form
function openLoginForm() {
    wrapper.classList.add('active-popup');
}

// Function to open register form
function openRegisterForm() {
    wrapper.classList.add('active');
}

// Function to set login state in session storage
function setLoginState(isLoggedIn) {
    sessionStorage.setItem('isLoggedIn', isLoggedIn);
}

// Function to get login state from session storage
function getLoginState() {
    return sessionStorage.getItem('isLoggedIn') === 'true';
}

// Check if user is already logged in
if (getLoginState()) {
    simulateLoginSuccess();
}

// Event listener for login link click
loginLink.addEventListener('click', () => {
    wrapper.classList.remove('active');
});

// Event listener for register link click
registerLink.addEventListener('click', () => {
    wrapper.classList.add('active');
});

// Event listener for login button click
btnPopup.addEventListener('click', () => {
    // Open the login form only if the Hostel button has not been clicked
    if (!isHostelButtonClicked) {
        openLoginForm();
    }
});

dropdownLoginButton.addEventListener('click', () => {
    if (!isHostelButtonClicked) {
        // Open the login form or perform any desired action
        openLoginForm();
        dropDownMenu.classList.remove('open');
        toggleBtnIcon.classList = dropDownMenu.classList.contains('open') ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'; // Added this line to change toggle button icon
    } else {
        // Handle the click event for the "Add Hostel" button
        handleHostelButtonClick();
    }
});

// Event listener for close button click
iconClose.addEventListener('click', () => {
    wrapper.classList.remove('active-popup');
});

// Function to login success and handle Hostel button click
function handleHostelButtonClick() {
    // Open the Google Form link in a new tab/window
    window.open('https://docs.google.com/forms/d/e/1FAIpQLScIwV0QozNe45QNdZ-0gUjnwi5aaxKVg4d2VlmhhJKmxhVsRw/viewform?usp=sf_link');
}

// Function to handle the click event for the login button
function handleLoginButtonClick() {
    // Open the login page
    wrapper.classList.add('active-popup');
}

// Function to simulate login success
function simulateLoginSuccess() {
    // Simulate successful login by changing the button text to "Hostel"
    btnPopup.textContent = "Add Hostel";
    dropdownLoginButton.textContent = "Add Hostel";

    // Close the login page
    wrapper.classList.remove('active-popup');
    // Update to indicate that the button is now "Hostel"
    isHostelButtonClicked = true;
    // Set login state in session storage
    setLoginState(true);

    // Remove the existing event listener for the login button
    btnPopup.removeEventListener('click', handleLoginButtonClick);
    dropdownLoginButton.removeEventListener('click', handleLoginButtonClick);
    // Add a new event listener for the Hostel button
    btnPopup.addEventListener('click', handleHostelButtonClick);
    dropdownLoginButton.addEventListener('click', handleHostelButtonClick);
}

// Event listener for login button click (inside the form)
loginForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the form from submitting

    // Simulate successful login
    simulateLoginSuccess();
});