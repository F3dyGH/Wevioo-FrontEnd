import {Component, OnInit} from '@angular/core';
import {MenuService} from "../services/menu/menu.service";

@Component({
  selector: 'app-menu-management',
  templateUrl: './menu-management.component.html',
  styleUrls: ['./menu-management.component.css']
})
export class MenuManagementComponent implements OnInit {

  menus!: any[];
  index = 0;
  total = 0;
  dishes: any[] = []
  selectedMenu!: any;

  constructor(private menuService: MenuService) {
  }

  ngOnInit(): void {
    this.menuService.getAllMenus().subscribe((data: any) => {
      this.menus = data;
      this.menus.forEach((menu: any) => {
        menu.dishes.forEach((dish: any) => {
          if (dish.image && dish.image.data) {
            dish.imageData = 'data:image/jpeg;base64,' + this.arrayBufferToBase64(dish.photo.data);
          }
        })
      })
      console.log(data);
    });
  }

  getTotalPrice(menu: any) {
    this.total = 0;
    menu.dishes.forEach((dish: any) => {
      this.total += dish.price;
      this.dishes.push(dish);
      console.log(this.dishes.push(dish));
    });
    return this.total;

  }

  showMenuDetails(menu: any) {
    this.selectedMenu = menu
  }

  arrayBufferToBase64(buffer: ArrayBuffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }

}
