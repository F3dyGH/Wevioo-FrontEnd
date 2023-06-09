import {Component, OnDestroy} from '@angular/core';
import {interval, Subscription} from "rxjs";

@Component({
  selector: 'app-time-counter',
  templateUrl: './time-counter.component.html',
  styleUrls: ['./time-counter.component.css']
})
export class TimeCounterComponent implements OnDestroy {
  timeRemaining: any = '';


  private counterSubscription?: Subscription;
  hours: string = '00';
  minutes: string = '00';
  seconds: string = '00';
  isExpired: boolean = false;


  constructor() {
    this.startCounter();
  }

  ngOnDestroy() {
    this.stopCounter();
  }

  ngOnInit() {
    this.startCountdownAt18();
  }

  private startCountdownAt18() {
    const currentDate = new Date();
    const currentDayOfWeek = currentDate.getDay();
    const currentHour = currentDate.getHours();
    const currentMinutes = currentDate.getMinutes();

    if (currentDayOfWeek >= 1 && currentDayOfWeek <= 5 && currentHour <= 18 && currentMinutes >= 0) {
      const timeUntil18 = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 18, 0, 0).getTime() - currentDate.getTime();
      setTimeout(() => {
        this.startCounter();
      }, timeUntil18);
    } else {
      this.startCounter();
    }
  }

  private startCounter() {
    this.counterSubscription = interval(1000).subscribe(() => {
      const currentDate = new Date();
      const currentHour = currentDate.getHours();
      // const currentMinutes = currentDate.getMinutes();
      const currentDay = currentDate.getDate();
      // const next6pm = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDay + 1, 18, 0, 0);
      const next10am = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDay + 1 , 10, 0, 0);
      // const current11 = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDay , 11, 33, 0);

      if (currentHour <= 18 && currentHour >= 10) {
        this.timeRemaining = 0;

        this.formatRemainingTime(this.timeRemaining)
      } /*else if (currentHour >= 0 && currentHour < 18) {
        const timeDiff = next6pm.getTime() - currentDate.getTime();
        const remainingTime = timeDiff > 0 ? timeDiff : 0;

        this.timeRemaining = this.formatRemainingTime(remainingTime);
      }*/ else {
        const timeDiff = next10am.getTime() - currentDate.getTime();
        const remainingTime = timeDiff > 0 ? timeDiff : 0;this.timeRemaining = this.formatRemainingTime(remainingTime);

      }
    });
  }

  private formatRemainingTime(timeDiff: number) {
    const hours = Math.floor(timeDiff / (1000 * 60 * 60)).toString().padStart(2, '0');
    const minutes = Math.floor((timeDiff / (1000 * 60)) % 60).toString().padStart(2, '0');
    const seconds = Math.floor((timeDiff / 1000) % 60).toString().padStart(2, '0');

    this.hours = hours;
    this.minutes = minutes;
    this.seconds = seconds;

    this.isExpired = timeDiff <= 0;

  }

  private stopCounter() {
    if (this.counterSubscription) {
      this.counterSubscription.unsubscribe();
    }
  }
}
