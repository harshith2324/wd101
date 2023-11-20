let userEntries = [];

const validateForm = () => {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;
  const acceptTerms = document.getElementById("acceptTerms").checked;

  if (!name || !email || !password || !dob || !acceptTerms) {
    alert("Please fill in all fields and accept the Terms & Conditions.");
    return false;
  }

  const age = calculateAge(dob);

  if (age < 18 || age > 55) {
    alert("Age must be between 18 and 55.");
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Invalid email address.");
    return false;
  }

  return true;
};

const saveUserForm = (event) => {
  event.preventDefault();

  if (!validateForm()) {
    return;
  }

  const nameValue = document.getElementById("name").value;
  const emailValue = document.getElementById("email").value;
  const passwordValue = document.getElementById("password").value;
  const dobValue = document.getElementById("dob").value;
  const acceptedTermsAndConditions = document.getElementById("acceptTerms").checked;

  const entry = {
    name: nameValue,
    email: emailValue,
    password: passwordValue,
    dob: dobValue,
    acceptedTermsAndConditions: acceptedTermsAndConditions,
  };

  userEntries.push(entry);

  localStorage.setItem("user-entries", JSON.stringify(userEntries));

  displayUserEntries();

  console.log("Submitted Information:");
  console.log("Name:", nameValue);
  console.log("Email:", emailValue);
  console.log("Password:", passwordValue);
  console.log("Dob:", dobValue);
  console.log("Accepted terms:", acceptedTermsAndConditions);
};

document.getElementById("registrationForm").addEventListener("submit", saveUserForm);

const calculateAge = (dob) => {
  const today = new Date();
  const birthDate = new Date(dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
};

const displayUserEntries = () => {
  const userTableBody = document.getElementById("userTableBody");
  userTableBody.innerHTML = ""; // Clear previous content

  userEntries.forEach((entry) => {
    const row = userTableBody.insertRow();

    const columns = ["name", "email", "password", "dob", "acceptedTermsAndConditions"];
    columns.forEach((column) => {
      const cell = row.insertCell();
      cell.textContent = entry[column];
    });
  });
};

const storedEntries = localStorage.getItem("user-entries");
userEntries = storedEntries ? JSON.parse(storedEntries) : [];

displayUserEntries();
