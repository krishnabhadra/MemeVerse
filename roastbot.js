/* RoastMaster - simple client-side roast bot
   - template-based roast generation
   - speech synthesis (optional)
   - basic profanity/slur blacklist (simple)
   - chat history + copy/save option
*/

// ---------------------------- utilities ----------------------------
const chat = document.getElementById('chat');
const form = document.getElementById('askForm');
const input = document.getElementById('userInput');
const voiceToggle = document.getElementById('voiceToggle');
const intensitySelect = document.getElementById('intensity');
const clearBtn = document.getElementById('clearBtn');

const roastBank = {
  mild: [
    "Not bad — you're the budget version of 'cool'.",
    "Solid attempt. A for effort, C for execution.",
    "Cute. Like a puppy wearing sunglasses."
  ],
  spicy: [
    "Bro, that's like ordering pizza and forgetting the toppings.",
    "You bring energy... the wrong kind.",
    "You're a walking '404: Charm not found'."
  ],
  savage: [
    "Yikes. Even your shadow left you for better lighting.",
    "That was tragic. You should apologize to the internet.",
    "I would roast you more, but I don't want to put the sun out of business."
  ]
};

// templates: will insert short user words (safe)
const templates = {
  mild: [
    "Okay {X}, not awful — like decaf coffee: polite, but pointless.",
    "A for trying, {X}. Keep it up and maybe one day you'll peak."
  ],
  spicy: [
    "{X}, that move was bold. Bold and mistaken.",
    "Someone give {X} a map — they're clearly lost on the path to competence."
  ],
  savage: [
    "{X}? That's your legacy? Tragic. Even the shadows judged that.",
    "Congrats {X}, you set an achievement: lowest effort, highest confidence."
  ]
};

// a tiny blacklist to avoid obviously hateful slurs (not exhaustive)
const blacklist = ["slur1","slur2","slave","nazi"]; // replace with real slurs removed — kept generic here

function safeClean(text){
  // basic lowercase check; replace any blacklisted words with ****
  let t = String(text || "");
  blacklist.forEach(b => {
    const r = new RegExp(b, 'ig');
    t = t.replace(r, '****');
  });
  return t;
}

// simple helper to pick random
const pick = arr => arr[Math.floor(Math.random()*arr.length)];

// ---------------------------- chat UI ----------------------------
function appendMessage(text, who='bot', extraMeta){
  const div = document.createElement('div');
  div.className = 'msg ' + (who === 'user' ? 'user' : 'bot');
  div.innerHTML = `<div class="text">${escapeHtml(text)}</div>`;
  // meta area with copy/save
  const meta = document.createElement('div');
  meta.className = 'meta';
  const time = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  meta.innerHTML = `<span class="muted">${time}</span>`;
  const copyBtn = document.createElement('button');
  copyBtn.className = 'copyBtn';
  copyBtn.textContent = 'Copy';
  copyBtn.onclick = ()=> navigator.clipboard && navigator.clipboard.writeText(text).then(()=> copyBtn.textContent='Copied!');
  meta.appendChild(copyBtn);
  div.appendChild(meta);
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

// small escape for HTML injection safety in messages
function escapeHtml(s){
  return s.replace(/[&<>"']/g, (m)=> ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
}

// ---------------------------- roast logic ----------------------------
function generateRoast(userText){
  const intensity = intensitySelect.value || 'spicy';
  const clean = safeClean(userText);
  // try to extract a short noun/keyword from user text
  let keyword = '';
  const words = clean.split(/\s+/).filter(Boolean);
  // prefer noun-like words: last word or longest word as a heuristic
  if(words.length){
    keyword = words.reduce((a,b)=> b.length > a.length ? b : a, words[0]);
    // trim punctuation
    keyword = keyword.replace(/[^\w]/g, '');
    // limit length
    if(keyword.length > 18) keyword = keyword.slice(0,18);
  } else {
    keyword = "chief";
  }

  // 50% chance to use a template, otherwise direct roast-bank
  let roast = '';
  if(Math.random() < 0.6){
    // template path
    const t = pick(templates[intensity] || templates.spicy);
    roast = t.replace('{X}', keyword || 'friend');
  } else {
    roast = pick(roastBank[intensity] || roastBank.spicy);
  }

  // small post-processing to avoid accidental profanity from constructed text
  roast = safeClean(roast);
  return roast;
}

// ---------------------------- speech ----------------------------
function speak(text){
  if(!voiceToggle.checked || !window.speechSynthesis) return;
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'en-US';
  // tweak voice pitch/rate by intensity
  const intensity = intensitySelect.value;
  if(intensity === 'mild'){ u.rate = 1.05; u.pitch = 1.2; }
  else if(intensity === 'spicy'){ u.rate = 1; u.pitch = 1.0; }
  else { u.rate = 0.95; u.pitch = 0.9; }
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(u);
}

// ---------------------------- form handling ----------------------------
form.addEventListener('submit', (ev)=>{
  ev.preventDefault();
  const text = input.value.trim();
  if(!text){
    input.focus();
    return;
  }
  // append user message
  appendMessage(text, 'user');
  input.value = '';
  // small thinking delay
  appendMessage('...', 'bot');
  setTimeout(()=>{
    // remove the last '...' bot placeholder
    const msgs = chat.querySelectorAll('.msg.bot');
    if(msgs.length) msgs[msgs.length-1].remove();
    const roast = generateRoast(text);
    appendMessage(roast, 'bot');
    speak(roast);
  }, 600 + Math.random()*600);
});

// clear chat
clearBtn.addEventListener('click', ()=>{
  if(confirm('Clear chat history?')) {
    chat.innerHTML = '';
  }
});

// helper: initial greeting
appendMessage("Hey! Give me a line and I'll roast it. Try something like: 'I skipped class today' or 'I got 0 on the quiz'");

