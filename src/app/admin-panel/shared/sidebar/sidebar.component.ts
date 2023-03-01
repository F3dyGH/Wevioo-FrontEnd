import {Component, ContentChild, ElementRef} from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @ContentChild('contentPlaceholder', { static: true })
  contentPlaceholder!: ElementRef;
}
