import {Component, HostListener, Input, OnInit} from '@angular/core';
import {StorageService} from "../../../auth/services/storage/storage.service";
import {Router} from "@angular/router";
import {AuthService} from "../../../auth/services/auth/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() dark: boolean = false;
  @Input() sticky: boolean = false;
  isLoggedIn = false;
  constructor(private storageService: StorageService, private authService:AuthService, private route:Router) {}

  @HostListener('window:scroll', ['$event']) onscroll() {
    if (window.scrollY > 0) {
      this.sticky = true;
    } else {
      this.sticky = false;
    }
  }

  ngOnInit(): void {
    if(this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
    }
  }
  logout(){
    this.storageService.clean();
    this.route.navigate(['/login']);
  }
  getUserRole(): String{
    return this.authService.getRole();
  }
}
