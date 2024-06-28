import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService } from '../../services/company.service';
import { UserloginService } from '../../services/userlogin.service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  isLogin: boolean = true;
  companies:any=[]
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
 constructor(private userService: UserloginService,private companyService: CompanyService){}
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
  if (!this.loginUser.username || !this.loginUser.password) {
    alert("Please fill in all required fields.");
    return;
  }
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
userRegister() {
  const { fullName, email, company, password, admin, username } = this.registerUser;
    if (!fullName || !email || !company.companyId || !password || admin === null || !username) {
      alert("Please fill in all required fields.");
      return;
    }
  this.userService.addUser(this.registerUser).subscribe(
    (data:any)=>{
      console.log(data);
      swal.fire('Registration Completed','Username is '+ data.username);
      this.loginUser.username=data.username;
      this.loginUser.password=data.password;
      this.userLogin();
    },
    (err)=>{
      console.log(err);
     
    }
  );
    }
 
  toggleForm(isLogin: boolean) {
    this.isLogin = isLogin;
  }

  toggleMenu() {
    const navMenu = document.getElementById("navMenu");
    if (navMenu) {
      navMenu.className = navMenu.className === "nav-menu" ? "nav-menu responsive" : "nav-menu";
    }
  }
}


