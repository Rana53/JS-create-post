import { Component , Output, Input, OnInit, OnDestroy} from "@angular/core";
import {Subscription } from 'rxjs';
import { Post } from '../post.model';
import { PostService } from '../post.service';
import { PageEvent } from '@angular/material';

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css'],
}) 
export class PostListComponent implements OnInit, OnDestroy {
    posts: Post [] = [];
    isLoading = false;
    totalPosts = 10;
    postsPerPage = 2;
    currentPage = 1;
    pageSizeOptions = [1, 2, 5, 10];
    private postsSub: Subscription;

    constructor(private postService: PostService) { }
    ngOnInit() {
      this.isLoading = true;
      this.postService.getPosts(this.postsPerPage,1);
      this.postsSub = this.postService.getPostUpdateListener()
      .subscribe((post: Post[]) => {
        this.isLoading = false;
        this.posts = post;
        // console.log("post image path ");
      });
    }
    onChangePage(pageData: PageEvent){
      this.currentPage = pageData.pageIndex + 1;
      this.postsPerPage = pageData.pageSize;
      this.postService.getPosts(this.postsPerPage,this.currentPage);
    }
    onDelete(postId: string) {
        this.postService.deletePost(postId);
    }

    ngOnDestroy() {
        this.postsSub.unsubscribe();
    }


}
