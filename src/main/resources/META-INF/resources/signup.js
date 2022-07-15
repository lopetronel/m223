const URL = 'http://localhost:8080';
let entries = [];

const signup = (e) =>{
    e.preventDefault();
    let formData = new FormData(e.target);
    let data = {"username": formData.get("username"), "password": formData.get("password")};

    fetch(`${URL}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then((result) => {
        result.json().then((user) => {
            console.log(user);
            window.location = "index.html";
            if(user == 1){
              //Unfinished Error Handling  
            }
            else if(user == -1){
                document.getElementById('error').innerText = "password must have atleast 8 characters";
            }
            else if(user == -2){
                document.getElementById('error').innerText = "username must have atleast 3 characters";
            }
            else{
                document.getElementById('error').innerText = "error";
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', function(){
    const loginForm = document.querySelector('#signupForm');
    loginForm.addEventListener('submit', signup);
});