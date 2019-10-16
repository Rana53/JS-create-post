import { Injectable } from '@angular/core';
import { Post} from '../posts/post.model';
import { HttpClient} from "@angular/common/http";
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({providedIn:'root'})
export class PostService {
    private allPosts: Post[] = [];
    post : Post;
    private postUpdated = new Subject <Post[]> ();
    constructor(private http: HttpClient){ }

    pushPost(post: Post){
        this.http.post<{message: string, postId: string}>('http://localhost:3000/api/posts',post)
          .subscribe((responseData) => {
              const id = responseData.postId;
              post.id = id;
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

    getPostForId(id: string){
        var x = 0;
        for(var i = 0; i < this.allPosts.length; i++){
            if(this.allPosts[i].id === id){
                x = i;
                break;
            }
        }
        return {...this.allPosts[x]};
    }

    deletePost(postId: string){
        this.http.delete('http://localhost:3000/api/posts/' + postId)
        .subscribe(() =>{
            const updatePost = this.allPosts.filter(post => post.id !== postId);
            this.allPosts = updatePost;
            this.postUpdated.next([...this.allPosts]);
        });     
    }
}  