// (() => {
//     'use strict';
//     const form = document.getElementById('loginForm');
//     form.addEventListener('submit', event => {
//         event.preventDefault();
//         form.classList.remove('was-validated');
//         const emailInput = document.getElementById('email');
//         const passwordInput = document.getElementById('password');
//         const email = emailInput.value.trim();
//         const password = passwordInput.value.trim();
//         let hasError = false;
//         if (email === '') {
//             setFieldError(emailInput, 'يرجى إدخال البريد الالكترونى.');
//             hasError = true;
//         }
//         else if (!isValidEmail(email)) {
//             setFieldError(emailInput, 'يرجى إدخال بريد الألكتروني صحيح.');
//             hasError = true;
//         }
//         if (password === '') {
//             setFieldError(passwordInput, 'يرجى إدخال كلمة المرور.');
//             hasError = true;
//         }

//         if (!hasError) {
//             // Form is valid, submit the form or do whatever you want here
//             alert('Login successful!');
//             // form.submit(); // Uncomment this line to submit the form
//         }

//         form.classList.add('was-validated');
//     });

//     function setFieldError(field, errorMessage) {
//         field.classList.add('is-invalid');
//         const errorFeedback = field.nextElementSibling;
//         errorFeedback.innerText = errorMessage;
//         field.addEventListener('input', () => {
//             field.classList.remove('is-invalid');
//             errorFeedback.innerText = '';
//           });

//           field.addEventListener('blur', () => {
//             if (field.value.trim() === '') {
//               field.classList.add('is-invalid');
//               errorFeedback.innerText = errorMessage;
//             }
//           });
//     }
//     function isValidEmail(email) {
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         return emailRegex.test(email);
//     }
// })();

// (() => {
//     'use strict';
//     const form = document.getElementById('loginForm');
//     form.addEventListener('submit', event => {
//         event.preventDefault();
//         form.classList.remove('was-validated');
//         const usernameInput = document.getElementById('email');
//         const passwordInput = document.getElementById('password');
//         const username = usernameInput.value.trim();
//         const password = passwordInput.value.trim();
//         let hasError = false;
//         if (username === '') {
//             setFieldError(usernameInput, 'يرجى إدخال البريد الإلكتروني');
//             hasError = true;
//         }
//         if (password === '') {
//             setFieldError(passwordInput, 'يرجى إدخال كلمة المرور.');
//             hasError = true;
//         }

//         if (!hasError) {
//             // Form is valid, submit the form or do whatever you want here
//             alert('Login successful!');
//             // form.submit(); // Uncomment this line to submit the form
//         }

//         form.classList.add('was-validated');
//     });

//     function setFieldError(field, errorMessage) {
//         field.classList.add('is-invalid');
//         const errorFeedback = field.nextElementSibling;
//         errorFeedback.innerText = errorMessage;
//         field.addEventListener('input', () => {
//             field.classList.remove('is-invalid');
//             errorFeedback.innerText = '';
//           });

//           field.addEventListener('blur', () => {
//             if (field.value.trim() === '') {
//               field.classList.add('is-invalid');
//               errorFeedback.innerText = errorMessage;
//             }
//           });
//     }
// })();

const form = document.getElementById('loginForm');

form.addEventListener('submit', function (event) {
    event.preventDefault();
    // get user data
    const pass = document.getElementById('password').value;
    const email = document.getElementById('email').value;
    fetch('http://127.0.0.1:8000/api/login', {
        method: 'POST',
        body: JSON.stringify({
            "email": email,
            "password": pass,

        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })  .then(response => response.json())
        .then(data => {
            let token = data.token;
            let ID = data.user.id;
            console.log(ID);
            localStorage.setItem("notifiy",ID)
            localStorage.setItem("token",token)
            let role = data.user.role;
            if(role == '0'){
                url = 'http://127.0.0.1:5500/controllerhome.html';
            }else if(role == '1'){
                url= 'http://127.0.0.1:5500/admin.html'
            }else if(role == '2'){
                url= 'http://127.0.0.1:5500/notification.html'
            }else if(role == '3'){
                url= 'http://127.0.0.1:5500/createmeeting.html'
            }else{
                url = 'http://127.0.0.1:5500/login.html'
                alert("عفوا لا يمكنك تسجيل الدخول")
            }
            window.location.href = url;    
            console.log(role)
        })
        // .then((json) => console.log(json))
        // .catch(error => console.error('يوجد خطاء في البريد الإلكتروني او الرقم السري :', error));
    
})
