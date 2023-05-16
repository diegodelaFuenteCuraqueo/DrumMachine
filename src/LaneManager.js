import { Lane } from './Lane.js'

export class LaneManager {

  /**
   * @param { HTMLDivElement } container
   * @param { StepTimeline } stepTimeline
   */
  constructor(container, stepTimeline) {
    this.container = container
    this.stepTimeline = stepTimeline
    this.lanes = []
  }

  createLanes = () => {
    this.lanesData.forEach((laneData, index) => {
      console.log("createLanes", laneData)
      try {
        const lane = new Lane(this.stepTimeline, laneData.audioFile, this.container, index)
        this.lanes.push(lane)
      } catch (error) {
        console.error(error)
      }
    })
  }

  addLane = (audioFile) => {
    console.log("Adding lane", audioFile)
    const lane = new Lane(this.stepTimeline, audioFile, this.container, this.lanes.length)
    this.lanes.push(lane)
  }

  /**
   * @param { Lane } lane - an instance of the Lane class to push.
   */
  pushLane = (lane) => {
    this.lanes.push(lane)
  }

  removeLane = (laneIndex) => {
    const conf = confirm(`Are you sure you want to delete "${this.lanes[laneIndex].getLaneLabel()}" ?`)
    console.log(conf)
    if (conf) {
      this.lanes.splice(laneIndex, 1)
    }
  }
}
