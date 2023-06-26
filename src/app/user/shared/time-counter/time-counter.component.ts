/*
import { Component, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';

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

  private startCounter() {
    const currentDate = new Date();
    const currentDayOfWeek = currentDate.getDay();
    const currentHour = currentDate.getHours();

    if (currentDayOfWeek === 0 || (currentDayOfWeek === 1 && currentHour < 18) /!* Sunday before 6 PM *!/) {
      const targetDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate(),
        18,
        0,
        0
      );

      const timeUntilTarget = targetDate.getTime() - currentDate.getTime();
      setTimeout(() => {
        this.startCounter();
      }, timeUntilTarget);
    } else if (currentDayOfWeek !== 6 && (currentHour >= 18 || currentHour < 10)) {
      const next10am = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentHour >= 10 ? currentDate.getDate() + 1 : currentDate.getDate(),
        10,
        0,
        0
      );

      const timeDiff = next10am.getTime() - currentDate.getTime();
      const remainingTime = timeDiff > 0 ? timeDiff : 0;
      this.formatRemainingTime(remainingTime);

      this.counterSubscription = interval(1000).subscribe(() => {
        const currentTime = new Date();
        const remainingDiff = next10am.getTime() - currentTime.getTime();
        const remainingTime = remainingDiff > 0 ? remainingDiff : 0;
        this.formatRemainingTime(remainingTime);
      });
    } else {
      this.formatRemainingTime(0);
    }
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
*/
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-time-counter',
  templateUrl: './time-counter.component.html',
  styleUrls: ['./time-counter.component.css']
})
export class TimeCounterComponent implements OnInit {
  hours: string = '00';
  minutes: string = '00';
  seconds: string = '00';
  isExpired: boolean = false;

  ngOnInit() {
    this.startCountdown();
  }

  startCountdown() {
    const currentDateTime = new Date();
    const currentDay = currentDateTime.getDay();
    const currenHour = currentDateTime.getHours();
    const nextDay = currentDay + 1;
    const next10AM = new Date(currentDateTime.getFullYear(), currentDateTime.getMonth(), currentDay, 3, 12, 0)
    console.log(currenHour)
    const targetTime = new Date(currentDateTime);

    // Set the target time based on the current day
    switch (currentDay) {
      case 0: // Sunday
        if (currenHour >= 18) {
          targetTime.setDate(targetTime.getDate() + 1);
          targetTime.setHours(10, 0, 0);
        } else {
          this.hours = '00';
          this.minutes = '00';
          this.seconds = '00';
          this.isExpired = true;
        }
        break;
      case 1: // Monday
        if (currenHour < 10) {
          targetTime.setDate(targetTime.getDate());
          targetTime.setHours(10, 0, 0);
        } else if (currenHour >= 18) {
          targetTime.setDate(targetTime.getDate() + 1)
          targetTime.setHours(10, 0, 0)
        }
        break;
      case 2: // Tuesday
        if (currenHour < 10) {
          targetTime.setDate(targetTime.getDate());
          targetTime.setHours(10, 0, 0);
        } else if (currenHour >= 18) {
          targetTime.setDate(targetTime.getDate() + 1)
          targetTime.setHours(10, 0, 0)
        }
        break;
      case 3: // Wednesday
        if (currenHour < 10) {
          targetTime.setDate(targetTime.getDate());
          targetTime.setHours(10, 0, 0);
        } else if (currenHour >= 18) {
          targetTime.setDate(targetTime.getDate() + 1)
          targetTime.setHours(10, 0, 0)
        }
        break;
      case 4: // Thursday
        if (currenHour < 10) {
          targetTime.setDate(targetTime.getDate());
          targetTime.setHours(10, 0, 0);
        } else if (currenHour >= 18) {
          targetTime.setDate(targetTime.getDate() + 1)
          targetTime.setHours(10, 0, 0)
        }
        break;
      case 5: // Friday
        if (currenHour < 10) {
          targetTime.setDate(targetTime.getDate());
          targetTime.setHours(10, 0, 0);
        } else if (currenHour >= 10) {
          this.hours = '00';
          this.minutes = '00';
          this.seconds = '00';
          this.isExpired = true;
        }
        break;
      case 6: // Saturday
        this.hours = '00';
        this.minutes = '00';
        this.seconds = '00';
        this.isExpired = true;
        break;
    }
    setInterval(() => {
        const currentTime = new Date();
        const remainingTime = targetTime.getTime() - currentTime.getTime();
        const currentHour = currentTime.getHours();

        if (currentHour >= 10 && currentHour < 18) {
          // Pause the countdown between 10 am and 6 pm
          this.hours = '00';
          this.minutes = '00';
          this.seconds = '00';
          this.isExpired = true;
        } else {
          if (remainingTime > 0) {
            this.formatRemainingTime(remainingTime);
          } else {
            // Countdown finished, reset the countdown
            this.hours = '00';
            this.minutes = '00';
            this.seconds = '00';
            this.isExpired = true;
            this.startCountdown();
          }
        }
      }
      ,
      1000
    )
    ;
  }

  formatRemainingTime(timeDiff: number) {
    const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24).toString().padStart(2, '0');
    const minutes = Math.floor((timeDiff / (1000 * 60)) % 60).toString().padStart(2, '0');
    const seconds = Math.floor((timeDiff / 1000) % 60).toString().padStart(2, '0');

    this.hours = hours;
    this.minutes = minutes;
    this.seconds = seconds;
    this.isExpired = false;
  }
}
