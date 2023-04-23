import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {UsersManagementService} from "../../../admin-panel/services/users-management.service";
import {AuthService} from "../../../auth/services/auth/auth.service";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-edit-infos',
  templateUrl: './edit-infos.component.html',
  styleUrls: ['./edit-infos.component.css']
})
export class EditInfosComponent implements OnInit{
  @ViewChild('fileInput') fileInput!: ElementRef;
  currentUser:any;
  photoUrl!: any;
  userId = this.authService.getUserId();
  user ={
    firstname: '',
    lastname:'',
    email:'',
    photo: null
  }
  firstname: any
  lastname: any
  email: any
  photo: any
  imageToShow:any;


  constructor(private authService: AuthService,private userService:UsersManagementService, private editUserService:UserService) {
  }
  ngOnInit(): void {
    this.currentUser = this.userService.getUser(this.userId)
      .subscribe((data: any[]) => {
        this.currentUser = data;
        this.userService.getPhoto(this.currentUser.photo).subscribe(response => {
          const reader = new FileReader();
          reader.onload = () => {
            this.currentUser.photoUrl = reader.result as string;
          };
          reader.readAsDataURL(response);
          console.log(this.currentUser.id)
        });
      });
  }

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

  addChecklist(files: FileList) {
    this.photo = files
    this.createImageFromBlob(this.photo)

    // for(let i =0 ; i< this.pictures.length; i++){
    //   this.createImageFromBlob(this.pictures[i])
    // }
  }

  onPhotoChange(event:any) {
   /* const file = event.target.files[0];
    if (file) {
      this.user.photo = file;
    }*/
    //////////////////////////////////
    const reader = new FileReader();
    reader.onload = () => {
      this.photoUrl = reader.result as string;
    };
    reader.readAsDataURL(event.target.files[0]);
    /*const file = event.target.files[0];
    const fileName = file.name;
    this.fileInput.nativeElement.value = '';
    this.fileInput.nativeElement.value = fileName;*/
  }
  onSubmit() {
   /* const formData = new FormData();
    formData.append('id', this.currentUser.id);
    formData.append('firstname', this.user.firstname);
    formData.append('lastname', this.user.lastname);
    formData.append('email', this.user.email);
    if (this.user.photo) {
      formData.append('photo', this.user.photo);
    }*/
    this.email = this.user.email;
    this.firstname = this.user.firstname;
    this.lastname = this.user.lastname;
    this.photo = this.user.photo;
    this.editUserService.updateUser({
      username:this.user.email,
      firstname: this.user.firstname,
      lastname:this.user.lastname
    }, this.photo).subscribe()
  }
}
