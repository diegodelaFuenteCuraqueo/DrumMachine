import { AudioPlayer } from "./AudioPlayer.js"

export class Lane {
  constructor(stepTimeline, audioFilePath = "../assets/drum.mp3") {
    console.log("Lane ~ constructor", audioFilePath)
    this.audioPlayer = new AudioPlayer(window.AUDIO_CONTEXT, audioFilePath)
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
    const step = event.detail.step //- 1
    this.step(step)
    this.pattern[step] === 1 ? console.log("play") : console.log("stop")
  }

  getBtns = () => {
    const btns = []
    for (let i = 0; i < 16; i++) {
      btns.push(document.getElementById(`lane1.${i + 1}`))
    }
    return btns
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
