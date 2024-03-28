import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DialogService } from '../services/dialog.service';
import { SolutionDialogComponent } from '../solution_dialog/solution_dialog.component';
import { AuthService } from '../services/auth.service';
import {
  math_problems,
  programming_problems,
} from '../problem_list/problem_list';

import { math_indices, programming_indices } from '../app.routes';
import { Problem } from '../problem_list/problem_list';
import { NavigationBarComponent } from '../navigation_bar/navigation_bar.component';
import { DataService } from '../services/data.service';
import { Observable, of } from 'rxjs';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'problems',
  standalone: true,
  templateUrl: './problems.component.html',
  styleUrls: ['./problems.component.css'],
  imports: [CommonModule, RouterLink, RouterLinkActive, NavigationBarComponent],
})
export class ProblemsComponent implements OnInit {
  course_title: string = '';
  course_type: string = '';
  course_id: number = -1;
  course_flag: boolean = true;
  problemArray: Array<any> = [];
  loading: Observable<boolean> = of(false);
  user_statuses: Array<string> = [];

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private dialogService: DialogService,
    public authService: AuthService,
    public auth: Auth,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.course_type = this.router.url.split('/')[1];
    const course_route: string = this.router.url.split('/')[2];
    this.course_flag = this.course_type === 'math';
    this.course_title = this.route.snapshot.data['title'];
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        this.dataService
          .fetchProblemsData(this.course_type, course_route)
          .subscribe({
            next: (problem: any[]) => {
              this.dataService.fetchUserData(user.uid).subscribe({
                next: (usersInfo: any[]) => {
                  const user_problems = usersInfo[0]['problems'];
                  problem.forEach((item) => {
                    const key = item.key;
                    const status = user_problems[key]?.status; // Get status for the key
                    if (status) {
                      this.user_statuses.push(status); // Push status into user_statuses array
                    }
                  });
                },

                error: (error: any) => {
                  console.error('Error fetching problem:', error);
                },
              });

              this.problemArray = problem;
              this.loading = of(true);
            },
            error: (error: any) => {
              console.error('Error fetching problem:', error);
              this.loading = of(true);
            },
          });
      } else {
        this.dataService
          .fetchProblemsData(this.course_type, course_route)
          .subscribe({
            next: (problem: any[]) => {
              this.problemArray = problem;
              this.loading = of(true);
            },
            error: (error: any) => {
              console.error('Error fetching problem:', error);
              this.loading = of(true);
            },
          });
      }
    });
  }

  openSolutionDialog(video_id: string = 'y3svPgyGnLc') {
    this.dialogService.openDialog('1200px', '700px', SolutionDialogComponent, {
      video_id: video_id,
    });
  }
}
