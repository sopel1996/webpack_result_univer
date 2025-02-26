import "../style/index.scss";

const sounds = document.querySelectorAll(".sound");
const volumeRanges = document.querySelectorAll('input[type="range"]');
const audio = document.getElementById("audio");

const resetSounds = () => {
  sounds.forEach((el) => {
    el.classList.remove("active", "pause");
  });
};

const updateAudio = (soundCard) => {
  const audioSrc = `assets/sounds/${soundCard.dataset.audio}.mp3`;
  audio.src = audioSrc;
  audio.load();
  audio.currentTime = 0;
  audio.volume = 0.5;
  soundCard.parentNode.querySelector('input[type="range"]').value =
    audio.volume * 100;
  audio.play();
};

sounds.forEach((sound) => {
  sound.addEventListener("click", (e) => {
    const soundCard = e.target.closest(".sound");
    const isActive = soundCard.classList.contains("active");
    const isPaused = soundCard.classList.contains("pause");

    if (isActive) {
      soundCard.classList.remove("active");
      soundCard.classList.add("pause");
      audio.pause();
      return;
    }
    if (isPaused) {
      soundCard.classList.remove("pause");
      soundCard.classList.add("active");
      audio.play();
      return;
    }
    resetSounds();
    soundCard.classList.add("active");
    document.body.style.backgroundImage = `url(assets/${soundCard.dataset.bg}-bg.jpg)`;
    updateAudio(soundCard);
  });
});

volumeRanges.forEach((range) => {
  range.addEventListener("input", (evt) => {
    audio.volume = evt.target.value / 100;
  });
});
