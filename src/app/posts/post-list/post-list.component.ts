import { Component } from "@angular/core";

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css']
})
export class PostListComponent{
    anyPost = false;
    savePost = [];
    clickOnButton(){
        this.anyPost = true;
        this.savePost.push({
            title: 'New post1',
            content: 'This is the new post1 for title new post1'
        });
        this.savePost.push({
            title: 'New post2',
            content: 'This is the new post1 for title new post2'
        });
    }
}