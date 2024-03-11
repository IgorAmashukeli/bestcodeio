import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

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
  isFlagTrue: boolean = true;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.course_type = this.router.url.split('/')[1];
    this.isFlagTrue = this.course_type === 'math';
  }

  ngOnInit(): void {
    this.course = this.route.snapshot.data['title'];
  }
}
