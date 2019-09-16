import { Component } from "@angular/core";

@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html',
    styleUrls: ['./post-create.component.css']
})

export class PostCreateComponent{
    postTitle = "";
    postContent = "";
    
    clickOnButton(){
        const post = {
            title: this.postTitle,
            content: this.postContent
        }
        console.log(post);
    }
}