// 🗓️ Meme Calendar - Modified with Full Features

const memeMonths = [
  "Janavari Chill ❄️", "Lovebruary ❤️", "Memech", "April LOLs",
  "Mayhem", "Jokely", "Jestember", "Onathin August 🌸",
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
  { message: "🎉 False Hope Begins! Welcome January! 😅", gif: "https://media.giphy.com/media/3o7TKx6lUKeHlUZ8FW/giphy.gif" },
  { message: "❤️ Love Loading... Hello February!", gif: "https://media.giphy.com/media/xT0GqFzHoqYwi0gU9a/giphy.gif" },
  { message: "🎝 March of Memes begins!", gif: "https://media.giphy.com/media/5VKbvrjxpVJCM/giphy.gif" },
  { message: "😂 April Fools Season! Stay Alert!", gif: "https://media.giphy.com/media/l1J3preURPiwjRPvG/giphy.gif" },
  { message: "🔥 Mayday! Mayday! It’s meme time!", gif: "https://media.giphy.com/media/3orieYp9WjvB2K0y8Q/giphy.gif" },
  { message: "🌞 June: Sweat + Memes = Perfect Combo", gif: "https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif" },
  { message: "🎇 Joking July! Let’s meme more!", gif: "https://media.giphy.com/media/l0ExncehJzexFpRHq/giphy.gif" },
  { message: "🌸 Onathinte memes ready aano? Welcome August!", gif: "https://media.giphy.com/media/26xBwdIuRJiAiWith6/giphy.gif" },
  { message: "📋 September – Time to study? Nah, meme.", gif: "https://media.giphy.com/media/3oEduS1U7suTV6L7l2/giphy.gif" },
  { message: "👻 October = Spook + Joke Combo", gif: "https://media.giphy.com/media/3o7TKRB4bMgT4dVYic/giphy.gif" },
  { message: "🧣 November: Meme Season Begins!", gif: "https://media.giphy.com/media/3orieYp9WjvB2K0y8Q/giphy.gif" },
  { message: "🎄 December = Memecember", gif: "https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif" }
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
  setTimeout(() => popup.style.display = "none", 6000);
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