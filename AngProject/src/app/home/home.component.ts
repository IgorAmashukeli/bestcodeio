import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogService } from '../services/dialog.service';
import { Location } from '@angular/common';
import { WarningDialogComponent } from '../warning_dialog/warning_dialog.component';
import { NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  currentRoute: string = '';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.currentRoute = this.router.url;
    if (this.currentRoute === '/true') {
      this.dialogService.openDialog('50%', '36%', WarningDialogComponent);
      this.router.navigate(['/']);
    }
  }
}
