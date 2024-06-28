import { Component, OnInit } from '@angular/core';
import { AnsService } from '../../../services/ans.service';
import { ActivatedRoute } from '@angular/router';
import { UserloginService } from '../../../services/userlogin.service';
import swal from 'sweetalert2'

@Component({
  selector: 'app-submit-ans',
  templateUrl: './submit-ans.component.html',
  styleUrl: './submit-ans.component.css'
})
export class SubmitAnsComponent implements OnInit {
  user : any 

  newSolution : any = {
    title : '',
    description : '',
    solver : {
      id : ''
    },
    question :{
      problemId : ''
    }
  }

  
 
  constructor(private  solutionService: AnsService,private _route: ActivatedRoute,private login: UserloginService) { }
  ngOnInit(): void {
    this.user = this.login.getUser();
    this.newSolution.question.problemId = this._route.snapshot.params['problemId'];
    this.newSolution.solver.id = this.user.id;

  }

  
 
  createSolution(): void {
    this.solutionService.createSolution(this.newSolution).subscribe(
      (createdSolution: any) => {
        
        console.log(createdSolution);
        swal.fire('Reply Completed','Solution Title is '+ createdSolution.title);
        window.location.href = '/home';
      },
      error => {
        console.error('Error creating solution', error);
        swal.fire('Reply Failed','Error creating solution'+ error);
      }
    );
  }
}
