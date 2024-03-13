import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'submissions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './submissions.component.html',
  styleUrl: './submissions.component.css',
})
export class SubmissionsComponent {
  submissions_array = [
    {
      status: 'Accepted Aug 03, 2023',
      language: 'C++',
      runtime: '10 ms',
      memory: '12.6 MB',
    },
    {
      status: 'Wrong Answer Aug 03, 2023',
      language: 'Python',
      runtime: 'N/A',
      memory: 'N/A',
    },
  ];
  constructor() {}
}
