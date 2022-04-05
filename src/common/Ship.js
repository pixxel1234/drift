// @flow
const PlayerInput = require('./PlayerInput.js')
const { vec2 } = require('p2')
const C = require('./constants.js')

class Ship {
  position: vec2
  velocity: vec2
  angle: number
  username: string
  color: number
  input: PlayerInput
  checkpoint: number
  lap: number
  currentLaptime: number
  laptimes: Array<number>

  constructor ({
    position,
    velocity,
    angle,
    username,
    color,
    input,
    checkpoint,
    lap,
    currentLaptime,
    laptimes
  } : {
    position: vec2,
    velocity: vec2,
    angle: number,
    username: string,
    color: number,
    input: PlayerInput,
    checkpoint: number,
    lap: number,
    currentLaptime: number,
    laptimes: Array<number>
  }) {
    this.position = position
    this.velocity = velocity
    this.angle = angle
    this.username = username
    this.color = color
    this.input = input
    this.checkpoint = checkpoint
    this.lap = lap
    this.currentLaptime = currentLaptime
    this.laptimes = laptimes
  }

  hasFinishedRace () {
    return (this.lap > C.MAX_LAPS)
  }

  isABot () {
    return (this.username.length === 4 && this.username.startsWith('bot'))
  }

  bestLap () {
    return this.laptimes.reduce((prev, curr, i, arr) => {
      if (i === 0) return prev // ignore pre-start lap
      if (i === arr.length - 1) return prev // ignore current lap
      return Math.min(prev, curr)
    }, Infinity)
  }

  totalTime () {
    return this.laptimes.reduce((prev, curr, i) => prev + curr, 0)
  }
}

module.exports = Ship
