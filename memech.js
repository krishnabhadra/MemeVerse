/* Meme Challenger - JS
   - multiple choice meme guessing
   - localStorage leaderboard
   - roast feedback (text + speech)
*/

// ---------- SAMPLE MEMES ----------
// Each item: { img: URL/base64, correct: "caption A", options: [A,B,C,D], hint: "" }
const SAMPLE_MEMES = [
  {
    img: "https://i.imgflip.com/30b1gx.jpg",
    correct: "Me waiting for semester to end",
    options: [
      "When you remember an exam is next week",
      "Me waiting for semester to end",
      "When wifi drops during upload",
      "When pizza arrives late"
    ],
    hint: "Patience... (not your strong suit)"
  },
  {
    img: "https://i.imgflip.com/1bij.jpg",
    correct: "50 questions in assignment",
    options: [
      "Holiday mode activated",
      "When teacher says 'open file' and it's 50 Qs",
      "Weekend vibes",
      "Free time intensifies"
    ],
    hint: "Not a pleasant discovery"
  },
  {
    img: "https://i.imgflip.com/4/4t0m5.jpg",
    correct: "No comments, just vibes",
    options: [
      "No comments, just vibes",
      "When code compiles first try",
      "Group project hero",
      "When you find an extra hour"
    ],
    hint: "Silent approval"
  },
  {
    img: "https://i.imgflip.com/26am.jpg",
    correct: "I forgor how to adult",
    options: [
      "I forgor how to adult",
      "Boss: Why late? Me: Alien abduction",
      "Monday mood",
      "When you skip class"
    ],
    hint: "Responsibility? What's that?"
  },
  {
    img: "https://i.imgflip.com/9ehk.jpg",
    correct: "That feeling when...",
    options: [
      "That feeling when...",
      "When battery hits 1%",
      "When teacher compliments you",
      "Midweek crisis"
    ],
    hint: "Low energy alert"
  },
  {
    img: "https://i.imgflip.com/3si4.jpg",
    correct: "Attempting to adult",
    options: [
      "Plot twist incoming",
      "Attempting to adult",
      "Snack time",
      "Loading... please wait"
    ],
    hint: "Trying but not great"
  }
];

// ---------- ROAST LINES ----------
const GOOD_ROASTS = [
  "Nice one! You almost stole the show.",
  "Whoa—meme sense levels rising. Respect.",
  "You meme like a pro. Keep flexing."
];
const BAD_ROASTS = [
  "Oof. That was tragic. Were you even awake?",
  "Did you guess with your eyes closed? Sad.",
  "Hard pass. Your meme sense needs CPR."
];
const NEUTRAL_ROASTS = [
  "Not bad. Not great. Try to care more.",
  "Medium energy. I expected fireworks.",
  "You survived. That's a win... maybe."
];

// ---------- GAME STATE ----------
let player = "";
let rounds = 6;
let currentRound = 0;
let score = 0;
let order = []; // indexes of memes used
let used = [];

// ---------- DOM ----------
const startBtn = document.getElementById("startBtn");
const playerInput = document.getElementById("playerName");
const gameArea = document.getElementById("gameArea");
const memeImg = document.getElementById("memeImg");
const captionHint = document.getElementById("captionHint");
const choicesEl = document.getElementById("choices");
const roundNumEl = document.getElementById("roundNum");
const totalRoundsEl = document.getElementById("totalRounds");
const scoreEl = document.getElementById("score");
const nextBtn = document.getElementById("nextBtn");
const endBtn = document.getElementById("endBtn");
const resultBox = document.getElementById("resultBox");
const resultText = document.getElementById("resultText");
const roastText = document.getElementById("roastText");
const leaderList = document.getElementById("leaderList");
const clearBoardBtn = document.getElementById("clearBoard");

totalRoundsEl.textContent = rounds;

// ---------- Helpers ----------
function speak(text, opts={}) {
  if (!window.speechSynthesis) return;
  const u = new SpeechSynthesisUtterance(text);
  u.lang = opts.lang || "en-US";
  u.rate = opts.rate || 1;
  u.pitch = opts.pitch || 1;
  window.speechSynthesis.cancel(); // stop previous
  window.speechSynthesis.speak(u);
}

