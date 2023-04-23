import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {FileUploader} from "ng2-file-upload";
import {DishesManagementService} from "../services/dishes/dishes-management.service";
import {HttpClient} from "@angular/common/http";
import {DessertsService} from "../services/desserts/desserts.service";

@Component({
  selector: 'app-dessert-management',
  templateUrl: './dessert-management.component.html',
  styleUrls: ['./dessert-management.component.css']
})
export class DessertManagementComponent implements OnInit {
  // uploader!: FileUploader;
  dessertForm!: FormGroup;
  fileToUpload!: File;
  DessertForm: any = {
    name: null,
    price: null,
    description: null,
    photo: null
  };

  desserts!: any[];
  dessert!: any;
  selectedDessert!: any;
  photoUrl!: any;
  selectedFile!: any;
  selectedFileName: any;
  file!: File | null;
  uploader: FileUploader = new FileUploader({url: "http://localhost:8082/api/staff/dish/add", itemAlias: 'photo'});

  ngOnInit(): void {
    this.AllDishes();
  }

  constructor(private dessertService: DessertsService, private http: HttpClient) {
    this.dessertForm = new FormGroup({
      name: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      file: new FormControl('')
    });
  }

  onSubmit() {
    const form = new FormData();
    form.append('name', this.DessertForm.name);
    form.append('price', this.DessertForm.price);
    form.append('description', this.DessertForm.description);
    form.append('photo', this.selectedFile);
    console.log(form.get('name'));
    this.dessertService.addd(form.get('name'), form.get('price'), form.get('description'), form.get('photo')).subscribe((data) => {
      this.dessert = data;
    });
  }


  /*onFileSelected(event: any) {
console.log(event);
      this.uploader.clearQueue();
      this.uploader.addToQueue(Array.from(event));

  }
*/
  editDessert(dessert: any) {
    this.selectedDessert = dessert;
    //this.DishForm = dish
    this.DessertForm = {};
    console.log(this.selectedDessert.id);

  }

  /*
    onSubmit() {
      // create a new Dish object using the form values
      const newDish: any = {
        name: this.dishForm.get('name')?.value,
        price: this.dishForm.get('price')?.value,
        description: this.dishForm.get('description')?.value,
        photo: null // set the photo to null for now
      };

      // create a FormData object and append the file to it
      const formData = new FormData();
      const photoo = formData.append('file', this.selectedFile);
      newDish.photo = photoo;
      // call the addDishWithPhoto() method from the dessertService
      this.dessertService.addDishWithPhoto(newDish, newDish.photo).subscribe(
        (dish: any) => {
          console.log('Dish added successfully: ', dish);
          // reset the form and selected file
          this.dishForm.reset();
          this.selectedFile = null;
          // show a success message to the user
         // this.toastr.success('Dish added successfully!');
        },
        (error) => {
          console.error('Error adding dish: ', error);
          // show an error message to the user
          //this.toastr.error('Error adding dish. Please try again.');
        }
      );
    }
  */

  /* submitForm(form: NgForm) {
     const formData = new FormData();
    /!* formData.append('name', this.DishForm.name);
     formData.append('description', this.DishForm.description);
     formData.append('price', this.DishForm.price);*!/
     formData.append('photo', this.file);
     // Add other form fields to the formData object

     this.dessertService.uploadPhoto(555,formData).subscribe(
       response => console.log(response),
       error => console.log(error)
     );
   }*/
  createDessert() {

    const formData = new FormData();
    formData.append('name', this.DessertForm.name.toString());
    formData.append('price', this.DessertForm.price);
    formData.append('description', this.DessertForm.description.toString());
    formData.append('photo', this.selectedFile);
    /* const dish = this.DishForm.value;*/
    console.log(formData.get('photo'));
    const photo = this.selectedFile;
    this.dessertService.addd(formData.get('name'), formData.get('price'), formData.get('description'), formData.get('photo')).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
  }

  Update() {
    const {name, price, description, photo} = this.DessertForm;
    console.log(this.selectedDessert.id);
    this.dessertService.updateDessert(this.selectedDessert.id, name, price, description, photo).subscribe(res => {
      this.dessertService.getAllDesserts().subscribe((data: any[]) => {
        this.desserts = data;
      });
      this.selectedDessert = null;
    });
  }

  /* Add() {
     const {name, price, photo, description} = this.DishForm;
     this.dessertService.addDish(name, price, photo, description).subscribe(res => {
       this.dessertService.getAllDishes().subscribe((data: any[]) => {
         this.dishes = data;
       });
     });
   }*/

  Delete(id: any) {
    this.dessertService.deleteDessert(id).subscribe(res => {
      this.AllDishes();
    });
  }
  AllDishes(){
    this.dessertService.getAllDesserts()
      .subscribe((data: any[]) => {
        this.desserts = data;
        this.photoUrl = [];
        this.desserts.forEach(dessert => {
          this.dessertService.getPhoto(dessert.photo).subscribe(response => {
            const reader = new FileReader();
            reader.onload = () => {
              dessert.photoUrl = reader.result as string;
              this.photoUrl.push(reader.result as string);
            };
            reader.readAsDataURL(response);
          });
        });
      });
  }
  /* onFileSelected(event:any) {
     this.fileToUpload = <File>event.target.files[0];
   }*/
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    // this.selectedFileName = this.selectedFile.name;
    console.log(this.selectedFile);
    console.log(event);
  }
  /*onFileSelected(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      // Set the value of the file input element to the file name
      const dish = this.DishForm.get('photo').setValue(file.name);
      console.log(dish);
    };
    reader.readAsDataURL(file);
  }*/

  /* onFileSelected(event: any): void {
     if (event && event.target) {
       const file = event.target.files[0];
       this.selectedFile = file;
       console.log(this.selectedFile);
     }
   }*/

  onFileChange(event: any) {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    this.dessertService.uploadPhoto(this.selectedDessert.id, formData)
      .subscribe(response => {
        console.log(response);
        // handle success
      }, error => {
        console.error(error);
        // handle error
      });
  }

  /*uploadPhoto(fileInput: HTMLInputElement) {
    const files = fileInput.files;
    if (!files || !files.length) {
      console.log('No file selected');
      return;
    }
    const file = files[0];
    this.dessertService.uploadPhoto(this.selectedDish.id, file).subscribe(res => {
        console.log(this.selectedFileName);
      },
      error => {
        console.log(error);
      })
  }*/
  uploadPhoto() {

  }

  /*
    onSubmit() {
      const formData = new FormData();
      formData.append('dish', JSON.stringify(this.DishForm));

      formData.append('file', this.fileToUpload.name);

      this.dessertService.addDish(formData).subscribe(
        response => console.log(response),
        error => console.log(error)
      );
    }
  */

  onFileDropped(event: any) {
    this.fileToUpload = event[0];
  }

}
