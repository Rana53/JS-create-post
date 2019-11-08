import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { LoginComponent } from './auth/login/login.component';
import { PostService } from './posts/post.service';
import { SignupComponent } from './auth/singup/signup.component';
import { AuthService } from './auth/auth.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { 
  MatToolbarModule, 
  MatExpansionModule,
  MatProgressSpinnerModule,
  MatCardModule,
  MatButtonModule,
  MatInputModule,
  MatPaginatorModule,
} from '@angular/material';
import { AuthInterceptor } from './auth/auth-interceptor';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PostCreateComponent,
    PostListComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
  
    HttpClientModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
