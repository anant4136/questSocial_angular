import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgChartsConfiguration } from 'ng2-charts';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './pages/home/navbar/navbar.component';
import { PostsComponent } from './pages/home/posts/posts.component';
import { ProfileComponent } from './pages/home/profile/profile.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { SidenavbarComponent } from './pages/home/sidenavbar/sidenavbar.component';
import { ScoreboardComponent } from './pages/home/scoreboard/scoreboard.component';
import { SubmitAnsComponent } from './pages/home/submit-ans/submit-ans.component';
import { AddPostComponent } from './pages/home/add-post/add-post.component';
import { MyPostsComponent } from './pages/home/my-posts/my-posts.component';
import { AnsComponent } from './pages/home/ans/ans.component';
import { AddCompaniesComponent } from './pages/home/add-companies/add-companies.component';
import { AllchatComponent } from './pages/home/allchat/allchat.component';
import { ChatComponent } from './pages/home/chat/chat.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AdminDashComponent } from './pages/admin/admin_dash/admin-dash.component';
import { SidenavbaradminComponent } from './pages/admin/sidenavbaradmin/sidenavbaradmin.component';
import { AllusersComponent } from './pages/admin/allusers/allusers.component';
import { AdminprofileComponent } from './pages/admin/adminprofile/adminprofile.component';
import { authInterceptorProviders } from './services/auth.interceptor';
import { AdminPostComponent } from './pages/admin/admin-post/admin-post.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { RightboardComponent } from './pages/admin/rightboard/rightboard.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    NavbarComponent,
    PostsComponent,
    ProfileComponent,
    SidenavbarComponent,
    ScoreboardComponent,
    SubmitAnsComponent,
    AddPostComponent,
    MyPostsComponent,
    AnsComponent,
    AddCompaniesComponent,
    AllchatComponent,
    ChatComponent,
    AdminComponent,
    AdminDashComponent,
    SidenavbaradminComponent,
    AllusersComponent,
    AdminprofileComponent,
    AdminPostComponent,
    LandingPageComponent,
    AboutPageComponent,
    RightboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    HttpClientModule,
    MatDividerModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatListModule,
    MatSnackBarModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    authInterceptorProviders,
   
  ],
  bootstrap: [AppComponent],

})
export class AppModule { }
