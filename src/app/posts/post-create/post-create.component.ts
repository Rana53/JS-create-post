import { Component, EventEmitter, Output } from "@angular/core";
import { Post } from '../post.model';
import { NgForm } from '@angular/forms';
import { PostService } from '../post.service';

@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html',
    styleUrls: ['./post-create.component.css']
})

export class PostCreateComponent{
    constructor(private postService: PostService){}
    postTitle = "";
    postContent = "";

    onAddPost(form: NgForm){
        if(form.invalid) return ;
        const post: Post = {
            id: null,
            title: form.value.title,
            content: form.value.content
        }
        this.postService.pushPost(post);
        form.resetForm();
    }
    
}