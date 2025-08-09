// 🗓️ Meme Calendar - Modified with Full Features

const memeMonths = [
  "Janavari Chill ❄️", "Lovebruary ❤️", "Memech", "April LOLs",
  "Mayhem", "Johnnee", "Jokely", "Onathin August 🌸",
  "September Sarcasm", "Octoburn 😂", "No-vember", "Memecember 🎄"
];

const memeDays = [
  "Sleepday 😴", "Mood Offday 🚒", "Chai-day ☕", "Wackyday 🤪",
  "Throwbackday 📸", "Fri-nally! 😍", "Partyday 🕺"
];

const memeEvents = {
  "8-15": {
    message: "🎉 Happy Independence Day 🇮🇳 - Meme Freedom!",
    gif: "https://media.giphy.com/media/l0MYEqEzwMWFCg8rm/giphy.gif"
  },
  "8-28": {
    message: "🌸 Onam Special - Meme Sadhya Incoming!",
    gif: "https://media.giphy.com/media/3o7qE1YN7aBOFPRw8E/giphy.gif"
  },
  "10-31": {
    message: "👻 Meme-O-Ween is here!",
    gif: "https://media.giphy.com/media/3o7btPCcdNniyf0ArS/giphy.gif"
  },
  "12-25": {
    message: "🎄 Christmas Memes Activated!",
    gif: "https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif"
  }
};

const monthFirstDayMemes = [
  { message: "🎉 False Hope Begins! Welcome January! 😅", gif: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExYXdwYmU2bDJqN3VobDV1Nmw3eGtyaHU3ZHF3OGkwZDc0Yzg4bmh3ZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/aibKssnIQpxbC7sbI6/giphy.gif" },
  { message: "❤️ Love Loading... Hello February!", gif: "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExOGd4d2lhZmJzOWRydmUwdjd5YWJnMmVyaHV2ZzNqYmJwOXlveWY0cSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/5dwCS6G8gKAe7UmGMe/giphy.gif" },
  { message: "🎝 March of Memes begins!", gif: "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExeXNrejIzdDZwcTIzaG05dWVrcDdtbThqenUxMHM4OWRrYzcyZWdleCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l1Aswy7TkiIaqq5KU/giphy.gif" },
  { message: "😂 April Fools Season! Stay Alert!", gif: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExM201emVuZDRtN2dmM2l6azMzZzlkbDd1djhicXNsaTRxb3oyMTBjbCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l2R07prvtIz7JsMik/giphy.gif" },
  { message: "🔥 Mayday! Mayday! It’s meme time!", gif: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExYnRmeHlycDBvY3h1Y3lqMzg5dHMxdm45OHBkcXp4aHl5bzRqaTAwbSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/SBzcoCQTYA4py/giphy.gif" },
  { message: "🌞 June: Sweat + Memes = Perfect Combo", gif: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExeHEyZXFrM2pvY3lkcjE2bnAzcXgzcXo5bTI3ODR6dno0ZHh5MTFrNyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/s5kxuyMgR5y3Q6VDJV/giphy.gif" },
  { message: "🎇 Joking July! Let’s meme more!", gif: "https://media.giphy.com/media/l0ExncehJzexFpRHq/giphy.gif" },
  { message: "🌸 Onathinte memes ready aano? Welcome August!", gif: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWJ2OXpveDl6M2xtejBvb254ZW9iZXBmNnYyemVmNjFrNGZtenVyeiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/SWuoqm9k71NI2mlzkt/giphy.gif" },
  { message: "📋 September – Time to study? Nah, meme.", gif: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExYm0zcWV3dWsxOXdub21ndXhuY3NuMnBzZjdhN3k3NHhoNGlpOGx2YyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Pioie5F9TGKSWxULdF/giphy.gif" },
  { message: "👻 October = Spook + Joke Combo", gif: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNDFkaDc5MmhtaGdkczhhdGlyZWlrdHlndnVjYmh0cHpxZHlqZ3ZmNSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/7702jh3NsloOseiDUk/giphy.gif" },
  { message: "🧣 November: Meme Season Begins!", gif: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExaXg2MWx0MG9zdXF4eDM5ZzFvamsyZGExeDF5N2g4b2cwN2E3bXUxdiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/dUJb54x5zsQpb5v8Be/giphy.gif" },
  { message: "🎄 December = Memecember", gif: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExbXFkaTZ0bDVmamUzN3FsZG9za3oyNXp2ejBrdXh1bTJldG81bTNiayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xULW8qPSIA40uIXi6s/giphy.gif" }
];

let currentDate = new Date();
let selectedDayKey = "";

function renderCalendar() {
  const calendar = document.getElementById("calendar");
  const monthYear = document.getElementById("month-year");
  const weekdays = document.getElementById("weekdays");

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  monthYear.innerText = `${memeMonths[month]} ${year}`;
  calendar.innerHTML = "";
  weekdays.innerHTML = "";

  memeDays.forEach(day => {
    const div = document.createElement("div");
    div.innerText = day;
    weekdays.appendChild(div);
  });

  for (let i = 0; i < firstDay; i++) {
    calendar.appendChild(document.createElement("div"));
  }

  for (let i = 1; i <= lastDate; i++) {
    const div = document.createElement("div");
    div.innerText = i;

    const key = `${month + 1}-${i}`;
    const saved = localStorage.getItem(key);
    if (saved) div.style.backgroundColor = "#d1ffd6";

    div.onclick = () => {
      selectedDayKey = key;
      if (saved) {
        showPopup(saved);
      } else if (memeEvents[key]) {
        const { message, gif } = memeEvents[key];
        showPopup(message, gif);
      } else {
        openModal(key, i, month, year); // Open modal to add custom meme
      }
    };

    calendar.appendChild(div);

    // Monthly 1st meme
    if (i === 1) {
      const { message, gif } = monthFirstDayMemes[month];
      setTimeout(() => showPopup(message, gif), 1000);
    }

    // Today = special event check
    const today = new Date();
    if (i === today.getDate() && month === today.getMonth()) {
      if (memeEvents[key]) {
        const { message, gif } = memeEvents[key];
        setTimeout(() => showPopup(message, gif), 1200);
      }
    }
  }
}

function showPopup(message, gifUrl = "") {
  const popup = document.getElementById("popup");
  popup.innerHTML = gifUrl
    ? `<p>${message}</p><img src="${gifUrl}" width="120">`
    : `<p>${message}</p>`;
  popup.style.display = "block";
  setTimeout(() => popup.style.display = "none", 20000);
}

function openModal(key, date, month, year) {
  selectedDayKey = key;
  document.getElementById("selectedDate").innerText = `🗓️ ${date} ${memeMonths[month]} ${year}`;
  document.getElementById("eventText").value = localStorage.getItem(key) || "";
  document.getElementById("eventModal").style.display = "block";
}

function closeModal() {
  document.getElementById("eventModal").style.display = "none";
}

function saveEvent() {
  const val = document.getElementById("eventText").value.trim();
  if (val !== "") {
    localStorage.setItem(selectedDayKey, val);
    showPopup(`✅ Meme saved: "${val}"`);
  } else {
    localStorage.removeItem(selectedDayKey);
    showPopup("❌ Meme removed.");
  }
  closeModal();
  renderCalendar();
}

function prevMonth() {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
}

function nextMonth() {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
}

renderCalendar();