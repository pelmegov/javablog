import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PostSeo } from './post-seo.model';
import { PostSeoPopupService } from './post-seo-popup.service';
import { PostSeoService } from './post-seo.service';

@Component({
    selector: 'jhi-post-seo-delete-dialog',
    templateUrl: './post-seo-delete-dialog.component.html'
})
export class PostSeoDeleteDialogComponent {

    postSeo: PostSeo;

    constructor(
        private postSeoService: PostSeoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.postSeoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'postSeoListModification',
                content: 'Deleted an postSeo'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-post-seo-delete-popup',
    template: ''
})
export class PostSeoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private postSeoPopupService: PostSeoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.postSeoPopupService
                .open(PostSeoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
