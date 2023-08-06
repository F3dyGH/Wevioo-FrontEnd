import {Component, OnInit} from '@angular/core';
import {Chart} from "chart.js/auto";
import {DashboardService} from "../services/dashboard/dashboard.service";
import {forkJoin} from "rxjs";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [DatePipe]
})
export class DashboardComponent implements OnInit {

  totalOrders: number = 0;
  totalTreatedOrders: number = 0;
  totalCancelledOrders: number = 0;
  totalPendingOrders: number = 0;
  mealPopularityData: any[] = [];
  reservationsTrendsData: any[] = [];
  reservationsMonthlyProfitData: any[] = [];
  menuDailyProfit: number = 0;
  breakfastDailyProfit: number = 0;
  drinksDailyProfit: number = 0;
  allDailyProfit: number = 0;
  percentage: any;


  constructor(private dashboardService: DashboardService, private datePipe: DatePipe) {
  }

  ngOnInit(): void {

    this.getTodayTreatedReservations();
    this.getTodayCancelledReservations();
    this.getTodayPendingReservations();
    this.todayTotalReservations();
    this.todayTotalReservations();
    this.mealPopularity();
    this.reservationsTrends();
    this.calculateMenuDailyProfit();
    this.calculateDrinksDailyProfit();
    this.calculateBreakfastDailyProfit();
    this.calculateAllDailyProfit();
    this.calculateMonthlyProfits();
    this.profitPercentageBetweenYesterdayAndToday();

  }

  getTodayTreatedReservations() {
    const breakfastCount = this.dashboardService.getTodayBreakfastCount();
    const drinksCount = this.dashboardService.getTodayDrinksCount();
    const menuCount = this.dashboardService.getTodayMenuCount();

    forkJoin([breakfastCount, drinksCount, menuCount]).subscribe(([breakfastCount, drinksCount, menuCount]) => {

      this.totalTreatedOrders = breakfastCount + drinksCount + menuCount;

      const countsArray: number[] = [breakfastCount, drinksCount, menuCount];
      const labelArray: string[] = ["Breakfast Orders", "Drinks Orders", "Daily Menu Orders"];
      this.generateDoughnutChart(countsArray, labelArray, "doughnutTreatedChart");
    });
  }

  getTodayCancelledReservations() {
    const breakfastCount = this.dashboardService.getTodayCancelledBreakfastCount();
    const drinksCount = this.dashboardService.getTodayCancelledDrinksCount();
    const menuCount = this.dashboardService.getTodayCancelledMenuCount();

    forkJoin([breakfastCount, drinksCount, menuCount]).subscribe(([breakfastCount, drinksCount, menuCount]) => {

      this.totalCancelledOrders = breakfastCount + drinksCount + menuCount;

      const countsArray: number[] = [breakfastCount, drinksCount, menuCount];
      const labelArray: string[] = ["Breakfast Orders", "Drinks Orders", "Daily Menu Orders"];
      this.generateDoughnutChart(countsArray, labelArray, "doughnutCancelledChart");
    });
  }

  getTodayPendingReservations() {
    const breakfastCount = this.dashboardService.getTodayPendingBreakfastCount();
    const drinksCount = this.dashboardService.getTodayPendingDrinksCount();
    const menuCount = this.dashboardService.getTodayPendingMenuCount();

    forkJoin([breakfastCount, drinksCount, menuCount]).subscribe(([breakfastCount, drinksCount, menuCount]) => {

      this.totalPendingOrders = breakfastCount + drinksCount + menuCount;

      const countsArray: number[] = [breakfastCount, drinksCount, menuCount];
      const labelArray: string[] = ["Breakfast Orders", "Drinks Orders", "Daily Menu Orders"];
      this.generateDoughnutChart(countsArray, labelArray, "doughnutPendingChart");
    });
  }

  generateDoughnutChart(data: any[], labels: string[], elementId: string): void {
    const canvas: HTMLCanvasElement | null = document.getElementById(elementId) as HTMLCanvasElement | null;

    if (canvas) {
      const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');

      if (ctx) {
        const existingChart = Chart.getChart(canvas);
        if (existingChart) {
          existingChart.data.datasets[0].data = data;
          existingChart.data.labels = labels;
          existingChart.update();
        } else {
          new Chart(ctx, {
            type: 'doughnut',
            data: {
              datasets: [{
                data: data,
                backgroundColor: [
                  '#ff0019',
                  '#36A2EB',
                  '#FFCE56'
                ]
              }],
              labels: labels
            },
            options: {
              responsive: true,
              maintainAspectRatio: false
            }
          });
        }
      }
    }
  }

