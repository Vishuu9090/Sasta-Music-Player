const songs = [
  {
    title: "Co2",
    artist: "Prateek Kuhad",
    src: "Co2.mp3",
    cover: "Co2.webp",
  },
  {
    title: "Feel It",
    artist: "d4vd",
    src: "feel it.mp3",
    cover: "feel it.webp",
  },
  {
    title: "Good Looking",
    artist: "Suki Waterhouse",
    src: "good looking.mp3",
    cover: "good loking.webp",
  }
];

let currentSongIndex = 0;

const audio = document.getElementById('audio');
const toggleBtn = document.getElementById('togglePlayPause');
const playIcon = document.getElementById('playIcon');
const pauseIcon = document.getElementById('pauseIcon');
const progressBar = document.querySelector('.progress-bar');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const songTitle = document.querySelector('.song-details h2');
const songArtist = document.querySelector('.song-details h3');
const songCover = document.querySelector('.song-cover');

function loadSong(index) {
  const song = songs[index];
  audio.src = song.src;
  songTitle.textContent = song.title;
  songArtist.textContent = song.artist;
  songCover.src = song.cover;
  resetProgressBar();
}

function resetProgressBar() {
  progressBar.value = 0;
  progressBar.style.backgroundSize = '0% 100%';
}

function playSong() {
  audio.play();
  playIcon.style.display = 'none';
  pauseIcon.style.display = 'inline';
}

function pauseSong() {
  audio.pause();
  playIcon.style.display = 'inline';
  pauseIcon.style.display = 'none';
}

toggleBtn.addEventListener('click', () => {
  if (audio.paused) {
    playSong();
  } else {
    pauseSong();
  }
});

nextBtn.addEventListener('click', () => {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(currentSongIndex);
  playSong();
});

prevBtn.addEventListener('click', () => {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(currentSongIndex);
  playSong();
});

audio.addEventListener('timeupdate', () => {
  const progressPercent = (audio.currentTime / audio.duration) * 100;
  progressBar.value = progressPercent || 0;
  progressBar.style.backgroundImage = `linear-gradient(to right, white ${progressPercent}%, rgb(106, 102, 102) ${progressPercent}%)`;
});

progressBar.addEventListener('input', () => {
  const seekTime = (progressBar.value / 100) * audio.duration;
  audio.currentTime = seekTime;
});

audio.addEventListener('ended', () => {
  nextBtn.click();
});


loadSong(currentSongIndex);
