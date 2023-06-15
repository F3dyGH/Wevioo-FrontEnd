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
  menuFormUpdate!: FormGroup;
  file: File[] = [];
  fileData!: string;
  fileUpdate: File[] = [];
  fileDataUpdate!: string;
  imageData!: string;
  p: number = 1;
  isSidebarVisible = false;
  errorMessage?:string;

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }
  constructor(private menuService: MenuService, private dessertService: DessertsService, private formBuilder: FormBuilder) {
    this.MenuForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      dessert: ['', Validators.required],
      date: ['', Validators.required],
      photo: ['', Validators.required]
    });
    this.menuFormUpdate = this.formBuilder.group({
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
    /*  this.menus.forEach((menu: any) => {
        if (menu.image && menu.image.data) {
          menu.imageData = 'data:image/jpeg;base64,' + this.arrayBufferToBase64(menu.photo.data);
        }
      });*/
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
        this.menuService.getAllMenus().subscribe((data: any[]) => {
          this.menus = data;
        });
      },
      (error) => {
      if(error.status = 409){
        this.errorMessage = "Menu already exists, change the name to add a new one"
      }
      })
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

  onFileUpdate(event: any) {
    this.fileUpdate = event.target.files;
    const reader = new FileReader();
    if (this.fileUpdate && this.fileUpdate.length > 0) {
      const fileType = this.fileUpdate[0].type;
      if (fileType && fileType.match('image.*')) {
        reader.readAsDataURL(this.fileUpdate[0]);
        console.log(this.fileUpdate[0].name);
      }
      reader.onload = () => {
        this.fileDataUpdate = reader.result as string;
      };
    }
  }

  editMenu(menu: any) {
    this.selectedMenu = menu;
    const menuData = {
      name: menu.name,
      price: menu.price,
      dessert: menu.dessert.id,
      date: menu.date,
      photo: menu.image
    }
    this.menuFormUpdate.setValue(menuData)
    console.log(this.selectedMenu.id);
    console.log(menuData);
  }

  Update() {
    const formData = new FormData();

    formData.append('name', this.menuFormUpdate.value.name);
    formData.append('price', this.menuFormUpdate.value.price);
    formData.append('dessert', this.menuFormUpdate.value.dessert);
    formData.append('date', this.menuFormUpdate.value.date);
    if (this.fileUpdate.length > 0) {
      formData.append('photo', this.fileUpdate[0], this.fileUpdate[0].name);
    }
    console.log(formData.get('photo'))
    console.log(this.selectedMenu.id);
    this.menuService.updateMenu(this.selectedMenu.id, formData).subscribe(res => {
      this.menuFormUpdate.reset();
      this.fileUpdate = [];
      console.log(formData)
      this.menuService.getAllMenus().subscribe((data: any[]) => {
        this.menus = data;
      });
      this.selectedMenu = null;
    });
  }

  delete(menu:any){
    this.selectedMenu = menu
    this.menuService.deleteMenu(this.selectedMenu.id).subscribe(res =>{
      this.menuService.getAllMenus().subscribe((data:any)=>{
        this.menus = data;
      });
      }
    )
  }

  clearUpdateForm(){
    this.menuFormUpdate.reset();
  }

}
