import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule} from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostService } from './posts/post.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { 
  MatToolbarModule, 
  MatExpansionModule,
  MatProgressSpinnerModule,
  MatCardModule,
  MatButtonModule,
  MatInputModule,
  MatPaginatorModule
} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PostCreateComponent,
    PostListComponent
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
  providers: [PostService],
  bootstrap: [AppComponent]
})
export class AppModule { }
