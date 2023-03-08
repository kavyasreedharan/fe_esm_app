import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'esm-web-app';

  selectedItem = '';

  listItems = [
    { linkTitle: 'Dashboard', link: '/dashboard', icon: 'dashboard' },
    { linkTitle: 'User Data Upload', link: '/usersDataUpload', icon: 'upload' },
  ];

  handleClick(selectedItem: any) {
    this.selectedItem = selectedItem.linkTitle;
  }

  showFiller = false;

  events: string[] = [];
  opened: boolean = false;
}
