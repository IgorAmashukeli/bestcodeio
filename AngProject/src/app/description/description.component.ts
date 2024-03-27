import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { math_indices } from '../app.routes';
import { programming_indices } from '../app.routes';
import {
  math_problems,
  programming_problems,
} from '../problem_list/problem_list';
import { CommonModule } from '@angular/common';
import { Problem } from '../problem_list/problem_list';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'description',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './description.component.html',
  styleUrl: './description.component.css',
})
export class DescriptionComponent implements OnInit {
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

  assign_fields(problem: any): void {
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

  extractSubstring(input: string) {
    return input.split('/').slice(0, 3).join('/');
  }

  constructor(
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    const splited: any = this.router.url.split('/');
    const course = splited[1];
    const topic = splited[2];
    const problemId = +splited[3]; // Convert to number using '+'
    this.fetchProblem(course, topic, problemId);
  }

  fetchProblem(course: string, topic: string, problemId: number): void {
    const url = `http://localhost:3000/get_problem/${course}/${topic}/${problemId}`;
    this.http.get<any[]>(url).subscribe({
      next: (problem: any[]) => {
        this.assign_fields(problem[0]);
      },
      error: (error: any) => {
        console.error('Error fetching problem:', error);
        // Handle error, show error message, etc.
      },
    });
  }

  sanitizeHTML(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
