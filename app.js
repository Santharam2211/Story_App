const intro = document.getElementById("introScreen");
const contentPage = document.getElementById("contentPage");
const startBtn = document.getElementById("startBtn");
const clickSound = document.getElementById("clickSound");
const startSound = document.getElementById("startSound");
const bgMusic = document.getElementById("bgMusic");
const moonMusic = document.getElementById("moonMusic");
const burstMusic = document.getElementById("burstMusic");
const speakBtn = document.getElementById("speakBtn");
const pauseBtn = document.getElementById("pauseBtn");
const stopBtn = document.getElementById("stopBtn");
const musicVolume = document.getElementById("musicVolume");
const storyOutput = document.getElementById("storyOutput");
const moon = document.getElementById("moon");
const storyPopup = document.getElementById("storyPopup");
const closeStory = document.getElementById("closeStory");
const instructionPopup = document.getElementById("instructionPopup");
const closeInstruction = document.getElementById("closeInstruction");
const endBtn = document.getElementById("endBtn");

const storyText = "In a drought-hit village in Tamil Nadu, two children were born into lives of struggle — Aarav and Janani. They played together under the dusty banyan tree, laughed in the school playground, and shared what little food they had. Childhood friendship blossomed in broken streets. But their childhood ended with pain. Aarav’s life was shattered when a fire engulfed the illegal factory where his parents worked. The factory, built with no safety, became a furnace that devoured lives. Aarav’s parents were among the dead. The factory owner paid the police to silence the matter. The villagers, too afraid, looked away. Orphaned and broken, Aarav vanished. At the same time, Janani’s mother left for North India in search of a job. With her father gone, Janani was taken in by her aunt — a cruel woman who treated her as a servant. Beatings. Starvation. Loneliness. Janani silently bore it all. She never heard from her mother again. Her only escape was school. Education became her only hope. Years passed. Aarav wandered through towns and cities, surviving by doing odd jobs. One day, he collapsed from exhaustion near a tea stall in North India. A kind woman — Meena — took him in, fed him, and gave him work. She never told him much about her past, but she cared for him like a son. Aarav slowly began to feel human again. Fate played its cruel game — that woman, Meena, was Janani’s mother. Janani, now a college student living in a hostel, occasionally visited her mother during holidays. Aarav and Janani crossed paths in the same house… but they didn’t recognize each other. Childhood memories had faded behind years of suffering. They were strangers under one roof, unaware of their shared past.Janani graduated with high ranks and returned to Tamil Nadu as a police officer — determined to fight the very system that failed her and others. Aarav returned too, quietly. But he came back with rage buried deep — a plan forged in fire.He took a job at a bakery in the town where Janani was posted. It was popular at night. To entertain children and attract customers, Aarav wore a Mickey Mouse costume, never speaking, always smiling. He loved the mask. It gave him the freedom to be invisible — while he prepared for something dark. For six months, Aarav tracked down the people who destroyed his village:— the factory owner,— corrupt panchayat leaders,— the constable who accepted bribes,— the schoolmaster who ignored children’s cries,— the landlord who beat the poor. Eleven names in all. Each tied to someone’s pain. Each tied to his pain.Every full moon, he killed one. The murders were symbolic, cruel, poetic. The factory owner was burned in a recreated furnace. The constable drowned in a water tank labeled “Justice.” The schoolmaster was found gagged, tied to a school desk.Janani, now a Sub-Inspector, was assigned the case. Six people dead. Same pattern. Always on full moon nights. No fingerprints. No evidence. Just a strange symbol left behind each time — a small Mickey Mouse drawing.She began investigating. She worked late nights, frustrated by the lack of clues. Every evening, tired and restless, she stopped by the bakery. Mickey Mouse — the silent man in costume — would greet her with a wave, maybe a silly dance. She laughed. Talked to him like a friend. Never knowing who was behind the mask. The killings continued. Seven… eight… nine… Until one day, she caught a break — CCTV footage near a victim's house. A glimpse of the Mickey Mouse costume. She was shocked. It had to be a mistake. But something inside her turned cold. She started watching the bakery. And one night, she followed Mickey after work. He didn’t go home. He went to an abandoned godown near the old factory. She followed. Inside, she found sketches, news clippings, and a notebook with eleven names. Nine had been crossed out. She turned… and saw Mickey Mouse remove his mask. The man’s eyes met hers. Aarav. The name rang in her mind like a forgotten bell. Memories came flooding back — paper boats in puddles, stolen mangoes, a friendship untouched by pain.“You’re…” she stammered.He smiled, gently. “We used to race to school. You always won.” Tears welled in her eyes. “Why?” He stepped closer, calm. “Because they never paid. Never suffered. I waited. Watched. For years. But the world doesn’t change, Janani. It only rots quietly. I cleaned it.” “You killed them.” “I remembered them.” She raised her gun, but her hands trembled.“Your mother… Meena,” he whispered. “She saved me. She didn’t know who I was. But she saved me.” Janani couldn’t breathe. Her world spun. She didn’t know whether to hate him or mourn him. The sirens wailed in the distance. He looked at her one last time. “I never stopped being your friend.” Aarav walked out and surrendered. At the police station, just before he was taken away, he turned to her and said, “Your mother… she died two years ago. Peacefully. She was proud of you.” Aarav was sentenced. A few months later, in prison, he was found dead under a full moon. No suicide note. No struggle. Just peace.The village slowly forgot. The killings stopped.Until three years later.A landlord was found dead — hung upside down over a fire pit. A Mickey Mouse drawing burned into the wall nearby. Then another death. Then another. No one suspected Janani — now Deputy Commissioner. But in her drawer was a small red notebook, old and faded. Eleven names. Only two remained.The moon was almost full."; // Full text here

