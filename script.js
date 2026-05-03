// LOADING
setTimeout(() => {
  const loading = document.getElementById('loadingScreen');
  if (loading) loading.style.display = 'none';
}, 1200);
window.addEventListener('load', () => {
  setTimeout(() => {
    const loading = document.getElementById('loadingScreen');
    if (loading) loading.style.display = 'none';
  }, 500);
});

// MUSIC
const music = document.getElementById('bgMusic');
const musicIcon = document.getElementById('musicIcon');
const musicStatus = document.getElementById('musicStatus');
let musicPlaying = false;
document.body.addEventListener('click', () => {
  if (!musicPlaying && music) {
    music.play().catch(e=>console.log);
    musicPlaying = true;
    if (musicStatus) musicStatus.innerText = 'musik nyala';
    if (musicIcon) musicIcon.className = 'fas fa-music';
  }
});
const musicControl = document.getElementById('musicControl');
if (musicControl) {
  musicControl.addEventListener('click', (e) => {
    e.stopPropagation();
    if (!music) return;
    if (musicPlaying) {
      music.pause(); musicPlaying = false;
      if (musicStatus) musicStatus.innerText = 'musik mati';
      if (musicIcon) musicIcon.className = 'fas fa-volume-mute';
    } else {
      music.play(); musicPlaying = true;
      if (musicStatus) musicStatus.innerText = 'musik nyala';
      if (musicIcon) musicIcon.className = 'fas fa-music';
    }
  });
}

// PAGE MANAGEMENT + BACKGROUND ANIMATION TOGGLE
let currentPage = 1;
const pages = document.querySelectorAll('.page');
function showPage(pageNum) {
  pages.forEach(p => p.classList.remove('active-page'));
  const target = document.getElementById('page'+pageNum);
  if (target) target.classList.add('active-page');
  currentPage = pageNum;

  // Toggle background animation hanya untuk halaman 1
  if (pageNum == 1) {
    document.body.classList.add('intro-active');
  } else {
    document.body.classList.remove('intro-active');
  }
}

// PIN PAGE
const pinInput = document.getElementById('pinInput');
const pinSubmit = document.getElementById('pinSubmitBtn');
const pinError = document.getElementById('pinError');
const correctPin = '301007';

pinSubmit.addEventListener('click', () => {
  const val = pinInput.value;
  if (val === correctPin) {
    showPage(2);
  } else {
    pinError.innerText = 'salah yaaa, masa lupa tanggal lahir sendiri sii 🥺';
    pinInput.classList.add('shake');
    pinInput.value = '';
    setTimeout(() => pinInput.classList.remove('shake'), 500);
  }
});
pinInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') pinSubmit.click();
});

document.getElementById('startAdventureBtn').addEventListener('click', () => showPage('1b'));

// ========== MINI GAME ==========
let gameActive = false, score = 0, timeLeft = 15, gameInterval, moveInterval;
const minion = document.getElementById('minionCharacter');
const gameArea = document.getElementById('gameArea');
const scoreSpan = document.getElementById('gameScore');
const timerSpan = document.getElementById('gameTimer');
const startGameBtn = document.getElementById('startGameBtn');
const gameNextBtn = document.getElementById('gameNextBtn');
const gameMsg = document.getElementById('gameMessage');

