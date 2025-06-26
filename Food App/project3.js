const apiUrl = "http://localhost:3000/restaurants";
const form = document.getElementById("restaurantForm");
const restaurantIdInput = document.getElementById("restaurantId");
const restaurantNameInput = document.getElementById("restaurantName");
const locationInput = document.getElementById("location");
const contactInput = document.getElementById("contact");
const submitBtn = document.getElementById("submitBtn");

let allRestaurants = [];
let editId=null;
let sortDirection=1;
function fetchAndRenderRestaurants() {
  fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
      allRestaurants = data;
      renderRestaurants(data);
    });
}


  
let orderQuantities = {}; // Track quantities by restaurant ID

function renderRestaurants(restaurants) {
  const tbody = document.getElementById("restaurantTableBody");
  tbody.innerHTML = "";

  restaurants.forEach(rest => {
    const quantity = orderQuantities[rest.id] || 0;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${rest.restaurantName}</td>
      <td>${rest.location}</td>
      <td>${rest.contact}</td>
      <td>
        <div class="d-flex align-items-center">
          <button class="btn btn-sm btn-outline-secondary minus-btn" data-id="${rest.id}">-</button>
          <span class="mx-2 quantity" id="qty-${rest.id}">${quantity}</span>
          <button class="btn btn-sm btn-outline-secondary plus-btn" data-id="${rest.id}">+</button>
        </div>
      </td>
    `;
    tbody.appendChild(row);
  });

  // Attach quantity listeners
  document.querySelectorAll(".plus-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      orderQuantities[id] = (orderQuantities[id] || 0) + 1;
      document.getElementById(`qty-${id}`).textContent = orderQuantities[id];
      updateOrderBadge();
    });
  });

  document.querySelectorAll(".minus-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      orderQuantities[id] = Math.max(0, (orderQuantities[id] || 0) - 1);
      document.getElementById(`qty-${id}`).textContent = orderQuantities[id];
      updateOrderBadge();
    });
  });
}



function validateName(){
    if (restaurantNameInput.value.trim().length >= 5){
        restaurantNameInput.classList.add("is-valid");
        restaurantNameInput.classList.remove("is-invalid");
        return true;
      } else {
        restaurantNameInput.classList.add("is-invalid");
        restaurantNameInput.classList.remove("is-valid");
        return false;
      }
    }
    function validateLocation(){
        if (locationInput.value.trim().length >= 1){
            locationInput.classList.add("is-valid");
            locationInput.classList.remove("is-invalid");
            return true;
          } else {
            locationInput.classList.add("is-invalid");
            locationInput.classList.remove("is-valid");
            return false;
          }
        }
        function validateContact(){
            const mobileRegex = /^[789]\d{9}$/;
      if (mobileRegex.test(contactInput.value.trim())) {
        contactInput.classList.add("is-valid");
        contactInput.classList.remove("is-invalid");
        return true;
      } else {
        contactInput.classList.add("is-invalid");
        contactInput.classList.remove("is-valid");
        return false;
      }
    }
    
    
      restaurantNameInput.addEventListener("blur", validateName);
    
      locationInput.addEventListener("blur", validateLocation);
    contactInput.addEventListener("blur", validateContact);
    
    


form.addEventListener("submit", function (e) {
    e.preventDefault();
    const valid = validateName()  && validateContact() && validateLocation() ;
   
if(!valid) return;

   const restaurant = {
    restaurantName: restaurantNameInput.value.trim(),
    location: locationInput.value.trim(),
    contact: contactInput.value.trim(),
    
};


if (editId) {
    
    fetch(`${apiUrl}/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(restaurant)
    }).then(() => {
        fetchAndRenderRestaurants();  
        form.reset();
        editId = null;
        submitBtn.textContent = "Add Restaurant";
        // clearValidation(); 
    });
} else {
    
    fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(restaurant)  
    }).then(() => {
        fetchAndRenderRestaurants();  
        form.reset();
        // clearValidation(); 
    });
}
});

function deleteRestaurant(id) {
  if (confirm("Are you sure you want to delete this restaurant?")) {
    fetch(`${apiUrl}/${id}`, {
      method: "DELETE"
    })
      .then(() => fetchAndRenderRestaurants())
      
  }
}

function loadRestaurantForEdit(id) {
    fetch(`${apiUrl}/${id}`)
        .then(res => res.json())
        .then(data => {
            restaurantNameInput.value = data.restaurantName;
            locationInput.value = data.location;
            contactInput.value = data.contact;
         
            editId = id;
            submitBtn.textContent = "Update Restaurant";
        });
}


      document.querySelector("th:nth-child(2)").style.cursor = "pointer";
      document.querySelector("th:nth-child(2)").addEventListener("click", () => {
          const sorted = [...allRestaurants].sort((a, b) =>
              a.restaurantName.localeCompare(b.restaurantName) * sortDirection
          );
          sortDirection *= -1;
          renderRestaurants(sorted);
      });
      
      function logout() {
        sessionStorage.clear();
        sessionStorage.setItem("loggedOut", "true");
        window.location.href = "login.html";
      }
      function updateOrderBadge() {
        const total = Object.values(orderQuantities).reduce((sum, qty) => sum + qty, 0);
        document.getElementById("orderBadge").textContent = total;
      }
      
      document.getElementById("cancelOrderBtn").addEventListener("click", () => {
        // Reset all quantities
        orderQuantities = {};
        
        // Update UI quantities to 0
        document.querySelectorAll(".quantity").forEach(span => {
          span.textContent = "0";
        });
      
        // Update badge count
        updateOrderBadge();
      });
      
      
fetchAndRenderRestaurants();