let isReading = false;
let utterance;
let isPaused = false;

window.onload = () => instructionPopup.style.display = "block";
closeInstruction.onclick = () => instructionPopup.style.display = "none";

moon.onclick = e => { e.stopPropagation(); moonMusic.currentTime = 0; moonMusic.play(); };
intro.onclick = () => { clickSound.currentTime = 0; clickSound.play(); };

startBtn.onclick = e => {
  e.stopPropagation();
  startSound.play();
  moonMusic.pause();
  bgMusic.volume = musicVolume.value;
  bgMusic.play();
  intro.style.display = "none";
  contentPage.style.display = "block";
  storyPopup.style.display = "block";
  createBubbles();
};

closeStory.onclick = () => {
  storyPopup.style.display = "none";
  storyOutput.innerHTML = storyText;
};

speakBtn.onclick = () => {
  if (isReading) return;
  isReading = true;
  isPaused = false;

  utterance = new SpeechSynthesisUtterance(storyText);
  utterance.rate = 0.9;
  utterance.pitch = 1;
  utterance.volume = 1;
  speechSynthesis.speak(utterance);
  storyOutput.innerText = storyText;

  utterance.onend = () => {
    isReading = false;
    isPaused = false;
    finishReadingEffect();
  };
};

pauseBtn.onclick = () => {
  if (!isReading) return;
  if (isPaused) {
    speechSynthesis.resume();
    isPaused = false;
  } else {
    speechSynthesis.pause();
    isPaused = true;
  }
};

stopBtn.onclick = () => {
  if (isReading || isPaused) {
    speechSynthesis.cancel();
    isReading = false;
    isPaused = false;
    storyOutput.innerText = storyText;
  }
};

endBtn.onclick = () => {
  speechSynthesis.cancel();
  bgMusic.pause();
  burstMusic.currentTime = 0;
  burstMusic.play();
  contentPage.classList.add("break-effect");

  setTimeout(() => {
    contentPage.style.display = "none";
    intro.style.display = "block";
    contentPage.classList.remove("break-effect");
  }, 1500);
};

musicVolume.oninput = () => {
  bgMusic.volume = musicVolume.value;
  clickSound.currentTime = 0;
  clickSound.play();
};

function finishReadingEffect() {
  bgMusic.pause();
  burstMusic.currentTime = 0;
  burstMusic.play();
  contentPage.classList.add("break-effect");
  setTimeout(() => {
    contentPage.style.display = "none";
    intro.style.display = "block";
    contentPage.classList.remove("break-effect");
  }, 1500);
}

for (let i = 0; i < 100; i++) {
  const star = document.createElement("div");
  star.classList.add("stars");
  star.style.top = `${Math.random() * 100}%`;
  star.style.left = `${Math.random() * 100}%`;
  star.style.animationDelay = `${Math.random() * 5}s`;
  intro.appendChild(star);
}

function createBubbles() {
  for (let i = 0; i < 30; i++) {
    const bubble = document.createElement("div");
    bubble.className = "bubble";
    bubble.style.left = `${Math.random() * 100}%`;
    bubble.style.width = bubble.style.height = `${Math.random() * 40 + 10}px`;
    bubble.style.animationDuration = `${Math.random() * 8 + 4}s`;
    contentPage.appendChild(bubble);
  }
}
