import { Component, EventEmitter, Output, OnInit } from "@angular/core";
import { Post } from '../post.model';
import { NgForm } from '@angular/forms';
import { PostService } from '../post.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html',
    styleUrls: ['./post-create.component.css']
})

export class PostCreateComponent implements OnInit{
    constructor(private postService: PostService, public route: ActivatedRoute){}
    postTitle = "";
    postContent = "";
    private post : Post;
    private mode = "create";
    private postId : string;
    ngOnInit(){
        this.route.paramMap.subscribe((paramMap: ParamMap) =>{
            if(paramMap.has('postId')){
                this.mode = "edit";
                this.postId = paramMap.get('postId');
                this.post = this.postService.getPostForId(this.postId);
                console.log(this.postId);
                console.log("Has " + this.post.title + " Has " + this.post.id);
            }
            else{
                this.mode = 'create';
                this.postId = null;
            }
        });
    }
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