export class Lane {
  constructor(stepTimeline) {
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
      if (index === stepIndex) {
        btn.style.border = "1px solid red"
      } else {
        btn.style.border = ""
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
