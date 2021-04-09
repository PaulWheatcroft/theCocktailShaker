document.getElementById("information-container").className = 'send-email animate__animated animate__fadeIn';


let cocktailName = localStorage.getItem('cocktailName');
let cocktailIngredients = localStorage.getItem('cocktailIngredients');
let cocktailInstructions = localStorage.getItem('cocktailInstructions');

document.getElementById('text-name').innerText = cocktailName;
document.getElementById('text-ingredients').innerText = cocktailIngredients;
document.getElementById('text-instructions').innerText = cocktailInstructions;

console.log(cocktailName);
console.log(cocktailIngredients); 
console.log(cocktailInstructions);



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
    }, function(error) {
       console.log('FAILED...', error);
       alert("Please enter a valid email address")
       return;
    });
}



const sendForm = document.getElementById('send-instructions');
sendForm.addEventListener('click', formSubmit);
