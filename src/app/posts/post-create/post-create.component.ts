import { Component, EventEmitter, Output } from "@angular/core";
import { Post } from '../post.model';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html',
    styleUrls: ['./post-create.component.css']
})

export class PostCreateComponent{
    postTitle = "";
    postContent = "";
    @Output() postCreated = new EventEmitter<Post>();
    onAddPost(form: NgForm){
        const post: Post = {
            title: form.value.title,
            content: form.value.content
        }
        console.log(post);
        this.postCreated.emit(post);
    }
}