function resetGameUI() {
  score = 0; timeLeft = 15;
  if (scoreSpan) scoreSpan.innerText = '0';
  if (timerSpan) timerSpan.innerText = '15';
  if (gameMsg) gameMsg.innerText = '';
  clearInterval(gameInterval); clearInterval(moveInterval);
  if (minion) minion.style.display = 'none';
  gameActive = false;
  if (gameNextBtn) gameNextBtn.style.display = 'none';
}
function startGame() {
  resetGameUI();
  gameActive = true;
  if (minion) minion.style.display = 'block';
  moveMinionRandom();
  moveInterval = setInterval(moveMinionRandom, 800);
  gameInterval = setInterval(() => {
    if (!gameActive) return;
    timeLeft--;
    if (timerSpan) timerSpan.innerText = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(gameInterval); clearInterval(moveInterval);
      gameActive = false; if (minion) minion.style.display = 'none';
      if (score >= 15) {
        if (gameMsg) gameMsg.innerText = '🎉 CONGRATS! kamu menanggg! lanjut denggg! 🎉';
        if (gameNextBtn) gameNextBtn.style.display = 'inline-block';
      } else {
        if (gameMsg) gameMsg.innerText = '😭 targetnyaa 15, ulang lagi yaak! klik "mulai game"';
      }
    }
  }, 1000);
}
function moveMinionRandom() {
  if (!gameActive || !minion || !gameArea) return;
  const areaRect = gameArea.getBoundingClientRect();
  const maxX = areaRect.width - 60, maxY = areaRect.height - 60;
  minion.style.left = Math.max(0, Math.random() * maxX) + 'px';
  minion.style.top = Math.max(0, Math.random() * maxY) + 'px';
}
minion.addEventListener('click', (e) => {
  e.stopPropagation();
  if (!gameActive) return;
  score++; if (scoreSpan) scoreSpan.innerText = score;
  moveMinionRandom();
  if (score >= 15 && gameActive) {
    clearInterval(gameInterval); clearInterval(moveInterval);
    gameActive = false; if (gameMsg) gameMsg.innerText = '🎉 YAYYY MENANNGGG!!! 🎉';
    if (gameNextBtn) gameNextBtn.style.display = 'inline-block';
    if (minion) minion.style.display = 'none';
  }
});
startGameBtn.addEventListener('click', startGame);
gameNextBtn.addEventListener('click', () => showPage(3));

// ========== YES/NO (URUT & 8 KLIK SAMPAI HILANG) ==========
const gifList = [
  "./assets/gif/mimo.gif",
  "./assets/gif/what.gif",
  "./assets/gif/fighting.gif",
  "./assets/gif/bewan.gif",
  "./assets/gif/sad.gif",
  "./assets/gif/purple.gif",
  "./assets/gif/bobi.gif",
  "./assets/gif/demo.gif"
];
const rotatingImg = document.getElementById('rotatingGif');
const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const afterYesBtn = document.getElementById('afterYesNextBtn');
const interactionMsg = document.getElementById('interactionMessage');
const yesnoWrapper = document.querySelector('.yesno-wrapper');

let noClickCount = 0;

const pesanNo = [
  "lah, seriusan pilih no? 😒",
  "keukeuh amat sih, yes aja laaa... 🥺",
  "jangan gengsi dongg, aku tau kamu mau yes... 😏",
  "klik yes dong, aku cape loo pindah2 😤",
  "iiii ngeyel bgt sii, yes cepet! 🙂‍↕️",
  "munyak ya, segamau itu y pilih yes? 😠",
  "terakhir nih, beneran gaa mau yes? 😈",
  "ok deh, sekarang kamu cuma bisa yes 🤪"
];

function moveNoButtonRandomly() {
  if (!yesnoWrapper || !noBtn) return;
  const wrapperRect = yesnoWrapper.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();
  const maxX = Math.max(0, wrapperRect.width - btnRect.width - 10);
  const maxY = Math.max(0, wrapperRect.height - btnRect.height - 10);
  noBtn.style.left = Math.random() * maxX + 'px';
  noBtn.style.top = Math.random() * maxY + 'px';
}

function enlargeYesButton() {
  if (!yesBtn) return;
  let scale = 1 + (noClickCount * 0.15);
  if (scale > 2.2) scale = 2.2;
  yesBtn.style.transform = `scale(${scale})`;
}

noBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  noClickCount++;

  if (interactionMsg) {
    if (noClickCount <= pesanNo.length) {
      interactionMsg.textContent = pesanNo[noClickCount-1];
    } else {
      interactionMsg.textContent = "sudaa tidaa bisa no, HAHAHA yes aja yak";
    }
  }

  if (rotatingImg && noClickCount <= gifList.length) {
    rotatingImg.src = gifList[noClickCount - 1];
  }

  moveNoButtonRandomly();
  enlargeYesButton();

  if (noClickCount >= 8) {
    noBtn.style.animation = 'fadeOut 0.3s forwards';
    setTimeout(() => { if (noBtn) noBtn.style.display = 'none'; }, 300);
  }
});

