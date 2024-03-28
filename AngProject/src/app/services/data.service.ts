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

  fetchUserData(user_id: string): Observable<any> {
    const url = `http://localhost:3000/get_user/${user_id}`;
    return this.http.get<any[]>(url);
  }

  createUserData(user_id: string): Observable<any> {
    const url = `http://localhost:3000/create_user/${user_id}`;
    return this.http.post<any>(url, {});
  }

  fetchProblemsData(course: string, topic: string) {
    const url = `http://localhost:3000/get_problems/${course}/${topic}`;
    return this.http.get<any[]>(url);
  }
}
