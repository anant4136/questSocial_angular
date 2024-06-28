import { Component, OnInit } from '@angular/core';
import { UserloginService } from '../../../services/userlogin.service';
import { PostService } from '../../../services/post.service';
import { CompanyService } from '../../../services/company.service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-rightboard',
  templateUrl: './rightboard.component.html',
  styleUrl: './rightboard.component.css'
})
export class RightboardComponent implements OnInit{
  description:any
  title:any
  imageUrl1:any
  imageUrl2:any
  user:any={}
  companies:any=[]
  constructor(private login:UserloginService,private postService: PostService, private companyService:CompanyService){}
  ngOnInit(): void {
    this.user = this.login.getUser();
    this.companyService.getAllCompanies().subscribe(
      (data:any)=>{
        this.companies = data;
        console.log(data)
      }
      ,(err:any)=>{
        console.log(err)
      }
    );
  }
  
  

  createProblem(): void {
    const newProblem : any = {
        title : this.title,
        description : this.description,
        imageUrl1: this.imageUrl1,
        imageUrl2: this.imageUrl2,
        answered: false,
        creator : {
          id : this.user.id
        }
      }
    this.postService.createProblem(newProblem).subscribe(
      (createdProblem: any) => {
        console.log(createdProblem);
        swal.fire('Post Completed','Problem Title is '+ createdProblem.title);
      },
      (error) => {
        console.error('Error creating problem', error);
        swal.fire('Post Failed','Error creating problem'+ error);
      }
    );
  }
  
  
  logOut()
  {
    this.login.logOut();
    window.location.reload();
    window.location.href = '/signup';
  }
}
