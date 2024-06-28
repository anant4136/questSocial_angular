import { Component, OnInit } from '@angular/core';
import { UserloginService } from '../../../services/userlogin.service';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrl: './scoreboard.component.css'
})
export class ScoreboardComponent implements OnInit {
  all_users :any = [];
  user:any={};
  users:any = [];

  constructor(private login:UserloginService) { }
  ngOnInit(): void {
    this.user=this.login.getUser();
    this.login.getTop10Users(this.user.company.companyId).subscribe(
      (data)=>{
        this.users = data;
        // console.log(this.users);
        this.sortUsersByScoreDesc();
      },
      (error)=>{
        console.error('Error fetching users',error);
      }
    );
  
     this.login.getCompanyUsers(this.user.company.companyId).subscribe(
      (data)=>{
        this.all_users = data
      },
      (err)=>{
        console.log(err)
      }
    )
    
  }
  sortUsersByScoreDesc(): void {
    this.users.sort((a: { score: number; }, b: { score: number; }) => b.score - a.score); 
    this.users = this.users.slice(0, 5);// Sort users in descending order by score
  }

}
