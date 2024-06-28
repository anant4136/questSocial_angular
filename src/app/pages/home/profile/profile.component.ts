import { Component, OnInit } from '@angular/core';
import { UserloginService } from '../../../services/userlogin.service';
import { PostService } from '../../../services/post.service';

interface EditMode {
  username: boolean;
  firstName: boolean;
  lastName: boolean;
  phone: boolean;
  email: boolean;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
 
  user : any ={
   
  }
  problems:any=[]
  selectedFilter = 'All Posts';
 constructor(private userProblemsService:PostService,public login:UserloginService){}
  ngOnInit() {
    this.user = this.login.getUser()
    this.userProblemsService.getUserProblems(this.user.id).subscribe(
      (data) => {
        this.problems = data;
      },
      (error) => {
        console.error('Error fetching user problems', error);
      }
    );
  }
  get filteredPosts() {
    
    if (this.selectedFilter === 'All Posts') {
      return this.problems;
    }
    return this.problems.filter((post: { answered: boolean; }) => post.answered === (this.selectedFilter === 'Answered'));
  }

  setFilter(filter: string) {
    this.selectedFilter = filter;
  }
  editMode: EditMode = {
    username: false,
    firstName: false,
    lastName: false,
    phone: false,
    email: false
  };

  editField(field: keyof EditMode) {
    this.editMode[field] = true;
  }

  saveField(field: keyof EditMode) {
    this.editMode[field] = false;
    // You may want to add logic here to save the changes to the backend
  }
}
