import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../helper';
import { catchError, map, Observable, Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserloginService {

  constructor(public http: HttpClient) { }

  public addUser(user:any){
    return this.http.post(`${baseUrl}/user/`,user);
  }
  
  public getUserByUsername(username: any){
    return this.http.get(`${baseUrl}/user/${username}`);
  }
  public getUserById(id: any){
    return this.http.get(`${baseUrl}/user/id/${id}`);
  }

  public getCompanyUsers(companyId: any) {
    return this.http.get(`${baseUrl}/user/company/${companyId}`);
  }

  public deleteUser(userId: any) {
    return this.http.delete(`${baseUrl}/user/${userId}`);
  }
  public getTop10Users(companyId: any) {
    return this.http.get(`${baseUrl}/user/top10/company/${companyId}`);
  }
  public updateUser(user: any) {
    return this.http.post(`${baseUrl}/user/update`, user);
  }

  public getAllUsers() {
    return this.http.get(`${baseUrl}/user/`);
  }
  
  public loginStatusSubject = new Subject<boolean>();

  // get token
  public logIn(data: any) {
    return this.http.post(`${baseUrl}/auth/login`, data);
  }

  public currentUser(username: any) {
    return this.http.get(`${baseUrl}/user/${username}`);
  }

  public loginUser(token: any) {
    this.loginStatusSubject.next(true);
    localStorage.setItem('token', token);
  }

  public isLoggedIn() {
    let tokenStr = localStorage.getItem('token');
    if (tokenStr == undefined || tokenStr == '' || tokenStr == null) return false;
    return true;
  }

  public logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  public getToken() {
    return localStorage.getItem('token');
  }

  public setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUser() {
    let userStr = localStorage.getItem('user');
    if (userStr != null) {
      return JSON.parse(userStr);
    }
    this.logOut();
    return null;
  }

  public isUserAdmin() {
    let user = this.getUser()
    return (user.admin==true);
  }
  public uploadFile(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('image', file);
 
    return this.http.post(`${baseUrl}/file/upload/`, formData, { observe: 'response' }).pipe(
      map((event: HttpResponse<any>) => event.body),
      catchError(this.handleError)
    );
}
private handleError(error: HttpErrorResponse) {
  let errorMessage = 'Unknown error!';
  if (error.error instanceof ErrorEvent) {
    // Client-side errors
    errorMessage = `Error: ${error.error.message}`;
  } else {
    // Server-side errors
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  }
  return throwError(errorMessage);
}
}