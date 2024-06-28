import { Injectable } from '@angular/core';
import baseUrl from '../helper';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

 
  constructor(private http: HttpClient) { }

  public createCompany(company: any) {
    return this.http.post(`${baseUrl}/company/`, company);
  }

  public getCompany(name: string) {
    return this.http.get(`${baseUrl}/company/${name}`);
  }

  public deleteCompany(companyId: number) {
    return this.http.delete(`${baseUrl}/company/${companyId}`);
  }

  public getAllCompanies() {
    return this.http.get(`${baseUrl}/company/`);
  }
}
