import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DialogService } from '../services/dialog.service';
import { SolutionDialogComponent } from '../solution_dialog/solution_dialog.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'problems',
  standalone: true,
  templateUrl: './problems.component.html',
  styleUrls: ['./problems.component.css'],
  imports: [CommonModule, RouterLink, RouterLinkActive],
})
export class ProblemsComponent implements OnInit {
  course: string = '';
  course_type: string = '';
  course_flag: boolean = true;
  size: number = 5;
  rangeArray: number[] = Array.from({ length: this.size }, (_, index) => index);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialogService: DialogService,
    public authService: AuthService
  ) {
    this.course_type = this.router.url.split('/')[1];
    this.course_flag = this.course_type === 'math';
  }

  ngOnInit(): void {
    this.course = this.route.snapshot.data['title'];
  }

  openSolutionDialog(video_id: string = 'y3svPgyGnLc') {
    this.dialogService.openDialog('75%', '75%', SolutionDialogComponent, {
      video_id: video_id,
    });
  }
}
