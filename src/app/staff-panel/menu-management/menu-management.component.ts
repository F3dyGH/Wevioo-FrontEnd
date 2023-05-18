import {Component, OnInit} from '@angular/core';
import {MenuService} from "../services/menu/menu.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DessertsService} from "../services/desserts/desserts.service";
import {dateTimestampProvider} from "rxjs/internal/scheduler/dateTimestampProvider";

@Component({
  selector: 'app-menu-management',
  templateUrl: './menu-management.component.html',
  styleUrls: ['./menu-management.component.css']
})
export class MenuManagementComponent implements OnInit {

  menus!: any[];
  index = 0;
  total = 0;
  dessert: any;
  desserts: any[] = [];
  selectedMenu!: any;
  MenuForm!: FormGroup;
  file: File[] = [];
  fileData!: string;
  imageData!: string;
  p: number = 1;

  constructor(private menuService: MenuService, private dessertService: DessertsService, private formBuilder: FormBuilder) {
    this.MenuForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      dessert: ['', Validators.required],
      date: ['', Validators.required],
      photo: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.menuService.getAllMenus().subscribe((data: any) => {
      this.menus = data;
      /* this.menus.forEach((menu: any) => {
         menu.dessert.forEach((dish: any) => {
           if (dish.image && dish.image.data) {
             dish.imageData = 'data:image/jpeg;base64,' + this.arrayBufferToBase64(dish.photo.data);
           }
         })
       })*/
      this.menus.forEach((menu: any) => {
        if (menu.image && menu.image.data) {
          menu.imageData = 'data:image/jpeg;base64,' + this.arrayBufferToBase64(menu.photo.data);
        }
      });
      console.log(data);
    });

    this.dessertService.getAllDesserts().subscribe((data: any) => {
      this.desserts = data;
      console.log(data)
    })
  }

  onSubmit() {
    const formData = new FormData();

    formData.append('name', this.MenuForm.value.name);
    formData.append('price', this.MenuForm.value.price);
    formData.append('dessert', this.MenuForm.value.dessert);
    formData.append('date', this.MenuForm.value.date);
    if (this.file.length > 0) {
      formData.append('photo', this.file[0], this.file[0].name);
    }
    console.log(this.MenuForm.value);
    this.menuService.addMenu(formData).subscribe(res => {
        this.MenuForm.reset();
        this.file = [];
        this.menuService.getAllMenus().subscribe((data: any[]) => {
          this.menus = data;
        });
      },
      (error) => console.log(error))
  }

  onFileSelected(event: any) {
    this.file = event.target.files;
    const reader = new FileReader();
    if (this.file && this.file.length > 0) {
      const fileType = this.file[0].type;
      if (fileType && fileType.match('image.*')) {
        reader.readAsDataURL(this.file[0]);
        console.log(this.file[0].name);
        console.log(this.file[0]);
      }
      reader.onload = () => {
        this.fileData = reader.result as string;
      };
    }
  }

  /*getTotalPrice(menu: any) {
    this.total = 0;
    menu.dessert.forEach((dish: any) => {
      this.total += dish.price;
      this.dessert.push(dish);
      console.log(this.dessert.push(dish));
    });
    return this.total;

  }*/

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
