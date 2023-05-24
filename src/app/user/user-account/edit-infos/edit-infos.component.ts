import {Component, OnInit} from '@angular/core';
import {UsersManagementService} from "../../../admin-panel/services/users-management.service";
import {AuthService} from "../../../auth/services/auth/auth.service";
import {UserService} from "../../services/user.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-edit-infos',
  templateUrl: './edit-infos.component.html',
  styleUrls: ['./edit-infos.component.css']
})
export class EditInfosComponent implements OnInit {
  file!: File[];
  fileData!: string;
  fileUpdate: File[] = [];
  fileDataUpdate!: string;
  userForm!: FormGroup;
  currentUser: any;
  imageData!: any;
  userId = this.authService.getUserId();
  preview: any;
  user: any;

  constructor(private authService: AuthService, private userService: UsersManagementService, private editUserService: UserService, private fb: FormBuilder) {
    this.userForm = this.fb.group({
      username: [''],
      firstname: [''],
      lastname: ['']
    });
  }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('username', this.userForm.get('username')?.value)
    formData.append('firstname', this.userForm.get('firstname')?.value)
    formData.append('lastname', this.userForm.get('lastname')?.value)
    if (this.file && this.file.length > 0) {
      formData.append('file', this.file[0], this.file[0].name);
    }
    console.log(this.currentUser.image)
    console.log(formData.get('username'))
    console.log(formData.get('firstname'))
    console.log(formData.get('lastname'))
    console.log(formData.get('file'))
    this.editUserService.updateUser(this.currentUser.id, formData)
      .subscribe(updatedUser => {
        console.log('User updated:', updatedUser);
        this.getCurrentUser();
      });
  }

  onFileSelected(event: any) {
    this.file = event.target.files;
    const reader = new FileReader();
    if (this.file && this.file.length > 0) {
      const fileType = this.file[0].type;
      if (fileType && fileType.match('image.*')) {
        reader.onload = (e: any) => {
          this.preview = e.target.result;
        };
        reader.readAsDataURL(this.file[0]);
        console.log(this.file[0].name);
      }
      reader.onload = () => {
        this.fileData = reader.result as string;
      };
    }
  }

  getCurrentUser() {
    this.currentUser = this.userService.getUser(this.userId)
      .subscribe((data: any[]) => {
        this.currentUser = data;

        if (this.currentUser.image && this.currentUser.image.data) {
          this.currentUser.imageData = 'data:image/jpeg;base64,' + this.arrayBufferToBase64(this.currentUser.photo.data);
        }
        const userData = {
          firstname: this.currentUser.firstname,
          lastname: this.currentUser.lastname,
          username: this.currentUser.username
        }
        this.userForm.setValue(userData);
      });

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
