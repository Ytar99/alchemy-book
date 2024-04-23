export function renderSoundButton() {
  function changeVolume(e) {
    audioElement.volume = e.target.value / 100;
  }

  const soundVolume = document.createElement("input");
  soundVolume.style.width = "0";
  soundVolume.style.opacity = "0";
  soundVolume.style.cursor = "pointer";
  soundVolume.style.transition = "all 0.2s linear";
  soundVolume.type = "range";
  soundVolume.value = 20;
  soundVolume.addEventListener("change", changeVolume);

  const audioElement = new Audio("assets/sounds/bg_music.ogg");
  audioElement.volume = soundVolume.value / 100;
  audioElement.loop = true;
  audioElement.addEventListener(
    "ended",
    function () {
      this.currentTime = 0;
      this.play();
    },
    false
  );

  const soundBox = document.createElement("div");
  soundBox.style.boxSizing = "border-box";
  soundBox.style.position = "fixed";
  soundBox.style.bottom = "4px";
  soundBox.style.left = "4px";
  soundBox.style.display = "flex";
  soundBox.style.flexDirection = "row";
  soundBox.style.justifyContent = "center";
  soundBox.style.alignItems = "center";
  // soundBox.style.width = "48px";
  // soundBox.style.height = "48px";
  soundBox.style.backgroundColor = "black";
  soundBox.style.borderRadius = "12px";
  soundBox.style.fontSize = "32px";
  soundBox.style.padding = "8px";

  function startTimer() {
    return setTimeout(() => {
      soundVolume.style.width = "0";
      soundVolume.style.opacity = "0";
    }, 750);
  }

  let timerId = null;

  function handleAudioControlsIn() {
    soundVolume.style.width = "120px";
    soundVolume.style.opacity = "100%";
    clearTimeout(timerId);
  }

  function handleAudioControlsOut() {
    timerId = startTimer();
  }

  soundBox.addEventListener("mouseenter", handleAudioControlsIn);
  soundBox.addEventListener("mouseleave", handleAudioControlsOut);

  const soundButton = document.createElement("div");
  soundButton.textContent = "🔇";
  soundButton.style.transform = "translateY(-4px)";
  soundButton.style.cursor = "pointer";

  function handleAudioState(e) {
    if (e.target.textContent === "🔊") {
      audioElement.pause();
      soundButton.textContent = "🔇";
      return;
    }

    if (e.target.textContent === "🔇") {
      audioElement.play();
      soundButton.textContent = "🔊";
      return;
    }
  }

  soundButton.addEventListener("click", handleAudioState);

  soundBox.appendChild(soundButton);
  soundBox.appendChild(audioElement);
  soundBox.appendChild(soundVolume);

  document.body.appendChild(soundBox);
}
