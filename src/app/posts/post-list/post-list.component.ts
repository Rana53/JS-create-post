import { Component , Output, Input, OnInit, OnDestroy} from "@angular/core";
import {Subscription } from 'rxjs';
import { Post } from '../post.model';
import { PostService } from '../post.service';
import { PageEvent } from '@angular/material';
import { AuthService } from '../../auth/auth.service';

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css'],
}) 
export class PostListComponent implements OnInit, OnDestroy {
    posts: Post [] = [];
    isLoading = false;
    totalPosts = 0;
    postsPerPage = 2;
    currentPage = 1;
    pageSizeOptions = [1, 2, 5, 10];
    private postsSub: Subscription;
    private authStatusSubs: Subscription;
    isUseLogin = false;
    userId: string;
    constructor(private postService: PostService, private authService: AuthService) { }
    
    ngOnInit() {
      this.isLoading = true;
      this.postService.getPosts(this.postsPerPage,this.currentPage);
      this.userId = this.authService.getUserId();
      this.postsSub = this.postService.getPostUpdateListener()
      .subscribe((postData: {posts:Post[], postCount: number}) => {
        this.isLoading = false;
        this.totalPosts = postData.postCount;
        this.posts = postData.posts;
        // console.log("post image path ");
      });
      this.authStatusSubs = this.authService
        .getAuthStatus()
        .subscribe(isAuthenticated => {
          this.isUseLogin = isAuthenticated;
          this.userId = this.authService.getUserId();
        });
        this.isUseLogin = this.authService.getUserAuthSatatus();
    }
    onChangePage(pageData: PageEvent){
      this.isLoading = true;
      this.currentPage = pageData.pageIndex + 1;
      this.postsPerPage = pageData.pageSize;
      this.postService.getPosts(this.postsPerPage,this.currentPage);
    }
    onDelete(postId: string) {
        this.postService.deletePost(postId).subscribe(() => {
          this.postService.getPosts(this.postsPerPage,this.currentPage);
        });
    }

    ngOnDestroy() {
        this.postsSub.unsubscribe();
        this.authStatusSubs.unsubscribe()
    }

  
}
