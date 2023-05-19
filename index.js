import { BeatTimeline } from "./src/BeatTimeline.js"
import { StepCounter } from "./src/StepCounter.js"
import { LaneManager } from "./src/LaneManager.js"
import { Lane } from "./src/Lane.js"
import { github } from "./constants.js"

const filenames = ['kick.mp3', 'snare.mp3', 'hihat.mp3', 'clave.mp3']
const drumMachineContainer = document.getElementById("drumMachineLanes")

document.addEventListener('click', function() {
  window.AUDIO_CONTEXT = new (window.AudioContext || window.webkitAudioContext)()
  window.lanes = new LaneManager(drumMachineContainer, steps)

  filenames.forEach((filename) => {
    const fileUrl = `${github.pagesURL}/assets/${filename}`
    fetch(fileUrl)
      .then((response) => response.arrayBuffer())
      .then((arrayBuffer) => {
        const lane = new Lane(steps, "", drumMachineContainer)
        lane.loadSoundFile(arrayBuffer)
        lane.setLaneLabel(filename)
        window.lanes.pushLane(lane)
      })
      .catch((error) => {
        console.log(`Failed to load ${fileUrl}:`, error)
      })
  })
}, { once: true });

const tempo = document.getElementById("tempo")
tempo.addEventListener('change', (event) => {
  timeline.setTempo(parseFloat(event.target.value))
})
const timeline = new BeatTimeline(parseFloat(tempo.value))
const steps = new StepCounter()
steps.attachTimeline(timeline)

const OnOff = document.getElementById("OnOff")
OnOff.onclick = () => {
  if (timeline.on) {
    console.log("stop")
    timeline.stop()
    steps.clearSteps()
    OnOff.innerHTML = "Start"
  } else {
    console.log("start")
    timeline.start()
    OnOff.innerHTML = "Stop"
  }
}

const addLane = document.getElementById("addLane")
addLane.onclick = () => {
  fileInput.click()
}
const fileInput = document.getElementById("audiofileInput")
fileInput.addEventListener('change', (event) => {

  const file = event.target.files[0]
  const lane = new Lane(steps, "", drumMachineContainer)

  const reader = new FileReader()
  reader.onload = () => {
    const arrayBuffer = reader.result
    console.log(arrayBuffer)
    lane.loadSoundFile(arrayBuffer)
    window.lanes.pushLane(lane)
  }
  reader.readAsArrayBuffer(file)
})
