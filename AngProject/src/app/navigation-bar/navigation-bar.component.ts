import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DialogService } from '../dialog/dialog.service';

@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css'],
  imports: [MatToolbar, RouterLink, RouterLinkActive],
})
export class NavigationBarComponent {
  constructor(private dialogService: DialogService) {}

  onDialogButtonClick() {
    this.dialogService.openDialog('50%', '36%');
  }
}
