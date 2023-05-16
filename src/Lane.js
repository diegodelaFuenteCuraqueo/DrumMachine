import { AudioPlayer } from "./AudioPlayer.js"
import { StepButtonsManager } from "./StepButtonsManager.js"
import { colors } from "../constants.js"

/**
 * @class Lane
 * @description A class that represents a lane in the drum machine
 */
export class Lane {

  /**
   * @param { StepTimeline } stepTimeline - the timeline of the drum machine
   * @param { string } audioFilePath - the path to the audio file
   * @param { HTMLDivElement } drumMachineDivContainer - the div where the lane will be appended
   * @param { number } laneIndex - the index of the lane (must be unique)
   */
  constructor(stepTimeline, audioFilePath = "", drumMachineDivContainer, laneIndex = 0) {
    this.audioPlayer = new AudioPlayer(window.AUDIO_CONTEXT, audioFilePath)
    this.container = drumMachineDivContainer
    this.buttonManager = new StepButtonsManager(this.container, audioFilePath)
    this.laneIndex = laneIndex
    this.steps = this.getBtns()
    this.pattern = [0,0,0,0,
                    0,0,0,0,
                    0,0,0,0,
                    0,0,0,0]

    this.steps.forEach((btn, index) => {
      btn.onclick = () => {
        this.pattern[index] = this.pattern[index] === 0 ? 1 : 0
        btn.style.backgroundColor = this.pattern[index] === 0
          ? colors.btn.background.inactive
          : colors.btn.background.active
      }
    })
    stepTimeline.addEventListener('stepChanged', this.checkStep)
    this.reset()
  }

  /**
   * @method step
   * @param { number } stepIndex - the index of the step to highlight
   * @description This method will highlight the step and play the audio file if the step is active.
   */
  step = (stepIndex) => {
    console.log("Lane received step:", stepIndex)
    this.steps.forEach((btn, index) => {
      if (index === stepIndex && this.pattern[index] === 1) {
        btn.style.border = colors.btn.border.active //"1px solid red"
        this.audioPlayer.play()
      } else {
        btn.style.border = colors.btn.border.inactive //"1px solid white"
      }
    })
  }

  checkStep = (event) => {
    const step = event.detail.step
    this.step(step)
  }

  /**
   * Obtains an array of the buttons of the lane
   * @returns { Array <HTMLButtonElement> } - an array of the buttons of the lane
   */
  getBtns = () => {
    this.buttonManager.createLane(this.laneIndex, "lane 1")
    return this.buttonManager.getBtns()
  }

  getLaneLabel = () => {
    return this.buttonManager.labelText
  }

  setLaneLabel = (labelText) => {
    this.buttonManager.setLaneLabel(labelText)
  }

  /**
   * @param {*} arrayBuffer - the array buffer of the audio file
   */
  loadSoundFile = (arrayBuffer) => {
    console.log("Loading sound file...", arrayBuffer)
    this.audioPlayer.loadSoundFile(arrayBuffer)
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
      btn.style.backgroundColor = colors.btn.background.inactive
    })
  }
}
