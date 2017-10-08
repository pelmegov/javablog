import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostDetailComponent } from '../post-detail.component';
import { Post } from '../post.model';
import { ActivatedRoute } from '@angular/router';
import { JhiEventManager } from 'ng-jhipster';
import { PostService } from '../post.service';
import { CommentsService } from '../comments.service';
import { Subject } from 'rxjs';
import { Principal } from '../../../shared/index';

@Component({
    selector: 'jhi-front-post-detail',
    templateUrl: './front-post-detail.component.html'
})
export class FrontPostDetailComponent extends PostDetailComponent implements OnInit {
    post: Post = this.post;
    comments: any[];

    constructor(public eventManager: JhiEventManager,
        public postService: PostService,
        public route: ActivatedRoute,
        public commentsService: CommentsService,
        private principal: Principal
    ) {
        super(eventManager, postService, route);
    }

    ngOnInit() {
        super.ngOnInit();
        this.loadComments(this.postId);
    }

    addComment(comment) {
        this.commentsService.addCommentToPost(comment.value, this.post).subscribe((resp) => this.loadComments(this.postId));
        comment.value = '';
    }

    loadComments(postId) {
        this.postService.getCommentsForPost(postId).subscribe((comments) => this.comments = comments);
    }
}
