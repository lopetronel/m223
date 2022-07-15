const URL = 'http://localhost:8080';

function login(e) {
    e.preventDefault();
    let formData = new FormData(e.target);
    let data = {"username": formData.get("username"), "password": formData.get("passwort")};
    fetch(`${URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          //'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(data),
      })
      .then(function(response) {
        if(response.status == 200) {
            response.text().then(function(token) {
                localStorage.setItem("token", token);
                location.href = "main.html";
            })
        }else {
            //TODO Error Handling
        }
      });
}

document.addEventListener('DOMContentLoaded', function(){
    const loginForm = document.querySelector('#loginForm');
    loginForm.addEventListener('submit', login);
});