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
    private postUpdated = new Subject <{posts: Post[], postCount: number}> ();
    constructor(private http: HttpClient, private router: Router) { }

    addPost(title: string, content: string, image: File) {
      const postData = new FormData();
      postData.append("title", title);
      postData.append("content",content);
      postData.append("image", image, title);
      this
        .http.post<{message: string; post: Post}>('http://localhost:3000/api/posts', postData)
          .subscribe(responseDaata => {
            this.router.navigate["/"];
          }
      );
    }
    getPostUpdateListener() {
        return this.postUpdated.asObservable();
    }
    getPosts(postPerPage: number, currentPage: number) {
        const queryParams = `?pagesize=${postPerPage}&page=${currentPage}`;
        this.http.get<{message: string, posts: any, maxPosts: number}>('http://localhost:3000/api/posts' + queryParams)
          .pipe(map((postData) => {
              return { posts: postData.posts.map((post) => {
                  return {
                      title: post.title,
                      content: post.content,
                      id: post._id,
                      imagePath: post.imagePath,
                      creator: post.creator
                  };
              }), 
              maxPosts: postData.maxPosts
            };
          }))
          .subscribe((transformedPosData) => {
              
              this.allPosts = transformedPosData.posts;
              this.postUpdated.next({
                posts:  [...this.allPosts],
                postCount: transformedPosData.maxPosts
              });
          });
          return [ ...this.allPosts];
    }

    getPostForId(id: string) {
        return this.http.get<{ 
          _id: string, 
          title: string, 
          content: string, 
          imagePath: string,
          creator: string
        }>(
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
             imagePath: image,
             creator: null
         }
       }
       this.http.put('http://localhost:3000/api/posts/' + id , postData)
       .subscribe(response => {
       
        this.router.navigate["/"];
       });
    }

    deletePost(postId: string) {
        return this.http.delete('http://localhost:3000/api/posts/' + postId);
    }
}
