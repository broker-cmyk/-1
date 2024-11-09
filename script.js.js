const properties = [];
const adminCredentials = {
  username: "مهد احمد علي",
  password: "01156342313مهد@"
};

function displayProperties(filteredProperties = properties) {
  const propertyListContainer = document.getElementById("property-list");
  propertyListContainer.innerHTML = "";

  filteredProperties.forEach((property) => {
    const propertyCard = document.createElement("div");
    propertyCard.classList.add("property-card");

    propertyCard.innerHTML = `
      <img src="${property.imageUrl}" alt="${property.title}">
      <div>
        <h3>${property.title}</h3>
        <p>الموقع: ${property.location}</p>
        <p>السعر: ${property.price} جنيه</p>
        <p>المساحة: ${property.size} م²</p>
        <p>الوصف: ${property.description}</p>
        ${property.videoUrl ? `<iframe src="${property.videoUrl}" style="width:100%; height:200px;"></iframe>` : ""}
      </div>
    `;
    propertyListContainer.appendChild(propertyCard);
  });
}

function adminLogin(event) {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const loginError = document.getElementById("loginError");

  if (username === adminCredentials.username && password === adminCredentials.password) {
    document.getElementById("admin-login").classList.add("hidden");
    document.getElementById("admin-section").classList.remove("hidden");
  } else {
    loginError.textContent = "اسم المستخدم أو كلمة المرور غير صحيحة.";
  }
}

function submitProperty(event) {
  event.preventDefault();

  const title = document.getElementById("propertyTitle").value;
  const location = document.getElementById("propertyLocation").value;
  const price = document.getElementById("propertyPrice").value;
  const size = document.getElementById("propertySize").value;
  const imageUrl = document.getElementById("propertyImageUrl").value;
  const description = document.getElementById("propertyDescription").value;
  const videoUrl = document.getElementById("propertyVideoUrl").value;

  const newProperty = { title, location, price, size, imageUrl, description, videoUrl };
  properties.push(newProperty);

  displayProperties();
  document.getElementById("propertyForm").reset();
}

function filterProperties() {
  const location = document.getElementById("locationFilter").value;
  const minPrice = parseFloat(document.getElementById("minPrice").value);
  const maxPrice = parseFloat(document.getElementById("maxPrice").value);
  const minSize = parseFloat(document.getElementById("minSize").value);

  let filtered = properties;

  if (location) {
    filtered = filtered.filter((property) => property.location.includes(location));
  }
  if (minPrice) {
    filtered = filtered.filter((property) => property.price >= minPrice);
  }
  if (maxPrice) {
    filtered = filtered.filter((property) => property.price <= maxPrice);
  }
  if (minSize) {
    filtered = filtered.filter((property) => property.size >= minSize);
  }

  displayProperties(filtered);
}

function sortPropertiesByPrice() {
  const sortedProperties = properties.slice().sort((a, b) => a.price - b.price);
  displayProperties(sortedProperties);
}

function clearProperties() {
  properties.length = 0;
  displayProperties();
}

function showLogin() {
  document.getElementById("admin-login").classList.remove("hidden");
}