yesBtn.addEventListener('click', () => {
  if (rotatingImg) {
    rotatingImg.src = "./assets/gif/bobbed.gif";
    rotatingImg.style.width = '';
  }

  if (yesBtn) yesBtn.style.display = 'none';
  if (noBtn) noBtn.style.display = 'none';

  if (yesnoWrapper) {
    yesnoWrapper.classList.add('hidden');
  }

  if (afterYesBtn) {
    afterYesBtn.style.display = 'inline-block';
    // supaya listener gak numpuk
    afterYesBtn.replaceWith(afterYesBtn.cloneNode(true));
    const newAfterYesBtn = document.getElementById('afterYesNextBtn');
    newAfterYesBtn.addEventListener('click', () => showPage(4));
  }

  if (interactionMsg) interactionMsg.textContent = 'cieee akhirnya klik yes juga 🥳💛';
  showFlashMessage("cie klik yes niee", 2000);
});

// ========== LETTER ==========
const envelope = document.getElementById('envelope');
const letterDiv = document.getElementById('letterContent');
const typewriterDiv = document.getElementById('typewriterText');
let letterOpened = false;
if (envelope) {
  envelope.addEventListener('click', () => {
    if (letterOpened) return;
    envelope.parentElement.classList.add('open');
    letterDiv.classList.remove('hidden-letter');
    letterDiv.style.display = 'block';
    letterOpened = true;

    const fullText = "sooo this is a little bouquet 💐✨ for someone who somehow made my days feel lighter without even trying :b\n\nit’s funny how we started as strangers, just talking about random things, and now you’ve become someone i look forward to every day 🙂‍↕️, you’re sweet in a way that’s rare, the kind that quietly stays in someone’s mind long after the conversation ends 🐻‍❄️💭\n\ni know your story isn’t the easiest one, and maybe not everyone sees how much you’ve had to go through, but despite all that, you still turned out kind, still gentle, still someone who can make another person feel safe just by being there 🫂, you make me want to believe there are still a lot of good things left in this world, that says a lot about you 🙆🏻‍♀️🙆🏻‍♀️\n\nso on your graduation day, even if it feels quiet or a little lonely, please remember this… someone out there and also here is smiling because of you 🧏🏻‍♀️🧏🏻‍♂️, feeling proud of you, and wishing they could be there to see you in that moment 🌻\n\ncongratulations on your graduation!!🎓🎉 you did so well, and you deserve every good thing that comes after this 👀👷‍♂️🩵\n\ni hope today feels a little brighter, just like you make my days feel dimdimmm! imysm alwaysss xixi 🙆🏻‍♀️💕\n\nSincerely,\nfrom someone who’s really glad she met you";
    let i = 0;
    if (typewriterDiv) typewriterDiv.innerHTML = '';
    function typing() {
      if (i < fullText.length && typewriterDiv) {
        typewriterDiv.innerHTML += fullText.charAt(i);
        i++;
        setTimeout(typing, 45);
      } else {
        alert('sengaja pake bahasa inggris biar tida alay, awas kamu translate ya! 😠');
      }
    }
    typing();
  });
}
document.getElementById('letterNextBtn').addEventListener('click', () => showPage(5));

