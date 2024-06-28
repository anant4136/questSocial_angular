import { Component, OnInit } from '@angular/core';
import { UserloginService } from '../../../services/userlogin.service';
import swal from 'sweetalert2';
import { PostService } from '../../../services/post.service';
import { CompanyService } from '../../../services/company.service';

@Component({
  selector: 'app-sidenavbar',
  templateUrl: './sidenavbar.component.html',
  styleUrls: ['./sidenavbar.component.css']
})
export class SidenavbarComponent implements OnInit {
  description: any;
  title: any;
  imageUrl1: any = "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg";
  imageUrl2: any ="https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg";
  user: any = {};
  companies: any[] = [];
  imageFile1: File | null = null;
  imageFile2: File | null = null;

  constructor(private login: UserloginService, private postService: PostService, private companyService: CompanyService) { }

  ngOnInit(): void {
    this.user = this.login.getUser();
    this.companyService.getAllCompanies().subscribe(
      (data: any) => {
        this.companies = data;
        console.log(data);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  createProblem(): void {
    if (!this.title || !this.description) {
      swal.fire('Validation Error', 'Title and description are required.');
      return;
    }
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
    this.postService.createProblem(newProblem).subscribe(
      (createdProblem: any) => {
        console.log(createdProblem);
        swal.fire('Post Completed', 'Problem Title is ' + createdProblem.title);
      },
      (error) => {
        console.error('Error creating problem', error);
        swal.fire('Post Failed', 'Error creating problem ' + error);
      }
    );
  }

  onFileSelected1(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.imageFile1 = input.files[0];
      this.imageFile2 = input.files[1];
    }
  }

  // onFileSelected2(event: Event): void {
  //   const input = event.target as HTMLInputElement;
  //   if (input.files && input.files.length > 0) {
  //     this.imageFile2 = input.files[0];
  //   }
  // }

  uploadImage(): void {
    if (!this.title || !this.description) {
      swal.fire('Validation Error', 'Title and description are required.');
      return;
    }
    if (this.imageFile1) {
      this.login.uploadFile(this.imageFile1).subscribe(
        (response) => {
          this.imageUrl1 = `http://localhost:1010/images/${response.url}`;
          console.log(this.imageUrl1);
          if (this.imageFile2) {
            this.login.uploadFile(this.imageFile2).subscribe(
              (response) => {
                this.imageUrl2 = `http://localhost:1010/images/${response.url}`;
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

  logOut(): void {
    this.login.logOut();
    window.location.reload();
    window.location.href = '/signup';
  }
}
