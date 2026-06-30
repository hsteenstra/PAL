const API_URL = "https://script.google.com/macros/s/AKfycbw7DlKz2FZz9wGwqB2qMkddRJZMUcDJtGfne-AhMK8N1GQu1663-qauebUsO6ckyWZEkQ/exec";

let tutors = [];

/* LOAD FROM GOOGLE SHEET */
async function loadTutors() {
  try {
    const res = await fetch(API_URL);
    tutors = await res.json();

    async function loadTutors() {
  try {
    const res = await fetch(API_URL);
    tutors = await res.json();

    console.log("Loaded tutors:", tutors); // DEBUG

    renderStudent("");
    renderAdmin();
  } catch (err) {
    console.error("Error loading tutors:", err);
  }
}
  } catch (err) {
    console.error("Error loading tutors:", err);
  }
}

/* ---------------- STUDENT VIEW ---------------- */
function renderStudent(filter = "") {
  const grid = document.getElementById("grid");
  if (!grid) return;

  grid.innerHTML = "";

  const filtered = tutors.filter(t =>
    (t.name + t.subject + t.bio)
      .toLowerCase()
      .includes(filter.toLowerCase())
  );

  filtered.forEach(t => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <div class="name">${t.name}</div>
      <div class="subject">${t.subject}</div>
      <div class="schedule">📅 ${t.schedule}</div>
      <div class="bio">${t.bio}</div>

      <button class="email"
        onclick="window.location='mailto:${t.email}'">
        Email Tutor
      </button>
    `;

    grid.appendChild(card);
  });
}

/* ---------------- ADMIN VIEW ---------------- */
function renderAdmin() {
  const grid = document.getElementById("adminGrid");
  if (!grid) return;

  grid.innerHTML = "";

  tutors.forEach((t, i) => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <div class="name">${t.name}</div>
      <div class="subject">${t.subject}</div>
      <div class="schedule">${t.schedule}</div>
      <div class="bio">${t.bio}</div>

      <button class="delete" onclick="deleteTutor(${i})">
        Delete
      </button>
    `;

    grid.appendChild(card);
  });
}

/* ---------------- ADD TUTOR (TO SHEET) ---------------- */
async function addTutor() {
  const newTutor = {
    name: document.getElementById("name").value,
    subject: document.getElementById("subject").value,
    email: document.getElementById("email").value,
    schedule: document.getElementById("schedule").value,
    bio: document.getElementById("bio").value
  };

  if (!newTutor.name) {
    alert("Name is required");
    return;
  }

  try {
    await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify(newTutor)
    });

    // clear form
    document.getElementById("name").value = "";
    document.getElementById("subject").value = "";
    document.getElementById("email").value = "";
    document.getElementById("schedule").value = "";
    document.getElementById("bio").value = "";

    loadTutors();
  } catch (err) {
    console.error("Error adding tutor:", err);
  }
}

/* ---------------- DELETE (LOCAL ONLY FOR NOW) ---------------- */
function deleteTutor(index) {
  tutors.splice(index, 1);
  renderAdmin();
}

/* ---------------- SEARCH SUPPORT ---------------- */
document.addEventListener("input", (e) => {
  if (e.target.id === "search") {
    renderStudent(e.target.value);
  }
});

/* ---------------- INIT ---------------- */
window.addEventListener("DOMContentLoaded", () => {
  loadTutors();
});
