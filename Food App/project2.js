const url = "http://localhost:8080/users";

const form = document.getElementById("userForm");

const userName = document.getElementById("userName");
const email = document.getElementById("email");
const password = document.getElementById("password");
const phone = document.getElementById("phone");
const userType = document.getElementById("userType");
const submitBtn = document.getElementById("submitBtn");




email.addEventListener("blur", (e) => {

  e.preventDefault();
  if (!email.value || !email.checkValidity()) {
    email.classList.add("is-invalid");
    email.classList.remove("is-valid");
    return;
  }
  fetch(url)
    .then(res => res.json())
    .then(data => {
      const match = data.find(user => user.email === email.value);
      if (match) {
        email.classList.add("is-invalid");
        email.classList.remove("is-valid");
      } else {
        email.classList.add("is-valid");
        email.classList.remove("is-invalid");
      }
    })
});
phone.addEventListener("blur", (e) => {
  e.preventDefault();
  const mobileRegex = /^[789]\d{9}$/;
      if (!mobileRegex.test(phone.value.trim())) {
        phone.classList.add("is-invalid");
        phone.classList.remove("is-valid");
        return ;
      } 
    
 fetch(url)
    .then(res => res.json())
    .then(data => {
      const match = data.find(user => user.phone === phone.value);
      if (match) {
        phone.classList.add("is-invalid");
        phone.classList.remove("is-valid");
      } else {
        phone.classList.add("is-valid");
        phone.classList.remove("is-invalid");
      }
    })
    
});




form.addEventListener("submit", function (e) {
  e.preventDefault();

  const newUser = {
  
    userName: userName.value.trim(),
    email: email.value.trim(),
    password: password.value.trim(),
    phone: phone.value.trim(),
    userType: userType.value
  };



  
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newUser)
  })
   .then(()=> {
      alert("User added successfully!");
      form.reset();
    })
    .catch(err => {
      console.error(err);
      alert("Error adding user.");
    });
});

function logout3() {
  sessionStorage.clear();
  sessionStorage.setItem("loggedOut", "true");
  window.location.href = "login.html";
}