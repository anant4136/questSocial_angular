import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../../services/company.service';
import swal from 'sweetalert2'
import { ActivatedRoute } from '@angular/router';
import { UserloginService } from '../../../services/userlogin.service';

@Component({
  selector: 'app-add-companies',
  templateUrl: './add-companies.component.html',
  styleUrl: './add-companies.component.css'
})
export class AddCompaniesComponent {
  user : any ={
    
  }
  companies:any=[];
  company : any={
    name: '',
    description: '',
    location: '',
    no_of_employees: '',
    companyImageUrl:''
  }
  constructor(private companyService: CompanyService,private login:UserloginService) { }
 
  createCompany(): void {
    this.companyService.createCompany(this.company).subscribe(
      (createdCompany: any) => {
        // this.companies.push(createdCompany);
        console.log(createdCompany);
        swal.fire('Registration Completed','Company name is '+ createdCompany.name);
      },
      error => {
        console.error('Error creating company', error);
        swal.fire('Registration Failed','Error creating company'+ error);
      }
    );
  }
  
  ngOnInit(): void {
    this.user = this.login.getUser();
    this.companyService.getAllCompanies().subscribe(
      (data) => {
        this.companies = data;
      },
      (error) => {
        console.error('Error fetching companies', error);
      }
    );
  }
  imageFile1: File | null = null;
  onFileSelected1(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.imageFile1 = input.files[0];

  }
}

  // onFileSelected2(event: Event): void {
  //   const input = event.target as HTMLInputElement;
  //   if (input.files && input.files.length > 0) {
  //     this.imageFile2 = input.files[0];
  //   }
  // }

  uploadImage(): void {
    if (!this.company.name || !this.company.description || !this.company.no_of_employees || !this.company.location) {
      swal.fire('Validation Error', 'All Fields are required');
      return;
    }
    if (this.imageFile1) {
      this.login.uploadFile(this.imageFile1).subscribe(
        (response) => {
          this.company.companyImageUrl = `http://localhost:1010/images/${response.url}`;
          console.log(this.company.companyImageUrl);
         
                this.createCompany();
             
         
        },
        (error) => { console.log(`File1 upload failed: ${error}`); }
      );
    } else {
      console.log('No file selected.');
    }
  }

  }
