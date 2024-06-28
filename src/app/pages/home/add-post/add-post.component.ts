import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../services/post.service';
import { UserloginService } from '../../../services/userlogin.service';
import swal from 'sweetalert2'

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.css'
})
export class AddPostComponent implements OnInit{
  user : any ={
  }
  
  newProblem : any = {
    title : '',
    description : '',
    imageUrl1: '',
    imageUrl2: '',
    answered: false,
    creator : {
      id : ''
    }
  };

  constructor(private postService: PostService ,private login: UserloginService) { }
  ngOnInit(): void {
    this.user = this.login.getUser()
    this.newProblem.creator.id = this.user.id;
  }

  createProblem(): void {
    this.postService.createProblem(this.newProblem).subscribe(
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

}
