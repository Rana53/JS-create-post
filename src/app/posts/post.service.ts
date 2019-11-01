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
      this
        .http.post<{message: string; post: Post}>('http://localhost:3000/api/posts', postData)
          .subscribe(responseDaata => {
            const post: Post = {
              id: responseDaata.post.id,
              title: title,
              content: content,
              imagePath: responseDaata.post.imagePath
            };
            console.log("response data "+post.imagePath);
            this.allPosts.push(post);
            this.postUpdated.next([...this.allPosts]);
            this.router.navigate["/"];
          }
      );
    }
    getPostUpdateListener() {
        return this.postUpdated.asObservable();
    }
    getPosts(postPerPage: number, currentPage: number) {
        const queryParams = `?pagesize=${postPerPage}&page=${currentPage}`;
        this.http.get<{message: string, posts: any}>('http://localhost:3000/api/posts' + queryParams)
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
          return [ ...this.allPosts];
    }

    getPostForId(id: string) {
        return this.http.get<{ _id: string, title: string, content: string, imagePath: string}>(
          'http://localhost:3000/api/posts/' + id);
    }
    updatePost(id: string, title: string, content: string, image: File | string) {
        let postData: Post | FormData;
        if(typeof(image) === 'object'){
           postData = new FormData();
           postData.append("id",id);
           postData.append("title",title);
           postData.append("content",content);
           postData.append("image",image,title);
       } else {
         postData = {
             id: id, 
             title: title,
             content: content,
             imagePath: image
         }
       }
       this.http.put('http://localhost:3000/api/posts/' + id , postData)
       .subscribe(response => {
        const updatedPost = [...this.allPosts];
        const oldPostIndex = updatedPost.findIndex(p => p.id === id);
        const post: Post = {
            id: id, 
            title: title,
            content: content,
            imagePath: ""
        }
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
