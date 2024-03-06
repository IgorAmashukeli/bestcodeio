import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';

@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css'],
  imports: [MatToolbar],
})
export class NavigationBarComponent {}