  generateBarChart(data: any[], labels: string[], counts: any): void {
    const canvas: HTMLCanvasElement | null = document.getElementById('popularity') as HTMLCanvasElement | null;

    if (canvas) {
      const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');

      if (ctx) {
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [{
              label: 'Total reservations',
              data: counts,
              backgroundColor: 'rgba(51, 201, 45, 1)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  stepSize: 1
                }
              }
            }
          }
        });
      }
    }
  }

  generateLineChart(data: any[], labels: any[], counts: any, elementId: any, chartLabel: string): void {
    const canvas: HTMLCanvasElement | null = document.getElementById(elementId) as HTMLCanvasElement | null;

    if (canvas) {
      const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');

      if (ctx) {
        new Chart(ctx, {
          type: 'line',
          data: {
            labels: labels,
            datasets: [{
              label: chartLabel,
              data: counts,
              fill: true,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderWidth: 2
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      }
    }
  }

  mealPopularity() {
    this.dashboardService.getMealPopularity().subscribe((data: any[]) => {
      this.mealPopularityData = data;

      const labels = this.mealPopularityData.map(item => item[0]);
      const counts = this.mealPopularityData.map(item => item[1]);
      this.generateBarChart(data, labels, counts);
    });
  }

  reservationsTrends() {
    this.dashboardService.getReservationTrends().subscribe((data: any[]) => {
      this.reservationsTrendsData = data;

      const dates = this.reservationsTrendsData.map(item => this.datePipe.transform(item[0], 'YYYY MMM'));
      const counts = this.reservationsTrendsData.map(item => item[1]);

      this.generateLineChart(data, dates, counts, "trends", "Reservations");
    });
  }

  todayTotalReservations() {
    /* this.dashboardService.getTodayAllReservationsCount().subscribe((data: any) => {
       this.totalOrders = data;
     })*/
    const breakfastCount = this.dashboardService.getTodayAllBreakfastCount();
    const drinksCount = this.dashboardService.getTodayAllDrinksCount();
    const menuCount = this.dashboardService.getTodayAllMenuCount();

    forkJoin([breakfastCount, drinksCount, menuCount]).subscribe(([breakfastCount, drinksCount, menuCount]) => {

      this.totalOrders = breakfastCount + drinksCount + menuCount;

      const countsArray: number[] = [breakfastCount, drinksCount, menuCount];
      const labelArray: string[] = ["Breakfast Orders", "Drinks Orders", "Daily Menu Orders"];
      this.generateDoughnutChart(countsArray, labelArray, "doughnutAllChart");
    });
  }

  private calculateMenuDailyProfit() {
    this.dashboardService.getTodayMenuReservationProfit().subscribe((data: any) => {
      this.menuDailyProfit = data;
    })
  }

  private calculateDrinksDailyProfit() {
    this.dashboardService.getTodayDrinksReservationProfit().subscribe((data: any) => {
      this.drinksDailyProfit = data;
    })
  }

  private calculateBreakfastDailyProfit() {
    this.dashboardService.getTodayBreakfastReservationProfit().subscribe((data: any) => {
      this.breakfastDailyProfit = data;
    })

  }

  private calculateAllDailyProfit() {
    this.dashboardService.getTodayReservationsProfit().subscribe((data: any) => {
      this.allDailyProfit = data
    })
  }

  private calculateMonthlyProfits() {
    this.dashboardService.getMonthlyReservationsProfit().subscribe((data: any) => {
      this.reservationsMonthlyProfitData = data;

      const dates = this.reservationsMonthlyProfitData.map(item => this.datePipe.transform(item[0], 'YYYY MMM'));
      const counts = this.reservationsMonthlyProfitData.map(item => item[1]);

      this.generateLineChart(data, dates, counts, "profits", "Profits per month");
    })
  }

  profitPercentageBetweenYesterdayAndToday() {
    this.dashboardService.getProfitPercentageBetweenYesterdayAndToday().subscribe((data: any) => {
      this.percentage = data;
    })
  }

  getAbsoluteValue(number: number): number {
    return Math.abs(number);
  }
}
