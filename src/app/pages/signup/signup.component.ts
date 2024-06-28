import { Component, OnInit } from '@angular/core';
import { UserloginService } from '../../services/userlogin.service';
import { CompanyService } from '../../services/company.service';
import swal from 'sweetalert2'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {
  toggleActive = false;
  companies: any =[];
  registerUser = {
  fullName: "",
  score: 100,
  password: "",
  phone: 0,
  admin: false,
  email: "",
  company: {
    companyId: null
  },
  enabled: true,
  username: "",
  imageUrl: "https://cdn2.iconfinder.com/data/icons/personicon-1/300/personicon07-512.png"
};
  loginUser = {
    username: "",
    password: ""
  }

  toggleForm() {
    this.toggleActive = !this.toggleActive;
  }

  userRegister() {
    this.userService.addUser(this.registerUser).subscribe(
      (data:any)=>{
        console.log(data);
       
        swal.fire('Registration Completed','Username is '+ data.username);
      },
      (err)=>{
        console.log(err);
       
      }
    );
      }


  constructor(private userService: UserloginService,private companyService: CompanyService) { }
  
  ngOnInit(): void {
    this.loadAllCompanies();
  }

  loadAllCompanies(): void {
    this.companyService.getAllCompanies().subscribe(
      (data) => {
        this.companies = data;
      },
     (error) => {
        console.error('Error fetching companies', error);
      }
    );
  }
  userLogin() {
    try {
      this.userService.logIn(this.loginUser).subscribe(
        (data: any) => {
          console.log(data);
          this.userService.loginUser(data.jwtToken);
          console.log(this.userService.getToken());

          // saving user data
          this.userService.currentUser(data.username).subscribe(
            (userData: any) => {
              console.log(userData);
              this.userService.setUser(userData);
              // console.log(this.userService.getUserRole());
             
              if (this.userService.isUserAdmin() == true) {
                // this.userService.loginStatusSubject.next(true);
                window.location.href = '/admin';
              } else if (this.userService.isUserAdmin() == false) {
                // this.userService.loginStatusSubject.next(true);
                window.location.href = '/home';
              } 
              else {
                this.userService.logOut();
              }
            },
            (userError: any) => {
              console.log(userError);
            }
          );
        },
        (loginError: any) => {
          console.log(loginError);
          alert("Wrong Credentials");
        }
      );
    } catch (error) {
      console.log(error);
      // Handle any unexpected errors here
    }
  }

}

