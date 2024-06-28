import { Component, OnInit } from '@angular/core';
import { UserloginService } from '../../../services/userlogin.service';
import { PostService } from '../../../services/post.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { AnsService } from '../../../services/ans.service';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
@Component({
  selector: 'app-allchat',
  templateUrl: './allchat.component.html',
  styleUrls: ['./allchat.component.css']
})
export class AllchatComponent implements OnInit {
  title: any;
  problemId: any;
  description: any;
  showCommentBoxes: boolean = false;
  liked: boolean = false;
  disliked: boolean = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  user: any = {};
  visiblePosts: any;
  currentIndex = 0;

  problem: any;

  constructor(
    private problemService: PostService,
    private _route: ActivatedRoute,
    private login: UserloginService,
    private solutionService: AnsService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.user = this.login.getUser();
    this.problemId = this._route.snapshot.params['problemId'];
    this.problemService.getProblem(this.problemId).subscribe(
      (data) => {
        this.problem = data;
        console.log(this.problem);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  toggleCommentBox(): void {
    this.showCommentBoxes = !this.showCommentBoxes;
  }

  createSolution(problemId: number): void {
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
        this.toggleCommentBox();
      },
      (error: any) => {
        console.error('Error creating solution', error);
      }
    );
  }

  likePost(): void {
    if (!this.liked && !this.disliked) {
      this.problem.likes++;
      this.liked = true;
      this.updateProblem();
    }
  }

  dislikePost(): void {
    if (!this.liked && !this.disliked) {
      this.problem.dislikes++;
      this.disliked = true;
      this.updateProblem();
    }
  }

  updateProblem(): void {
    this.problemService.updateProblem(this.problem).subscribe(
      () => {
        console.log('Post updated successfully');
      },
      (error) => {
        console.error('Error updating post', error);
      }
    );
  }
}
