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
    private postsSub : Subscription;
    posts: Post [] = [];
    constructor(private postService: PostService){}
    ngOnInit(){
       this.postService.getPosts();
       this.postsSub = this.postService.getPostUpdateListener()
           .subscribe((post: Post[]) =>{
               this.posts = post;
           });
    }  
    onEdit(){
        console.log("Edit button");
    }
    onDelete(postId: string){
        console.log("delete button " + postId);
    }

    ngOnDestroy(){
        this.postsSub.unsubscribe();
    }

    
}