const textElement = document.getElementById("introText");
const text = "MemeVerse";
let index = 0;

function typeText() {
  if (index < text.length) {
    textElement.textContent = text.slice(0, index + 1);
    index++;
    setTimeout(typeText, 150);
  }
}
typeText();
const firebaseConfig = {
  apiKey: "AIzaSyAaqtNywKxW-SPx8PrQdaEaTzOQarCwhWs",
  authDomain: "memeverse-b6f60.firebaseapp.com",
  projectId: "memeverse-b6f60",
  storageBucket: "memeverse-b6f60.firebasestorage.app",
  messagingSenderId: "9986306804",
  appId: "1:9986306804:web:fa33b0437a49f4640824a1",
  measurementId: "G-Z8MGXGMBZ6"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

