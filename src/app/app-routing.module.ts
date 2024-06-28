import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { PostsComponent } from './pages/home/posts/posts.component';
import { ProfileComponent } from './pages/home/profile/profile.component';
import { SubmitAnsComponent } from './pages/home/submit-ans/submit-ans.component';
import { AddPostComponent } from './pages/home/add-post/add-post.component';
import { MyPostsComponent } from './pages/home/my-posts/my-posts.component';
import { AnsComponent } from './pages/home/ans/ans.component';
import { AddCompaniesComponent } from './pages/home/add-companies/add-companies.component';
import { AllchatComponent } from './pages/home/allchat/allchat.component';
import { ChatComponent } from './pages/home/chat/chat.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AdminDashComponent } from './pages/admin/admin_dash/admin-dash.component';
import { AllusersComponent } from './pages/admin/allusers/allusers.component';
import { AdminprofileComponent } from './pages/admin/adminprofile/adminprofile.component';
import { AdminPostComponent } from './pages/admin/admin-post/admin-post.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { AdminGuard} from './services/admin-guard.guard';
import { NormalGuard } from './services/normal.guard';


const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
    pathMatch: 'full',
  },
  {
    path: 'about',
    component: AboutPageComponent,
    pathMatch: 'full',
  },
  {
    path: 'signup',
    component: SignupComponent,
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate:[NormalGuard],
    children: [
      {
        path: '',
        component: PostsComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'add_ans/:problemId',
        component: SubmitAnsComponent
      },
      {
        path: 'add_post',
        component: AddPostComponent
      },
      {
        path: 'my_post/:problemId',
        component: MyPostsComponent
      },
      {
        path: 'ans/:problemId',
        component: AnsComponent
      },
      {
        path: 'show_post/:problemId',
        component: AllchatComponent
      },
      {
        path: 'chat/:id',
        component: ChatComponent
      }

    ]
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AdminGuard],
    children: [
      {
        path: '',
        component: AdminDashComponent
      },
      {
        path: 'profile',
        component: AdminprofileComponent
      },
      {
        path: 'add_companies',
        component: AddCompaniesComponent
      },
      {
        path: 'users',
        component: AllusersComponent
      },
      {
        path: 'admin_post/:problemId',
        component: AdminPostComponent
      },


    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
