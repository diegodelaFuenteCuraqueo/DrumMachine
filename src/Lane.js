import { AudioPlayer } from "./AudioPlayer.js"
import { StepButtonsManager } from "./StepButtonsManager.js"

/**
 * @class Lane
 * @description A class that represents a lane in the drum machine
 */
export class Lane {

  /**
   * @param {*} stepTimeline - the timeline of the drum machine
   * @param {*} audioFilePath - the path to the audio file
   * @param {*} drumMachineDivContainer - the div where the lane will be appended
   * @param {*} laneIndex - the index of the lane (must be unique)
   */
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

  /**
   * @method step
   * @param {Number} stepIndex - the index of the step to highlight
   * @description This method will highlight the step and play the audio file if the step is active.
   */
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
    const step = event.detail.step - 1
    this.step(step)
  }

  /**
   * Obtains an array of the buttons of the lane
   * @returns {Array <HTMLButtonElement>} - an array of the buttons of the lane
   */
  getBtns = () => {
    this.buttonManager.createLane(this.laneIndex, "lane 1")
    return this.buttonManager.getBtns()
  }

  getLaneLabel = () => {
    return this.buttonManager.labelText
  }

  /**
   * Resets the lane, setting all the steps to inactive
   */
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
