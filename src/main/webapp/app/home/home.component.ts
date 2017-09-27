import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Account, LoginModalService, Principal } from '../shared';
import { TagService } from '../entities/tag/tag.service';
import { Tag } from '../entities/tag/tag.model';
import { PostService } from '../entities/post/post.service';
import { Post } from '../entities/post/post.model';

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: [
        'home.scss'
    ]
})
export class HomeComponent implements OnInit {

    static MAX_SYMBOLS = 255;

    account: Account;
    modalRef: NgbModalRef;
    tags: Tag[];
    posts: Post[] = [];

    // method cut message in post
    private static cutMsg( post: Post ): Post {
        post.message = post.message.substr(0, HomeComponent.MAX_SYMBOLS);
        return post;
    }

    constructor(
        private principal: Principal,
        private loginModalService: LoginModalService,
        private eventManager: JhiEventManager,
        private tagsService: TagService,
        private postService: PostService
    ) {
    }

    ngOnInit() {
        // get all tags
        this.tagsService.query().subscribe((res) => {
            this.tags = res.json;
        });

        // get all posts
        this.postService.query().subscribe((res) => {
            res.json.map((post: Post) => {
                if (post && post.message && post.message.length > HomeComponent.MAX_SYMBOLS) {
                    post = HomeComponent.cutMsg(post);
                }
                return this.posts.push(post);
            });
        });

        this.principal.identity().then((account) => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', (message) => {
            this.principal.identity().then((account) => {
                this.account = account;
            });
        });
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }
}
