let tutors = JSON.parse(localStorage.getItem("tutors")) || [
  {
    name: "Alex Rivera",
    subject: "Math / AP Precalc",
    email: "alex@school.org",
    schedule: "Mon/Wed 10–11:30",
    bio: "Strong in algebra, functions, and test prep."
  },
  {
    name: "Jordan Lee",
    subject: "English / Writing",
    email: "jordan@school.org",
    schedule: "Tue/Thu 9–10:30",
    bio: "Essay writing, AP analysis, reading support."
  }
];

/* SAVE */
function save() {
  localStorage.setItem("tutors", JSON.stringify(tutors));
}

/* STUDENT VIEW */
function renderStudent(filter = "") {
  const grid = document.getElementById("grid");
  if (!grid) return;

  grid.innerHTML = "";

  const filtered = tutors.filter(t =>
    (t.name + t.subject + t.bio).toLowerCase().includes(filter.toLowerCase())
  );

  filtered.forEach(t => {
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

      <button class="delete" onclick="deleteTutor(${i})">Delete</button>
    `;

    grid.appendChild(card);
  });
}

/* ADD TUTOR (FIXED — NO undefined issues) */
function addTutor() {
  const nameEl = document.getElementById("name");
  const subjectEl = document.getElementById("subject");
  const emailEl = document.getElementById("email");
  const scheduleEl = document.getElementById("schedule");
  const bioEl = document.getElementById("bio");

  const tutor = {
    name: nameEl.value,
    subject: subjectEl.value,
    email: emailEl.value,
    schedule: scheduleEl.value,
    bio: bioEl.value
  };

  tutors.push(tutor);
  save();

  nameEl.value = "";
  subjectEl.value = "";
  emailEl.value = "";
  scheduleEl.value = "";
  bioEl.value = "";

  renderAdmin();
}

/* DELETE */
function deleteTutor(index) {
  tutors.splice(index, 1);
  save();
  renderAdmin();
}
