/**
 * @class BeatTimeline
 * @description A class that controls the timing of a step sequencer
 */
export class BeatTimeline {
  /**
   * @param { number } bpm - The tempo of the step sequencer in beats per minute
   * This value will be multiplied by 4 to get the required subdivision.
   */
  constructor (bpm = 60) {
    this.setTempo(bpm)
    this.on = false
    this.event = null
    this.timelineChanged = new EventTarget()
  }

  addEventListener(eventName, listener) {
    this.timelineChanged.addEventListener(eventName, listener);
  }

  removeEventListener(eventName, listener) {
    this.timelineChanged.removeEventListener(eventName, listener);
  }

  start () {
    this.on = true
    this.nextBeatTime = performance.now() + this.beatDuration
    this.playTick()
  }

  stop () {
    this.on = false
  }

  /**
   * @param { number } tempo - beats per mitute
   */
  setTempo = (tempo) => {
    this.bpm = tempo * 4
    this.beatDuration = 60000 / this.bpm // Convert from BPM to milliseconds
  }

  emitTick = () => {
    const eventDetail = {
      bubbles: true,
      detail: { currentStep: this.currentStep }
    }
    const timelineEvent = new CustomEvent('timelineChanged', eventDetail);
    this.timelineChanged.dispatchEvent(timelineEvent);
  }

  /**
   * Called recursively to play the next tick.
   * A timelineChanged event will be emited with each step.
   */
  playTick = () => {
    if (this.on) {
      const currentTime = performance.now() // Check if the desired time has passed
      if (currentTime >= this.nextBeatTime) {
        this.emitTick()
        // Update the target time for the next tick
        this.nextBeatTime += this.beatDuration
      }
      requestAnimationFrame(this.playTick)
    }
  }
}
