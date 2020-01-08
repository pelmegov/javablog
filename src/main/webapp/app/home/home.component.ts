import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Account, LoginModalService, Principal } from '../shared';
import { TagService } from '../entities/tag/tag.service';
import { Tag } from '../entities/tag/tag.model';

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: [
        'home.scss'
    ]
})
export class HomeComponent implements OnInit {
    account: Account;
    modalRef: NgbModalRef;
    tags: Tag[];

    constructor(
        private principal: Principal,
        private loginModalService: LoginModalService,
        private eventManager: JhiEventManager,
        private tagsService: TagService,
    ) {
    }

    ngOnInit() {
        // get all tags
        this.tagsService.query().subscribe((res) => {
            this.tags = res.json;
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
