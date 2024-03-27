import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  fetchProblemData(
    course: string,
    topic: string,
    problemId: number
  ): Observable<any> {
    const url = `http://localhost:3000/get_problem/${course}/${topic}/${problemId}`;
    return this.http.get<any[]>(url);
  }
}
