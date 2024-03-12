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
  math_indices,
  programming_indices,
} from '../app.routes';

@Component({
  selector: 'problems',
  standalone: true,
  templateUrl: './problems.component.html',
  styleUrls: ['./problems.component.css'],
  imports: [CommonModule, RouterLink, RouterLinkActive],
})
export class ProblemsComponent implements OnInit {
  course_title: string = '';
  course_type: string = '';
  course_id: number = -1;
  course_flag: boolean = true;
  size: number = 5;
  nameArray: string[] = [];

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private dialogService: DialogService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.course_type = this.router.url.split('/')[1];
    const course_route: string = this.router.url.split('/')[2];
    this.course_flag = this.course_type === 'math';
    this.course_title = this.route.snapshot.data['title'];
    if (this.course_flag) {
      this.course_id = math_indices[course_route];
      this.nameArray = math_problems[this.course_id];
    } else {
      this.course_id = programming_indices[course_route];
      this.nameArray = programming_problems[this.course_id];
    }
  }

  openSolutionDialog(video_id: string = 'y3svPgyGnLc') {
    this.dialogService.openDialog('75%', '75%', SolutionDialogComponent, {
      video_id: video_id,
    });
  }
}
