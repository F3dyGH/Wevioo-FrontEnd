import {Component, HostListener, Input, OnInit} from '@angular/core';
import {StorageService} from "../../../auth/services/storage/storage.service";
import {Router} from "@angular/router";
import {AuthService} from "../../../auth/services/auth/auth.service";
import {UsersManagementService} from "../../../admin-panel/services/users-management.service";
import {NotificationsService} from "../../services/notifications/notifications.service";

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
  notifications: any[] = [];


  constructor(private storageService: StorageService, private authService: AuthService, private route: Router, private userService: UsersManagementService, private notificationService: NotificationsService) {
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
      this.hasNewNotifications = false
      this.userService.getUser(this.authService.getUserId()).subscribe((data: any) => {
        this.currentUser = data;
      })
    }
    this.notificationService.startPolling().subscribe(
      newNotifications => {
        this.notifications = newNotifications;
        console.log(this.notifications)
        const hasUnseenNotification = newNotifications.some((notification: any) => notification.seen === false);
        if (hasUnseenNotification) {
          this.hasNewNotifications = true;
        }
      }
    );
  }

  logout() {
    this.storageService.clean();
    this.route.navigate(['/login']);
  }

  getUserRole(): String {
    return this.authService.getRole();
  }

  clearNotification(id:any) {
    this.notificationService.setNotificationsToSeen(id).subscribe(newNotifications => {
      this.notifications = newNotifications;
      this.hasNewNotifications = false;
    })
  }
}
