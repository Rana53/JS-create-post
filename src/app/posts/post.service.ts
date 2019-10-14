import { Injectable } from '@angular/core';
import { Post} from '../posts/post.model';
import { HttpClient} from "@angular/common/http";
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { post } from 'selenium-webdriver/http';

@Injectable({providedIn:'root'})
export class PostService {
    private allPosts: Post[] = [];
    private postUpdated = new Subject <Post[]> ();
    constructor(private http: HttpClient){ }

    pushPost(post: Post){
        this.http.post<{message: string}>('http://localhost:3000/api/posts',post)
          .subscribe((message) => {
                console.log(message);
              this.allPosts.push(post);
              this.postUpdated.next([...this.allPosts]);
          });
    }
    getPostUpdateListener(){
        return this.postUpdated.asObservable();
    }
    getPosts(){
        this.http.get<{message: string, posts: any}>('http://localhost:3000/api/posts')
          .pipe(map((postData) =>{
              return postData.posts.map((post) => {
                  return {
                      title: post.title,
                      content: post.content,
                      id: post._id
                  }
              });
          }))
          .subscribe((transformedData) => {
              this.allPosts = transformedData;   
              this.postUpdated.next([...this.allPosts]);
          });
        //return [...this.allPosts];
    }
}