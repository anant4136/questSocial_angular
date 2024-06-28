import { Component, OnInit } from '@angular/core';
import { UserloginService } from '../../../services/userlogin.service';
import { CompanyService } from '../../../services/company.service';

@Component({
  selector: 'app-allusers',
  templateUrl: './allusers.component.html',
  styleUrl: './allusers.component.css'
})
export class AllusersComponent implements OnInit {
  companies:any=[];
  all_users :any = [
    
  ];
  user : any ={ 
  }
constructor(private login:UserloginService,private companyService:CompanyService){}
  ngOnInit(): void {
   this.login.getAllUsers().subscribe(
    (data)=>{
      this.all_users = data;
    }
    ,(err)=>{
      console.error('Error fetching users', err);
    }
   )
   this.companyService.getAllCompanies().subscribe(
    (data) => {
      this.companies = data;
    },
    (error) => {
      console.error('Error fetching companies', error);
    }
  );

  }
 companyUsers(companyId:any):void{
  this.login.getCompanyUsers(companyId).subscribe(
    (data)=>{
      this.all_users = data;
    }
   ,(err)=>{
      console.error('Error fetching users', err);
    }
  )
 }
  
}
