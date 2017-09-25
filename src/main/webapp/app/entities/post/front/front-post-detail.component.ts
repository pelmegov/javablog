import { Component } from '@angular/core';
import { PostDetailComponent } from '../post-detail.component';
import { Post } from '../post.model';

@Component({
    selector: 'jhi-front-post-detail',
    templateUrl: './front-post-detail.component.html'
})
export class FrontPostDetailComponent extends PostDetailComponent {

    post: Post = this.post;

}
