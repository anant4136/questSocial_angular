import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../helper';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  
  constructor(private http: HttpClient) { }

  public createProblem(problem: any) {
    return this.http.post(`${baseUrl}/problem/`, problem);
  }

  public getProblem(problemId:any) {
    return this.http.get(`${baseUrl}/problem/${problemId}`);
  }

  public updateProblem(problem: any) {
    return this.http.post(`${baseUrl}/problem/update`, problem);
  }

  public deleteProblem(problemId: number) {
    return this.http.delete(`${baseUrl}/problem/${problemId}`);
  }

  public getAllProblems() {
    return this.http.get(`${baseUrl}/problem/`);
  }

  public getUserProblems(userId: number) {
    return this.http.get(`${baseUrl}/problem/problems/${userId}`);
  }
}
