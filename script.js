// LOADING HIDE setelah 1.5 detik
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loadingScreen').style.display = 'none';
  }, 1500);
});

// MUSIC + user interaction pertama
const music = document.getElementById('bgMusic');
const musicIcon = document.getElementById('musicIcon');
const musicStatus = document.getElementById('musicStatus');
let musicPlaying = false;
document.body.addEventListener('click', () => {
  if (!musicPlaying) {
    music.play().catch(e=>console.log);
    musicPlaying = true;
    musicStatus.innerText = 'musik nyala';
    musicIcon.className = 'fas fa-music';
  }
});
document.getElementById('musicControl').addEventListener('click', (e) => {
  e.stopPropagation();
  if (musicPlaying) {
    music.pause();
    musicPlaying = false;
    musicStatus.innerText = 'musik mati';
    musicIcon.className = 'fas fa-volume-mute';
  } else {
    music.play();
    musicPlaying = true;
    musicStatus.innerText = 'musik nyala';
    musicIcon.className = 'fas fa-music';
  }
});

// PAGE MANAGEMENT
let currentPage = 1;
const pages = document.querySelectorAll('.page');
function showPage(pageNum) {
  pages.forEach((p, idx) => p.classList.remove('active-page'));
  document.getElementById(`page${pageNum}`).classList.add('active-page');
  currentPage = pageNum;
}

// Navigasi
document.getElementById('startAdventureBtn').addEventListener('click', () => showPage(2));

// --------------------- MINI GAME ---------------------
let gameActive = false;
let score = 0;
let timeLeft = 15;
let gameInterval;
let moveInterval;
const minion = document.getElementById('minionCharacter');
const gameArea = document.getElementById('gameArea');
const scoreSpan = document.getElementById('gameScore');
const timerSpan = document.getElementById('gameTimer');
const startBtn = document.getElementById('startGameBtn');
const gameNextBtn = document.getElementById('gameNextBtn');
const gameMsg = document.getElementById('gameMessage');

function resetGameUI() {
  score = 0; timeLeft = 15;
  scoreSpan.innerText = '0';
  timerSpan.innerText = '15';
  gameMsg.innerText = '';
  if (gameInterval) clearInterval(gameInterval);
  if (moveInterval) clearInterval(moveInterval);
  minion.style.display = 'none';
  gameActive = false;
  gameNextBtn.style.display = 'none';
}

function startGame() {
  resetGameUI();
  gameActive = true;
  minion.style.display = 'block';
  moveMinionRandom();
  moveInterval = setInterval(moveMinionRandom, 800);
  gameInterval = setInterval(() => {
    if (!gameActive) return;
    timeLeft--;
    timerSpan.innerText = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(gameInterval);
      clearInterval(moveInterval);
      gameActive = false;
      minion.style.display = 'none';
      if (score >= 10) {
        gameMsg.innerText = '🎉 SELAMAT! Kamu menang! lanjut yuk! 🎉';
        gameNextBtn.style.display = 'inline-block';
      } else {
        gameMsg.innerText = '😭 Kalah! target 10, coba ulang lagi! klik "Mulai Game"';
      }
    }
  }, 1000);
}
function moveMinionRandom() {
  if (!gameActive) return;
  const areaRect = gameArea.getBoundingClientRect();
  const maxX = areaRect.width - 60;
  const maxY = areaRect.height - 60;
  const x = Math.max(0, Math.random() * maxX);
  const y = Math.max(0, Math.random() * maxY);
  minion.style.left = x + 'px';
  minion.style.top = y + 'px';
}
minion.addEventListener('click', (e) => {
  e.stopPropagation();
  if (!gameActive) return;
  score++;
  scoreSpan.innerText = score;
  moveMinionRandom();
  if (score >= 10 && gameActive) {
    clearInterval(gameInterval);
    clearInterval(moveInterval);
    gameActive = false;
    gameMsg.innerText = '🎉 HORE MENANG! 🎉';
    gameNextBtn.style.display = 'inline-block';
    minion.style.display = 'none';
  }
});
startBtn.addEventListener('click', startGame);
gameNextBtn.addEventListener('click', () => showPage(3));

