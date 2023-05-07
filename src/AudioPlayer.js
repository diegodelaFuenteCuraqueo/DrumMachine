/**
 * @class AudioPlayer
 * @description A class that uses the Web Audio Api to play audio files
 */
export class AudioPlayer {
  /**
   * @description The constructor will set the audioContext and the filepath
   * @param {AudioContext} audioContext - The audio context to use
   * @param {String} filepath - The path to the audio file
   */
  constructor(audioContext, filepath = ""){
    this.audioContext = audioContext
    this.filepath = filepath
    this.buffer = null
    this.source = null
  }

  setFilePath = (filepath) => {
    this.filepath = filepath
  }

  /**
   * @returns { Promise<AudioBuffer> } - A promise that resolves to an AudioBuffer
   */
  loadSound = () => {
    return fetch(this.filepath)
      .then(response => response.arrayBuffer())
      .then(arrayBuffer => {
        return this.audioContext.decodeAudioData(arrayBuffer)
      })
  }

  loadSoundFile = async (arrayBuffer) => {
    this.buffer = await this.audioContext.decodeAudioData(arrayBuffer)
  }

  play = () => {
    if (this.buffer) {
      this.source = this.audioContext.createBufferSource()
      this.source.buffer = this.buffer
      this.source.connect(this.audioContext.destination)
      this.source.start()
    } else {
      console.error("No sound file loaded")
    }
  }
}
