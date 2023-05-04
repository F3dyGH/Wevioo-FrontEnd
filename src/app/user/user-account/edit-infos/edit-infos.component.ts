import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {UsersManagementService} from "../../../admin-panel/services/users-management.service";
import {AuthService} from "../../../auth/services/auth/auth.service";
import {UserService} from "../../services/user.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-infos',
  templateUrl: './edit-infos.component.html',
  styleUrls: ['./edit-infos.component.css']
})
export class EditInfosComponent implements OnInit {
//  @ViewChild('fileInput') fileInput!: ElementRef;
  file!: File[];
  fileData!: string;
  fileUpdate: File[] = [];
  fileDataUpdate!: string;
  userForm!: FormGroup;
  currentUser: any;
  imageData!: any;
  userId = this.authService.getUserId();
  preview : any;


  constructor(private authService: AuthService, private userService: UsersManagementService, private editUserService: UserService, private fb: FormBuilder) {
    this.userForm = this.fb.group({
      username: [''],
      firstname: [''],
      lastname: ['']
    });
  }

  ngOnInit(): void {
    this.getCurrentUser();
    /* */
  }

  /*
    createImageFromBlob(image: Blob) {
      const upload = async (event: any) => {
        const files = [...event.target.files].map(file => {
          const reader = new FileReader();
          return new Promise(resolve => {
            reader.onload = () => resolve(reader.result);
            this.imageToShow = () => resolve(reader.result);
            reader.readAsText(file);
          });
        });
        const res = await Promise.all(files);
        console.log(res)
      }

      const input = document.querySelector('input');
      input!.addEventListener('change', upload);
    }
  */

  /*
    addChecklist(files: FileList) {
      this.photo = files
      this.createImageFromBlob(this.photo)

      // for(let i =0 ; i< this.pictures.length; i++){
      //   this.createImageFromBlob(this.pictures[i])
      // }
    }
  */

  /*
    onPhotoChange(event: any) {
      /!* const file = event.target.files[0];
       if (file) {
         this.user.photo = file;
       }*!/
      //////////////////////////////////
      const reader = new FileReader();
      reader.onload = () => {
        this.photoUrl = reader.result as string;
      };
      reader.readAsDataURL(event.target.files[0]);
      /!*const file = event.target.files[0];
      const fileName = file.name;
      this.fileInput.nativeElement.value = '';
      this.fileInput.nativeElement.value = fileName;*!/
    }
  */

  /* onSubmit() {
    * const formData = new FormData();
      formData.append('id', this.currentUser.id);
      formData.append('firstname', this.user.firstname);
      formData.append('lastname', this.user.lastname);
      formData.append('email', this.user.email);
      if (this.user.photo) {
        formData.append('photo', this.user.photo);
      }*/

  /*this.email = this.user.email;
  this.firstname = this.user.firstname;
  this.lastname = this.user.lastname;
  this.photo = this.user.photo;
  this.editUserService.updateUser({
    username: this.user.email,
    firstname: this.user.firstname,
    lastname: this.user.lastname
  }, this.photo).subscribe()
}*/
  onSubmit() {/*
    const updatedUser = {
      ...this.currentUser,
      ...this.userForm.value
    };*/
    const formData = new FormData();
    //formData.append('user', JSON.stringify(this.userForm.value));
    formData.append('username', this.userForm.get('username')?.value)
    formData.append('firstname', this.userForm.get('firstname')?.value)
    formData.append('lastname', this.userForm.get('lastname')?.value)
    if (this.file.length > 0) {
      formData.append('file', this.file[0], this.file[0].name);
    } else {
      formData.append('file', this.currentUser.image);
    }
    console.log(this.currentUser)
//console.log(formData.get('user'))
    console.log(formData.get('username'))
    console.log(formData.get('firstname'))
    console.log(formData.get('lastname'))
    console.log(formData.get('file'))
    this.editUserService.updateUser(this.currentUser.id, formData)
      .subscribe(updatedUser => {
        console.log('User updated:', updatedUser);
        //formData.get('file') == this.currentUser.image;
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
        /* this.userService.getPhoto(this.currentUser.photo).subscribe(response => {
           const reader = new FileReader();
           reader.onload = () => {
             this.currentUser.photoUrl = reader.result as string;
           };
           reader.readAsDataURL(response);

         });*/
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
    return btoa(binary);
  }
}
