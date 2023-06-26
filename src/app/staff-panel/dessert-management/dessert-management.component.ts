import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DessertsService} from "../services/desserts/desserts.service";

@Component({
  selector: 'app-dessert-management',
  templateUrl: './dessert-management.component.html',
  styleUrls: ['./dessert-management.component.css']
})
export class DessertManagementComponent implements OnInit {

  file: File[] = [];
  fileData!: string;
  fileUpdate: File[] = [];
  fileDataUpdate!: string;
  dessertForm!: FormGroup;
  dessertFormUpdate!: FormGroup;
  desserts!: any[];
  dessert!: any;
  selectedDessert!: any;
  imageData!: string;

  ngOnInit(): void {
    this.AllDesserts();
  }

  constructor(private dessertService: DessertsService, private formBuilder: FormBuilder) {
    this.dessertForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      photo: ['', Validators.required]
    });
    this.dessertFormUpdate = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      photo: ['', Validators.required]
    });
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

  onSubmit() {
    const formData = new FormData();
    formData.append('name', this.dessertForm.get('name')!.value);
    formData.append('price', this.dessertForm.get('price')!.value);
    formData.append('description', this.dessertForm.get('description')!.value);
    if (this.file.length > 0) {
      formData.append('photo', this.file[0], this.file[0].name);
    }
    console.log(this.dessertForm.value)
    this.dessertService.addDessert(formData).subscribe(res => {
        this.dessertForm.reset();
        this.file = [];
        this.fileData = '';
        this.dessertService.getAllDesserts().subscribe((data: any[]) => {
          this.desserts = data;
        });

      },
      (error) => console.log(error))
  }

  editDessert(dessert: any) {
    this.selectedDessert = dessert;
    const dessertData = {
      name: dessert.name,
      price: dessert.price,
      description: dessert.description,
      photo: dessert.image
    }
    this.dessertFormUpdate.setValue(dessertData)
    console.log(this.selectedDessert.id);
  }
  Update() {
    const formData = new FormData();
    formData.append('name', this.dessertFormUpdate.get('name')!.value);
    formData.append('price', this.dessertFormUpdate.get('price')!.value);
    formData.append('description', this.dessertFormUpdate.get('description')!.value);
    if (this.fileUpdate.length > 0) {
      formData.append('photo', this.fileUpdate[0], this.fileUpdate[0].name);
    }else {
      formData.append('photo', this.selectedDessert.photo);
    }
    console.log(formData.get('photo'))
    console.log(this.selectedDessert.id);
    this.dessertService.updateDessert(this.selectedDessert.id, formData).subscribe(res => {
      this.dessertFormUpdate.reset();
      this.fileUpdate = [];
      console.log(formData)
      this.dessertService.getAllDesserts().subscribe((data: any[]) => {
        this.desserts = data;
      });
      this.selectedDessert = null;
    });
  }

  Delete(id: any) {
    this.dessertService.deleteDessert(id).subscribe(res => {
      this.AllDesserts();
    });
  }

  AllDesserts() {
    this.dessertService.getAllDesserts().subscribe((response: any) => {
      this.desserts = response;
      this.desserts.forEach((dessert: any) => {
        if (dessert.image && dessert.image.data) {

          dessert.imageData = 'data:image/jpeg;base64,' + this.arrayBufferToBase64(dessert.photo.data);
        }
      });
    })
  }

  arrayBufferToBase64(buffer: ArrayBuffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return binary;
  }

}
