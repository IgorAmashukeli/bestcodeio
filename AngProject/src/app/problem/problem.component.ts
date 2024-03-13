import { AfterViewInit, Component, ElementRef, Renderer2 } from '@angular/core';
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
  ],
})
export class ProblemComponent {
  course_type: string = '';
  course_id: number = -1;
  course_flag: boolean = true;

  selectedNavItem: string = 'description_page';
  parent_route: string = '';
  language_array: Array<string> = [];

  assign_fields(
    course_route: string,
    problem_id: number,
    indices: any,
    problems: Array<Array<Problem>>
  ): void {
    this.course_id = indices[course_route];
    const problem = problems[this.course_id][problem_id];
    this.language_array = problem['languages'];
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
  }

  ngOnInit() {
    this.parent_route = this.router.url.split('/').slice(0, -1).join('/');
  }

  selectNavItem(item: string) {
    this.selectedNavItem = item;
  }
}
