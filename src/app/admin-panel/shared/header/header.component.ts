import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {StorageService} from "../../../auth/services/storage/storage.service";
import {AuthService} from "../../../auth/services/auth/auth.service";
import {NotificationsService} from "../../../user/services/notifications/notifications.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-headerAdmin',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  userName : any;
  notifications: any[] = [];
  hasNewNotifications: boolean = false;
  currentUserId: any;

  @Output() toggleSidebarEvent = new EventEmitter<void>();

  toggleSidebar() {
    this.toggleSidebarEvent.emit();
  }

  ngOnInit(): void {
  if(this.storageService.isLoggedIn()){
    this.userName = this.authService.getUsername();
    this.currentUserId = this.authService.getUserId();
    this.hasNewNotifications = false
  }
    this.notificationService.startPolling().subscribe(
      newNotifications => {
        this.notifications = newNotifications;
        const hasUnseenNotification = newNotifications.some((notification: any) => notification.seen === false);
        if (hasUnseenNotification) {
          this.hasNewNotifications = hasUnseenNotification;
        }
      }
    );
  }
  constructor(private authService:AuthService, private route: Router, private storageService: StorageService, private notificationService: NotificationsService) {}
  getUserRole(): String {
    return this.authService.getRole();
  }
  clearNotification(id:any) {
    this.notificationService.setNotificationsToSeen(id).subscribe(newNotifications => {
      this.notifications = newNotifications;
      this.hasNewNotifications = false;
    })
  }

  logout() {
    this.storageService.clean();
    this.route.navigate(['/login']);
  }
}