// ========== MINION FRIENDS CAROUSEL ==========
const minionData = [
  { nama: "Bob", foto: "./assets/minions/bob.jpg", pesan: "DIMDIMMM!! 🧸✨ bob seneng banget hari iniii! Kamu akhirnya lulus SMA! bob cuma mau bilang... kamu hebat bangettt, jangan lupa tetep ketawa, tetep jadi orang baik, dan makan enak hari ini yaaa 🍌" },
  { nama: "Dave", foto: "./assets/minions/dave.jpg", pesan: "Yo dimas 😎 dave bangga sama kamu ea, cius, banyak hal susaaa selama sekolah, tapi kamu berhasil sampai finish juga, hari ini wajib bahagia siee, Kelihatan keren banget, ganteng banget soalnya anak graduation satu ini suda luluss 📸" },
  { nama: "Kevin", foto: "./assets/minions/kevinn.jpg", pesan: "sebagai leader Minion paling profesional, kevin mengumumkan bahwa dimas officially naik level 🎓✨ good job, gg gg kamu udah kerja keras buat sampai sini, dan semoga setelah ini makin banyak hal baik datang ke hidup kamu yah" },
  { nama: "Mel", foto: "./assets/minions/mel.jpg", pesan: "hm. selamat lulus, langit. 😌 mel biasanya males ikut acara sentimental beginian...  tapi yaudah laa, aku disuru dara ngucapin buat kamu, kamu lumayan spesial buat dirayain keanya ya, jangan berubah jadi orang dewasa yang ngebosenin ya abis ini" },
  { nama: "Otto", foto: "./assets/minions/otto.jpg", pesan: "DIMDIMMM 🎉🎉🎉 OTTO TERHARUUU!! kamu akhirnya graduation juga!! hari ini kamu harus bangga sama diri sendiri, okai?! karena tida semua orang bisa sampai titik ini dengan tetap jadi diri mereka sendiri wowowowow🫶" },
  { nama: "Stuart", foto: "./assets/minions/stuart.jpg", pesan: "langittt 🎸 stuart mau bilang: hidup bakal terus jalan, tapi jangan lupa nikmatin tiap momennya juga, chill gasie, hari ini spesial banget, bro. kamu berhasil ngelewatin satu chapter besar dan itu keren parah, lanjut next level gas laaa" },
  { nama: "The Minions", foto: "./assets/minions/minionsjpg.jpg", pesan: "BANANAAAAA!!! 🍌🎓 Selamat graduation, dimdim! kami segenap minion sekeluarga diminta dara ucapin kamu: hepi graduation tuak (DISURUH DARA YAAA) semoga langkah kamu setelah ini dipenuhi kebahagiaan, mimpi yang tercapai, dan orang-orang yang selalu ada buat kamu 💛" }
];
const track = document.getElementById('carouselTrack');
const prevBtn = document.getElementById('prevMinionBtn');
const nextBtn = document.getElementById('nextMinionBtn');
const dotsContainer = document.getElementById('carouselDots');
let currentCarousel = 0;

function buildCards() {
  if (!track) return;
  track.innerHTML = '';
  minionData.forEach(m => {
    const card = document.createElement('div');
    card.className = 'minion-card';
    card.innerHTML = `<img src="${m.foto}" alt="${m.nama}" onerror="this.src='assets/bobgame.png'; this.style.objectFit='contain';"><h3>${m.nama}</h3><p class="pesan">“${m.pesan}”</p>`;
    track.appendChild(card);
  });
}
function updateCarousel() {
  const card = track.querySelector('.minion-card');
  if (!card) return;
  const cardWidth = card.offsetWidth + 10;
  track.style.transform = `translateX(-${currentCarousel * cardWidth}px)`;
  document.querySelectorAll('.carousel-dot').forEach((d, i) => d.classList.toggle('active', i === currentCarousel));
}
function buildDots() {
  if (!dotsContainer) return;
  dotsContainer.innerHTML = '';
  minionData.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.className = 'carousel-dot' + (i===0?' active':'');
    dot.addEventListener('click', () => { currentCarousel = i; updateCarousel(); });
    dotsContainer.appendChild(dot);
  });
}
prevBtn.addEventListener('click', () => { if (currentCarousel > 0) { currentCarousel--; updateCarousel(); }});
nextBtn.addEventListener('click', () => { if (currentCarousel < minionData.length-1) { currentCarousel++; updateCarousel(); }});
let touchStartX = 0;
document.getElementById('carouselViewport')?.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; });
document.getElementById('carouselViewport')?.addEventListener('touchend', e => {
  const diff = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 50) {
    if (diff > 0 && currentCarousel < minionData.length-1) currentCarousel++;
    else if (diff < 0 && currentCarousel > 0) currentCarousel--;
    updateCarousel();
  }
});

buildCards(); buildDots();
document.getElementById('minionNextBtn').addEventListener('click', () => showPage(6));

