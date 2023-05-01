export class Steps {
  constructor(numberOfSteps = 16) {
    this.steps = this.getBtns()
    this.currentStep = 0
    this.numberOfSteps = numberOfSteps
    this.stepChanged = new EventTarget()
    this.reset()
  }

  attachTimeline = (timeline) => {
    timeline.addEventListener('timelineChanged', this.increaseStep)
  }

  addEventListener(eventName, listener) {
    this.stepChanged.addEventListener(eventName, listener);
  }

  removeEventListener(eventName, listener) {
    this.stepChanged.removeEventListener(eventName, listener);
  }

  getBtns = () => {
    const btns = []
    for (let i = 0; i < 16; i++) {
      btns.push(document.getElementById(`btn${i + 1}`))
    }
    return btns
  }

  increaseStep = () => {
    this.steps.forEach((btn, index) => {
      if (index === this.currentStep) {
        btn.style.backgroundColor = "red"
      } else {
        btn.style.backgroundColor = "gray"
      }
    })
    this.currentStep = (this.currentStep + 1) % this.numberOfSteps
    const stepChangedEvent = new CustomEvent('stepChanged', { bubbles: true, detail: { step: this.currentStep }});
    this.stepChanged.dispatchEvent(stepChangedEvent);

  }

  reset = () => {
    this.currentStep = 0
    this.steps.forEach((btn) => {
      btn.style.backgroundColor = "gray"
    })
  }
}
