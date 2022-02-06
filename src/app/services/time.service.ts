import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TimeService {
  constructor() {}

  getTimerValue(endingTimestamp: number) {
    let currentTimestamp = Math.floor(new Date().getTime() / 1000);
    let timeLeft = endingTimestamp - currentTimestamp;
    let minutesLeft = Math.floor(timeLeft / 60);
    let secondsLeft = Math.floor(timeLeft % 60);
    return {
      timeLeft: timeLeft,
      timeLeftFormatted: `${('0' + minutesLeft).slice(-2)}:${(
        '0' + secondsLeft
      ).slice(-2)}`,
    };
  }
}
