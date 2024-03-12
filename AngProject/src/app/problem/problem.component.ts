import { AfterViewInit, Component, ElementRef, Renderer2 } from '@angular/core';
import { AngularSplitModule } from 'angular-split';
import { DescriptionComponent } from '../description/description.component';
import { EditorComponent } from '../editor/editor.component';

@Component({
  selector: 'app-problem',
  standalone: true,
  templateUrl: './problem.component.html',
  styleUrl: './problem.component.css',
  imports: [AngularSplitModule, DescriptionComponent, EditorComponent],
})
export class ProblemComponent {
  constructor() {}

  ngAfterViewInit() {}
}
