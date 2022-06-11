// $(function() {
//     $("#register_button").dialog({
//         autoOpen : false,
//         show: {
//             effect: "blind",
//             duration: 1000
//         },
//         hide: {
//             effect: "explode",
//             duration: 1000
//         }
//     });
// })

function nonValidMessage() {
    let nonValid = document.getElementById('not_valid')
    if (typeof document.getElementById('first_name').value === 'string') {
        nonValid.textContent = 'Please enter a string'
        nonValid.style.color = 'red'
    }
    else {
        nonValid.textContent = ''
    }

    if (typeof document.getElementById('last_name').value === 'string') {
        nonValid.textContent = 'Please enter a string'
        nonValid.style.color = 'red'
    }
    else {
        nonValid.textContent = ''
    }

    if (document.getElementById('phone').value) {
        // ?
        nonValid.textContent = 'Please enter a phone number'
        nonValid.style.color = 'red'
    }
    else {
        nonValid.textContent = ''
    }

    if (document.getElementById('password').value) {
        // ?
        nonValid.textContent = 'Please enter a password'
        nonValid.style.color = 'red'
    }
    else {
        nonValid.textContent = ''
    }

}


