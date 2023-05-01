export class StepButtonsManager {
  constructor(container, laneName = "") {
    this.container = container
    this.laneName = laneName
    this.buttons = []
  }

  createLane(id, label = "", numButtons = 16) {
    const lane = document.createElement("div")
    lane.id = `${this.laneName}${id}`;

    for (let i = 1; i <= numButtons; i++) {
      const button = document.createElement("button")
      button.id = `step${id}.${i}`
      button.classList.add("step", "stepBtn")
      button.textContent = i
      this.buttons.push(button)
      lane.appendChild(button)
    }

    const laneLabel = document.createElement("label")
    laneLabel.id = id + "Label"
    laneLabel.classList.add("label")
    laneLabel.textContent = label
    lane.appendChild(laneLabel)

    this.container.appendChild(lane)
  }

  getBtns = () => {
    return this.buttons
  }

}