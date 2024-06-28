import { Component } from '@angular/core';
import { PostService } from '../../../services/post.service';
import { UserloginService } from '../../../services/userlogin.service';
import swal from 'sweetalert2'
import { AnsService } from '../../../services/ans.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-admin-post',
  templateUrl: './admin-post.component.html',
  styleUrl: './admin-post.component.css'
})
export class AdminPostComponent {

  length:any
  constructor(private solutionService: AnsService,private _route: ActivatedRoute,private problemService:PostService,private login:UserloginService) { }
  ngOnInit(): void {
   
    this.problemId = this._route.snapshot.params['problemId'];
    console.log(this.problemId);
    this.problemService.getProblem(this.problemId).subscribe(
      (data)=>{
        this.problem = data;
        console.log(this.problem);
        this.solutionService.getProblemSolutions(this.problem.problemId).subscribe(
          (data: any) => {
            this.solutions = data;
            this.length=data.length;
            console.log(this.solutions);
          },
          (error: any) => {
            console.error('Error fetching solutions', error);
          }
        );
      }
      ,(err)=>{
        console.log('error fetching problem',err);
      }
    )
    
  }
  solutions: any = [];
  user : any 
  problemId:any
  problem :any
  
  increaseScore(solution: any): void {
    const solverId = solution.solver.username;
    this.login.getUserByUsername(solverId).subscribe(
      (data: any) => {
        data.score += 5;
        this.login.updateUser(data).subscribe(
          (response) => {
            console.log('User score updated successfully', response);
            this.problemService.getProblem(this.problemId).subscribe(
              (data:any)=>{
                data.answered = true;
                this.problemService.updateProblem(data).subscribe(
                  (response) => {
                    console.log('Problem updated successfully', response);
                    swal.fire('Problem Solved ','Problem Title is '+ response);
                    window.location.reload();
                  },
                ),
                (err:any)=>{
                  console.error('Error updating problem', err);
                  swal.fire('Post Failed','Error solving problem'+ err);
                }
              }
            )

          },
          (error) => {
            console.error('Error updating user score', error);
          }
        );
        
      },
      (error: any) => {
        console.error('Error fetching user', error);
      }
    );
  }
  
}
