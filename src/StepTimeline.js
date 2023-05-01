export class StepTimeline {
  constructor (bpm = 60) {
    this.setTempo(bpm * 4)
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
    console.log("StepTimeline ~ start")
    this.on = true
    this.nextBeatTime = performance.now() + this.beatDuration
    this.playTick()
  }

  stop () {
    console.log("StepTimeline ~ stop")
    this.on = false
  }

  setTempo (tempo) {
    console.log("StepTimeline ~ set tempo", tempo)
    this.bpm = tempo * 4
    this.beatDuration = 60000 / this.bpm // Convert from BPM to milliseconds
  }

  playTick = () => {
    if (this.on) {
      const currentTime = performance.now() // Check if the desired time has passed
      if (currentTime >= this.nextBeatTime) {
        const eventDetail = {
          bubbles: true,
          detail: { currentStep: this.currentStep }
        }
        const timelineEvent = new CustomEvent('timelineChanged', eventDetail);
        this.timelineChanged.dispatchEvent(timelineEvent);

        // Update the target time for the next tick
        this.nextBeatTime += this.beatDuration
      }
      requestAnimationFrame(this.playTick)
    }
  }
}
