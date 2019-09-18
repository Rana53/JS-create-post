import { Component } from '@angular/core';
import { Post } from './posts/post.model';
import {PostService} from './posts/post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'js-create-post';
  
}