function loadLeaderboard(){
  const raw = localStorage.getItem("memeLeaderboard");
  let arr = raw ? JSON.parse(raw) : [];
  // Keep top 10 sorted desc
  arr.sort((a,b)=> b.score - a.score);
  leaderList.innerHTML = "";
  arr.slice(0,10).forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} — ${item.score} pts`;
    leaderList.appendChild(li);
  });
}

function saveToLeaderboard(name, scoreVal){
  const raw = localStorage.getItem("memeLeaderboard");
  let arr = raw ? JSON.parse(raw) : [];
  arr.push({name, score: scoreVal, ts: Date.now()});
  localStorage.setItem("memeLeaderboard", JSON.stringify(arr));
  loadLeaderboard();
}

// ---------- Game Logic ----------
startBtn.addEventListener("click", ()=> {
  const nm = playerInput.value.trim();
  if (!nm) { alert("Please enter a name to play."); playerInput.focus(); return; }
  player = nm;
  startGame();
});

function startGame(){
  // reset
  currentRound = 0; score = 0; used = []; order = [];
  // shuffle sample indexes and take first `rounds`
  const idx = SAMPLE_MEMES.map((_,i)=>i);
  for (let i=idx.length-1;i>0;i--){
    const j = Math.floor(Math.random()*(i+1)); [idx[i],idx[j]]=[idx[j],idx[i]];
  }
  order = idx.slice(0, rounds);
  playerInput.disabled = true; startBtn.disabled = true;
  gameArea.classList.remove("hidden"); resultBox.classList.add("hidden");
  nextBtn.classList.add("hidden"); endBtn.classList.add("hidden");
  roundNumEl.textContent = 0; scoreEl.textContent = 0;
  speak(`Game started for ${player}. Good luck!`, {rate:1, pitch:1});
  nextRound();
}

function nextRound(){
  resultBox.classList.add("hidden");
  if (currentRound >= rounds) {
    finishGame();
    return;
  }
  const idx = order[currentRound];
  const mem = SAMPLE_MEMES[idx];
  memeImg.src = mem.img;
  captionHint.textContent = mem.hint || "";
  // build shuffled options
  const opts = [...mem.options];
  // shuffle
  for (let i=opts.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [opts[i],opts[j]]=[opts[j],opts[i]]; }
  choicesEl.innerHTML = "";
  opts.forEach(opt =>{
    const b = document.createElement("button");
    b.className = "choice-btn";
    b.textContent = opt;
    b.onclick = ()=> choose(opt, mem.correct, b);
    choicesEl.appendChild(b);
  });
  currentRound++;
  roundNumEl.textContent = currentRound;
}

function choose(selected, correct, btn){
  // disable all buttons to prevent double-click
  [...choicesEl.children].forEach(c=>c.disabled=true);
  // check
  if (selected === correct){
    score += 10;
    scoreEl.textContent = score;
    btn.classList.add("correct");
    showResult(true, "Nice! Correct answer.", selected);
    // praise roast
    const roast = GOOD_ROASTS[Math.floor(Math.random()*GOOD_ROASTS.length)];
    roastText.textContent = roast;
    speak(roast, {rate:1, pitch:1.1});
  } else {
    score -= 2; if (score < 0) score = 0;
    scoreEl.textContent = score;
    btn.classList.add("wrong");
    // highlight correct
    [...choicesEl.children].forEach(c=>{
      if (c.textContent === correct) c.classList.add("correct");
    });
    showResult(false, `Wrong — correct: "${correct}"`, selected);
    // savage roast
    const roast = BAD_ROASTS[Math.floor(Math.random()*BAD_ROASTS.length)];
    roastText.textContent = roast;
    speak(roast, {rate:1, pitch:0.9});
  }
  // show next button after short delay
  setTimeout(()=> nextBtn.classList.remove("hidden"), 700);
  endBtn.classList.remove("hidden");
}

nextBtn.addEventListener("click", ()=>{
  nextBtn.classList.add("hidden");
  nextRound();
});

endBtn.addEventListener("click", ()=>{
  finishGame();
});

function showResult(isCorrect, message, sel){
  resultBox.classList.remove("hidden");
  resultText.textContent = isCorrect ? "Correct!" : "Incorrect";
  // resultText color
  resultText.style.color = isCorrect ? "#79f59f" : "#ff8a8a";
  // show message below
  // roastText updated in choose()
}

function finishGame(){
  // store result
  saveToLeaderboard(player, score);
  speak(`Game over! ${player}, your score is ${score} points.`, {rate:1, pitch:1});
  // final summary UI
  resultBox.classList.remove("hidden");
  resultText.textContent = `Game Over — ${player}: ${score} pts`;
  resultText.style.color = "#ffd166";
  roastText.textContent = score >= (rounds*8) ? NEUTRAL_ROASTS[0] : (score>= (rounds*5) ? NEUTRAL_ROASTS[1] : BAD_ROASTS[1]);
  // reset UI
  playerInput.disabled = false; startBtn.disabled = false;
  nextBtn.classList.add("hidden"); endBtn.classList.add("hidden");
  loadLeaderboard();
}

// leaderboard actions
clearBoardBtn.addEventListener("click", ()=> {
  if (confirm("Clear leaderboard?")) {
    localStorage.removeItem("memeLeaderboard");
    loadLeaderboard();
  }
});

// initial load
loadLeaderboard();
