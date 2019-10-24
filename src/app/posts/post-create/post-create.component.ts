import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Post } from '../post.model';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { PostService } from '../post.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MatSpinner } from '@angular/material';

@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html',
    styleUrls: ['./post-create.component.css']
})

export class PostCreateComponent implements OnInit{
    constructor(private postService: PostService, public route: ActivatedRoute) { }
    form: FormGroup;
    isLoading = false;
    postTitle = '';
    postContent = '';
    private post: Post;
    private mode = 'create';
    private postId: string;
    ngOnInit() {
        this.form = new FormGroup({
          title: new FormControl(null, {
            validators: [Validators.required, Validators.minLength(3)]
          }),
          content: new FormControl(null, {
            validators: [Validators.required, ]
          })
        });
        this.route.paramMap.subscribe((paramMap: ParamMap) => {
            if (paramMap.has('postId')) {
                this.mode = 'edit';
                this.postId = paramMap.get('postId');
                this.isLoading = true;
                this.postService.getPostForId(this.postId).subscribe(postData => {
                    this.isLoading = false;
                    this.post = {
                      id: postData._id,
                      title: postData.title,
                      content: postData.content
                    };
                    this.form.setValue({
                      title: this.post.title,
                      content: this.post.content
                    });
                });

              } else {
                this.mode = 'create';
                this.postId = null;
            }
        });
    }

    onSavePost() {
        this.isLoading = true;
        if (this.form.invalid) {
          return;
        }
        const post: Post = {
            id: null,
            title: this.form.value.title,
            content: this.form.value.content
        };
        if (this.mode === 'create') {
            console.log('post created successfully');
            this.postService.addPost(post);
        }
        else{
            post.id = this.postId;
            console.log('post edit successfully');
            // console.log("post edit successfully" + post.id + " " + post.title + " " + post.content);
            this.postService.updatePost(post);
        }
        this.isLoading = false;
        this.form.reset();
    }

}

