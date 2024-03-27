import {
  AfterContentChecked,
  AfterContentInit,
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
import { AuthService } from '../services/auth.service';
import { DialogService } from '../services/dialog.service';
import { WarningDialogComponent } from '../warning_dialog/warning_dialog.component';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from '../services/data.service';

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
    HttpClientModule,
  ],
})
export class ProblemComponent implements AfterContentChecked {
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

  assign_fields(problem: any): void {
    this.language_array = problem['languages'];
    this.initial_codes = problem['initial_codes'];
    this.initial_language = problem['initial_language'];
    this.selectedLanguage = this.initial_language;
    this.example_array = problem['examples'];
  }

  constructor(
    private router: Router,
    private http: HttpClient,
    public authService: AuthService,
    public dialogService: DialogService,
    public dataService: DataService
  ) {}

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    const navigationBarHeight = this.navigationBar.nativeElement.offsetHeight;
    const toolbarHeight = this.toolbar.nativeElement.offsetHeight;
    if (typeof window !== 'undefined') {
      this.splitHeight =
        window.innerHeight - 20 - (navigationBarHeight + toolbarHeight) + 'px';
    }
  }

  ngOnInit() {
    this.selectedNavItem = 'description_page';
    this.parent_route = this.router.url.split('/').slice(0, -1).join('/');
    const splited: any = this.router.url.split('/');
    const course = splited[1];
    this.course_flag = course == 'math';
    const topic = splited[2];
    const problemId = +splited[3];
    this.dataService.fetchProblemData(course, topic, problemId).subscribe({
      next: (problem: any[]) => {
        this.assign_fields(problem[0]);
        if (typeof window !== 'undefined') {
          this.window_object = window;
        }
      },
      error: (error: any) => {
        console.error('Error fetching problem:', error);
      },
    });
  }

  ngAfterContentChecked() {
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

  submitNotSignedIn() {
    this.dialogService.openDialog('80%', '75%', WarningDialogComponent);
  }
}
