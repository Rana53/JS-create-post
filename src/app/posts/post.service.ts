import { Injectable } from '@angular/core';
import { Post} from '../posts/post.model';
import { HttpClient} from "@angular/common/http";
import { Subject } from 'rxjs';

@Injectable({providedIn:'root'})
export class PostService {
    private allPosts: Post[] = [];
    private postUpdated = new Subject <Post[]> ();
    constructor(private http: HttpClient){ }

    pushPost(post: Post){
        this.allPosts.push(post);
        this.postUpdated.next([...this.allPosts]);
        console.log('One post push ' + this.allPosts.length);

    }
    getPostUpdateListener(){
        return this.postUpdated.asObservable();
    }
    getPosts(){
        this.http.get<{message: string, posts: Post[]}>('http://localhost:3000/api/posts')
          .subscribe((postData) => {
              this.allPosts = postData.posts;   
              this.postUpdated.next([...this.allPosts]);
          });
        //return [...this.allPosts];
    }
}