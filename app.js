let tutors = JSON.parse(localStorage.getItem("tutors")) || [
  {
    name: "Alex Rivera",
    subject: "Math / AP Precalc",
    email: "alex@school.org",
    schedule: "Mon/Wed 10–11:30",
    bio: "Strong in algebra, calculus foundations, and test prep."
  },
  {
    name: "Jordan Lee",
    subject: "English / Writing",
    email: "jordan@school.org",
    schedule: "Tue/Thu 9–10:30",
    bio: "Essay structure, AP writing, and reading analysis support."
  }
];

/* STUDENT VIEW */
function renderTutors(filter = "") {
  const grid = document.getElementById("grid");
  if (!grid) return;

  grid.innerHTML = "";

  tutors
    .filter(t =>
      (t.name + t.subject + t.bio).toLowerCase().includes(filter.toLowerCase())
    )
    .forEach(t => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <div class="name">${t.name}</div>
        <div class="subject">${t.subject}</div>
        <div class="schedule">📅 ${t.schedule}</div>
        <div class="bio">${t.bio}</div>

        <button class="email" onclick="window.location='mailto:${t.email}'">
          Email
        </button>
      `;

      grid.appendChild(card);
    });
}

/* ADMIN VIEW */
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

/* ADD / DELETE */
function addNewTutor(tutor) {
  tutors.push(tutor);
  localStorage.setItem("tutors", JSON.stringify(tutors));
}

function deleteTutor(index) {
  tutors.splice(index, 1);
  localStorage.setItem("tutors", JSON.stringify(tutors));
  renderAdmin();
}
