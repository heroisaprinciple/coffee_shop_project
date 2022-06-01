const registerForm = document.getElementById('reg_form');

//Summary: addEventListener can add multiple events, whereas with onclick this cannot be done.
// onclick can be added as an HTML attribute, whereas an addEventListener can only be added within <script> elements.
// addEventListener can take a third argument which can stop the event propagation.

registerForm.addEventListener('submit', (event) => {
    //prevents form to reload
    event.preventDefault();


})