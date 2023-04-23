import {Component, ContentChild, ElementRef, Input} from '@angular/core';
import {StorageService} from "../../../auth/services/storage/storage.service";
import {Router} from "@angular/router";
import {AuthService} from "../../../auth/services/auth/auth.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @ContentChild('content', { static: true })
  content!: ElementRef;
  @ContentChild('title', { static: true })
  title!: ElementRef;
  @Input() isSidebarVisible!: boolean;
  role: any;
  ngOnInit(): void {
    if(this.storageService.isLoggedIn()){
      this.role = this.authService.getRole();
    }
  }

  constructor(private storageService: StorageService, private authService: AuthService, private route:Router) {}

  logout(){
    this.storageService.clean();
    this.route.navigate(['/login']);
  }
}