// ---------- PAGE 3 : YES/NO LOGIC + 5 GIF ROTATION ----------
const gifList = [
  "https://media.tenor.com/mE6C2_0AABAAAAAC/minion-love.gif",
  "https://media1.tenor.com/m/JkO34nxg-fkAAAAC/minion-despicable-me.gif",
  "https://media.tenor.com/2cmnEdrQGrYAAAAj/minion-happy.gif",
  "https://media4.giphy.com/media/26gR2qEPeGjpCQYdG/giphy.gif",
  "https://media.tenor.com/-a4M7c0qA_0AAAAC/minion-stuart.gif"
];
let gifIndex = 0;
const rotatingImg = document.getElementById('rotatingGif');
setInterval(() => {
  gifIndex = (gifIndex + 1) % gifList.length;
  rotatingImg.src = gifList[gifIndex];
}, 2800);

const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const yesNotif = document.getElementById('yesNotification');
const afterYes = document.getElementById('afterYesNextBtn');
const noTexts = [
  "seriusan ini ngeklik no?!!?", "jahat ah 😭", "cepet klik yes ga! atau aku gigit 👻",
  "masa sih no? pilih yes dong", "plis yes, aku mohon 🥺", "gaboleh no, coba lagi!"
];
let noClickCount = 0;
function resizeYesButton() {
  let base = 1;
  if (noClickCount >= 1) base = 1.2;
  if (noClickCount >= 2) base = 1.5;
  if (noClickCount >= 3) base = 1.8;
  if (noClickCount >= 4) base = 2.2;
  yesBtn.style.transform = `scale(${base})`;
  yesBtn.style.transition = '0.2s';
}
noBtn.addEventListener('click', () => {
  const randomMsg = noTexts[Math.floor(Math.random() * noTexts.length)];
  noBtn.innerText = randomMsg.substring(0, 20);
  setTimeout(() => { noBtn.innerText = "NO 😈"; }, 800);
  // pindah random posisi
  const wrapper = document.querySelector('.yesno-wrapper');
  const maxX = wrapper.clientWidth - noBtn.clientWidth - 20;
  const maxY = 60;
  const randX = Math.random() * maxX;
  const randY = Math.random() * maxY;
  noBtn.style.position = 'relative';
  noBtn.style.left = randX + 'px';
  noBtn.style.top = randY + 'px';
  noClickCount++;
  resizeYesButton();
});
yesBtn.addEventListener('click', () => {
  yesNotif.style.display = 'block';
  yesBtn.disabled = true;
  noBtn.style.display = 'none';
});
afterYes.addEventListener('click', () => showPage(4));

// --------------------- SURAT + TYPING ---------------------
const envelope = document.getElementById('envelope');
const letterDiv = document.getElementById('letterContent');
const typewriterDiv = document.getElementById('typewriterText');
let letterOpened = false;
envelope.addEventListener('click', () => {
  if (letterOpened) return;
  envelope.parentElement.classList.add('open');
  letterDiv.classList.remove('hidden-letter');
  letterDiv.style.display = 'block';
  letterOpened = true;
  const fullText = "Halo Grad (level 4)! 🎓✨\nSelamat ya udah sampai di titik ini. Aku (Dara) banget bangga sama perjuanganmu. Kamu keren banget! Jangan lupa buat terus jadi pribadi yang menyenangkan. Semoga sukses selalu di dunia baru! 💛🐥\n- Dara si pembuat web lucu -";
  let i = 0;
  typewriterDiv.innerHTML = '';
  function typing() {
    if (i < fullText.length) {
      typewriterDiv.innerHTML += fullText.charAt(i);
      i++;
      setTimeout(typing, 45);
    }
  }
  typing();
});
document.getElementById('letterNextBtn').addEventListener('click', () => showPage(5));

