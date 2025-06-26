function loadPage(page) {
    fetch(`${page}`)
        .then(response => response.text())
        .then(data => {
            const container = document.getElementById('main-content');
            container.innerHTML = data;

            // Extract and evaluate scripts manually
            const scripts = container.querySelectorAll('script');
            scripts.forEach(script => {
                const newScript = document.createElement('script');
                if (script.src) {
                    newScript.src = script.src;
                } else {
                    newScript.textContent = script.textContent;
                }
                document.body.appendChild(newScript);
                script.remove(); // Optional: remove the original script tag
            });
        })
        .catch(err => {
            document.getElementById('main-content').innerHTML =
                '<p class="text-danger">Failed to load content.</p>';
            console.error(err);
        });
}

function logout() {
    sessionStorage.clear();  
    sessionStorage.setItem("loggedOut", "true"); 
    window.location.href = "../login.html"; 
  }

  /*document.addEventListener("DOMContentLoaded", () => {
    const customerProfile = document.getElementById("customerProfile");
    const ownerProfile = document.getElementById("ownerProfile");
    const customerName = sessionStorage.getItem("userName");
  
    if (customerName === "Customer") {
      customerProfile.innerHTML = `<i class="fa fa-user mx-2"></i>${customerName}`;
    } else {
      ownerProfile.innerHTML = `<i class="fa fa-user mx-2"></i>${customerName}`;
    }
  });*/
  

 function storeAndNavigate(id) {
    sessionStorage.setItem("selectedRestaurantId", id);
    loadPage('page2.html');
  }
