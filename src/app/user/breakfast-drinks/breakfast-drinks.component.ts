import {Component} from '@angular/core';
import {Food_by_categoriesService} from "../../staff-panel/services/sandwiches/food_by_categories.service";
import {ReservationsService} from "../../staff-panel/services/reservations/reservations.service";
import {AuthService} from "../../auth/services/auth/auth.service";

@Component({
  selector: 'app-breakfast-drinks',
  templateUrl: './breakfast-drinks.component.html',
  styleUrls: ['./breakfast-drinks.component.css']
})
export class BreakfastDrinksComponent {
  selectedCategory: string;
  breakfast: any[] = [];
  drinks: any[] = [];
  selectedItem: any = null;
  currentUser: any;
  responseMsg: string = '';

  constructor(private breakfastAndDrinksService: Food_by_categoriesService, private reservationService: ReservationsService, private authService: AuthService) {
    this.selectedCategory = 'breakfast';
    this.loadData();
    this.currentUser = this.authService.getUserId();
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
    this.loadData();
  }

  loadData() {
    if (this.selectedCategory === 'breakfast') {
      this.breakfastAndDrinksService.getByCategoryUser('breakfast').subscribe((data: any[]) => {
        this.breakfast = data;
      });
    } else if (this.selectedCategory === 'drinks') {
      this.breakfastAndDrinksService.getByCategoryUser('drinks').subscribe((data: any[]) => {
        this.drinks = data;
      });
    }
  }


  select(item: any) {
    this.selectedItem = item;
  }

  createReservation() {
    this.reservationService.createReservation(this.currentUser, this.selectedItem).subscribe(
      () => {
        this.responseMsg = "Reservation has been successful, track your order in the Order track section";
        this.loadData();
        setTimeout(() => {
          this.responseMsg = '';
        }, 3000);
      },
      (error) => {
        setTimeout(() => {
          error = false;
        }, 3000);
      }
    );
  }
}
