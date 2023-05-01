import { AudioPlayer } from "./AudioPlayer.js"
import { StepButtonsManager } from "./StepButtonsManager.js"

export class Lane {
  constructor(stepTimeline, audioFilePath = "", drumMachineDivContainer, laneIndex = 0) {
    console.log("Lane ~ constructor", audioFilePath)
    this.audioPlayer = new AudioPlayer(window.AUDIO_CONTEXT, audioFilePath)
    this.container = drumMachineDivContainer
    this.buttonManager = new StepButtonsManager(this.container)
    this.laneIndex = laneIndex
    this.steps = this.getBtns()
    this.pattern = [0,0,0,0,
                    0,0,0,0,
                    0,0,0,0,
                    0,0,0,0]

    this.steps.forEach((btn, index) => {
      btn.onclick = () => {
        this.pattern[index] = this.pattern[index] === 0 ? 1 : 0
        btn.style.backgroundColor = this.pattern[index] === 0 ? "gray" : "green"
      }
    })
    stepTimeline.addEventListener('stepChanged', this.checkStep)
    this.reset()
  }

  step = (stepIndex) => {
    this.steps.forEach((btn, index) => {
      if (index === stepIndex && this.pattern[index] === 1) {
        btn.style.border = "1px solid red"
        this.audioPlayer.play()
      } else {
        btn.style.border = "1px solid white"
      }
    })
  }

  checkStep = (event) => {
    console.log("check step", event)
    const step = event.detail.step - 1
    this.step(step)
    this.pattern[step] === 1 ? console.log("play") : console.log("stop")
  }

  getBtns = () => {
    this.buttonManager.createLane(this.laneIndex, "lane 1")
    return this.buttonManager.getBtns()
  }

  reset = () => {
    this.pattern = [0,0,0,0,
                    0,0,0,0,
                    0,0,0,0,
                    0,0,0,0]
    this.steps.forEach((btn) => {
      btn.style.backgroundColor = "gray"
    })
  }
}
