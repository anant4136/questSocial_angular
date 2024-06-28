import { Component } from '@angular/core';
import { PostService } from '../../../services/post.service';
import { UserloginService } from '../../../services/userlogin.service';
import { AnsService } from '../../../services/ans.service';
import swal from 'sweetalert2';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css',
  
})
export class PostsComponent {
  
  title:any
  description:any
  showCommentBoxes: boolean[] = [];
  showCommentViewBoxes: boolean[] = [];
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  user : any ={
    
  }
  posts: any = [];
  visiblePosts:any = [];
  currentIndex = 0;
  

  constructor(private postService: PostService,private login:UserloginService,private solutionService:AnsService,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    
    this.user = this.login.getUser();
    this.loadAllProblems();
    this.updateVisiblePosts();
    setInterval(() => this.nextSlide(), 5000);
    
    
  }
  updateVisiblePosts() {
    this.visiblePosts = this.posts.slice(this.currentIndex, this.currentIndex + 3);
  }

  

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.posts.length;
    this.updateVisiblePosts();
  }
  goToSlide(index: number) {
    this.currentIndex = index;
    this.updateVisiblePosts();
  }

  loadAllProblems(): void {
    this.postService.getAllProblems().subscribe(
      (data) => {
        this.posts = data;
        this.showCommentBoxes = this.posts.map(() => false);
        
      },
     (error) => {
        console.error('Error fetching problems', error);
      }
    );
    
  }
  
  toggleCommentBox(index: number): void {
    this.showCommentBoxes[index] = !this.showCommentBoxes[index];
  }
  createSolution(problemId: number,index:number): void {
    if (!this.title || !this.description) {
      swal.fire('Validation Error', 'Title and description are required.');
      return;
    }
    const newSolution: any = {
      title: this.title,
      description: this.description,
      solver: { id: this.user.id },
      question: { problemId: problemId }
    };

    this.solutionService.createSolution(newSolution).subscribe(
      (createdSolution: any) => {
        console.log(createdSolution);
        swal.fire('Comment added', ' ');
        this.showCommentBoxes[index] = !this.showCommentBoxes[index];
        
      },
      (error) => {
        console.error('Error creating solution', error);
       
      }
    );

  }
  likedPosts: boolean[] = [];
  dislikedPosts: boolean[] = [];
  likePost(post:any,index: number): void {
    if (!this.likedPosts[index] && !this.dislikedPosts[index]) {
      post.likes++;
      this.likedPosts[index] = true;
      this.updateProblem(this.posts[index]);
    }
  }

  dislikePost(post:any,index: number): void {
    if (!this.likedPosts[index] && !this.dislikedPosts[index]) {
      post.dislikes++;
      this.dislikedPosts[index] = true;
      this.updateProblem(post);
    }
  }

  updateProblem(problem: any): void {
    this.postService.updateProblem(problem).subscribe(
      () => {
        console.log('Post updated successfully');
      },
      (error) => {
        console.error('Error updating post', error);
      }
    );
  }
  
  

  // deleteProblem(problemId: number): void {
  //   this.postService.deleteProblem(problemId).subscribe(
  //     () => {
  //       this.posts = this.posts.filter(problem => problem.id !== problemId);
  //     },
  //     (error) => {
  //       console.error('Error deleting problem', error);
  //     }
  //   );
  // }
}
