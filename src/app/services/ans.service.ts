import { Injectable } from '@angular/core';
import baseUrl from '../helper';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AnsService {

  constructor(private http: HttpClient) { }

  public createSolution(solution: any) {
    return this.http.post(`${baseUrl}/solution/`, solution);
  }

  public getSolution(solutionId:any) {
    return this.http.get(`${baseUrl}/solution/${solutionId}`);
  }
  public deleteSolutionsByProblem(problemId: number) {
    return this.http.delete(`${baseUrl}/solution/problem/${problemId}`);
  }

  public deleteSolution(solutionId: number) {
    return this.http.delete(`${baseUrl}/solution/${solutionId}`);
  }

  public getAllSolutions() {
    return this.http.get(`${baseUrl}/solution/`);
  }

  public getProblemSolutions(problemId: number) {
    return this.http.get(`${baseUrl}/solution/solutions_problem/${problemId}`);
  }

  public getUserSolutions(userId: number) {
    return this.http.get(`${baseUrl}/solution/solutions_user/${userId}`);
  }
}
