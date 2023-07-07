import {Component, OnInit} from '@angular/core';
import {Chart} from "chart.js/auto";
import {DashboardService} from "../services/dashboard/dashboard.service";
import {forkJoin} from "rxjs";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  totalOrders :number = 0;
  totalTreatedOrders :number = 0;

  constructor(private dashboardService: DashboardService) {
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
}
