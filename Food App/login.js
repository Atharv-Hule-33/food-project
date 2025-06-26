document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();
  verify();
});

function verify() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  fetch("http://localhost:8080/api/users")
    .then(res => res.json())
    .then(users => {
      const user = users.find(u => u.email === email && u.password === password);

      if (user) {
        // Store user data in sessionStorage
        sessionStorage.setItem("userId", user.id);
        sessionStorage.setItem("userName", user.name);
        sessionStorage.setItem("userType", user.userType);
        sessionStorage.setItem("isLoggedIn", "true");  // Log in status
        
        // Redirect based on user role
        switch (user.userType) {
          case "Owner":
            window.location.href = "pages/foodItems.html"; 
            break;
          case "Customer":
            window.location.href = "pages/restaurant.html"; 
            break;
            case "admin":
              window.location.href = "pages/admin.html"; 
              break;
          default:
            document.getElementById("error").textContent = "Unknown user type.";
        }
      } else {
        document.getElementById("error").textContent = "Invalid email or password.";
      }
    })
    .catch(err => {
      console.error("Error fetching users:", err);
      document.getElementById("error").textContent = "Something went wrong. Please try again later.";
    });
}
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
// Function to get user ID, name, and type from sessionStorage
function getUserId() {
  return sessionStorage.getItem("userId");
}

function getUserName() {
  return sessionStorage.getItem("userName");
}

function getUserType() {
  return sessionStorage.getItem("userType");
}


function logout() {
  sessionStorage.clear();  
  sessionStorage.setItem("loggedOut", "true"); 
  window.location.href = "login.html"; 
}
