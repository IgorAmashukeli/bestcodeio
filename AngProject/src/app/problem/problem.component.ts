import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { AngularSplitModule } from 'angular-split';
import { LeftWorkspaceComponent } from '../left-workspace/left-workspace.component';
import { RightWorkSpaceComponent } from '../right-workspace/right-workspace.component';
import { NavigationBarComponent } from '../navigation_bar/navigation_bar.component';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DescriptionComponent } from '../description/description.component';
import { SubmissionsComponent } from '../submissions/submissions.component';
import { Router } from '@angular/router';
import { math_indices } from '../app.routes';
import { programming_indices } from '../app.routes';
import {
  math_problems,
  programming_problems,
} from '../problem_list/problem_list';
import { Problem } from '../problem_list/problem_list';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-problem',
  standalone: true,
  templateUrl: './problem.component.html',
  styleUrl: './problem.component.css',
  imports: [
    AngularSplitModule,
    LeftWorkspaceComponent,
    RightWorkSpaceComponent,
    NavigationBarComponent,
    MatToolbar,
    RouterLink,
    RouterLinkActive,
    CommonModule,
    DescriptionComponent,
    SubmissionsComponent,
    FormsModule,
  ],
})
export class ProblemComponent {
  @ViewChild('navigationBar', { static: true }) navigationBar!: ElementRef;
  @ViewChild('toolbar', { static: true }) toolbar!: ElementRef;

  course_type: string = '';
  course_id: number = -1;
  course_flag: boolean = true;

  selectedNavItem: string = 'description_page';
  parent_route: string = '';
  language_array: Array<Array<string>> = [];
  selectedLanguage: string = 'cpp';
  initial_codes: any = {};
  initial_language: string = '';
  example_array: Array<string> = [];
  window_object: any;
  splitHeight: string = '0px';

  assign_fields(
    course_route: string,
    problem_id: number,
    indices: any,
    problems: Array<Array<Problem>>
  ): void {
    this.course_id = indices[course_route];
    const problem = problems[this.course_id][problem_id];
    this.language_array = problem['languages'];
    this.initial_codes = problem['initial_codes'];
    this.initial_language = problem['initial_language'];
    this.example_array = problem['examples'];
  }

  constructor(private router: Router) {
    this.selectedNavItem = 'description_page';
    const splited: any = this.router.url.split('/');
    this.course_type = splited[1];
    this.course_flag = this.course_type === 'math';
    const course_route: string = splited[2];
    const problem_id: number = parseInt(splited[3]);
    if (this.course_flag) {
      this.assign_fields(course_route, problem_id, math_indices, math_problems);
    } else {
      this.assign_fields(
        course_route,
        problem_id,
        programming_indices,
        programming_problems
      );
    }
    if (typeof window !== 'undefined') {
      this.window_object = window;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    // Recalculate the height here
    // You can use this code to adjust the height dynamically:
    const navigationBarHeight = this.navigationBar.nativeElement.offsetHeight;
    const toolbarHeight = this.toolbar.nativeElement.offsetHeight;
    if (typeof window !== 'undefined') {
      this.splitHeight =
        window.innerHeight - 20 - (navigationBarHeight + toolbarHeight) + 'px';
    }
  }

  ngOnInit() {
    this.parent_route = this.router.url.split('/').slice(0, -1).join('/');

    // Initialize splitHeight property
    const navigationBarHeight = this.navigationBar.nativeElement.offsetHeight;
    const toolbarHeight = this.toolbar.nativeElement.offsetHeight;
    if (typeof window !== 'undefined') {
      this.splitHeight =
        window.innerHeight - 20 - (navigationBarHeight + toolbarHeight) + 'px';
    }
  }

  selectNavItem(item: string) {
    this.selectedNavItem = item;
  }
}
