import { Component } from '@angular/core';
import { AngularSplitModule } from 'angular-split';

@Component({
  selector: 'right-workspace',
  standalone: true,
  imports: [AngularSplitModule],
  templateUrl: './right-workspace.component.html',
  styleUrl: './right-workspace.component.css',
})
export class RightWorkSpaceComponent {}
