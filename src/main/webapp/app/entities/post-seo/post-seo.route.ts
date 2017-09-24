import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { PostSeoComponent } from './post-seo.component';
import { PostSeoDetailComponent } from './post-seo-detail.component';
import { PostSeoPopupComponent } from './post-seo-dialog.component';
import { PostSeoDeletePopupComponent } from './post-seo-delete-dialog.component';

export const postSeoRoute: Routes = [
    {
        path: 'post-seo',
        component: PostSeoComponent,
        data: {
            authorities: [],
            pageTitle: 'javablogApp.postSeo.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'post-seo/:id',
        component: PostSeoDetailComponent,
        data: {
            authorities: [],
            pageTitle: 'javablogApp.postSeo.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const postSeoPopupRoute: Routes = [
    {
        path: 'post-seo-new',
        component: PostSeoPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'javablogApp.postSeo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'post-seo/:id/edit',
        component: PostSeoPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'javablogApp.postSeo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'post-seo/:id/delete',
        component: PostSeoDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'javablogApp.postSeo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
