import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DialogService } from '../services/dialog.service';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { SignInDialogComponent } from '../sign_in_dialog/sign-in-dialog.component';
import { WarningDialogComponent } from '../warning_dialog/warning_dialog.component';

@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css'],
  imports: [MatToolbar, RouterLink, RouterLinkActive, CommonModule],
})
export class NavigationBarComponent {
  constructor(private dialogService: DialogService, public auth: AuthService) {}

  openSignInDialogButtonClick() {
    this.dialogService.openDialog('50%', '36%', SignInDialogComponent);
  }

  openWarningDialogClick() {
    this.dialogService.openDialog('50%', '36%', WarningDialogComponent);
  }
}
