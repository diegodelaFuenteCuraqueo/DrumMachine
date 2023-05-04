/**
 * @class StepCounter
 * @description A class that represents the steps of the drum machine
 */
export class StepCounter {
  constructor(numberOfSteps = 16) {
    this.steps = this.getBtns()
    this.currentStep = 0
    this.numberOfSteps = numberOfSteps
    this.stepChanged = new EventTarget()
    this.clearSteps()
  }

  attachTimeline = (timeline) => {
    timeline.addEventListener('timelineChanged', this.increaseStep)
  }

  addEventListener(eventName, listener) {
    this.stepChanged.addEventListener(eventName, listener)
  }

  removeEventListener(eventName, listener) {
    this.stepChanged.removeEventListener(eventName, listener)
  }

  getBtns = () => {
    const btns = []
    for (let i = 0; i < 16; i++) {
      btns.push(document.getElementById(`btn${i + 1}`))
    }
    return btns
  }

  increaseStep = () => {
    this.emitStep()
    this.paintStep()

    this.currentStep = this.currentStep >= (this.numberOfSteps - 1)
      ? 0
      : this.currentStep + 1
  }

  emitStep = () => {
    const eventData = {
      bubbles: true,
      detail: { step: this.currentStep }
    }
    const stepChangedEvent = new CustomEvent('stepChanged', eventData)
    this.stepChanged.dispatchEvent(stepChangedEvent)
  }

  paintStep = () => {
    this.steps.forEach((btn, index) => {
      btn.style.backgroundColor = index === this.currentStep ? "red" : "white"
    })
  }

  clearSteps = () => {
    this.currentStep = 0
    this.steps.forEach((btn) => {
      btn.style.backgroundColor = "white"
    })
  }
}
