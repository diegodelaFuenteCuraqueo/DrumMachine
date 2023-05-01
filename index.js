import { StepTimeline } from "./src/StepTimeline.js"
import { Steps } from "./src/Steps.js"
import { Lane } from "./src/Lane.js"
import { AudioPlayer } from "./src/AudioPlayer.js"

document.addEventListener('click', function() {
  window.AUDIO_CONTEXT = new (window.AudioContext || window.webkitAudioContext)()
  const lane1 = new Lane(steps, "../assets/drum.mp3")
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


