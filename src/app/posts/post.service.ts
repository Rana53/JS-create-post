import { Injectable } from '@angular/core';
import { Post} from '../posts/post.model';
import { HttpClient} from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class PostService {
    private allPosts: Post[] = [];
    post: Post;
    private postUpdated = new Subject <Post[]> ();
    constructor(private http: HttpClient, private router: Router) { }

    addPost(title: string, content: string, image: File) {
      const postData = new FormData();
      postData.append("title", title);
      postData.append("content",content);
      postData.append("image", image, title);
      this.http.post<{message: string, post: Post}>('http://localhost:3000/api/posts', postData)
          .subscribe((responseData) => {
              const post: Post = {
                id: responseData.post.id,
                title: title,
                content: content,
                imagePath: responseData.post.imagePath
              };
              this.allPosts.push(post);
              this.postUpdated.next([...this.allPosts]);
              this.router.navigate["/"];
          });
    }
    getPostUpdateListener() {
        return this.postUpdated.asObservable();
    }
    getPosts() {
        this.http.get<{message: string, posts: any}>('http://localhost:3000/api/posts')
          .pipe(map((postData) => {
              return postData.posts.map((post) => {
                  return {
                      title: post.title,
                      content: post.content,
                      id: post._id,
                      imagePath: post.imagePath
                  };
              });
          }))
          .subscribe((transformedData) => {
              this.allPosts = transformedData;
              this.postUpdated.next([...this.allPosts]);
          });
         return [...this.allPosts];
    }

    getPostForId(id: string) {
        return this.http.get<{ _id: string, title: string, content: string}>('http://localhost:3000/api/posts/' + id);
    }
    updatePost(post: Post) {
       this.http.put('http://localhost:3000/api/posts/' + post.id , post)
       .subscribe(response => {
        const updatedPost = [...this.allPosts];
        const oldPostIndex = updatedPost.findIndex(p => post.id);
        updatedPost[oldPostIndex] = post;
        this.allPosts = updatedPost;
        this.postUpdated.next([...this.allPosts]);
        this.router.navigate["/"];
       });
    }

    deletePost(postId: string) {
        this.http.delete('http://localhost:3000/api/posts/' + postId)
        .subscribe(() => {
            const updatePost = this.allPosts.filter(post => post.id !== postId);
            this.allPosts = updatePost;
            this.postUpdated.next([...this.allPosts]);
        });
    }
}
