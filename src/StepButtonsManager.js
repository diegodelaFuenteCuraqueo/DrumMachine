/**
 * @class StepButtonsManager
 * @description Creates a lane of buttons for a drum machine
 */
export class StepButtonsManager {

  /**
   * @param { HTMLDivElement } container - the div container to append the buttons to
   * @param { String } laneName - the name of the lane
   */
  constructor(container, laneName = "") {
    this.container = container
    this.laneName = laneName
    this.buttons = []
  }

  /**
   * @description Creates a lane of buttons for a drum machine. The buttons will be appended to the container.
   * @param { Number } id - the id of the lane
   * @param { String } label - the label of the lane
   * @param { Number } numButtons - the number of buttons to create
   */
  createLane(id, label = "", numButtons = 16) {
    const lane = document.createElement("div")
    lane.id = `${this.laneName}${id}`;
    lane.className = "lane"
    this.labelText = label

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
    laneLabel.textContent = this.labelText
    laneLabel.onclick = () => {
      const newLabel = prompt("Enter a new label", laneLabel.textContent)
      this.labelText = newLabel ? newLabel : laneLabel.textContent
      laneLabel.textContent = this.labelText
    }
    lane.appendChild(laneLabel)

    this.container.appendChild(lane)
  }

  /**
   * @description Returns the buttons of the lane
   * @returns { Array<HTMLButtonElement> } - the buttons of the lane
   */
  getBtns = () => {
    return this.buttons
  }

  getLabelText = () => {
    return this.labelText
  }

}