import { StepTimeline } from "./src/StepTimeline.js"
import { Steps } from "./src/Steps.js"
import { Lane } from "./src/Lane.js"

const tempo = document.getElementById("tempo")
const timeline = new StepTimeline(parseFloat(tempo.value))
const steps = new Steps()
steps.attachTimeline(timeline)

const lane1 = new Lane(steps)

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


