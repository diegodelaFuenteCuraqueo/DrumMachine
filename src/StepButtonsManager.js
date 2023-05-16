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
    this.laneName = this.setLaneNameFromFile(laneName)
    this.buttons = []
    this.laneLabel = document.createElement("label")
  }

  setLaneNameFromFile = (filePath) => {
    if (!filePath || typeof filePath != "string") return ""
    const pathParts = filePath.split('/')
    const fileNameWithExtension = pathParts[pathParts.length - 1]
    const fileNameParts = fileNameWithExtension.split('.')
    fileNameParts.pop()
    const fileNameWithoutExtension = fileNameParts.join('.')
    return fileNameWithoutExtension
  }

  /**
   * @description Creates a lane of buttons for a drum machine. The buttons will be appended to the container.
   * @param { number } id - the id of the lane
   * @param { string } label - the label of the lane
   * @param { number } numButtons - the number of buttons to create
   */
  createLane(id, label = "", numButtons = 16) {
    const lane = document.createElement("div")
    lane.id = `${this.laneName}${id}`;
    lane.className = "lane"
    this.labelText = label

    for (let i = 0; i <= numButtons - 1; i++) {
      const button = document.createElement("button")
      button.id = `step${id}.${i}`
      button.classList.add("step", "stepBtn")
      button.textContent = i + 1
      this.buttons.push(button)
      lane.appendChild(button)
    }

    this.laneLabel.id = id + "Label"
    this.laneLabel.classList.add("label")
    this.laneLabel.textContent = this.laneName
    this.laneLabel.onclick = () => {
      const newLabel = prompt("Enter a new label", this.laneLabel.textContent)
      this.laneName = newLabel ? newLabel : this.laneLabel.textContent
      this.laneLabel.textContent = this.laneName
    }
    lane.appendChild(this.laneLabel)

    this.container.appendChild(lane)
  }

  /**
   * @description Returns the buttons of the lane
   * @returns { Array<HTMLButtonElement> } - the buttons of the lane
   */
  getBtns = () => {
    return this.buttons
  }

  getLaneName = () => {
    return this.laneName
  }

  setLaneLabel = (newName) => {
    this.laneName = newName
    this.laneLabel.textContent = newName
  }

  destroy = () => {
    this.container.removeChild(this.container.lastChild)
  }

}