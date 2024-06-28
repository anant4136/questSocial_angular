import { Component, OnInit } from '@angular/core';
import { UserloginService } from '../../../services/userlogin.service';
import { PostService } from '../../../services/post.service';
import swal from 'sweetalert2';

interface EditMode {
  username: boolean;
  firstName: boolean;
  lastName: boolean;
  phone: boolean;
  email: boolean;
}

@Component({
  selector: 'app-adminprofile',
  templateUrl: './adminprofile.component.html',
  styleUrls: ['./adminprofile.component.css']
})

export class AdminprofileComponent implements OnInit {
  user: any = {};
  title: any;
  description: any;
  imageUrl1: any;
  imageUrl2: any;
  problems: any = [];
  selectedFilter = 'All Posts';

  constructor(private userProblemsService: PostService, public login: UserloginService) {}

  ngOnInit() {
    this.user = this.login.getUser();
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
    
  }
  imageFile1: File | null = null;
  imageFile2: File | null = null;
  onFileSelected1(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.imageFile1 = input.files[0];
      this.imageFile2 = input.files[1];
    }
  }

  uploadImage() {
    if (!this.title || !this.description) {
      swal.fire('Validation Error', 'Title and description are required.');
      return;
    }
    if (this.imageFile1) {
      this.login.uploadFile(this.imageFile1).subscribe(
        (response) => {
          this.imageUrl1 = "http://localhost:1010/images/" + response.url;
          console.log(this.imageUrl1);
          if (this.imageFile2) {
            this.login.uploadFile(this.imageFile2).subscribe(
              (response) => {
                this.imageUrl2 = "http://localhost:1010/images/" + response.url;
                console.log(this.imageUrl2);
                this.createProblem();
              },
              (error) => { console.log(`File2 upload failed: ${error}`); }
            );
          } else {
            this.createProblem();
          }
        },
        (error) => { console.log(`File1 upload failed: ${error}`); }
      );
    } else {
      console.log('No file selected.');
    }
  }

  createProblem(): void {

    const newProblem: any = {
      title: this.title,
      description: this.description,
      imageUrl1: this.imageUrl1,
      imageUrl2: this.imageUrl2,
      answered: false,
      creator: {
        id: this.user.id
      }
    };
    this.userProblemsService.createProblem(newProblem).subscribe(
      (createdProblem: any) => {
        console.log(createdProblem);
        swal.fire('Post Completed', 'Problem Title is ' + createdProblem.title);
      },
      (error) => {
        console.error('Error creating problem', error);
        swal.fire('Post Failed', 'Error creating problem: ' + error);
      }
    );
  }
}
