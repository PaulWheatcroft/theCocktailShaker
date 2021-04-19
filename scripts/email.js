document.getElementById("information-container").className = 'send-email animate__animated animate__fadeIn';

/* ----------- Get the data needed for the email contect from the local storage */
let cocktailName = localStorage.getItem('cocktailName');
let cocktailIngredients = localStorage.getItem('cocktailIngredients');
let cocktailInstructions = localStorage.getItem('cocktailInstructions');

/* ----------- Emailjs works best with HTML forms to do this i've added the data to a form but the form is hidden */
document.getElementById('text-name').innerText = cocktailName;
document.getElementById('text-ingredients').innerText = cocktailIngredients;
document.getElementById('text-instructions').innerText = cocktailInstructions;

/* ----------- initialise and call Emailjs */
/* ----------- if the email is successfully sent the page will change to complete the journey */
/* ----------- if the email fails then the user will recieve an alert */
function formSubmit() {
    event.preventDefault();
    let sentHtml = '';
    emailjs.sendForm("service_r1s6k5e", "template_464i5ds", "#email-form", "user_xuHqhg0d940gXwsJXVA5A")
    .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
        document.getElementById("information-container").className = 'enjoy animate__animated animate__fadeIn';
        sentHtml = `
            <h1>Enjoy!</h1>
            <p>That has been sent to you, you may need to check your junk folder. I hope you enjoy making it. And I do hope you enjoy drinking it twice as much!</p>
            <p>Bottoms up. xx</p>
            <button id="choose-again" class="buttons pink-button" ><a href="index.html">I fancy another go</a></button>
        `;
        document.getElementById("information-container").innerHTML = sentHtml;
    },
    function(error) {
        console.log('FAILED...', error);
        alert("Please enter a valid email address");
        return;
    });
}
const sendForm = document.getElementById('send-instructions');
sendForm.addEventListener('click', formSubmit);
