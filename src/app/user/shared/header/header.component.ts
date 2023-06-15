import {Component, HostListener, Input, OnInit} from '@angular/core';
import {StorageService} from "../../../auth/services/storage/storage.service";
import {Router} from "@angular/router";
import {AuthService} from "../../../auth/services/auth/auth.service";
import {UsersManagementService} from "../../../admin-panel/services/users-management.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() dark: boolean = false;
  @Input() sticky: boolean = false;
  isLoggedIn = false;
  hasNewNotifications?: boolean;
  currentUser: any;

  constructor(private storageService: StorageService, private authService: AuthService, private route: Router, private userService: UsersManagementService) {
  }

  @HostListener('window:scroll', ['$event']) onscroll() {
    if (window.scrollY > 0) {
      this.sticky = true;
    } else {
      this.sticky = false;
    }
  }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.hasNewNotifications = true;
      this.userService.getUser(this.authService.getUserId()).subscribe((data: any) => {
        this.currentUser = data;
      })
    }
  }

  logout() {
    this.storageService.clean();
    this.route.navigate(['/login']);
  }

  getUserRole(): String {
    return this.authService.getRole();
  }

  clearNotification() {
    this.hasNewNotifications = false;
  }
}
