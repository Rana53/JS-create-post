import { Post} from '../posts/post.model';
import { Subject } from 'rxjs';

export class PostService {
    private allPosts: Post[] = [];
    private postUpdated = new Subject <Post[]> ();
    pushPost(post: Post){
        this.allPosts.push(post);
        this.postUpdated.next([...this.allPosts]);
        console.log('One post push ' + this.allPosts.length);

    }
    getPostUpdateListener(){
        return this.postUpdated.asObservable();
    }

}