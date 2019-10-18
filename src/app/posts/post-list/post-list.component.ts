import { Component , Output, Input, OnInit, OnDestroy} from "@angular/core";
import {Subscription } from 'rxjs';
import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit, OnDestroy{
    isLoading = false;
    private postsSub : Subscription;
    posts: Post [] = [];
    constructor(private postService: PostService,){}
    ngOnInit(){
      this.isLoading = true;
       this.postService.getPosts();
       this.postsSub = this.postService.getPostUpdateListener()
           .subscribe((post: Post[]) =>{
               this.isLoading = false;
               this.posts = post;
           });
    }

    onDelete(postId: string){
        this.postService.deletePost(postId);
    }

    ngOnDestroy(){
        this.postsSub.unsubscribe();
    }


}
