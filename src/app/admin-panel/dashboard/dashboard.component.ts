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
  mealPopularityData: any[] = [];
  reservationsTrendsData: any[] = [];


  constructor(private dashboardService: DashboardService, private datePipe: DatePipe) {
  }

  ngOnInit(): void {
    const breakfastCount = this.dashboardService.getTodayBreakfastCount();
    const drinksCount = this.dashboardService.getTodayDrinksCount();
    const menuCount = this.dashboardService.getTodayMenuCount();

    forkJoin([breakfastCount, drinksCount, menuCount]).subscribe(([breakfastCount, drinksCount, menuCount]) => {

      this.totalTreatedOrders = breakfastCount + drinksCount + menuCount;

      const countsArray: number[] = [breakfastCount, drinksCount, menuCount];
      const labelArray: string[] = ["Breakfast Orders", "Drinks Orders", "Daily Menu Orders"];
      this.generateDoughnutChart(countsArray, labelArray);
    });
    this.todayTotalReservations();
    this.mealPopularity();
    this.reservationsTrends();

  }

  generateDoughnutChart(data: any[], labels: string[]): void {
    const canvas: HTMLCanvasElement | null = document.getElementById('doughnutChart') as HTMLCanvasElement | null;

    if (canvas) {
      const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');

      if (ctx) {
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
              label: 'Food Popularity',
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

  generateLineChart(data: any[], labels: any[], counts: any): void {
    const canvas: HTMLCanvasElement | null = document.getElementById('trends') as HTMLCanvasElement | null;

    if (canvas) {
      const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');

      if (ctx) {
        new Chart(ctx, {
          type: 'line',
          data: {
            labels: labels,
            datasets: [{
              label: 'Reservations',
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

      this.generateLineChart(data, dates, counts);
    });
  }
  todayTotalReservations(){
    this.dashboardService.getTodayAllReservationsCount().subscribe((data:any)=>{
      this.totalOrders = data;
    })
  }
}
