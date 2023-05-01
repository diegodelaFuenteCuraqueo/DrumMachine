export class AudioPlayer {
  constructor(audioContext, filepath = ""){
    this.audioContext = audioContext
    this.filepath = filepath
    this.buffer = null
    this.source = null
  }

  setFilePath = (filepath) => {
    this.filepath = filepath
  }

  loadSound = () => {
    return fetch(this.filepath)
      .then(response => response.arrayBuffer())
      .then(arrayBuffer => {
        return this.audioContext.decodeAudioData(arrayBuffer)
      })
  }

  play = () => {
    //this.source.stop();
    this.loadSound().then((buffer) => {
      this.source = this.audioContext.createBufferSource();
      this.source.buffer = buffer;
      this.source.connect(this.audioContext.destination);
      this.source.start();
    })
  }
}