// ========== HADIAH (GIFTS) ==========
const gifts = [
  { img: "./assets/hadiah/medal.png", text: "🌟 Medali Keberanian! tadi kan dapat medal juga yak dari sekolaaa, yang kali ini dari aku nii, spesial limitid edisyen HAHAHA" },
  { img: "./assets/hadiah/sertif.png", text: "📜 Sertifikat Kelulusan Super! Bukti nyata kamu keren dan layak dirayakannn, keren kan uda dapet medal dapet sertif juga lagiii dari seorang dara xixi" },
  { img: "./assets/hadiah/bunga.jpg", text: "💐 Buket Bunga Bahagia! tadinya mau papan bunga, tapi keanya hedon bgt, aku kan maunya yang lucu lucu, jadi bunga ini dech apalagi yang ngasi justin bieber, kurang spesial apa cobaa, semoga sukak!" }
];
let openedGifts = [false, false, false];
const giftBoxes = document.querySelectorAll('.gift-box');
const giftDetail = document.getElementById('giftDetail');
const giftDetailImg = document.getElementById('giftDetailImg');
const giftDetailText = document.getElementById('giftDetailText');
const giftBackBtn = document.getElementById('giftBackBtn');
const giftNextBtn = document.getElementById('giftNextBtn');

function updateGiftBoxesStyle() {
  giftBoxes.forEach((box, idx) => {
    if (openedGifts[idx]) box.classList.add('opened');
    else box.classList.remove('opened');
  });
  if (openedGifts.every(v => v)) {
    giftNextBtn.style.display = 'inline-block';
  }
}

giftBoxes.forEach(box => {
  box.addEventListener('click', () => {
    const idx = parseInt(box.dataset.index);
    if (openedGifts[idx]) return;
    giftDetail.style.display = 'block';
    giftDetailImg.src = gifts[idx].img;
    // PERBESAR GAMBAR: medal & sertif 300px, bunga 250px
    if (idx === 0 || idx === 1) {
      giftDetailImg.style.width = '300px';
    } else {
      giftDetailImg.style.width = '250px';
    }
    giftDetailImg.onerror = () => { giftDetailImg.src = 'assets/bobgame.png'; };
    giftDetailText.innerText = gifts[idx].text;
    openedGifts[idx] = true;
    updateGiftBoxesStyle();
    giftDetail.scrollIntoView({ behavior: 'smooth' });
  });
});

giftBackBtn.addEventListener('click', () => {
  giftDetail.style.display = 'none';
  giftDetailImg.style.width = ''; // reset ukuran
});

giftNextBtn.addEventListener('click', () => {
  showPage('7b');
});


// ========== GALERI MUSEUM ==========
const galleryImages = [
  './assets/gallery/bob.jpg','./assets/gallery/dimdim.png','./assets/gallery/dara.jpg',
  './assets/gallery/flower.jpg','./assets/gallery/itb.png','./assets/gallery/langit.png',
  './assets/gallery/dimas.jpg','./assets/gallery/bumi.jpg', './assets/gallery/congrats.png'
];
const galleryGrid = document.getElementById('galleryGrid');
if (galleryGrid) {
  galleryGrid.innerHTML = '';
  galleryImages.forEach(src => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = 'graduation memory';
    img.onerror = () => { img.src = 'assets/bobgame.png'; };
    galleryGrid.appendChild(img);
  });
}
document.getElementById('galleryNextBtn')?.addEventListener('click', () => showPage(8));

// ========== CLOSING ==========
document.getElementById('restartFunBtn')?.addEventListener('click', () => location.reload());

// Pastikan saat load pertama, body sudah berkelas intro-active jika page1 aktif
if (document.getElementById('page1').classList.contains('active-page')) {
  document.body.classList.add('intro-active');
}

// Flash notification (buat yes/no)
function showFlashMessage(message, duration = 2000) {
  const flash = document.createElement('div');
  flash.className = 'flash-notification';
  flash.innerText = message;
  document.body.appendChild(flash);
  setTimeout(() => flash.remove(), duration);
}