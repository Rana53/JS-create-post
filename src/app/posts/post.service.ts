import { Post} from '../posts/post.model';

export class PostService {
    private allPosts: Post[] = [];
    
    pushPost(post: Post){
        this.allPosts.push(post);
        console.log('One post push ' + this.allPosts.length);
    }
    getPost(){
        // we dont use return this.allPosts because its a reference type if we pass copy of the array return should be bellow
        return [...this.allPosts];
    }
}