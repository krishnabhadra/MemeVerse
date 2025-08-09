const roastLines = [
  "Wake up da lazy! Sun already punched your face!",
  "Entha da? Job interview aano illankil dreamil ayoo?",
  "Alarm vechath marannu poyallee kochu kallan?",
  "Nee ithrem late ayal ninne aar accept cheyyanaa!",
  "Thamashalla da thamashallatoo... Ezhunnekeda!",
  "mathi swapanathile pennonum varan ponnilaaa"
];

let alarmTime = null;

document.getElementById("setAlarm").addEventListener("click", () => {
  alarmTime = document.getElementById("alarmTime").value;
  document.getElementById("status").textContent = `⏰ Alarm set for ${alarmTime}`;
});

function checkAlarm() {
  if (!alarmTime) return;

  const now = new Date();
  const currentTime = now.toTimeString().slice(0, 5);

  if (currentTime === alarmTime) {
    triggerRoast();
    alarmTime = null;
  }
}

function triggerRoast() {
  const roast = roastLines[Math.floor(Math.random() * roastLines.length)];
  document.getElementById("roastText").textContent = roast;
  document.getElementById("status").textContent = "🔥 Roast time! 🔥";
  
  // Speech
  let speech = new SpeechSynthesisUtterance(roast);
  speech.pitch = 1;
  speech.rate = 1;
  speech.lang = "en-IN"; // Indian English
  window.speechSynthesis.speak(speech);
}

setInterval(checkAlarm, 1000);
