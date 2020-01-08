import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { PostSeo } from './post-seo.model';
import { PostSeoPopupService } from './post-seo-popup.service';
import { PostSeoService } from './post-seo.service';

@Component({
    selector: 'jhi-post-seo-dialog',
    templateUrl: './post-seo-dialog.component.html'
})
export class PostSeoDialogComponent implements OnInit {

    postSeo: PostSeo;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private postSeoService: PostSeoService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.postSeo.id !== undefined) {
            this.subscribeToSaveResponse(
                this.postSeoService.update(this.postSeo));
        } else {
            this.subscribeToSaveResponse(
                this.postSeoService.create(this.postSeo));
        }
    }

    private subscribeToSaveResponse(result: Observable<PostSeo>) {
        result.subscribe((res: PostSeo) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: PostSeo) {
        this.eventManager.broadcast({ name: 'postSeoListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-post-seo-popup',
    template: ''
})
export class PostSeoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private postSeoPopupService: PostSeoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.postSeoPopupService
                    .open(PostSeoDialogComponent as Component, params['id']);
            } else {
                this.postSeoPopupService
                    .open(PostSeoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
