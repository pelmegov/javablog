import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Post } from './post.model';
import { PostService } from './post.service';

@Component({
    selector: 'jhi-post-detail',
    templateUrl: './post-detail.component.html'
})
export class PostDetailComponent implements OnInit, OnDestroy {

    post: Post;
    postId: number;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        public eventManager: JhiEventManager,
        public postService: PostService,
        public route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.postId = params['id'];
            this.load(this.postId);
        });
        this.registerChangeInPosts();
    }

    load(id) {
        this.postService.find(id).subscribe((post) => {
            this.post = post;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPosts() {
        this.eventSubscriber = this.eventManager.subscribe(
            'postListModification',
            (response) => this.load(this.post.id)
        );
    }
}
