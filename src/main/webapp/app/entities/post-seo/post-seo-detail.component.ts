import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { PostSeo } from './post-seo.model';
import { PostSeoService } from './post-seo.service';

@Component({
    selector: 'jhi-post-seo-detail',
    templateUrl: './post-seo-detail.component.html'
})
export class PostSeoDetailComponent implements OnInit, OnDestroy {

    postSeo: PostSeo;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private postSeoService: PostSeoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPostSeos();
    }

    load(id) {
        this.postSeoService.find(id).subscribe((postSeo) => {
            this.postSeo = postSeo;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPostSeos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'postSeoListModification',
            (response) => this.load(this.postSeo.id)
        );
    }
}
