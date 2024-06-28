import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../services/post.service';
import { UserloginService } from '../../../services/userlogin.service';
import { AnsService } from '../../../services/ans.service';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrl: './my-posts.component.css'
})
export class MyPostsComponent implements OnInit{
  length:any
  constructor(private solutionService: AnsService,private _route: ActivatedRoute,private problemService:PostService,private login:UserloginService) { }
  ngOnInit(): void {
    
    this.problemId = this._route.snapshot.params['problemId'];
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
        console.log(err);
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
