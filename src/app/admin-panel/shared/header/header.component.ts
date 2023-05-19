import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {StorageService} from "../../../auth/services/storage/storage.service";
import {AuthService} from "../../../auth/services/auth/auth.service";

@Component({
  selector: 'app-headerAdmin',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  userName : any;
  @Output() toggleSidebarEvent = new EventEmitter<void>();

  toggleSidebar() {
    this.toggleSidebarEvent.emit();
  }

  ngOnInit(): void {
  if(this.storageService.isLoggedIn()){
    this.userName = this.authService.getUsername();
  }
  }
  constructor(private authService:AuthService, private storageService: StorageService) {}
}
