import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiLanguageService, JhiAlertService } from 'ng-jhipster';

import { PostSeo } from './post-seo.model';
import { PostSeoService } from './post-seo.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-post-seo',
    templateUrl: './post-seo.component.html'
})
export class PostSeoComponent implements OnInit, OnDestroy {
postSeos: PostSeo[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private postSeoService: PostSeoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.postSeoService.query().subscribe(
            (res: ResponseWrapper) => {
                this.postSeos = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInPostSeos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: PostSeo) {
        return item.id;
    }
    registerChangeInPostSeos() {
        this.eventSubscriber = this.eventManager.subscribe('postSeoListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
