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
    this.bpm = tempo
    // Calculate the interval based on the BPM
    this.beatDuration = 60000 / this.bpm // Convert from BPM to milliseconds
    this.nextBeatTime = performance.now() + this.beatDuration
  }

  setEvent = (event) => {
    console.log("StepTimeline ~ setEvent")
    this.event = event
  }

  playTick = () => {
    //console.log("play tick")
    // Check if the desired time has passed
    if (this.on) {
      const currentTime = performance.now()
      if (currentTime >= this.nextBeatTime) {
        // Play the tick sound at the desired time
        console.log("StepTimeline ~ tick")
        const timelineEvent = new CustomEvent('timelineChanged', { bubbles: true, detail: { currentStep: this.currentStep }});
        this.timelineChanged.dispatchEvent(timelineEvent);

        //this.event ? this.event() : console.log("no event")
        // Update the target time for the next tick
        this.nextBeatTime += this.beatDuration
      }
      // Request the next animation frame
      requestAnimationFrame(this.playTick)
    }
  }
}
