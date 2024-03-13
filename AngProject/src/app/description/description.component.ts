import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { math_indices } from '../app.routes';
import { programming_indices } from '../app.routes';
import {
  math_problems,
  programming_problems,
} from '../problem_list/problem_list';
import { CommonModule } from '@angular/common';
import { Problem } from '../problem_list/problem_list';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'description',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './description.component.html',
  styleUrl: './description.component.css',
})
export class DescriptionComponent {
  course_type: string = '';
  course_id: number = -1;
  course_flag: boolean = true;
  problem_name: string = '';
  problem_difficulty: string = '';
  accepted: number = 0;
  submitted: number = 0;
  acceptance_rate: number = 100;
  description_text: string = '';
  examples: Array<string> = [];
  constraints: Array<string> = [];
  note: string = '';

  assign_fields(
    course_route: string,
    problem_id: number,
    indices: any,
    problems: Array<Array<Problem>>
  ): void {
    this.course_id = indices[course_route];
    const problem = problems[this.course_id][problem_id];
    this.problem_name = problem['title'];
    this.problem_difficulty = problem['difficulty'];
    this.accepted = problem['accepted'];
    this.submitted = problem['submitted'];
    if (this.accepted != 0) {
      this.acceptance_rate = (this.accepted / this.submitted) * 100;
    }
    this.description_text = problem['description_text'];
    this.examples = problem['examples'];
    this.constraints = problem['constraints'];
    this.note = problem['note'];
  }

  constructor(private router: Router, private sanitizer: DomSanitizer) {
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

  sanitizeHTML(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
