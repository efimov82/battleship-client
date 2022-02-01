export enum Sound {
  singleClick = "singleClick.wav",
  addShip = "addShip.wav",
  deleteShip = "deleteShip.wav",
  playerLose = "playerLose.wav",
  playerWin = "playerWin.wav",
  shipKilled = "shipKilled.wav",
  shot = "shot.wav",
  shotWater = "shotWater.wav",
}

export class SoundService {
  private audio = {};

  constructor(private soundMuted = false) {
    if (typeof Audio !== "undefined") {
      (Object.keys(Sound) as Array<keyof typeof Sound>).map((key) => {
        this.audio[Sound[key]] = new Audio(`/sounds/${Sound[key]}`);
      });
    }
  }

  public setSoundMuted(value: boolean): void {
    this.soundMuted = value;
  }

  public getSoundMuted(): boolean {
    return this.soundMuted;
  }

  public play(sound: Sound): void {
    if (!this.soundMuted) {
      this.audio[sound].play();
    }
  }
}
