import {Component, OnInit} from '@angular/core';
import {StorageService} from "../../../auth/services/storage/storage.service";
import {AuthService} from "../../../auth/services/auth/auth.service";

@Component({
  selector: 'app-headerAdmin',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  isSidebarVisible = false;
  userName : any;

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  ngOnInit(): void {
  if(this.storageService.isLoggedIn()){
    this.userName = this.authService.getUsername();
  }
  }
  constructor(private authService:AuthService, private storageService: StorageService) {}
}
