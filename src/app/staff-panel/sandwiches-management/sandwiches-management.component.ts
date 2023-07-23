import {Component, OnInit} from '@angular/core';
import {Food_by_categoriesService} from "../services/sandwiches/food_by_categories.service";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-sandwiches-management',
  templateUrl: './sandwiches-management.component.html',
  styleUrls: ['./sandwiches-management.component.css']
})
export class SandwichesManagementComponent implements OnInit {

  category: any;
  sandwiches: any[] = []
  SandwichForm!: FormGroup;
  SandwichFormUpdate!: FormGroup;
  file: File[] = [];
  fileData!: string;
  fileUpdate: File[] = [];
  fileDataUpdate!: string;
  errorMessage?: string;
  selectedSandwich: any;
  p: number = 1;
  search: any;

  constructor(private route: ActivatedRoute, private sandwichService: Food_by_categoriesService, private formBuilder: FormBuilder) {
    this.SandwichForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      categories: ['', Validators.required],
      photo: ['', Validators.required]
    });
    this.SandwichFormUpdate = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      categories: ['', Validators.required],
      photo: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.category = params['category'];
      this.getByCategory(this.category);
    });

    this.applySearchFilter(this.category)
  }

  getByCategory(category: any) {
    this.sandwichService.getByCategory(category).subscribe((data: any) => {
      this.sandwiches = data;
    })
  }

  onSubmit() {
    const formData = new FormData();

    formData.append('name', this.SandwichForm.value.name);
    formData.append('price', this.SandwichForm.value.price);
    formData.append('description', this.SandwichForm.value.description);
    formData.append('categories', this.category);
    if (this.file.length > 0) {
      formData.append('photo', this.file[0], this.file[0].name);
    }
    console.log(this.SandwichForm.value);
    this.sandwichService.add(formData).subscribe(res => {
        this.SandwichForm.reset();
        this.sandwichService.getByCategory(this.category).subscribe((data: any[]) => {
          this.sandwiches = data;
        });
      },
      (error) => {
        if (error.status = 409) {
          this.errorMessage = "Sandwich already exists"
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

  editSandwich(sandwich: any) {
    this.selectedSandwich = sandwich;
    const sandwichData = {
      name: sandwich.name,
      price: sandwich.price,
      description: sandwich.description,
      photo: sandwich.image,
      categories: sandwich.categories
    }
    this.SandwichFormUpdate.setValue(sandwichData)
    console.log(this.selectedSandwich.id);
  }

  Update() {
    const formData = new FormData();
    formData.append('name', this.SandwichFormUpdate.get('name')!.value);
    formData.append('price', this.SandwichFormUpdate.get('price')!.value);
    formData.append('description', this.SandwichFormUpdate.get('description')!.value);
    formData.append('categories', this.category);
    if (this.fileUpdate.length > 0) {
      formData.append('photo', this.fileUpdate[0], this.fileUpdate[0].name);
    } else {
      formData.append('photo', this.selectedSandwich.photo);
    }
    console.log(formData.get('photo'))
    console.log(this.selectedSandwich.id);
    this.sandwichService.update(this.selectedSandwich.id, formData).subscribe(res => {
      this.SandwichFormUpdate.reset();
      this.fileUpdate = [];
      console.log(formData)
      this.sandwichService.getByCategory(this.category).subscribe((data: any[]) => {
        this.sandwiches = data;
      });
      this.selectedSandwich = null;
    });
  }

  Delete(id: any) {
    this.sandwichService.delete(id).subscribe(res => {
      this.sandwichService.getByCategory(this.category).subscribe((data: any[]) => {
        this.sandwiches = data;
      });
    });
  }

  clearAddForm() {
    this.SandwichForm.reset();
  }

  public applySearchFilter(category: string) {
    if (this.search && this.search.trim() !== '') {
      this.sandwiches = this.sandwiches.filter(s =>
        s.name.toLowerCase().includes(this.search.toLowerCase())
      );
    } else {
      this.getByCategory(category)
    }
  }

}
