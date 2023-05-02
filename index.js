import { StepTimeline } from "./src/StepTimeline.js"
import { Steps } from "./src/Steps.js"
import { Lane } from "./src/Lane.js"
import { LaneManager } from "./src/LaneManager.js"
import { AudioPlayer } from "./src/AudioPlayer.js"

const lanesData = [
  {audioFile : "../assets/kick.mp3"},
  {audioFile : "../assets/snare.mp3"},
  {audioFile : "../assets/hihat.mp3"},
  {audioFile : "../assets/clave.mp3"}
]

const drumMachineContainer = document.getElementById("drumMachine")

document.addEventListener('click', function() {
  window.AUDIO_CONTEXT = new (window.AudioContext || window.webkitAudioContext)()
  window.lanes = new LaneManager(drumMachineContainer, steps, lanesData)
}, { once: true });


const tempo = document.getElementById("tempo")
tempo.addEventListener('change', (event) => {
  timeline.setTempo(parseFloat(event.target.value))
})
const timeline = new StepTimeline(parseFloat(tempo.value))
const steps = new Steps()
steps.attachTimeline(timeline)

const OnOff = document.getElementById("OnOff")
OnOff.onclick = () => {
  if (timeline.on) {
    console.log("stop")
    timeline.stop()
    steps.reset()
    OnOff.innerHTML = "Start"
  } else {
    console.log("start")
    timeline.start()
    OnOff.innerHTML = "Stop"
  }
}