// ---------- CANVAS BUNGA BUCKET ----------
const canvas = document.getElementById('flowerCanvas');
const ctx = canvas.getContext('2d');
function drawFlowerBucket() {
  ctx.clearRect(0, 0, 300, 300);
  // bucket
  ctx.fillStyle = '#f7c56e';
  ctx.fillRect(100, 180, 100, 90);
  ctx.fillStyle = '#e0a800';
  ctx.fillRect(95, 170, 110, 15);
  // batang
  ctx.beginPath();
  ctx.moveTo(150, 170);
  ctx.lineTo(140, 100);
  ctx.lineTo(160, 100);
  ctx.fillStyle = '#2e7d32';
  ctx.fill();
  for (let i = 0; i < 12; i++) {
    let x = 110 + Math.random() * 80;
    let y = 130 + Math.random() * 40;
    ctx.beginPath();
    ctx.arc(x, y, 8, 0, Math.PI * 2);
    ctx.fillStyle = `hsl(${40 + Math.random() * 30}, 80%, 60%)`;
    ctx.fill();
  }
  // bunga besar
  ctx.beginPath();
  ctx.arc(150, 95, 20, 0, Math.PI*2);
  ctx.fillStyle = '#ffb347';
  ctx.fill();
  ctx.fillStyle = '#d35e0f';
  ctx.font = "bold 25px monospace";
  ctx.fillText("🐥", 142, 100);
}
drawFlowerBucket();
document.getElementById('flowerNextBtn').addEventListener('click', () => showPage(6));

// ---------- KUIS 5 PERTANYAAN ----------
const quizData = [
  { q: "Apa warna fav Minion?", opt: ["Kuning","Biru","Merah"], ans: 0 },
  { q: "Apa yang Dara harapkan dari kamu?", opt: ["Bahagia terus","Bosenin aku","Jauh"], ans: 0 },
  { q: "Minion suka makan?", opt: ["Pisang","Apel","Pizza"], ans: 0 },
  { q: "Graduasi artinya apa?", opt: ["Liburan","Lulus","Pindah"], ans: 1 },
  { q: "Web ini dibuat oleh?", opt: ["Dara","ChatGPT","Kamu"], ans: 0 }
];
const quizArea = document.getElementById('quizArea');
function buildQuiz() {
  quizArea.innerHTML = '';
  quizData.forEach((item, idx) => {
    let div = document.createElement('div');
    div.className = 'quiz-item';
    div.innerHTML = `<p>${idx+1}. ${item.q}</p>`;
    let select = document.createElement('select');
    select.id = `quiz${idx}`;
    item.opt.forEach(opt => { let op = document.createElement('option'); op.value = opt; op.innerText = opt; select.appendChild(op); });
    div.appendChild(select);
    quizArea.appendChild(div);
  });
}
buildQuiz();
document.getElementById('submitQuizBtn').addEventListener('click', () => {
  let correct = 0;
  quizData.forEach((item, idx) => {
    let selected = document.getElementById(`quiz${idx}`).value;
    if (selected === item.opt[item.ans]) correct++;
  });
  const resultDiv = document.getElementById('quizResult');
  resultDiv.innerHTML = `<div style="background:#f9e45b; padding:12px; border-radius:24px;">✨ Skor kamu: ${correct} / 5 ✨<br>${correct>=3 ? 'Hebat! Kamu tahu Dara banget 💛' : 'yuk kenalan lebih dekat lagi 😁'}</div>`;
  document.getElementById('quizNextBtn').style.display = 'inline-block';
});
document.getElementById('quizNextBtn').addEventListener('click', () => showPage(7));

// PAGE 7: kirim pesan & lanjut closing
document.getElementById('sendMsgBtn').addEventListener('click', () => {
  const msg = document.getElementById('userMessage').value;
  if(msg.trim() === "") alert("Tulis dulu pesan manisnya!");
  else {
    document.getElementById('msgFeedback').innerHTML = '<p class="btn-primary" style="display:inline-block">✅ Terkirim! makasih yaa 💌</p>';
    setTimeout(() => showPage(8), 1200);
  }
});
// restart
document.getElementById('restartFunBtn').addEventListener('click', () => location.reload());