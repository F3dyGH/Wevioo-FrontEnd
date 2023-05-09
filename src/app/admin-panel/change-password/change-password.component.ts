import {Component, OnInit} from '@angular/core';
import {UserService} from "../../user/services/user.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {StorageService} from "../../auth/services/storage/storage.service";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit{

  ChangePwdForm: FormGroup;
  currentUser?:any;
  successMsg!:string;
  unmatchedMsg!: string;
  errorMsg!:string;

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser().id;
    console.log(this.currentUser);
  }

  constructor(private userService:UserService, private formBuilder:FormBuilder, private storageService:StorageService ) {
    this.ChangePwdForm = this.formBuilder.group({
      newPwd: ['', Validators.required],
      confirmPwd: ['', Validators.required]
    })
  }

  onSubmit() {
    console.log(this.ChangePwdForm.value)
    console.log(this.ChangePwdForm?.get('newPwd')?.value , this.ChangePwdForm?.get('confirmPwd')?.value)

    if (this.ChangePwdForm?.get('newPwd')?.value === this.ChangePwdForm?.get('confirmPwd')?.value) {
      this.userService.updatePassword(this.currentUser, this.ChangePwdForm?.get('confirmPwd')?.value).subscribe(
        success => {
          console.log(this.ChangePwdForm.value)
          this.successMsg = "Password has been changed successfully";
          this.unmatchedMsg = '';
          this.ChangePwdForm.reset();
        },
        error =>{
          console.log(this.ChangePwdForm.value)

          this.errorMsg = "Something went wrong, try again later"
        }
      )
    }else {
      this.unmatchedMsg = "Passwords don't match"
    }
  }
}
