const image = document.getElementById("cover"),
  title = document.getElementById("music-title"),
  artist = document.getElementById("music-artist"),
  currentTimeEl = document.getElementById("current-time"),
  durationEl = document.getElementById("duration"),
  progress = document.getElementById("progress"),
  playerProgress = document.getElementById("player-progress"),
  prevBtn = document.getElementById("prev"),
  nextBtn = document.getElementById("next"),
  playBtn = document.getElementById("play"),
  background = document.getElementById("bg-img");

const music = new Audio();
// add more obejcts for acc to your need
const songs = [
  {
    path: "Assets/Song1.m4a",
    displayName: "Humsafar",
    cover: "Assets/Photo1.png",
    artist: "Akhil Sachdeva, Mansheel Gujral",
  },
  {
    path: "Assets/Song2.mp3",
    displayName: "Tujhe Bhula Diya",
    cover: "Assets/Photo2.jpg",
    artist: "Vishal Shekhar, Mohit Chauhan",
  },
  {
    path: "Assets/Song3.mp3",
    displayName: "Bol Na Halke Halke",
    cover: "Assets/Photo3.jpg",
    artist: "Rahat Fateh Ali Khan",
  },
];

let musicIndex = 0;
let isPlaying = false;

function togglePlay() {
  if (isPlaying) {
    pauseMusic();
  } else {
    playMusic();
  }
}

function playMusic() {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");
  music.play();
}

function pauseMusic() {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
  music.pause();
}

function loadMusic(song) {
  music.src = song.path;
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  image.src = song.cover;
  background.src = song.cover;
  durationEl.textContent = "00:00";
  currentTimeEl.textContent = "00:00";
  progress.style.width = "0%";
  music.currentTime = 0;
}

function changeMusic(direction) {
  musicIndex = (musicIndex + direction + songs.length) % songs.length;
  loadMusic(songs[musicIndex]);
  playMusic();
}

function updateProgressBar() {
  const { duration, currentTime } = music;
  if (isNaN(duration)) return;

  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;

  const formatTime = (time) => String(Math.floor(time)).padStart(2, "0");
  durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(
    duration % 60
  )}`;
  currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(
    currentTime % 60
  )}`;
}

function setProgressBar(e) {
  const width = playerProgress.clientWidth;
  const clickX = e.offsetX;
  music.currentTime = (clickX / width) * music.duration;
}

function handleSongEnd() {
  changeMusic(1);
  playBtn.classList.replace("fa-pause", "fa-play");
  progress.style.width = "0%";
}

playBtn.addEventListener("click", togglePlay);
prevBtn.addEventListener("click", () => changeMusic(-1));
nextBtn.addEventListener("click", () => changeMusic(1));
music.addEventListener("ended", handleSongEnd);
music.addEventListener("timeupdate", updateProgressBar);
music.addEventListener("loadedmetadata", updateProgressBar);
playerProgress.addEventListener("click", setProgressBar);

loadMusic(songs[musicIndex]);
