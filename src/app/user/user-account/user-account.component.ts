import {Component, ContentChild, ElementRef, OnInit} from '@angular/core';
/*import {StorageService} from "../../services/storage/storage.service";
import {UserService} from "../../services/user/user.service";*/

@Component({
  selector: 'app-userAccount',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit{
  currentUser: any;
  @ContentChild('content', { static: true })
  content!: ElementRef;
  constructor(/*private storageService: StorageService, private userService: UserService*/) {
  }
  ngOnInit(): void {

  }
  /*logout(): void {
    this.storageService.clean();
  }*/
}
